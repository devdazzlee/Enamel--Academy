"use client"

import React, { useRef } from 'react';
import { 
  X, 
  Share2, 
  Download, 
  CheckCircle, 
  Award, 
  Calendar, 
  Clock,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    id: string;
    title: string;
    date: string;
    completionDate: string;
    cpdHours: number;
    format: string;
    score: number;
    instructor: string;
  };
}

export function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `CPD Certificate - ${certificate.title}`,
          text: `I have successfully completed the ${certificate.title} course and earned ${certificate.cpdHours} CPD hours!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Certificate link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share cancelled or failed:', error);
      if (error instanceof Error && error.name !== 'AbortError') {
        alert('Unable to share. Link copied to clipboard instead.');
        await navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  const handleDownloadPDF = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!certificateRef.current) return;

    const button = event.currentTarget;
    
    try {
      button.disabled = true;
      button.innerHTML = 'Generating PDF...';

      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node: HTMLElement) => !node.classList?.contains('no-print')
      });

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => { img.onload = () => res(null); });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
      const imgW = img.width * ratio;
      const imgH = img.height * ratio;
      const imgX = (pdfWidth - imgW) / 2;
      const imgY = 0;

      pdf.addImage(img, 'PNG', imgX, imgY, imgW, imgH);

      const fileName = `CPD-Certificate-${certificate.title.replace(/\s+/g, '-')}-${certificate.date}.pdf`;
      pdf.save(fileName);

      button.disabled = false;
      button.innerHTML = `
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        Download PDF
      `;
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      
      button.disabled = false;
      button.innerHTML = `
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        Download PDF
      `;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-stretch sm:items-center justify-center z-50 sm:p-4">
        <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] overflow-hidden sm:rounded-xl shadow-2xl sm:max-w-4xl lg:max-w-6xl flex flex-col">
          {/* Header */}
          <div className="bg-[#8b5cf6] text-white p-3 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-3 sm:mb-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1">CPD Certificate</h2>
                <p className="text-purple-100 text-xs sm:text-base truncate">{certificate.title}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={handleShare}
                className="flex-1 sm:flex-none px-3 py-2 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Share2 size={14} className="sm:hidden" />
                <Share2 size={16} className="hidden sm:block" />
                <span>Share</span>
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="flex-1 sm:flex-none px-3 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Download size={14} className="sm:hidden" />
                <Download size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </button>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="p-3 sm:p-6 overflow-y-auto flex-1 sm:max-h-[calc(90vh-140px)]">
            <div ref={certificateRef} className="bg-white rounded-lg shadow-sm p-4 sm:p-8 lg:p-12 border border-gray-200">
              {/* Award Icon */}
              <div className="flex justify-center mb-3 sm:mb-6">
                <div className="text-purple-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                  <Award size="100%" className="w-full h-full" />
                </div>
              </div>

              {/* Certificate Title */}
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-purple-700 text-center mb-1 sm:mb-2">
                Certificate of Completion
              </h3>
              <p className="text-center text-gray-600 text-xs sm:text-base mb-4 sm:mb-8">
                Continuing Professional Development
              </p>

              <div className="border-t border-b border-gray-200 py-4 sm:py-8 mb-4 sm:mb-8">
                {/* Recipient Info */}
                <p className="text-center text-gray-600 mb-2 sm:mb-4 text-xs sm:text-base">This is to certify that</p>
                <h4 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-1 sm:mb-2">
                  Dr. Sarah Johnson
                </h4>
                <p className="text-center text-gray-600 mb-3 sm:mb-6 text-xs sm:text-base">GDC Registration: 123456</p>

                <p className="text-center text-gray-600 mb-2 sm:mb-4 text-xs sm:text-base">has successfully completed</p>
                
                {/* Course Title */}
                <h5 className="text-base sm:text-xl lg:text-2xl font-bold text-purple-700 text-center mb-3 sm:mb-4 px-2">
                  {certificate.title}
                </h5>

                {/* Date and Hours */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-gray-600 mb-3 sm:mb-6 text-xs sm:text-base">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{new Date(certificate.completionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{certificate.cpdHours} CPD Hours</span>
                  </div>
                </div>

                {/* Assessment Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 sm:p-4 flex items-center justify-center gap-2 text-green-700 text-xs sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-semibold">Assessment Passed with {certificate.score}%</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end text-gray-600 gap-4">
                <div>
                  <p className="text-gray-500 text-[10px] sm:text-sm">Provided by</p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-base">Enamel CPD</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-[10px] sm:text-sm">Certificate Number</p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-base break-all sm:break-normal">ENAMEL-CPD-{certificate.id}</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-200">
                <p className="text-[10px] sm:text-xs text-gray-500 text-center leading-relaxed">
                  This certificate is awarded in recognition of successful completion of verified CPD activity and meets the requirements of the GDC Enhanced CPD Framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
