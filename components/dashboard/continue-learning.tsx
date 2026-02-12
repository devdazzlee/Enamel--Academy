"use client"

import { Play } from "lucide-react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/app-context"

export function ContinueLearning() {
  const router = useRouter()
  const { inProgressCourses, resumeCourse } = useApp()

  const handleResume = (courseId: string) => {
    router.push(`/course/${courseId}`)
  }

  if (inProgressCourses.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          <span className="text-[#8b5cf6]">Continue</span>{" "}
          <span className="text-[#6b7280]">Learning</span>
        </h2>
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 text-center">
          <p className="text-[#6b7280]">No courses in progress. Start a course to see it here!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-[#8b5cf6]">Continue</span>{" "}
        <span className="text-[#6b7280]">Learning</span>
      </h2>
      <div className="space-y-4">
        {inProgressCourses.slice(0, 2).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-[#e5e7eb] p-3 sm:p-4 flex flex-col md:flex-row gap-4"
          >
            <div className="relative w-full h-32 md:h-48 md:w-48 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs border border-[#e5e7eb] rounded-md mb-2">
                    {course.level}
                  </span>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1 text-sm sm:text-base">{course.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6b7280]">by {course.instructor}</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                  <span className="text-[#6b7280]">Progress</span>
                  <span className="text-[#1a1a1a]">{course.progress}%</span>
                </div>
                <div className="h-2 bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-[#6b7280] mt-1">
                  {Math.round((course.progress / 100) * course.lessons)} of {course.lessons} lessons completed
                </p>
              </div>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-2 sm:mt-3">
                Next: Module {Math.ceil((course.progress / 100) * 5) + 1}
              </p>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => handleResume(course.id)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#8b5cf6] flex items-center justify-center text-white hover:bg-[#7c3aed] transition-colors"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
