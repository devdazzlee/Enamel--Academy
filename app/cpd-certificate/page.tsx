"use client"

import React, { useRef } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  CheckCircle, 
  Award, 
  Calendar, 
  Clock,
  FileText,
  Lightbulb
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export default function CPDCertificate() {
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'CPD Certificate - Medical Emergencies in Dental Practice',
          text: 'I have successfully completed the Medical Emergencies in Dental Practice course and earned 3 CPD hours!',
          url: window.location.href
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Certificate link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share cancelled or failed:', error);
      // Don't show error for cancelled shares
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
      // Show loading state
      button.disabled = true;
      button.innerHTML = 'Generating PDF...';

      // Render certificate DOM to PNG using html-to-image (avoids html2canvas color parser)
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node: HTMLElement) => !node.classList?.contains('no-print')
      });

      // Create PDF
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => { img.onload = () => res(null); });

      // Calculate dimensions to fit the certificate
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
      const imgW = img.width * ratio;
      const imgH = img.height * ratio;
      const imgX = (pdfWidth - imgW) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(img, 'PNG', imgX, imgY, imgW, imgH);

      // Download the PDF
      const fileName = `CPD-Certificate-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Restore button
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
      
      // Restore button
      button.disabled = false;
      button.innerHTML = `
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        Download PDF
      `;
    }
  };

  const handleViewCPDRecords = () => {
    router.push('/track-cpd');
  };

  const handleBrowseCourses = () => {
    router.push('/courses');
  };

  const handleUpdatePDP = () => {
    router.push('/pdp');
  };

  const handleGoToCPDDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          .print-break {
            page-break-after: always;
          }
        }
      `}</style>
      {/* Header */}
      <div className="bg-[#8b5cf6] text-white p-4 sm:p-8">
        <button 
          onClick={handleGoToCPDDashboard}
          className="flex items-center gap-2 text-white mb-3 sm:mb-4 hover:text-[#e0e7ff] transition-colors no-print text-sm sm:text-base"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Go to CPD Dashboard</span>
          <span className="sm:hidden">Dashboard</span>
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Your CPD Certificate</h1>
            <p className="text-purple-100 text-sm sm:text-base">Course completed successfully</p>
          </div>
          <div className="flex gap-2 sm:gap-3 no-print">
            <button 
              onClick={handleShare}
              className="px-3 sm:px-4 py-2 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition flex items-center gap-2 text-xs sm:text-sm"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
              <span className="sm:hidden">Share</span>
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="px-3 sm:px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition flex items-center gap-2 text-xs sm:text-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Certificate Card - Left Side (2/3) */}
        <div className="lg:col-span-2">
          <div ref={certificateRef} className="bg-white rounded-lg shadow-sm p-6 sm:p-12 border border-gray-200">
            {/* Award Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="text-purple-600">
                <Award size={48} className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
            </div>

            {/* Certificate Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 text-center mb-2">
              Certificate of Completion
            </h2>
            <p className="text-center text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
              Continuing Professional Development
            </p>

            <div className="border-t border-b border-gray-200 py-4 sm:py-8 mb-4 sm:mb-8">
              {/* Recipient Info */}
              <p className="text-center text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">This is to certify that</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-1 sm:mb-2">
                Dr. Sarah Johnson
              </h3>
              <p className="text-center text-gray-600 mb-3 sm:mb-6 text-sm sm:text-base">GDC Registration: 123456</p>

              <p className="text-center text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">has successfully completed</p>
              
              {/* Course Title */}
              <h4 className="text-xl sm:text-2xl font-bold text-purple-700 text-center mb-2 sm:mb-4">
                Medical Emergencies in Dental Practice
              </h4>

              {/* Date and Hours */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>2nd February 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>3 CPD Hours</span>
                </div>
              </div>

              {/* Assessment Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-center justify-center gap-2 text-green-700">
                <CheckCircle size={16} />
                <span className="font-semibold text-sm sm:text-base">Assessment Passed with 92%</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-end text-xs sm:text-sm text-gray-600">
              <div>
                <p className="text-gray-500">Provided by</p>
                <p className="font-semibold text-gray-900">Enamel CPD</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Certificate Number</p>
                <p className="font-semibold text-gray-900">ENAMEL-CPD-2026-0001</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                This certificate is awarded in recognition of successful completion of verified CPD activity and meets the requirements of the GDC Enhanced CPD Framework.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Info Cards */}
        <div className="space-y-4 sm:space-y-6 no-print">
          {/* Course Completed Card */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">
                <CheckCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-1 text-sm sm:text-base">Course Completed!</h3>
                <p className="text-xs sm:text-sm text-green-800">
                  Congratulations on completing this course. Your CPD hours have been automatically logged.
                </p>
              </div>
            </div>
          </div>

          {/* Course Summary Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Course Summary</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs sm:text-sm">CPD Hours</span>
                <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  3 hours
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs sm:text-sm">Assessment Score</span>
                <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  92%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs sm:text-sm">Completion Date</span>
                <span className="text-gray-900 font-medium text-xs sm:text-sm">2nd February 2026</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs sm:text-sm">Certificate Number</span>
                <span className="text-gray-900 font-medium text-xs sm:text-sm">0001</span>
              </div>
            </div>
          </div>

          {/* CPD Record Updated Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">CPD Record Updated</h3>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <div className="text-green-600 mt-0.5">
                  <CheckCircle size={14} />
                </div>
                <span className="text-gray-700">3 hours added to your CPD log</span>
              </div>
              
              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <div className="text-green-600 mt-0.5">
                  <CheckCircle size={14} />
                </div>
                <span className="text-gray-700">Certificate stored in your evidence vault</span>
              </div>
              
              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <div className="text-green-600 mt-0.5">
                  <CheckCircle size={14} />
                </div>
                <span className="text-gray-700">Reflection saved to CPD record</span>
              </div>
              
              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <div className="text-green-600 mt-0.5">
                  <CheckCircle size={14} />
                </div>
                <span className="text-gray-700">Learning outcomes documented</span>
              </div>
            </div>

            <button 
              onClick={handleViewCPDRecords}
              className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">View CPD Records</span>
              <span className="sm:hidden">Records</span>
            </button>
          </div>

          {/* Next Steps Card */}
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Next Steps</h3>
            
            <div className="space-y-2 sm:space-y-3">
              <button 
                onClick={handleBrowseCourses}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2 text-xs sm:text-sm"
              >
                <Lightbulb size={16} />
                <span className="hidden sm:inline">Browse More Courses</span>
                <span className="sm:hidden">Courses</span>
              </button>
              
              <button 
                onClick={handleUpdatePDP}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2 text-xs sm:text-sm"
              >
                <FileText size={16} />
                <span className="hidden sm:inline">Update Your PDP</span>
                <span className="sm:hidden">PDP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
