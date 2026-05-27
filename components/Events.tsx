'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/app/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
}

export default function EventsPage() {
  const { t, language } = useLanguage();
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [changingMonth, setChangingMonth] = useState(false);
  
  // Cache refs for better performance
  const eventsCacheRef = useRef<Map<string, CalendarEvent[]>>(new Map());
  const initialLoadRef = useRef(false);

  // Helper function to check if an event is a webinar (checks title AND description)
  const isWebinarEvent = (event: CalendarEvent): boolean => {
    // Check title/summary
    const title = event.summary?.toLowerCase() || '';
    const hasWebinarInTitle = title.includes('webinar') || 
                              title.includes('online') ||
                              title.includes('zoom') ||
                              title.includes('virtual');
    
    // Check description
    const description = event.description?.toLowerCase() || '';
    const hasWebinarInDescription = description.includes('webinar') || 
                                    description.includes('online') ||
                                    description.includes('zoom') ||
                                    description.includes('virtual') ||
                                    description.includes('live stream') ||
                                    description.includes('join us online') ||
                                    description.includes('register here');
    
    return hasWebinarInTitle || hasWebinarInDescription;
  };

  // Fetch events with caching
  const fetchEventsForRange = useCallback(async (year: number, month: number): Promise<CalendarEvent[]> => {
    const cacheKey = `${year}-${month}`;
    
    // Check cache first
    if (eventsCacheRef.current.has(cacheKey)) {
      return eventsCacheRef.current.get(cacheKey)!;
    }

    // const calendarId = "a66e982c9e48fb6b2a3430011b5e533e594f6b1ad3b96f30a789ca859d276099@group.calendar.google.com";
    const calendarId = "deutronix.my@gmail.com";
    const apiKey = "AIzaSyDYq3LG8CmviV5oOK6SLuNrn008VJW9MN8";
    
    // Fetch 2 months before and 2 months after for smooth navigation
    const startDate = new Date(year, month - 2, 1);
    const endDate = new Date(year, month + 3, 0);
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?key=${apiKey}&singleEvents=true&orderBy=startTime&timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}&maxResults=250`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const fetchedEvents = data.items || [];
      
      // Cache individual months from the fetched range
      for (let m = month - 2; m <= month + 2; m++) {
        const monthKey = `${year}-${m}`;
        if (!eventsCacheRef.current.has(monthKey)) {
          const monthEvents = fetchedEvents.filter((event: CalendarEvent) => {
            if (!event.start) return false;
            
            // Parse date safely without timezone issues
            let eventDate;
            if (event.start.date && !event.start.dateTime) {
              const [y, mth, d] = event.start.date.split('-');
              eventDate = new Date(parseInt(y), parseInt(mth) - 1, parseInt(d));
            } else if (event.start.dateTime) {
              eventDate = new Date(event.start.dateTime);
            } else {
              return false;
            }
            
            return eventDate.getFullYear() === year && eventDate.getMonth() === m;
          });
          eventsCacheRef.current.set(monthKey, monthEvents);
        }
      }
      
      return fetchedEvents;
    } catch (err) {
      console.error("Calendar fetch failed:", err);
      return [];
    }
  }, []);

  // Load events when date changes
  useEffect(() => {
    let isMounted = true;
    
    const loadEvents = async () => {
      if (!initialLoadRef.current) {
        setLoading(true);
      } else {
        setChangingMonth(true);
      }
      
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const cacheKey = `${year}-${month}`;
      
      // Try to get from cache first
      let monthEvents = eventsCacheRef.current.get(cacheKey);
      
      if (!monthEvents) {
        // Fetch new data if not in cache
        await fetchEventsForRange(year, month);
        monthEvents = eventsCacheRef.current.get(cacheKey) || [];
      }
      
      if (isMounted) {
        setEvents(monthEvents);
        setLoading(false);
        setChangingMonth(false);
        initialLoadRef.current = true;
      }
    };
    
    loadEvents();
    
    return () => {
      isMounted = false;
    };
  }, [currentDate, fetchEventsForRange]);

  // Prefetch adjacent months for smoother navigation
  useEffect(() => {
    if (!initialLoadRef.current) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Prefetch next and previous months
    const adjacentMonths = [
      { year, month: month - 1 },
      { year, month: month + 1 },
      { year: month === 11 ? year + 1 : year, month: month === 11 ? 0 : month + 2 },
      { year: month === 0 ? year - 1 : year, month: month === 0 ? 11 : month - 2 }
    ];
    
    adjacentMonths.forEach(({ year: y, month: m }) => {
      const cacheKey = `${y}-${m}`;
      if (!eventsCacheRef.current.has(cacheKey)) {
        // Prefetch in background without blocking UI
        fetchEventsForRange(y, m).catch(console.error);
      }
    });
  }, [currentDate, fetchEventsForRange]);

  // Calendar math
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString(
    language === 'zh' ? 'zh-CN' : 'en-US',
    { month: 'long' }
  );
  const year = currentDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Helper function to safely get event date with timezone safety
  const getEventDate = (event: CalendarEvent): Date | null => {
    if (!event.start) return null;
    
    // Handle all-day events (date string only)
    if (event.start.date && !event.start.dateTime) {
      const [y, m, d] = event.start.date.split('-');
      return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    }
    
    // Handle timed events
    if (event.start.dateTime) {
      return new Date(event.start.dateTime);
    }
    
    return null;
  };

  // Render calendar grid cells with timezone-safe multi-day handling
  const renderCalendarCells = () => {
    const cells = [];
    const daysOfWeek = [
      t('eventsPage.days.sun'),
      t('eventsPage.days.mon'),
      t('eventsPage.days.tue'),
      t('eventsPage.days.wed'),
      t('eventsPage.days.thu'),
      t('eventsPage.days.fri'),
      t('eventsPage.days.sat')
    ];

    // Days of week header
    daysOfWeek.forEach((day, i) => {
      cells.push(
        <div key={`header-${i}`} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/50">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/30 border-b border-r border-gray-100 last:border-r-0"></div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() && 
                      currentDate.getFullYear() === new Date().getFullYear();
      
      const currentCellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      currentCellDate.setHours(0, 0, 0, 0);
      
      const dayEvents = events.filter(event => {
        if (!event.start) return false;

        let startDate;
        
        // 1. SAFELY PARSE START DATE (Avoids JS Timezone UTC Trap)
        if (event.start.date && !event.start.dateTime) {
            const [y, m, d] = event.start.date.split('-');
            startDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
        } else if (event.start.dateTime) {
            startDate = new Date(event.start.dateTime);
        } else {
            return false; 
        }
        startDate.setHours(0, 0, 0, 0);

        let endDate = new Date(startDate.getTime()); // Default to 1 day if no end date

        // 2. SAFELY PARSE END DATE
        if (event.end) {
          if (event.end.date && !event.end.dateTime) {
            const [y, m, d] = event.end.date.split('-');
            endDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            
            // FIX: Subtract exactly 1 local day to counter Google's exclusive end date
            endDate.setDate(endDate.getDate() - 1); 
          } else if (event.end.dateTime) {
            endDate = new Date(event.end.dateTime);
          }
          endDate.setHours(0, 0, 0, 0);
        }

        // Check if the cell is between the start and end dates
        return currentCellDate >= startDate && currentCellDate <= endDate;
      });

      const hasEvents = dayEvents.length > 0;

      cells.push(
        <div key={`day-${day}`} className={`min-h-[120px] p-1.5 md:p-2 border-b border-r border-gray-100 transition-all duration-200 ${hasEvents ? 'bg-[#009FE3]/10 hover:bg-[#009FE3]/20' : 'bg-white hover:bg-gray-50'}`}> 
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full ${isToday ? 'bg-[#009FE3] text-white' : 'text-gray-700'}`}>
              {day}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[80px] scrollbar-hide">
            {dayEvents.map((event, idx) => {
              const isWebinar = isWebinarEvent(event);
              
              const isAllDay = !event.start?.dateTime;
              const eventDate = getEventDate(event);
              
              // Only print the specific time on the FIRST day of the event
              const isFirstDay = eventDate?.getDate() === day && eventDate?.getMonth() === currentDate.getMonth();
              const timeString = !isAllDay && eventDate && isFirstDay ? eventDate.toLocaleTimeString("en-US", { 
                hour: "numeric", 
                minute: "2-digit", 
                hour12: true 
              }) : "";

              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedEvent(event)}
                  className={`px-1.5 md:px-2 py-1.5 rounded-md text-[10px] md:text-xs font-semibold cursor-pointer transition-all duration-200 border-l-2 ${
                    isWebinar 
                      ? 'bg-white md:bg-purple-50 text-black border-purple-400 hover:bg-purple-100 shadow-sm md:shadow-none' 
                      : 'bg-white md:bg-blue-50 text-black border-[#009FE3] hover:bg-blue-100 shadow-sm md:shadow-none'
                  }`}
                >
                  <div className="line-clamp-2 md:truncate leading-tight whitespace-normal md:whitespace-nowrap">
                    {timeString && <span className="opacity-70 block md:inline mb-0.5 md:mb-0 md:mr-1">{timeString}</span>}
                    {event.summary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return cells;
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 w-full">
        {[...Array(7)].map((_, i) => (
          <div key={`skeleton-header-${i}`} className="py-3 text-center">
            <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-8"></div>
          </div>
        ))}
        {[...Array(35)].map((_, i) => (
          <div key={`skeleton-cell-${i}`} className="min-h-[120px] p-1.5 border-b border-r border-gray-100">
            <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse mb-2"></div>
            <div className="space-y-1.5">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      
      {/* Header Section */}
      <div className="w-full bg-white border-b border-gray-200 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="w-full md:w-auto">
            <Link href="/" className="text-[#009FE3] font-bold text-xs tracking-widest uppercase hover:text-[#0B1B3D] transition-colors flex items-center gap-2 mb-3">
              ← {t('eventsPage.backHome')}
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1B3D]">{t('eventsPage.title')}</h1>
          </div>

          {/* Calendar Controls */}
          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-2 md:gap-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            
            <button 
              onClick={handleToday} 
              disabled={changingMonth}
              className="px-3 md:px-5 py-2 h-10 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('eventsPage.today')}
            </button>

            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrevMonth} 
                disabled={changingMonth}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="text-base md:text-lg font-bold text-[#0B1B3D] min-w-[110px] md:min-w-[150px] text-center">
                {changingMonth ? (
                  <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-[#009FE3] rounded-full animate-spin"></div>
                ) : (
                  `${monthName} ${year}`
                )}
              </span>

              <button 
                onClick={handleNextMonth} 
                disabled={changingMonth}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
          </div>

        </div>
      </div>

      {/* Calendar Grid Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-opacity duration-200">
            <div className="grid grid-cols-7 w-full">
              {renderCalendarCells()}
            </div>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (() => {
        let modalImageUrl = "/images/mountain01.jpg";
        let modalCleanDesc = selectedEvent.description || "";

        if (modalCleanDesc) {
            let pText = modalCleanDesc
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<\/p>/gi, "\n")
                .replace(/&nbsp;/g, " ")
                .replace(/\u00A0/g, " ")
                .replace(/<[^>]*>/g, "");
                
            const match = pText.match(/IMAGE:\s*([^\s]+?\.(?:jpg|jpeg|png|gif|webp))/i);
            if (match) {
                modalImageUrl = match[1];
                pText = pText.replace(/IMAGE:\s*([^\s]+?\.(?:jpg|jpeg|png|gif|webp))/i, "");
            }
            modalCleanDesc = pText.trim();
        }

        const isDefaultImage = modalImageUrl === "/images/mountain01.jpg";
        
        // --- MULTI-DAY LOGIC FOR MODAL with timezone safety ---
        const isAllDayEvent = !selectedEvent.start?.dateTime;
        
        let startDate = null;
        if (selectedEvent.start) {
            if (selectedEvent.start.date && !selectedEvent.start.dateTime) {
                const [y, m, d] = selectedEvent.start.date.split('-');
                startDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            } else if (selectedEvent.start.dateTime) {
                startDate = new Date(selectedEvent.start.dateTime);
            }
        }

        let endDate = null;
        let isMultiDay = false;

        if (selectedEvent.end) {
          if (selectedEvent.end.date && !selectedEvent.end.dateTime) {
             const [y, m, d] = selectedEvent.end.date.split('-');
             endDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
             // FIX: Subtract exactly 1 local day to counter Google's exclusive end date
             endDate.setDate(endDate.getDate() - 1); 
          } else if (selectedEvent.end.dateTime) {
             endDate = new Date(selectedEvent.end.dateTime);
          }
          
          if (startDate && endDate && startDate.toDateString() !== endDate.toDateString()) {
              isMultiDay = true;
          }
        }

        const isWebinar = isWebinarEvent(selectedEvent);

        return (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEvent(null)}
          >
            <div 
              className={`bg-white rounded-3xl w-full shadow-2xl relative max-h-[90vh] overflow-hidden flex ${
                isDefaultImage 
                  ? 'max-w-2xl flex-col' 
                  : 'max-w-5xl md:min-h-[550px] flex-col-reverse md:flex-row'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              
              {!isDefaultImage && (
                <div className="w-full md:w-1/2 h-[35vh] md:h-auto min-h-[250px] relative bg-gray-50 flex-shrink-0 border-t md:border-t-0 md:border-r border-gray-100">
                  <Image 
                    src={modalImageUrl} 
                    alt={selectedEvent.summary || "Event image"} 
                    fill 
                    className="object-contain p-4 md:p-8"
                    unoptimized 
                  />
                </div>
              )}

              <div className={`w-full ${!isDefaultImage ? 'md:w-1/2' : ''} p-6 md:p-10 flex flex-col overflow-y-auto relative`}>
                
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors z-10"
                >
                  ✕
                </button>

                <h3 className={`font-extrabold text-[#009FE3] pr-12 mb-6 ${isDefaultImage ? 'text-3xl' : 'text-2xl md:text-3xl'}`}>
                  {selectedEvent.summary}
                 
                </h3>

                <div className="flex flex-col gap-4 mb-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {isMultiDay ? t('eventsPage.dateTime') || 'Date Range' : t('eventsPage.dateTime')}
                      </p>
                      
                      <p className="text-gray-800 font-medium text-sm md:text-base">
                        {/* Start Date */}
                        {startDate ? startDate.toLocaleDateString(
                          language === 'zh' ? 'zh-CN' : 'en-MY',
                          { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                        ) : t('eventsPage.noDetails')}

                        {/* Multi-Day Range Display */}
                        {isMultiDay && endDate && (
                          <>
                            <span className="mx-2 font-normal text-gray-400">→</span>
                            {endDate.toLocaleDateString(
                              language === 'zh' ? 'zh-CN' : 'en-MY',
                              { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </>
                        )}

                        {/* Single-Day Time Display (only shows if not multi-day and not all-day) */}
                        {!isMultiDay && !isAllDayEvent && startDate && (
                          ` • ${startDate.toLocaleTimeString(
                            language === 'zh' ? 'zh-CN' : 'en-MY',
                            { hour: "numeric", minute: "2-digit", hour12: true }
                          )}`
                        )}
                        
                        {isAllDayEvent && !isMultiDay && (
                          <span className="ml-2 text-sm text-gray-500">({t('eventsPage.allDay') || 'All day'})</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.location && (
                    <div className="flex items-start gap-3 mt-1">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {t('eventsPage.location')}
                        </p>
                        <p className="text-gray-800 font-medium text-sm md:text-base">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                </div>

               <div>
                   <h4 className="text-lg font-bold text-gray-800 mb-2">
                     {t('eventsPage.eventDetails')}
                   </h4>
                   <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                     {modalCleanDesc || t('eventsPage.noDetails')}
                   </p>
                   
                </div>
                
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}