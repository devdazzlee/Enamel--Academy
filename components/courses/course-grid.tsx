import { Clock, FileText, LayoutGrid } from "lucide-react"

const courses = Array(8).fill({
  id: 1,
  title: "Medical Emergencies in Dental Practice",
  duration: "2h",
  lessons: 8,
})

export function CourseGrid() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <LayoutGrid className="h-5 w-5 text-primary" />
        <span className="text-primary">08</span>{" "}
        <span className="text-muted-foreground">Courses</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="h-32 bg-muted" />
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2">
                {course.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {course.lessons} lessons
                </span>
              </div>
              <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Resume Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
