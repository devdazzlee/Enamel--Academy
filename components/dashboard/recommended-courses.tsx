import Image from "next/image"
import { Clock, FileText } from "lucide-react"

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
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-primary">Recommended</span>{" "}
        <span className="text-muted-foreground">Courses</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="relative h-48">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
                Suggested
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {course.lessons} lessons
                </span>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
