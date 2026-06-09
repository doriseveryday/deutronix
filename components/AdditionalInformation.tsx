'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/LanguageContext';
import Link from 'next/link';
import { client } from '@/lib/sanity'; 

interface DownloadableFile {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
}

export default function AdditionalInformation() {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Get translations from the JSON
  const pageTitle = language === 'zh' ? "附加信息" : "Additional Information";
  const pageDescription = language === 'zh' 
    ? "探索与低氘水（DDW）科学及应用相关的可下载资源、研究论文和教育材料。" 
    : "Explore downloadable resources, research papers, and educational materials related to DDW science and applications.";
  const downloadText = language === 'zh' ? "下载 PDF" : "Download PDF";
  const backToHome = language === 'zh' ? "← 返回首页" : "← Back to Home";
  const noDocuments = language === 'zh' 
    ? "当前暂无可用下载文件。" 
    : "No documents are currently available for download.";

  useEffect(() => {
    async function fetchFiles() {
      try {
        // We use 'file.asset->url' to tell Sanity to give us the actual web link to the PDF
        const query = `*[_type == "download"] | order(_createdAt desc) {
          _id,
          title,
          description,
          "fileUrl": file.asset->url
        }`;
        
        const data = await client.fetch(query);
        setFiles(data || []);
      } catch (err) {
        console.error("Failed to fetch PDFs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      
      {/* Header Section */}
      <div className="w-full bg-white border-b border-gray-200 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
          <Link href="/" className="text-[#009FE3] font-bold text-xs tracking-widest uppercase hover:text-[#0B1B3D] transition-colors flex items-center gap-2">
            {backToHome}
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1B3D]">{pageTitle}</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            {pageDescription}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mt-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#009FE3] rounded-full animate-spin"></div>
          </div>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <div key={file._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-md hover:border-[#009FE3]/30 group">
                
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#009FE3] mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-[#009FE3] transition-colors">
                  {file.title}
                </h3>
                
                {file.description && (
                  <p className="text-gray-500 text-sm mb-6 flex-grow">
                    {file.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gray-50">
                  <a 
                    href={`${file.fileUrl}?dl=`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#009FE3] font-bold text-sm hover:text-[#0077B3] transition-colors"
                  >
                    {downloadText}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 text-lg">{noDocuments}</p>
          </div>
        )}
      </div>

    </div>
  );
}