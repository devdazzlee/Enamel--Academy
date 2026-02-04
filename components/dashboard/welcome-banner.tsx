"use client"

import { useApp } from "@/lib/app-context"

export function WelcomeBanner() {
  const { user, inProgressCourses, savedCourses, completedCourses } = useApp()
  
  const stats = [
    { value: String(inProgressCourses.length), label: "In-progress Courses" },
    { value: String(savedCourses.length), label: "Saved Courses" },
    { value: String(completedCourses.length), label: "Completed Courses" },
  ]

  return (
    <div className="bg-gradient-to-r from-[#8b5cf6] via-[#8b5cf6] to-[#a855f7] rounded-2xl p-4 sm:p-6 mb-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="text-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user.title} {user.firstName}!</h1>
          <p className="text-white/80 text-sm sm:text-base">
            Explore new courses and complete your on-going courses.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 sm:px-6 sm:py-4 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs sm:text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
