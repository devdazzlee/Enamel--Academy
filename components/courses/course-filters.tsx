"use client"

import { useState } from "react"
import { ChevronDown, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const filterOptions = {
  "Suggested For": [
    "Cleaner", "Clinical Dental Technician", "Decontamination Lead", "Dental Hygienist",
    "Dental Nurse", "Dental Technician", "Dental Therapist", "Dentist",
    "Infection Control Lead", "Orthodontic Therapist", "Practice Manager", "Receptionist",
    "Regulator", "Support Staff", "Trainee Dental Nurse", "Trainee Dentist", "Treatment Co-Ordinator"
  ],
  "Plan": ["Essentials", "Pro"],
  "Status": ["Not started", "Continue Learning", "Complete", "Bookmarked", "Purchased"],
  "Category": [
    "Anaesthesia & Pain Control", "Anxiety & Sedation", "Digital Dentistry", "Endodontics",
    "Facial Aesthetics", "Implants", "Oral & Maxillofacial Surgery", "Oral Medicine & Oral Pathology",
    "Orthodontics", "Paedodontics", "Periodontics", "Prescription Medication Management",
    "Prosthodontics", "Restorative", "Sleep Apnoea & Appliance Therapy", "Smoking Cessation",
    "Special Patient Care", "Sustainable Dentistry", "Clinical Governance", "Complaints Handling",
    "COVID-19", "CQC", "Disinfection & Decontamination", "Equality, Diversity & Inclusion",
    "First Aid", "Health & Safety", "Legal & Ethical", "Medical Emergencies",
    "Oral Cancer: Early Detection", "Personal Development", "Practice Management",
    "Radiography & Radiation Protection", "Safeguarding", "Staff & HR", "Staff Development"
  ],
  "Format": [
    "Article", "Audio", "Blended Learning", "Book", "Clinical", "Conference", "Course", "e-Learning", 
    "Event", "Hands On", "ILM", "Journal", "Live", "Live Webinar", "Online", "On-demand", "On-demand Webinar",
    "Podcast", "Practical", "Recorded Webinar", "Seminar", "Theatre", "Video", "Virtual", "Webinar", "Workshop"
  ],
  "Length": [
    "0-15 mins", "15-30 mins", "30-60 mins", "1-2 hours", "2-3 hours", "3-4 hours", "4+ hours"
  ],
  "Grouping": [
    "Alphabetical", "Newest First", "Oldest First", "Most Popular", "Highest Rated", "Lowest Price", "Highest Price"
  ]
}

export function CourseFilters({ onFiltersChange }: { onFiltersChange: (filters: Record<string, string[]>) => void }) {
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter)
  }

  const toggleOption = (filter: string, option: string) => {
    const newFilters = setSelectedFilters((prev) => {
      const current = prev[filter] || []
      if (current.includes(option)) {
        const updated = { ...prev, [filter]: current.filter((o) => o !== option) }
        onFiltersChange(updated)
        return updated
      }
      const updated = { ...prev, [filter]: [...current, option] }
      onFiltersChange(updated)
      return updated
    })
    return newFilters
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    onFiltersChange({})
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((total, filterArray) => total + filterArray.length, 0)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-primary font-medium">Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {Object.keys(filterOptions).map((filter) => (
          <div key={filter} className="relative">
            <button
              onClick={() => toggleFilter(filter)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border rounded-xl text-sm transition-colors",
                openFilter === filter
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              <span>{filter}</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openFilter === filter && "rotate-180"
              )} />
            </button>
            
            {openFilter === filter && filterOptions[filter as keyof typeof filterOptions].length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg z-50 p-4 max-h-80 overflow-y-auto">
                <p className="font-semibold text-foreground mb-3">Select</p>
                <div className="space-y-2">
                  {filterOptions[filter as keyof typeof filterOptions].map((option) => (
                    <label key={option} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(selectedFilters[filter] || []).includes(option)}
                          onChange={() => toggleOption(filter, option)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          {option}
                        </span>
                      </div>
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        62
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
