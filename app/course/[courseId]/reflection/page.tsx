"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Lightbulb, TrendingUp, Target, Award } from 'lucide-react';
import { useApp } from "@/lib/app-context";

export default function ReflectionPage() {
  const params = useParams();
  const router = useRouter();
  const { courses } = useApp();
  const courseId = params.courseId as string;

  const [formData, setFormData] = useState({
    learningOutcomes: '',
    applyLearning: '',
    nextSteps: '',
    takeaways: ''
  });

  const course = courses.find(c => c.id === courseId) || {
    title: "Medical Emergencies in Dental Practice",
    instructor: "Dr. James Carter",
    duration: "2h",
    lessons: 8,
    progress: 100
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTotalWords = () => {
    const allText = Object.values(formData).join(' ');
    return allText.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
    toast.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      Draft saved successfully!
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleSubmit = () => {
    console.log('Submitting reflection...', formData);
    // Navigate to CPD Certificate page
    router.push('/cpd-certificate');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#8b5cf6] text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push(`/course/${courseId}`)}
              className="flex items-center gap-2 text-white hover:text-[#e0e7ff] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Course
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Course Reflection</h1>
              <p className="text-[#e0e7ff]">{course.title}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Completed</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Info Box */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded">
          <div className="flex gap-3">
            <Lightbulb className="text-purple-600 flex-shrink-0 mt-1" size={20} />
            <div className="text-purple-900">
              <p className="mb-3">
                Reflective practice is a key component of CPD. Take a moment to reflect on what you've learned and how you'll apply it to your practice.
              </p>
              <p>
                Once you submit your reflection, you'll receive your CPD certificate and the hours will be automatically logged to your CPD record.
              </p>
            </div>
          </div>
        </div>

        {/* Reflection Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Reflection</h2>
          <p className="text-gray-600 mb-6">Complete all sections to receive your certificate</p>

          {/* Question 1 */}
          <div className="mb-8">
            <div className="flex items-start gap-2 mb-3">
              <Lightbulb className="text-purple-600 mt-1" size={20} />
              <label className="text-gray-900 font-medium">
                What were your key learning outcomes? <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              value={formData.learningOutcomes}
              onChange={(e) => handleChange('learningOutcomes', e.target.value)}
              placeholder="Describe the main things you learned from this course. What new knowledge or skills did you gain?"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Suggested: Describe 2-3 specific concepts or techniques you learned
            </p>
          </div>

          {/* Question 2 */}
          <div className="mb-8">
            <div className="flex items-start gap-2 mb-3">
              <TrendingUp className="text-purple-600 mt-1" size={20} />
              <label className="text-gray-900 font-medium">
                How will you apply this learning in your practice? <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              value={formData.applyLearning}
              onChange={(e) => handleChange('applyLearning', e.target.value)}
              placeholder="Explain how you will use this knowledge in your day-to-day clinical work or professional practice."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Suggested: Give specific examples of how this will change or improve your practice
            </p>
          </div>

          {/* Question 3 */}
          <div className="mb-8">
            <div className="flex items-start gap-2 mb-3">
              <Target className="text-purple-600 mt-1" size={20} />
              <label className="text-gray-900 font-medium">
                What are your next steps or future learning goals? <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              value={formData.nextSteps}
              onChange={(e) => handleChange('nextSteps', e.target.value)}
              placeholder="Identify areas for further development or additional training you'd like to pursue."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Suggested: What related topics would you like to explore next?
            </p>
          </div>

          {/* Question 4 */}
          <div className="mb-8">
            <div className="flex items-start gap-2 mb-3">
              <Award className="text-purple-600 mt-1" size={20} />
              <label className="text-gray-900 font-medium">
                What were your most important takeaways? <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              value={formData.takeaways}
              onChange={(e) => handleChange('takeaways', e.target.value)}
              placeholder="Summarize the most valuable insights or 'aha' moments from this course."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Suggested: What will you remember most from this course?
            </p>
          </div>

          {/* Word Counter */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total words</span>
              <span className="font-medium">{getTotalWords()} words</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSaveDraft}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              Submit & Get Certificate
              <CheckCircle size={20} />
            </button>
          </div>
        </div>

        {/* About CPD Reflections */}
        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About CPD Reflections</h3>
          <p className="text-gray-700 mb-2">
            The GDC requires all dental professionals to reflect on their learning and demonstrate how CPD activities enhance their practice.
          </p>
          <p className="text-gray-700">
            Your reflection will be saved with your CPD record and can be included in audit reports.
          </p>
        </div>
      </div>
    </div>
  );
}
