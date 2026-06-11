'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/LanguageContext';
import Link from 'next/link';
import { client } from '@/lib/sanity'; 

// 1. ADDED productCategory TO THE INTERFACE
interface DownloadableFile {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  productCategory?: string; 
}

export default function AdditionalInformation() {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Translations
  const pageTitle = language === 'zh' ? "文件下载" : "Downloads";
  const pageDescription = language === 'zh' 
    ? "探索与低氘水（DDW）科学及应用相关的可下载资源、研究论文和教育材料。" 
    : "Explore downloadable resources, research papers, and educational materials related to DDW science and applications.";
  const downloadText = language === 'zh' ? "下载" : "Download";
  const backToHome = language === 'zh' ? "← 返回首页" : "← Back to Home";
  const noDocuments = language === 'zh' 
    ? "当前暂无可用下载文件。" 
    : "No documents are currently available for download.";

  useEffect(() => {
    async function fetchFiles() {
      try {
        // 2. UPDATED QUERY TO FETCH THE CATEGORY
        const query = `*[_type == "download"] | order(_createdAt desc) {
          _id,
          title,
          description,
          productCategory,
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

  // 3. SEPARATE THE FILES INTO TWO GROUPS
  // Any file without a category (older uploads) defaults to DDW+ just to be safe.
  const ddwPlusFiles = files.filter(f => f.productCategory === 'ddw-plus' || !f.productCategory);
  const ddwGelFiles = files.filter(f => f.productCategory === 'ddw-gel');

  // Reusable component for a single list item so we don't copy/paste code!
  const FileListItem = ({ file }: { file: DownloadableFile }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-gray-100 rounded-xl hover:border-[#009FE3]/40 hover:shadow-md transition-all gap-4 group">
      
      <div className="flex items-start md:items-center gap-4">
        {/* PDF Icon */}
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#009FE3] flex-shrink-0 group-hover:bg-[#009FE3] group-hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        {/* Text Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#009FE3] transition-colors">
            {file.title}
          </h3>
          {file.description && (
            <p className="text-gray-500 text-sm mt-1">
              {file.description}
            </p>
          )}
        </div>
      </div>

      {/* Download Button */}
      <a 
        href={`${file.fileUrl}?dl=`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#009FE3]/10 text-[#009FE3] font-bold text-sm rounded-lg hover:bg-[#009FE3] hover:text-white transition-colors"
      >
        {downloadText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>

    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      
      {/* Header Section */}
      <div className="w-full bg-white border-b border-gray-200 py-8 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-start gap-4">
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
      <div className="w-full px-6 mt-10">
        <div className="max-w-4xl mx-auto px-0">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#009FE3] rounded-full animate-spin"></div>
          </div>
        ) : files.length > 0 ? (
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-12">
            {/* DDW+ Section */}
            {ddwPlusFiles.length > 0 && (
              <section className="md:w-1/2">
                <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-6 border-b border-gray-200 pb-3">
                  DDW+
                </h2>
                <div className="flex flex-col gap-3">
                  {ddwPlusFiles.map((file) => (
                    <FileListItem key={file._id} file={file} />
                  ))}
                </div>
              </section>
            )}

            {/* DDW Gel Section */}
            {ddwGelFiles.length > 0 && (
              <section className="md:w-1/2">
                <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-6 border-b border-gray-200 pb-3">
                  DDW Gel
                </h2>
                <div className="flex flex-col gap-3">
                  {ddwGelFiles.map((file) => (
                    <FileListItem key={file._id} file={file} />
                  ))}
                </div>
              </section>
            )}

          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mt-8">
            <p className="text-gray-500 text-lg">{noDocuments}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}