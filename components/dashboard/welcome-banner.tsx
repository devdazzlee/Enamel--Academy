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
    <div className="bg-gradient-to-r from-[#8b5cf6] via-[#8b5cf6] to-[#a855f7] rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="text-white">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user.title} {user.firstName}!</h1>
          <p className="text-white/80">
            Explore new courses and complete your on-going courses.
          </p>
        </div>
        <div className="flex gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center min-w-[140px]"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
