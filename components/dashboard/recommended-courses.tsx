"use client"

import { Clock, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const recommendedCourses = [
  {
    id: 1,
    title: "Medical Emergencies in Dental Practice",
    instructor: "Dr. James Carter",
    duration: "2h",
    lessons: 8,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Radiography & Radiation Protection",
    instructor: "Dr. Emily Roberts",
    duration: "3h",
    lessons: 12,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop",
  },
]

export function RecommendedCourses() {
  const router = useRouter()

  const handleStartCourse = (courseId: number) => {
    router.push('/course-detail')
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-primary">Recommended</span>{" "}
        <span className="text-muted-foreground">Courses</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {recommendedCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="relative h-40 sm:h-48">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
                Suggested
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{course.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">by {course.instructor}</p>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  {course.lessons} lessons
                </span>
              </div>
              <button 
                onClick={() => handleStartCourse(course.id)}
                className="w-full py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
              >
                Start Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
