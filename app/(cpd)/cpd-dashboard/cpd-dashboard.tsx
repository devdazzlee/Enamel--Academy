'use client';

import React, { useState } from 'react';
import { Clock, TrendingUp, CheckCircle, AlertCircle, BookOpen, PlusCircle, FileText, TrendingDown, File, Award } from 'lucide-react';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useRouter } from 'next/navigation';

export default function CPDDashboard() {
  const [selectedRole, setSelectedRole] = useState('Dentist CPD');
  const router = useRouter();

  const cpdData = {
    hoursCompleted: 58,
    totalHours: 100,
    hoursRemaining: 42,
    cycleStart: '01/08/2021',
    cycleEnd: '31/07/2026',
    verifiedHours: 89,
    selfDeclaredHours: 53,
    evidencePercentage: 94,
    categories: [
      { name: 'Clinical', hours: 28, total: 100, color: 'bg-purple-600' },
      { name: 'Management & Leadership', hours: 10, total: 30, color: 'bg-purple-600' },
      { name: 'Communication', hours: 13, total: 25, color: 'bg-purple-600' },
      { name: 'Professionalism', hours: 6, total: 20, color: 'bg-purple-600' }
    ],
    mandatoryTraining: [
      { name: 'Basic Life Support (BLS)', status: 'Valid', expires: '2026-08-15', daysAgo: 198, statusColor: 'bg-green-100 text-green-700' },
      { name: 'Radiography & Radiation Protection', status: 'Expiring Soon', expires: '2026-03-10', daysAgo: 40, statusColor: 'bg-amber-100 text-amber-700' },
      { name: 'Safeguarding Children & Vulnerable Adults', status: 'Expired', expires: '2026-01-05', daysAgo: 24, statusColor: 'bg-red-100 text-red-700' },
      { name: 'Cross Infection Control', status: 'Valid', expires: '2026-11-20', daysAgo: 295, statusColor: 'bg-green-100 text-green-700' }
    ],
    recentActivities: [
      { title: 'Advanced Endodontics: Root Canal Techniques', date: '15 Jan 2026', hours: 3, category: 'Clinical', type: 'Platform Course', icon: 'award' },
      { title: 'Practice Management Masterclass', date: '10 Jan 2026', hours: 2, category: 'Management & Leadership', type: 'External', icon: 'file' },
      { title: 'Dental Implant Workshop - London', date: '20 Dec 2025', hours: 6, category: 'Clinical', type: 'External', icon: 'file' },
      { title: 'Medical Emergencies in Dental Practice', date: '05 Dec 2025', hours: 4, category: 'Clinical', type: 'Platform Course', icon: 'award' }
    ],
    pdpProgress: {
      title: 'Advanced Implantology Specialization',
      completed: 3,
      total: 5,
      percentage: 65
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Track Your CPD</h2>
                <p className="text-purple-100 text-sm sm:text-base">Track your professional development and compliance</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button 
                  onClick={() => router.push('/cpd-activities-log')}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  View All Records
                </button>
                <button 
                  onClick={() => router.push('/cpd-Logexternal')}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <PlusCircle size={16} />
                  <span className="hidden sm:inline">Log External CPD</span>
                  <span className="sm:hidden">Log CPD</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* CPD Hours Card */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Clock className="text-purple-600" size={20} />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">CPD Hours</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Current 5-year cycle ({cpdData.cycleStart} - {cpdData.cycleEnd})
                </p>
                <div className="flex items-end space-x-2 mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600">{cpdData.hoursCompleted}</div>
                  <div className="text-lg sm:text-xl text-gray-500 pb-2">/ {cpdData.totalHours} hours</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
                  <div 
                    className="bg-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(cpdData.hoursCompleted / cpdData.totalHours) * 100}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-2">
                  <div>
                    <span className="text-gray-600">Completed</span>
                    <span className="ml-2 font-semibold text-purple-600">{(cpdData.hoursCompleted / cpdData.totalHours * 100).toFixed(0)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Hours remaining</span>
                    <span className="ml-2 font-semibold text-gray-900">{cpdData.hoursRemaining} hours</span>
                  </div>
                </div>
              </div>

              {/* Mandatory Training Status */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2">Mandatory Training Status</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Essential requirements for dental practice</p>
                <div className="space-y-2 sm:space-y-3">
                  {cpdData.mandatoryTraining.map((training, index) => (
                    <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">{training.name}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Expires: {training.expires}</span>
                            </span>
                            <span>Expired {training.daysAgo} days ago</span>
                          </div>
                        </div>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${training.statusColor}`}>
                          {training.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent CPD Activity */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-purple-700">Recent CPD Activity</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Your latest completed activities</p>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm">
                    View All
                  </button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {cpdData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {activity.icon === 'award' ? (
                          <Award className="text-purple-600" size={16} />
                        ) : (
                          <File className="text-purple-600" size={16} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">{activity.title}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 text-xs text-gray-600">
                          <span className="flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{activity.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{activity.hours} hours</span>
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="px-1.5 sm:px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                              {activity.category}
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                              {activity.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <TrendingUp className="text-purple-600" size={20} />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Manage your CPD activities</p>
                <div className="space-y-2">
                  <ActionButton 
                    icon={<BookOpen size={16} />} 
                    label="Browse CPD Courses" 
                    onClick={() => router.push('/courses')}
                  />
                  <ActionButton 
                    icon={<PlusCircle size={16} />} 
                    label="Add External CPD" 
                    onClick={() => router.push('/cpd-Logexternal')}
                  />
                  <ActionButton 
                    icon={<FileText size={16} />} 
                    label="Generate Audit Report" 
                    onClick={() => router.push('/cpd-generateaudit-report')}
                  />
                  <ActionButton 
                    icon={<TrendingUp size={16} />} 
                    label="View Development Plan" 
                    onClick={() => router.push('/pdp')}
                  />
                </div>
              </div>

              {/* Compliance Status */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <CheckCircle className="text-green-600" size={20} />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Compliance Status</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">GDC Enhanced CPD Framework</p>
                <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg mb-3 sm:mb-4">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="font-semibold text-green-700 text-sm sm:text-base">On Track</span>
                  <span className="ml-auto text-xs sm:text-sm text-green-600 font-medium">Annual target met</span>
                </div>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified CPD</span>
                    <span className="font-semibold text-gray-900">{cpdData.verifiedHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Self-declared</span>
                    <span className="font-semibold text-gray-900">{cpdData.selfDeclaredHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Records with evidence</span>
                    <span className="font-semibold text-gray-900">{cpdData.evidencePercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2">Category Breakdown</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Hours by GDC category</p>
                <div className="space-y-3 sm:space-y-4">
                  {cpdData.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs sm:text-sm mb-2">
                        <span className="text-gray-700">{category.name}</span>
                        <span className="font-semibold text-gray-900">{category.hours}/{category.total}h</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div 
                          className={`${category.color} h-1.5 sm:h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(category.hours / category.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PDP Progress */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2">PDP Progress</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Development plan goals</p>
                <div className="mb-3 sm:mb-4">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Current PDP</h4>
                  <p className="text-xs sm:text-sm text-gray-700">{cpdData.pdpProgress.title}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">
                  <div 
                    className="bg-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${cpdData.pdpProgress.percentage}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1">
                  <span className="text-gray-600">{cpdData.pdpProgress.completed} of {cpdData.pdpProgress.total} goals completed</span>
                  <span className="font-semibold text-purple-600">{cpdData.pdpProgress.percentage}%</span>
                </div>
                <button 
                  onClick={() => router.push('/pdp')}
                  className="w-full mt-3 sm:mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm sm:text-base"
                >
                  View Full PDP
                </button>
              </div>

              {/* Evidence Vault */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2">Evidence Vault</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Stored certificates & documents</p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <File className="text-gray-600" size={16} />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Total files</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900">47</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="text-gray-600" size={16} />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Certificates</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900">23</span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/certificates')}
                  className="w-full mt-3 sm:mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm sm:text-base"
                >
                  View Evidence
                </button>
              </div>
            </div>
          </div>
        </div>
      
      </main>
      
      <Footer />
    
    </div>
  );
}

function NavLink({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }): React.ReactElement {
  return (
    <a
      href="#"
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-purple-50 text-purple-700 font-medium'
          : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }): React.ReactElement {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all group"
    >
      <div className="text-gray-600 group-hover:text-purple-600 transition-colors flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors leading-tight">
        {label}
      </span>
    </button>
  );
}