"use client"

import { Clock, FileText, LayoutGrid } from "lucide-react"
import { useRouter } from "next/navigation"

const courses = [
  {
    id: 1,
    title: "Medical Emergencies in Dental Practice",
    duration: "2h",
    lessons: 8,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Radiography & Radiation Protection",
    duration: "3h",
    lessons: 12,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Dental Implants Basics",
    duration: "4h",
    lessons: 15,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Oral Surgery Techniques",
    duration: "2.5h",
    lessons: 10,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
  },
  {
    id: 5,
    title: "Pediatric Dentistry",
    duration: "3h",
    lessons: 11,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 6,
    title: "Orthodontic Treatment",
    duration: "5h",
    lessons: 20,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 7,
    title: "Endodontic Procedures",
    duration: "3.5h",
    lessons: 14,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 8,
    title: "Periodontal Therapy",
    duration: "2h",
    lessons: 9,
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&h=200&fit=crop&crop=center",
  },
]

export function CourseGrid({ activeFilters, searchQuery }: { 
  activeFilters: Record<string, string[]>
  searchQuery: string 
}) {
  const router = useRouter()

  const handleViewCourse = (courseId: number) => {
    router.push('/course-detail')
  }

  // Filter courses based on active filters and search query
  const filteredCourses = courses.filter(course => {
    // Search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Apply other filters (for demo, we'll just return all courses)
    // In a real app, you'd filter based on course properties
    return true
  })

  return (
    <section>
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <span className="text-primary">08</span>{" "}
        <span className="text-muted-foreground">Courses</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="relative h-28 sm:h-32">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-2.5 sm:p-3">
              <h3 className="font-medium text-foreground text-xs sm:text-sm mb-2 line-clamp-2">
                {course.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground mb-2 sm:mb-3">
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {course.lessons} lessons
                </span>
              </div>
              <button 
                onClick={() => handleViewCourse(course.id)}
                className="w-full py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
