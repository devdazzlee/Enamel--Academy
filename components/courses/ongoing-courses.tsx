"use client"

import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const ongoingCourses = [
  {
    id: 1,
    title: "Medical Emergencies in Dental Practice",
    progress: 45,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Radiography & Radiation Protection",
    progress: 45,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=200&fit=crop",
  },
]

export function OngoingCourses() {
  const router = useRouter()

  const handleResumeCourse = (courseId: number) => {
    router.push(`/course/${courseId}`)
  }

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <span className="text-primary">Complete Your</span>{" "}
        <span className="text-muted-foreground">On-Going Courses</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {ongoingCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="relative h-32 sm:h-40">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base line-clamp-2">
                {course.title}
              </h3>
              <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{course.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-3 sm:mb-4">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <button 
                onClick={() => handleResumeCourse(course.id)}
                className="w-full py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-xs sm:text-sm"
              >
                Resume Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
