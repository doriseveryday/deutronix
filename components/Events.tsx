'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/LanguageContext';
import Link from 'next/link';

export default function EventsPage() {
  const { t, language } = useLanguage();
  
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const calendarId = "deutronix.my@gmail.com";
        const apiKey = "AIzaSyDYq3LG8CmviV5oOK6SLuNrn008VJW9MN8"; 
        
        // Fetch from the 1st day of the CURRENTLY VIEWED month so the whole grid fills up
        const firstDayViewedMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
        // Fetch until the end of the next month to be safe
        const endOfViewedMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0).toISOString();

        const url =
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarId
          )}/events?key=${apiKey}` +
          `&singleEvents=true` +
          `&orderBy=startTime` +
          `&timeMin=${firstDayViewedMonth}` +
          `&timeMax=${endOfViewedMonth}` +
          `&maxResults=100`;

        const res = await fetch(url);
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err) {
        console.error("Calendar fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  // Re-fetch when the user changes the month
  }, [currentDate.getMonth(), currentDate.getFullYear()]);


  // --- CALENDAR MATH ---
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString(
    language === 'zh' ? 'zh-CN' : 'en-US',
    { month: 'long' }
  );
  const year = currentDate.getFullYear();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleToday = () => setCurrentDate(new Date());


  // --- RENDER GRID CELLS ---
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

    // 1. Render Days of Week Header
    daysOfWeek.forEach((day, i) => {
      cells.push(
        <div key={`header-${i}`} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/50">
          {day}
        </div>
      );
    });

    // 2. Render Empty Padding Cells (Days before the 1st of the month)
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/30 border-b border-r border-gray-100 last:border-r-0"></div>);
    }

    // 3. Render Actual Days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      
      // Find events that happen on this specific day
      const dayEvents = events.filter(event => {
        const eventStart = new Date(event.start?.dateTime || event.start?.date);
        return eventStart.getDate() === day && eventStart.getMonth() === currentDate.getMonth() && eventStart.getFullYear() === currentDate.getFullYear();
      });

      cells.push(
        <div key={`day-${day}`} className={`min-h-[120px] p-2 bg-white border-b border-r border-gray-100 transition-colors hover:bg-gray-50 ${isToday ? 'bg-blue-50/20' : ''}`}>
          
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full ${isToday ? 'bg-[#009FE3] text-white' : 'text-gray-700'}`}>
              {day}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[80px] scrollbar-hide">
            {dayEvents.map((event, idx) => {
              const isWebinar = event.summary?.toLowerCase().includes("webinar") || event.summary?.toLowerCase().includes("online");
              const isAllDay = !event.start?.dateTime;
              const timeString = isAllDay ? "" : new Date(event.start?.dateTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedEvent(event)}
                  className={`px-2 py-1.5 rounded-md text-xs font-semibold cursor-pointer truncate transition-all duration-200 border-l-2 ${
                    isWebinar 
                      ? 'bg-purple-50 text-purple-700 border-purple-400 hover:bg-purple-100' 
                      : 'bg-blue-50 text-[#0052cc] border-[#009FE3] hover:bg-blue-100'
                  }`}
                >
                  {timeString && <span className="opacity-70 mr-1">{timeString}</span>}
                  {event.summary}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      
      {/* 1. HEADER SECTION */}
      <div className="w-full bg-white border-b border-gray-200 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="w-full md:w-auto">
            <Link href="/" className="text-[#009FE3] font-bold text-xs tracking-widest uppercase hover:text-[#0B1B3D] transition-colors flex items-center gap-2 mb-3">
              ← {t('eventsPage.backHome')}
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1B3D]">{t('eventsPage.title')}</h1>
          </div>

          {/* Calendar Controls (Centered on mobile, right-aligned on desktop) */}
          <div className="flex w-full md:w-auto items-center justify-center md:justify-end bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            
            {/* < Month Year > Controls */}
            <div className="flex items-center gap-1">
              <button onClick={handlePrevMonth} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <span className="text-base md:text-lg font-bold text-[#0B1B3D] min-w-[110px] md:min-w-[150px] text-center">
                {monthName} {year}
              </span>

              <button onClick={handleNextMonth} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
          </div>

        </div>
      </div>

      {/* 2. CALENDAR GRID SECTION */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
        {loading ? (
           <div className="w-full flex justify-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#009FE3]"></div>
           </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* The CSS Grid that builds the month */}
            <div className="grid grid-cols-7 w-full">
              {renderCalendarCells()}
            </div>
          </div>
        )}
      </div>

      {/* 3. EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 md:p-10 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            >
              ✕
            </button>

            <h3 className="text-3xl font-extrabold text-[#0B1B3D] pr-10 mb-6">
              {selectedEvent.summary}
            </h3>

            <div className="flex flex-col gap-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('eventsPage.dateTime')}</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(selectedEvent.start?.dateTime || selectedEvent.start?.date).toLocaleDateString(
                      language === 'zh' ? 'zh-CN' : 'en-MY',
                      {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }
                    )}
                    {!selectedEvent.start?.date && ` • ${new Date(selectedEvent.start?.dateTime).toLocaleTimeString(
                      language === 'zh' ? 'zh-CN' : 'en-MY',
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      }
                    )}`}
                  </p>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="flex items-start gap-3 mt-2">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('eventsPage.location')}</p>
                    <p className="text-gray-800 font-medium">{selectedEvent.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
               <h4 className="text-lg font-bold text-gray-800 mb-3">{t('eventsPage.eventDetails')}</h4>
               <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                 {selectedEvent.description 
                   ? selectedEvent.description
                       .replace(/<br\s*\/?>/gi, "\n")
                       .replace(/<\/p>/gi, "\n")
                       .replace(/&nbsp;/g, " ")
                       .replace(/\u00A0/g, " ")
                       .replace(/<[^>]*>/g, "")           // Removes HTML tags
                       .replace(/IMAGE:\s*(\S+)/i, "")    // Safely removes the image link
                       .trim() 
                   : t('eventsPage.noDetails')}
               </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}