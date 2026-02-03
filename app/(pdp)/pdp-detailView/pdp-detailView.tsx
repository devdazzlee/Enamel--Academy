"use client"

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft,
  FileDown,
  Printer,
  Target,
  TrendingUp,
  FileText,
  Calendar,
  Eye,
  CheckCircle
} from 'lucide-react';

export default function PDPDetailView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pdpData = {
    title: '2023 Annual Plan',
    status: 'Completed',
    dateRange: 'January 1, 2023 - December 31, 2023',
    lastUpdated: 'December 15, 2023',
    progress: 100,
    careerObjectives: [
      'Become a specialist in Advanced Endodontics',
      'Achieve proficiency in Digital Smile Design',
      'Obtain Implantology Certification',
      'Develop expertise in aesthetic dentistry procedures'
    ],
    currentSkills: [
      { skill: 'General Dentistry', level: 'Advanced' },
      { skill: 'Root Canal Treatment', level: 'Intermediate' },
      { skill: 'Crown & Bridge Work', level: 'Intermediate' },
      { skill: 'Patient Communication', level: 'Advanced' }
    ],
    skillsToDevelop: [
      { skill: 'Endodontics', target: 'Advanced' },
      { skill: 'Implantology', target: 'Intermediate' },
      { skill: 'Digital Dentistry', target: 'Intermediate' },
      { skill: 'Aesthetic Procedures', target: 'Advanced' }
    ],
    courses: [
      { title: 'Advanced Endodontics Masterclass', duration: '40 hours', status: 'Completed' },
      { title: 'Digital Smile Design Workshop', duration: '20 hours', status: 'Completed' },
      { title: 'Implantology Certification Program', duration: '60 hours', status: 'Completed' },
      { title: 'Aesthetic Dentistry Techniques', duration: '30 hours', status: 'Completed' }
    ],
    milestones: [
      { quarter: 'Q1 2025', goal: 'Complete Endodontics course', status: 'Completed' },
      { quarter: 'Q2 2025', goal: 'Finish Digital Smile Design', status: 'Completed' },
      { quarter: 'Q3 2025', goal: 'Start Implantology certification', status: 'Completed' },
      { quarter: 'Q4 2025', goal: 'Complete all certifications', status: 'Completed' }
    ],
    achievements: [
      'Successfully completed 4 advanced courses',
      'Gained proficiency in 3 new dental specialties',
      'Logged 150 CPD hours',
      'Improved patient satisfaction scores by 25%'
    ],
    reflection: 'This year has been transformative for my dental career. The combination of advanced endodontics training and digital dentistry skills has significantly enhanced my clinical capabilities. I feel more confident in complex cases and have received excellent patient feedback.'
  };

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const el = document.getElementById(`pdp-section-${stepParam}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button onClick={() => router.push('/pdp')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} />
            Back to My PDPs
          </button>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{pdpData.title}</h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {pdpData.status}
                </span>
              </div>
              <p className="text-gray-600">{pdpData.dateRange}</p>
              <p className="text-sm text-gray-500">Last updated: {pdpData.lastUpdated}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => window.print()} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2">
                <Printer size={16} />
                Print
              </button>
              <button onClick={() => window.print()} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2">
                <FileDown size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="pdp-print-area" className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-green-600">{pdpData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              style={{ width: `${pdpData.progress}%` }}
            />
          </div>
        </div>

        {/* Career Objectives */}
        <div id="pdp-section-1" className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Target size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Career Objectives</h2>
                  <p className="text-sm text-gray-600">Your professional goals and career aspirations</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {pdpData.careerObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Assessment */}
        <div id="pdp-section-2" className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Skills Assessment</h2>
                  <p className="text-sm text-gray-600">Current skills and areas for development</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Current Skills</h3>
                  <div className="space-y-3">
                    {pdpData.currentSkills.map((skill, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">{skill.skill}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Skills to Develop</h3>
                  <div className="space-y-3">
                    {pdpData.skillsToDevelop.map((skill, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">{skill.skill}</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          Target: {skill.target}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Plan */}
        <div id="pdp-section-3" className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <FileText size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Learning Plan</h2>
                  <p className="text-sm text-gray-600">Selected courses and learning activities</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>

              <div className="space-y-3">
                {pdpData.courses.map((course, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{course.title}</h4>
                        <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {course.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Milestones */}
        <div id="pdp-section-4" className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Calendar size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Timeline & Milestones</h2>
                  <p className="text-sm text-gray-600">Key deadlines and progress checkpoints</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>

              <div className="space-y-4">
                {pdpData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-green-700 text-sm">{milestone.quarter}</span>
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            {milestone.status}
                          </span>
                          <p className="text-gray-900 mt-1">{milestone.goal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Review & Reflection */}
        <div id="pdp-section-5" className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Eye size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Review & Reflection</h2>
                  <p className="text-sm text-gray-600">Progress evaluation and personal insights</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Achievements</h3>
                <div className="space-y-2">
                  {pdpData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Personal Reflection</h3>
                <p className="text-gray-700 leading-relaxed">{pdpData.reflection}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Terms & Conditions</a>
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Cookies</a>
          </div>
          <div>© 2025 · All rights reserved</div>
        </div>
      </div>
    </div>
  );
}