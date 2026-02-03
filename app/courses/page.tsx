"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CourseFilters } from "@/components/courses/course-filters"
import { OngoingCourses } from "@/components/courses/ongoing-courses"
import { CourseGrid } from "@/components/courses/course-grid"
import { Search } from "lucide-react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <CourseFilters onFiltersChange={handleFiltersChange} />
        
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-14 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>

        <OngoingCourses />
        <CourseGrid activeFilters={activeFilters} searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  )
}
