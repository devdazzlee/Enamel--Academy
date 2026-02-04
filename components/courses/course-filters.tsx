"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (filter: string, value: string) => {
    const newFilters = { ...selectedFilters }
    if (!newFilters[filter]) {
      newFilters[filter] = []
    }
    
    const currentValues = newFilters[filter]
    if (currentValues.includes(value)) {
      newFilters[filter] = currentValues.filter(v => v !== value)
    } else {
      newFilters[filter] = [...currentValues, value]
    }
    
    setSelectedFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    onFiltersChange({})
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((total, filterArray) => total + filterArray.length, 0)
  }

  const getFilterDisplayValue = (filter: string) => {
    const values = selectedFilters[filter] || []
    if (values.length === 0) return filter
    if (values.length === 1) return values[0]
    return `${values.length} selected`
  }

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-primary font-medium text-sm sm:text-base">Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {Object.keys(filterOptions).map((filter) => (
          <div key={filter}>
            <Select
              value={selectedFilters[filter]?.[0] || ""}
              onValueChange={(value) => handleFilterChange(filter, value)}
            >
              <SelectTrigger className="w-full bg-white border border-gray-200">
                <SelectValue placeholder={filter} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 max-h-60">
                {filterOptions[filter as keyof typeof filterOptions].map((option) => (
                  <SelectItem key={option} value={option}>
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{option}</span>
                      <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                        62
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  )
}
