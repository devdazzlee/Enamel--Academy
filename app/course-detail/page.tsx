"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle,
  ChevronRight,
  BarChart,
  Globe,
  Target,
  Calendar
} from 'lucide-react';

export default function CourseDetail() {
  const router = useRouter()
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const courseStats = [
    { icon: <Clock />, value: "2 hours", label: "Duration" },
    { icon: <BookOpen />, value: "8 Lessons", label: "Content" },
    { icon: <Users />, value: "2,847", label: "Students" },
    { icon: <Award />, value: "2 CPD", label: "Points" }
  ];

  const courseIncludes = [
    "2 hours on-demand video",
    "Lifetime access",
    "2 CPD points",
    "Certificate of completion",
    "Access on mobile and desktop"
  ];

  const learningObjectives = [
    "Recognize and assess medical emergencies in dental practice",
    "Administer emergency medications correctly",
    "Handle respiratory distress and airway obstruction",
    "Use emergency equipment confidently",
    "Perform basic life support (BLS) and CPR techniques",
    "Manage syncope, anaphylaxis, and cardiac emergencies",
    "Implement effective emergency response protocols",
    "Document emergency incidents properly"
  ];

  const curriculum = [
    {
      number: 1,
      title: "Introduction to Medical Emergencies",
      lessons: [
        { title: "Course Overview and Objectives", duration: "8 min", preview: true },
        { title: "Types of Medical Emergencies", duration: "12 min", preview: false }
      ]
    },
    {
      number: 2,
      title: "Emergency Assessment",
      lessons: [
        { title: "Initial Patient Assessment", duration: "15 min", preview: false },
        { title: "Vital Signs Monitoring", duration: "10 min", preview: false }
      ]
    },
    {
      number: 3,
      title: "Basic Life Support",
      lessons: [
        { title: "CPR Techniques", duration: "20 min", preview: true },
        { title: "Using an AED", duration: "12 min", preview: false }
      ]
    },
    {
      number: 4,
      title: "Specific Emergency Situations",
      lessons: [
        { title: "Managing Syncope", duration: "18 min", preview: false },
        { title: "Anaphylaxis Management", duration: "15 min", preview: false }
      ]
    }
  ];

  const requirements = [
    "Basic understanding of dental procedures",
    "Current dental license or enrollment in dental program",
    "Access to computer or mobile device"
  ];

  const handleStartCourse = () => {
    router.push('/course/1');
  };

  const handleAddToPDP = () => {
    router.push('/pdp');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=400&fit=crop" 
                alt="Medical Emergencies in Dental Practice" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h1 className="text-4xl font-bold mb-2">Medical Emergencies in Dental Practice</h1>
                  <p className="text-lg text-gray-200">Essential Skills for Managing Critical Situations</p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-4 gap-4">
              {courseStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200">
                  <div className="flex justify-center mb-2 text-purple-600">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About This Course */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">
                Learn to identify, assess, and manage medical emergencies in the dental setting. This comprehensive 
                course covers essential protocols, emergency medications, and life-saving techniques that every 
                dental professional should master.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <BarChart size={16} />
                  <span>Level: Intermediate</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={16} />
                  <span>Language: English</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>Updated: January 2025</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Target size={16} />
                  <span>2 CPD Points</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-green-600 mt-0.5">
                      <CheckCircle size={20} />
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                          {section.number}
                        </div>
                        <span className="font-semibold text-gray-900">{section.title}</span>
                      </div>
                      <div className={`transform transition-transform ${expandedSection === sectionIndex ? 'rotate-90' : ''}`}>
                        <ChevronRight size={16} />
                      </div>
                    </button>
                    {expandedSection === sectionIndex && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-4 hover:bg-gray-100 transition">
                            <div className="flex items-center gap-3">
                              <div className="text-gray-400">
                                <Play size={16} />
                              </div>
                              <span className="text-gray-700">{lesson.title}</span>
                              {lesson.preview && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                  Preview
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <div className="space-y-3">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-purple-600 mt-0.5">
                      <CheckCircle size={20} />
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* CTA Buttons */}
              <button 
                onClick={handleStartCourse}
                className="w-full px-6 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Start Course
              </button>
              
              <button 
                onClick={handleAddToPDP}
                className="w-full px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                Add to PDP
              </button>

              {/* Course Includes */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">This course includes:</h3>
                <div className="space-y-3">
                  {courseIncludes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-green-600 mt-0.5">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
