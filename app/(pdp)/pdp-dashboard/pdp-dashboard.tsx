"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit2, 
  Target, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Eye,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

// Main Dashboard Component
export default function PDPDashboard() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('2025');

  const plans = [
    {
      id: '2025',
      title: '2025 Annual Plan',
      status: 'In Progress',
      dateRange: 'January 1, 2025 - December 31, 2025',
      lastUpdated: 'January 15, 2025',
      progress: 35
    },
    {
      id: '2024',
      title: '2024 Annual Plan',
      status: 'Completed',
      dateRange: 'January 1, 2024 - December 31, 2024',
      lastUpdated: 'December 15, 2024',
      progress: 100
    },
    {
      id: '2023',
      title: '2023 Annual Plan',
      status: 'Completed',
      dateRange: 'January 1, 2023 - December 31, 2023',
      lastUpdated: 'December 15, 2023',
      progress: 100
    }
  ];

  const pdpSections = [
    {
      step: 1,
      icon: <Target size={24} />,
      title: 'Career Objectives',
      description: 'Define your professional goals and career aspirations',
      status: 'Completed',
      color: 'purple'
    },
    {
      step: 2,
      icon: <TrendingUp size={24} />,
      title: 'Skills Assessment',
      description: 'Identify current skills and areas for development',
      status: 'Completed',
      color: 'purple'
    },
    {
      step: 3,
      icon: <FileText size={24} />,
      title: 'Learning Plan',
      description: 'Select courses and learning activities to achieve your goals',
      status: 'In Progress',
      color: 'purple'
    },
    {
      step: 4,
      icon: <Calendar size={24} />,
      title: 'Timeline & Milestones',
      description: 'Set deadlines and track your progress',
      status: 'In Progress',
      color: 'purple'
    },
    {
      step: 5,
      icon: <Eye size={24} />,
      title: 'Review & Reflection',
      description: 'Evaluate your progress and adjust your plan',
      status: 'Not Started',
      color: 'purple'
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Not Started':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-700">My Personal Development Plan</h1>
          <button onClick={() => router.push('/pdp?view=form')} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2 w-full sm:w-auto justify-center">
            <Plus size={20} />
            New PDP
          </button>
        </div>

        {/* Current Plan Card */}
        {currentPlan && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentPlan.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentPlan.status)}`}>
                    {currentPlan.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{currentPlan.dateRange}</p>
                <p className="text-xs sm:text-sm text-gray-500">Last updated: {currentPlan.lastUpdated}</p>
              </div>
              <button onClick={() => router.push(`/pdp?view=form&id=${currentPlan.id}`)} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base">
                <Edit2 size={16} />
                Edit PDP
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-bold text-purple-600">{currentPlan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${currentPlan.progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* PDP Sections */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">PDP Sections</h2>
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {pdpSections.map((section, index) => (
            <div 
              key={index}
              onClick={() => router.push(`/pdp?view=detail&id=${selectedPlan}&step=${section.step}`)}
              className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 border-2 hover:border-purple-300 transition cursor-pointer ${
                section.status === 'In Progress' ? 'border-purple-200' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0`}>
                    <div className="sm:scale-100 scale-75">{section.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <span className="text-xs sm:text-sm text-gray-500">Step {section.step}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(section.status)}`}>
                        {section.status}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{section.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {section.status === 'Completed' && (
                    <button onClick={(e) => { e.stopPropagation(); router.push(`/pdp?view=form&id=${selectedPlan}&step=${section.step}`) }} className="text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm">
                      Edit
                    </button>
                  )}
                  <ChevronRight className="text-gray-400" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My PDPs Table */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">My PDPs</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-200">
            {plans.map((plan, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{plan.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(plan.status)} mt-1`}>
                      {plan.status}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Progress</span>
                    <span className="text-xs font-medium text-gray-900">{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${plan.status === 'Completed' ? 'bg-green-500' : 'bg-purple-600'}`}
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => router.push(`/pdp?view=detail&id=${plan.id}`)} className="text-purple-600 hover:text-purple-700 font-medium text-xs">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <table className="hidden sm:table w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Period</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Progress</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{plan.title}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${plan.status === 'Completed' ? 'bg-green-500' : 'bg-purple-600'}`}
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">{plan.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <button onClick={() => router.push(`/pdp?view=detail&id=${plan.id}`)} className="text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
}