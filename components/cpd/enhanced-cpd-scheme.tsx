"use client"

import { useState } from "react"
import { Award, Clock, CheckCircle, TrendingUp, Calendar } from "lucide-react"

const years = [
  { year: 1, period: "Jan 2023 - Dec 2023", hours: 20, completed: 20, status: "completed" },
  { year: 2, period: "Jan 2024 - Dec 2024", hours: 20, completed: 8, status: "in-progress" },
  { year: 3, period: "Jan 2025 - Dec 2025", hours: 20, completed: 0, status: "upcoming" },
  { year: 4, period: "Jan 2026 - Dec 2026", hours: 20, completed: 0, status: "upcoming" },
  { year: 5, period: "Jan 2027 - Dec 2027", hours: 20, completed: 0, status: "upcoming" },
]

export function EnhancedCPDScheme() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const getYearColor = (status: string) => {
    switch (status) {
      case "completed": return "from-green-500 to-emerald-600"
      case "in-progress": return "from-blue-500 to-indigo-600"
      case "upcoming": return "from-gray-400 to-gray-500"
      default: return "from-gray-400 to-gray-500"
    }
  }

  const getYearBgColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
      case "in-progress": return "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
      case "upcoming": return "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
      default: return "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
    }
  }

  const totalHours = years.reduce((sum, year) => sum + year.completed, 0)
  const totalRequired = years.reduce((sum, year) => sum + year.hours, 0)
  const overallProgress = (totalHours / totalRequired) * 100

  return (
    <section className="mb-8">
      {/* Header with Stats */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-primary">Enhanced CPD</span>{" "}
            <span className="text-muted-foreground">Scheme</span>
          </h2>
          <p className="text-muted-foreground">Track your 5-year CPD development cycle</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              Total Hours
            </div>
            <p className="text-2xl font-bold text-primary">{totalHours}/{totalRequired}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              Progress
            </div>
            <p className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</p>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Overall 5-Year Progress</span>
          <span>{totalHours} of {totalRequired} hours completed</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Year Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {years.map((yearData) => {
          const percentage = (yearData.completed / yearData.hours) * 100
          const circumference = 2 * Math.PI * 45
          const strokeDashoffset = circumference - (percentage / 100) * circumference
          const isSelected = selectedYear === yearData.year
          
          return (
            <div
              key={yearData.year}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                getYearBgColor(yearData.status)
              } ${
                isSelected ? "ring-4 ring-primary/20 shadow-lg scale-105" : "hover:shadow-md hover:scale-102"
              }`}
              onClick={() => setSelectedYear(selectedYear === yearData.year ? null : yearData.year)}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {yearData.status === "completed" && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
                {yearData.status === "in-progress" && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                )}
              </div>

              {/* Year Info */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg mb-1">Year {yearData.year}</h3>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {yearData.period}
                </div>
              </div>
              
              {/* Progress Circle */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-gray-200"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="45"
                    fill="none"
                    stroke="url(#gradient-${yearData.year})"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id={`gradient-${yearData.year}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={yearData.status === "completed" ? "#10b981" : yearData.status === "in-progress" ? "#3b82f6" : "#9ca3af"} />
                      <stop offset="100%" stopColor={yearData.status === "completed" ? "#059669" : yearData.status === "in-progress" ? "#6366f1" : "#6b7280"} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">
                    {yearData.completed}
                  </span>
                  <span className="text-xs text-muted-foreground">/ {yearData.hours}h</span>
                </div>
              </div>
              
              {/* Status Text */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  yearData.status === "completed" ? "bg-green-100 text-green-700" :
                  yearData.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {yearData.status === "completed" && <CheckCircle className="h-3 w-3" />}
                  {yearData.status === "in-progress" && <Clock className="h-3 w-3" />}
                  {yearData.status === "completed" ? "Completed" : 
                   yearData.status === "in-progress" ? "In Progress" : "Upcoming"}
                </div>
                <p className="text-xs text-muted-foreground mt-2">All Verifiable</p>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-xl shadow-lg border z-10">
                  <h4 className="font-semibold mb-2">Year {yearData.year} Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Required Hours:</span>
                      <span className="font-medium">{yearData.hours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{yearData.completed}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="font-medium">{yearData.hours - yearData.completed}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">{Math.round(percentage)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Highly Recommended Section */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-10 rounded-2xl p-6 border border-primary/20">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Highly Recommended
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium mb-2">Core Clinical Skills</h4>
            <p className="text-sm text-muted-foreground">Focus on essential dental procedures and patient care</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium mb-2">Professional Development</h4>
            <p className="text-sm text-muted-foreground">Enhance your practice management and communication skills</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium mb-2">Latest Technologies</h4>
            <p className="text-sm text-muted-foreground">Stay updated with modern dental equipment and techniques</p>
          </div>
        </div>
      </div>
    </section>
  )
}
