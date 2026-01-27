"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Search, ChevronDown, Download, Calendar, Clock, Award, Filter, FileText, Eye } from "lucide-react"

const columnFilters = [
  { label: "Date", active: true },
  { label: "Format", active: true },
  { label: "Status", active: true },
  { label: "Time Taken", active: false },
  { label: "Title", active: false },
  { label: "Type", active: false },
  { label: "Categories", active: false },
]

const certificatesData = [
  {
    id: "CERT-001",
    title: "Medical Emergencies in Dental Practice",
    category: "Clinical",
    type: "Core CPD",
    date: "2025-01-15",
    completionDate: "2025-01-15",
    timeTaken: "2h 30m",
    cpdHours: 2.5,
    status: "Completed",
    format: "Online",
    certificateUrl: "#",
    score: 95,
    instructor: "Dr. James Carter"
  },
  {
    id: "CERT-002", 
    title: "Radiography & Radiation Protection",
    category: "Clinical",
    type: "Core CPD",
    date: "2025-01-10",
    completionDate: "2025-01-10",
    timeTaken: "3h 15m",
    cpdHours: 3.25,
    status: "Completed",
    format: "Online",
    certificateUrl: "#",
    score: 88,
    instructor: "Dr. Emily Roberts"
  },
  {
    id: "CERT-003",
    title: "Infection Control in Dental Practice",
    category: "Compliance",
    type: "Mandatory",
    date: "2025-01-08",
    completionDate: "2025-01-08",
    timeTaken: "1h 45m",
    cpdHours: 1.75,
    status: "Completed",
    format: "Online",
    certificateUrl: "#",
    score: 92,
    instructor: "Dr. Sarah Johnson"
  },
  {
    id: "CERT-004",
    title: "Dental Materials and Selection",
    category: "Clinical",
    type: "Core CPD",
    date: "2025-01-05",
    completionDate: "2025-01-05",
    timeTaken: "2h 00m",
    cpdHours: 2.0,
    status: "Completed",
    format: "Workshop",
    certificateUrl: "#",
    score: 85,
    instructor: "Dr. Michael Chen"
  },
  {
    id: "CERT-005",
    title: "Professional Ethics and Dental Practice",
    category: "Professional Development",
    type: "Core CPD",
    date: "2024-12-28",
    completionDate: "2024-12-28",
    timeTaken: "1h 30m",
    cpdHours: 1.5,
    status: "Completed",
    format: "Online",
    certificateUrl: "#",
    score: 90,
    instructor: "Dr. Lisa Anderson"
  },
  {
    id: "CERT-006",
    title: "Advanced Restorative Techniques",
    category: "Clinical",
    type: "Advanced",
    date: "2024-12-20",
    completionDate: "2024-12-20",
    timeTaken: "4h 00m",
    cpdHours: 4.0,
    status: "Completed",
    format: "Hands-on",
    certificateUrl: "#",
    score: 93,
    instructor: "Dr. Robert Williams"
  },
  {
    id: "CERT-007",
    title: "Patient Communication Skills",
    category: "Professional Development",
    type: "Core CPD",
    date: "2024-12-15",
    completionDate: "2024-12-15",
    timeTaken: "2h 00m",
    cpdHours: 2.0,
    status: "Completed",
    format: "Online",
    certificateUrl: "#",
    score: 87,
    instructor: "Dr. Jennifer Davis"
  },
  {
    id: "CERT-008",
    title: "Dental Practice Management",
    category: "Professional Development",
    type: "Business",
    date: "2024-12-10",
    completionDate: "2024-12-10",
    timeTaken: "3h 30m",
    cpdHours: 3.5,
    status: "Completed",
    format: "Online",
    certificateUrl: "#",
    score: 89,
    instructor: "Dr. Mark Thompson"
  }
]

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [activeFilters, setActiveFilters] = useState(columnFilters)
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const toggleFilter = (label: string) => {
    setActiveFilters(prev => 
      prev.map(filter => 
        filter.label === label 
          ? { ...filter, active: !filter.active }
          : filter
      )
    )
  }

  const filteredAndSortedData = certificatesData
    .filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || cert.category.toLowerCase() === selectedCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let compareValue = 0
      switch (sortBy) {
        case "date":
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "title":
          compareValue = a.title.localeCompare(b.title)
          break
        case "cpdHours":
          compareValue = a.cpdHours - b.cpdHours
          break
        case "score":
          compareValue = a.score - b.score
          break
        default:
          compareValue = 0
      }
      return sortOrder === "asc" ? compareValue : -compareValue
    })

  const totalCpdHours = certificatesData.reduce((sum, cert) => sum + cert.cpdHours, 0)
  const completedCourses = certificatesData.length
  const averageScore = Math.round(certificatesData.reduce((sum, cert) => sum + cert.score, 0) / certificatesData.length)

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handleExport = () => {
    alert("Export functionality would download Excel file with certificate data")
  }

  const handleViewCertificate = (certId: string) => {
    alert(`Viewing certificate ${certId} - would open certificate preview`)
  }

  const handleDownloadCertificate = (certId: string, title: string) => {
    alert(`Downloading certificate: ${title}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#e8e8e8]">
      <Navigation activeItem="CPD Certificates" />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-semibold text-white">Training and Certificates</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-white" />
                <div>
                  <p className="text-white/80 text-sm">Total CPD Hours</p>
                  <p className="text-2xl font-bold text-white">{totalCpdHours.toFixed(1)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-white" />
                <div>
                  <p className="text-white/80 text-sm">Completed Courses</p>
                  <p className="text-2xl font-bold text-white">{completedCourses}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-white" />
                <div>
                  <p className="text-white/80 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">{averageScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-6 mb-6">
          {/* Sidebar Filters */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
              <h2 className="text-[#8b5cf6] font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h2>
              <div>
                <label className="text-sm text-[#6b7280] mb-2 block">Categories</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f5f5f5] border-0 rounded-lg text-sm text-[#9ca3af] appearance-none focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20"
                  >
                    <option value="">All Categories</option>
                    <option value="clinical">Clinical</option>
                    <option value="compliance">Compliance</option>
                    <option value="professional">Professional Development</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af] pointer-events-none" />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm text-[#6b7280] mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f5f5f5] border-0 rounded-lg text-sm text-[#9ca3af] appearance-none focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20"
                >
                  <option value="date">Date</option>
                  <option value="title">Title</option>
                  <option value="cpdHours">CPD Hours</option>
                  <option value="score">Score</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Export */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search certificates by title, instructor, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-14 bg-white border border-[#e5e7eb] rounded-xl text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8b5cf6] rounded-lg flex items-center justify-center text-white hover:bg-[#7c3aed] transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
              <button 
                onClick={handleExport}
                className="px-6 py-2.5 bg-[#8b5cf6] text-white rounded-lg text-sm font-medium hover:bg-[#7c3aed] transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export to Excel
              </button>
            </div>

            {/* Column Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {activeFilters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => toggleFilter(filter.label)}
                  className={`px-5 py-2.5 text-sm rounded-full border transition-colors ${
                    filter.active
                      ? "border-[#8b5cf6] bg-white text-[#1a1a1a] shadow-sm"
                      : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#8b5cf6]/50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results Summary */}
            <div className="mb-4 text-sm text-[#6b7280]">
              Showing {filteredAndSortedData.length} of {certificatesData.length} certificates
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5ff] border-b border-[#e5e7eb]">
                <tr>
                  {activeFilters.filter(f => f.active).map((filter) => (
                    <th 
                      key={filter.label}
                      className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider cursor-pointer hover:bg-[#f0ebff] transition-colors"
                      onClick={() => {
                        if (filter.label === "Date") handleSort("date")
                        if (filter.label === "Title") handleSort("title")
                        if (filter.label === "Time Taken") handleSort("cpdHours")
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {filter.label}
                        {(filter.label === "Date" || filter.label === "Title" || filter.label === "Time Taken") && (
                          <span className="text-[#8b5cf6]">
                            {sortBy === (filter.label === "Time Taken" ? "cpdHours" : filter.label.toLowerCase()) && 
                             (sortOrder === "asc" ? "↑" : "↓")
                            }
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {filteredAndSortedData.map((certificate) => (
                  <tr key={certificate.id} className="hover:bg-[#f9f5ff] transition-colors">
                    {activeFilters.filter(f => f.active).map((filter) => (
                      <td key={filter.label} className="px-6 py-4 whitespace-nowrap">
                        {filter.label === "Date" && (
                          <div>
                            <div className="text-sm font-medium text-[#1a1a1a]">
                              {new Date(certificate.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-[#6b7280]">
                              Completed: {new Date(certificate.completionDate).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                        {filter.label === "Title" && (
                          <div>
                            <div className="text-sm font-medium text-[#1a1a1a]">{certificate.title}</div>
                            <div className="text-xs text-[#6b7280]">ID: {certificate.id}</div>
                            <div className="text-xs text-[#6b7280]">Instructor: {certificate.instructor}</div>
                          </div>
                        )}
                        {filter.label === "Format" && (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            certificate.format === "Online" ? "bg-blue-100 text-blue-700" :
                            certificate.format === "Workshop" ? "bg-green-100 text-green-700" :
                            certificate.format === "Hands-on" ? "bg-purple-100 text-purple-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {certificate.format}
                          </span>
                        )}
                        {filter.label === "Status" && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            {certificate.status}
                          </span>
                        )}
                        {filter.label === "Time Taken" && (
                          <div className="text-sm text-[#1a1a1a]">{certificate.timeTaken}</div>
                        )}
                        {filter.label === "Type" && (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            certificate.type === "Core CPD" ? "bg-[#8b5cf6]/10 text-[#8b5cf6]" :
                            certificate.type === "Mandatory" ? "bg-red-100 text-red-700" :
                            certificate.type === "Advanced" ? "bg-orange-100 text-orange-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {certificate.type}
                          </span>
                        )}
                        {filter.label === "Categories" && (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            certificate.category === "Clinical" ? "bg-blue-100 text-blue-700" :
                            certificate.category === "Compliance" ? "bg-red-100 text-red-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {certificate.category}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewCertificate(certificate.id)}
                          className="p-2 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-lg transition-colors"
                          title="View Certificate"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadCertificate(certificate.id, certificate.title)}
                          className="p-2 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-lg transition-colors"
                          title="Download Certificate"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
              <p className="text-[#9ca3af] text-lg">No certificates found</p>
              <p className="text-[#9ca3af] text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
