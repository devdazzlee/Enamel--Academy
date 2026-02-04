'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, Info } from 'lucide-react';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";


export default function LogExternalCPD() {
  const [formData, setFormData] = useState({
    activityTitle: '',
    provider: '',
    dateCompleted: '',
    cpdHours: '',
    category: '',
    activityType: '',
    learningOutcomes: '',
    reflection: '',
    application: ''
  });

  const gdcRequirements = [
    '250 hours over 5 years',
    'Mix of clinical and non-clinical CPD',
    'Record learning outcomes',
    'Reflect on learning',
    'Keep evidence for audit'
  ];

  const loggingTips = [
    'Log CPD activities as soon as possible after completion',
    'Always upload supporting evidence (certificates, attendance records)',
    'Write meaningful reflections - explain how learning will improve your practice',
    'Include specific examples where possible'
  ];

  const gdcCategories = [
    'Clinical',
    'Management & Leadership',
    'Communication',
    'Professionalism',
    'Research & Audit',
    'Education & Training'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
       <Navigation />
  
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 bg-purple-500 hover:bg-purple-400 rounded-lg flex items-center justify-center transition-colors">
              <ArrowLeft className="text-white" size={20} />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Log External CPD</h2>
              <p className="text-purple-100">Record CPD completed outside the platform</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Details</h3>
              <p className="text-sm text-gray-600 mb-6">
                Enter information about your CPD activity. Fields marked with * are required.
              </p>

              <form className="space-y-6">
                {/* Activity Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Advanced Implant Workshop"
                    value={formData.activityTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, activityTitle: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Provider/Organisation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provider/Organisation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., British Dental Association"
                    value={formData.provider}
                    onChange={(e) =>
                      setFormData({ ...formData, provider: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Date and Hours Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Completed *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select date"
                        value={formData.dateCompleted}
                        onChange={(e) =>
                          setFormData({ ...formData, dateCompleted: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPD Hours *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 3"
                      value={formData.cpdHours}
                      onChange={(e) =>
                        setFormData({ ...formData, cpdHours: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category and Type Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GDC Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {gdcCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Type
                    </label>
                    <select
                      value={formData.activityType}
                      onChange={(e) =>
                        setFormData({ ...formData, activityType: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="course">Course</option>
                      <option value="workshop">Workshop</option>
                      <option value="conference">Conference</option>
                      <option value="webinar">Webinar</option>
                      <option value="reading">Reading</option>
                      <option value="peer_review">Peer Review</option>
                    </select>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Outcomes
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    What did you learn from this activity?
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Describe the key learning outcomes and knowledge gained..."
                    value={formData.learningOutcomes}
                    onChange={(e) =>
                      setFormData({ ...formData, learningOutcomes: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Reflection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reflection
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Reflect on the CPD activity and its relevance to your practice
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Reflect on what you learned and how it applies to your practice..."
                    value={formData.reflection}
                    onChange={(e) =>
                      setFormData({ ...formData, reflection: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Application */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How will you apply this learning?
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Describe how you plan to implement what you've learned
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Explain how you will apply this learning in your clinical practice..."
                    value={formData.application}
                    onChange={(e) =>
                      setFormData({ ...formData, application: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Upload Evidence */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Evidence
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Attach certificates, attendance records, photos, or other supporting documents
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                    <p className="text-purple-600 font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <CheckCircle size={20} />
                    <span>Log CPD Activity</span>
                  </button>
                  <button
                    type="button"
                    className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Guidelines */}
          <div className="space-y-6">
            {/* GDC Requirements */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="text-blue-600" size={24} />
                <h3 className="font-semibold text-blue-900">GDC Requirements</h3>
              </div>
              <ul className="space-y-2">
                {gdcRequirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-blue-800">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips for Logging CPD */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="text-purple-600" size={24} />
                <h3 className="font-semibold text-purple-900">Tips for Logging CPD</h3>
              </div>
              <ul className="space-y-3">
                {loggingTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Info size={14} className="text-purple-600" />
                    </div>
                    <span className="text-sm text-purple-800">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GDC Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">GDC Categories</h3>
              <div className="space-y-2">
                {gdcCategories.map((category, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function NavLink({ label, active = false }) {
  return (
    <a
      href="#"
      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-purple-50 text-purple-700 font-medium'
          : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
      }`}
    >
      {label}
    </a>
  );
}