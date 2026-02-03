"use client"

import Image from "next/image"
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
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <span className="text-primary">Complete Your</span>{" "}
        <span className="text-muted-foreground">On-Going Courses</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ongoingCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="relative h-40">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-3">{course.title}</h3>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{course.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <button 
                onClick={() => handleResumeCourse(course.id)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
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
