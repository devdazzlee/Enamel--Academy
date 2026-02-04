'use client';

import React, { useState } from 'react';
import { ArrowLeft, Filter, Search, FileText, CheckCircle, Clock, Eye, BarChart3 } from 'lucide-react';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function CPDActivitiesLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [yearFilter, setYearFilter] = useState('All Years');

  const activities = [
    {
      id: 1,
      title: 'Advanced Endodontics: Root Canal Techniques',
      description: 'Enhanced understanding of modern root canal preparation techniques',
      date: '15 Jan 2026',
      hours: 3,
      category: 'Clinical',
      type: 'Platform Course',
      status: 'Verified',
      files: 1
    },
    {
      id: 2,
      title: 'Practice Management Masterclass',
      description: 'Improved practice efficiency strategies',
      date: '10 Jan 2026',
      hours: 2,
      category: 'Management & Leadership',
      type: 'External',
      status: 'Verified',
      files: 1
    },
    {
      id: 3,
      title: 'Dental Implant Workshop - London',
      description: 'Hands-on experience with implant placement',
      date: '20 Dec 2025',
      hours: 6,
      category: 'Clinical',
      type: 'External',
      status: 'Verified',
      files: 3
    },
    {
      id: 4,
      title: 'Medical Emergencies in Dental Practice',
      description: 'Updated emergency protocols and response procedures',
      date: '05 Dec 2025',
      hours: 4,
      category: 'Clinical',
      type: 'Platform Course',
      status: 'Verified',
      files: 1
    },
    {
      id: 5,
      title: 'Effective Communication with Anxious Patients',
      description: 'New techniques for patient anxiety management',
      date: '22 Nov 2025',
      hours: 1.5,
      category: 'Communication',
      type: 'Platform Course',
      status: 'Verified',
      files: 1
    },
    {
      id: 6,
      title: 'Digital Dentistry Conference 2025',
      description: 'Latest advances in CAD/CAM technology',
      date: '10 Nov 2025',
      hours: 8,
      category: 'Clinical',
      type: 'External',
      status: 'Verified',
      files: 3
    },
    {
      id: 7,
      title: 'GDC Standards and Professional Ethics',
      description: 'Updated understanding of GDC standards',
      date: '15 Oct 2025',
      hours: 2,
      category: 'Professionalism',
      type: 'Platform Course',
      status: 'Verified',
      files: 1
    },
    {
      id: 8,
      title: 'Team Leadership in Dental Practice',
      description: 'Leadership skills for managing dental teams',
      date: '05 Oct 2025',
      hours: 3,
      category: 'Management & Leadership',
      type: 'External',
      status: 'Verified',
      files: 1
    },
    {
      id: 9,
      title: 'Periodontal Disease Management',
      description: 'Evidence-based periodontal treatment protocols',
      date: '20 Sept 2025',
      hours: 4,
      category: 'Clinical',
      type: 'Platform Course',
      status: 'Verified',
      files: 1
    },
    {
      id: 10,
      title: 'Dental Photography Workshop',
      description: 'Clinical photography techniques for documentation',
      date: '08 Sept 2025',
      hours: 5,
      category: 'Clinical',
      type: 'External',
      status: 'Verified',
      files: 2
    }
  ];

  const categoryBreakdown = [
    { name: 'Clinical', hours: 30 },
    { name: 'Management & Leadership', hours: 5 },
    { name: 'Communication', hours: 1.5 },
    { name: 'Professionalism', hours: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="w-10 h-10 bg-purple-500 hover:bg-purple-400 rounded-lg flex items-center justify-center transition-colors">
                  <ArrowLeft className="text-white" size={20} />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">CPD Records Log</h2>
                  <p className="text-purple-100">View and manage all your CPD activities</p>
                </div>
              </div>
            <div className="flex space-x-3">
              <button className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-medium transition-colors">
                View All Records
              </button>
              <button className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-medium transition-colors">
                + Log External CPD
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <StatCard
            icon={<FileText className="text-purple-600" size={32} />}
            label="Total Records"
            value="10"
          />
          <StatCard
            icon={<Clock className="text-purple-600" size={32} />}
            label="Total Hours"
            value="38.5"
          />
          <StatCard
            icon={<CheckCircle className="text-green-600" size={32} />}
            label="Verified Hours"
            value="14.5"
          />
          <StatCard
            icon={<FileText className="text-purple-600" size={32} />}
            label="With Evidence"
            value="10"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="text-purple-600" size={20} />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>All Categories</option>
                  <option>Clinical</option>
                  <option>Management & Leadership</option>
                  <option>Communication</option>
                  <option>Professionalism</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>All Types</option>
                  <option>Platform Course</option>
                  <option>External</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>All Years</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>

              <button className="w-full px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                Clear Filters
              </button>

              {/* Hours by Category */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Hours by Category</h4>
                <div className="space-y-3">
                  {categoryBreakdown.map((cat, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{cat.name}</span>
                        <span className="font-semibold text-gray-900">{cat.hours}h</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${(cat.hours / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-purple-700">All CPD Activities</h3>
                <p className="text-sm text-gray-600">Showing {activities.length} records</p>
              </div>

              {/* Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{activity.title}</div>
                            <div className="text-xs text-gray-600 mt-1">{activity.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{activity.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1 text-sm text-gray-700">
                            <Clock size={16} className="text-gray-400" />
                            <span>{activity.hours}h</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{activity.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.type === 'Platform Course'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {activity.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-sm text-gray-700">{activity.files} file</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye size={18} className="text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </main>
      
      <Footer />
      
    </div>
  );
}

function NavLink({ label, active = false }: { label: string; active?: boolean }): React.ReactElement {
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

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }): React.ReactElement {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <p className="text-3xl font-bold text-purple-600">{value}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}