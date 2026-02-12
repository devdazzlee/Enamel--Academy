"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

// Types
export interface Course {
  id: string
  title: string
  instructor: string
  duration: string
  lessons: number
  progress: number
  image: string
  category: string
  level: string
  status: "not_started" | "in_progress" | "completed"
  isSaved: boolean
}

export interface PDPPlan {
  id: string
  year: number
  status: "not_started" | "in_progress" | "completed"
  progress: number
  startDate: string
  endDate: string
  lastUpdated: string
  sections: PDPSection[]
}

export interface PDPSection {
  id: string
  step: number
  title: string
  description: string
  status: "not_started" | "in_progress" | "completed"
  content?: string
}

export interface Certificate {
  id: string
  title: string
  date: string
  format: string
  status: string
  timeTaken: string
  type: string
  category: string
}

export interface CPDEntry {
  year: number
  hours: number
  maxHours: number
  isVerifiable: boolean
}

export interface UserProfile {
  title: string
  firstName: string
  lastName: string
  email: string
  phone: string
  jobRoles: string[]
  gdcNumber: string
  cpdCycleStartYear: number
  memberSince: string
  membershipType: string
  membershipStatus: string
}

interface AppState {
  user: UserProfile
  courses: Course[]
  pdpPlans: PDPPlan[]
  certificates: Certificate[]
  cpdEntries: CPDEntry[]
  searchQuery: string
  filters: {
    category: string
    status: string
    plan: string
    suggestedFor: string
    format: string
    length: string
    grouping: string
  }
}

interface AppContextType extends AppState {
  // User actions
  updateProfile: (profile: Partial<UserProfile>) => void
  addJobRole: (role: string) => void
  removeJobRole: (role: string) => void
  
  // Course actions
  startCourse: (courseId: string) => void
  resumeCourse: (courseId: string) => void
  completeCourse: (courseId: string) => void
  toggleSaveCourse: (courseId: string) => void
  updateCourseProgress: (courseId: string, progress: number) => void
  
  // PDP actions
  createPDP: (year: number) => void
  updatePDPSection: (planId: string, sectionId: string, status: PDPSection["status"]) => void
  
  // Filter actions
  setSearchQuery: (query: string) => void
  setFilter: (key: keyof AppState["filters"], value: string) => void
  resetFilters: () => void
  
  // Certificate actions
  exportCertificates: () => void
  
  // Computed values
  inProgressCourses: Course[]
  completedCourses: Course[]
  savedCourses: Course[]
  filteredCourses: Course[]
}

const defaultFilters = {
  category: "",
  status: "",
  plan: "",
  suggestedFor: "",
  format: "",
  length: "",
  grouping: "",
}

const defaultUser: UserProfile = {
  title: "Dr.",
  firstName: "Jane",
  lastName: "Elis",
  email: "metaxoft5@gmail.com",
  phone: "+44 (0)330 165 9711",
  jobRoles: ["Clinical Dental Technician", "Dental Hygienist"],
  gdcNumber: "80978",
  cpdCycleStartYear: 2025,
  memberSince: "13/01/2026",
  membershipType: "Pay As You Go / Free - Tier",
  membershipStatus: "N/A",
}

const defaultCourses: Course[] = [
  {
    id: "1",
    title: "Advanced Aesthetic Dentistry",
    instructor: "Dr. Sarah Mitchell",
    duration: "2h",
    lessons: 20,
    progress: 45,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=200&fit=crop",
    category: "Aesthetic Dentistry",
    level: "Advanced",
    status: "in_progress",
    isSaved: false,
  },
  {
    id: "2",
    title: "Saveguarding Level 2 (Part 3): Practice Responsibilities & Procedures for safeguarding",
    instructor: "Dr. Sarah Mitchell",
    duration: "3h",
    lessons: 20,
    progress: 45,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=200&fit=crop",
    category: "Safeguarding",
    level: "Advanced",
    status: "in_progress",
    isSaved: false,
  },
  {
    id: "3",
    title: "Medical Emergencies in Dental Practice",
    instructor: "Dr. James Carter",
    duration: "2h",
    lessons: 8,
    progress: 0,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "Medical Emergencies",
    level: "Intermediate",
    status: "not_started",
    isSaved: false,
  },
  {
    id: "4",
    title: "Radiography & Radiation Protection",
    instructor: "Dr. Emily Roberts",
    duration: "3h",
    lessons: 12,
    progress: 45,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
    category: "Radiography",
    level: "Intermediate",
    status: "in_progress",
    isSaved: true,
  },
  {
    id: "5",
    title: "Digital Dentistry Fundamentals",
    instructor: "Dr. Michael Chen",
    duration: "4h",
    lessons: 15,
    progress: 0,
    image: "https://images.unsplash.com/photo-1582719471388-4dcefb7d0fd8?w=400&h=200&fit=crop",
    category: "Digital Dentistry",
    level: "Beginner",
    status: "not_started",
    isSaved: false,
  },
  {
    id: "6",
    title: "Infection Control Best Practices",
    instructor: "Dr. Lisa Thompson",
    duration: "2h",
    lessons: 10,
    progress: 100,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea19dce8?w=400&h=200&fit=crop",
    category: "Infection Control",
    level: "Essential",
    status: "completed",
    isSaved: false,
  },
  {
    id: "7",
    title: "Patient Communication Skills",
    instructor: "Dr. Amanda White",
    duration: "1.5h",
    lessons: 6,
    progress: 0,
    image: "https://images.unsplash.com/photo-1601225184983-7da4b9d1a7a2?w=400&h=200&fit=crop",
    category: "Professional Development",
    level: "Beginner",
    status: "not_started",
    isSaved: false,
  },
  {
    id: "8",
    title: "Dental Anxiety Management",
    instructor: "Dr. Robert Brown",
    duration: "2h",
    lessons: 8,
    progress: 0,
    image: "https://images.unsplash.com/photo-1611689384274-2a4c6b9b8b5c?w=400&h=200&fit=crop",
    category: "Anxiety & Sedation",
    level: "Intermediate",
    status: "not_started",
    isSaved: false,
  },
]

const defaultPDPPlans: PDPPlan[] = [
  {
    id: "2025",
    year: 2025,
    status: "in_progress",
    progress: 35,
    startDate: "January 1, 2025",
    endDate: "December 31, 2025",
    lastUpdated: "January 15, 2025",
    sections: [
      { id: "1", step: 1, title: "Career Objectives", description: "Define your professional goals and career aspirations", status: "completed" },
      { id: "2", step: 2, title: "Skills Assessment", description: "Identify current skills and areas for development", status: "completed" },
      { id: "3", step: 3, title: "Learning Plan", description: "Select courses and learning activities to achieve your goals", status: "in_progress" },
      { id: "4", step: 4, title: "Timeline & Milestones", description: "Set deadlines and track your progress", status: "in_progress" },
      { id: "5", step: 5, title: "Review & Reflection", description: "Evaluate your progress and adjust your plan", status: "not_started" },
    ],
  },
  {
    id: "2024",
    year: 2024,
    status: "completed",
    progress: 100,
    startDate: "January 1, 2024",
    endDate: "December 31, 2024",
    lastUpdated: "December 15, 2024",
    sections: [
      { id: "1", step: 1, title: "Career Objectives", description: "Define your professional goals and career aspirations", status: "completed" },
      { id: "2", step: 2, title: "Skills Assessment", description: "Identify current skills and areas for development", status: "completed" },
      { id: "3", step: 3, title: "Learning Plan", description: "Select courses and learning activities to achieve your goals", status: "completed" },
      { id: "4", step: 4, title: "Timeline & Milestones", description: "Set deadlines and track your progress", status: "completed" },
      { id: "5", step: 5, title: "Review & Reflection", description: "Evaluate your progress and adjust your plan", status: "completed" },
    ],
  },
  {
    id: "2023",
    year: 2023,
    status: "completed",
    progress: 100,
    startDate: "January 1, 2023",
    endDate: "December 31, 2023",
    lastUpdated: "December 15, 2023",
    sections: [
      { id: "1", step: 1, title: "Career Objectives", description: "Define your professional goals and career aspirations", status: "completed" },
      { id: "2", step: 2, title: "Skills Assessment", description: "Identify current skills and areas for development", status: "completed" },
      { id: "3", step: 3, title: "Learning Plan", description: "Select courses and learning activities to achieve your goals", status: "completed" },
      { id: "4", step: 4, title: "Timeline & Milestones", description: "Set deadlines and track your progress", status: "completed" },
      { id: "5", step: 5, title: "Review & Reflection", description: "Evaluate your progress and adjust your plan", status: "completed" },
    ],
  },
]

const defaultCPDEntries: CPDEntry[] = [
  { year: 1, hours: 20, maxHours: 20, isVerifiable: true },
  { year: 2, hours: 8, maxHours: 20, isVerifiable: true },
  { year: 3, hours: 0, maxHours: 20, isVerifiable: true },
  { year: 4, hours: 0, maxHours: 20, isVerifiable: true },
  { year: 5, hours: 0, maxHours: 20, isVerifiable: true },
]

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser)
  const [courses, setCourses] = useState<Course[]>(defaultCourses)
  const [pdpPlans, setPDPPlans] = useState<PDPPlan[]>(defaultPDPPlans)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [cpdEntries, setCpdEntries] = useState<CPDEntry[]>(defaultCPDEntries)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState(defaultFilters)

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("enamelAcademy")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        if (parsed.user) setUser(parsed.user)
        if (parsed.courses) {
          // Merge saved courses with defaults to always use correct image URLs
          const mergedCourses = parsed.courses.map((savedCourse: Course) => {
            const defaultCourse = defaultCourses.find(dc => dc.id === savedCourse.id)
            return {
              ...savedCourse,
              image: defaultCourse?.image ?? savedCourse.image ?? "",
            }
          })
          setCourses(mergedCourses)
        }
        if (parsed.pdpPlans) setPDPPlans(parsed.pdpPlans)
        if (parsed.certificates) setCertificates(parsed.certificates)
        if (parsed.cpdEntries) setCpdEntries(parsed.cpdEntries)
      } catch (e) {
        console.error("Failed to load state from localStorage", e)
      }
    }
  }, [])

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem("enamelAcademy", JSON.stringify({
      user,
      courses,
      pdpPlans,
      certificates,
      cpdEntries,
    }))
  }, [user, courses, pdpPlans, certificates, cpdEntries])

  // User actions
  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }))
  }, [])

  const addJobRole = useCallback((role: string) => {
    setUser(prev => ({
      ...prev,
      jobRoles: [...prev.jobRoles, role],
    }))
  }, [])

  const removeJobRole = useCallback((role: string) => {
    setUser(prev => ({
      ...prev,
      jobRoles: prev.jobRoles.filter(r => r !== role),
    }))
  }, [])

  // Course actions
  const startCourse = useCallback((courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: "in_progress" as const, progress: 5 }
        : course
    ))
  }, [])

  const resumeCourse = useCallback((courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            progress: Math.min(course.progress + 10, 100),
            status: Math.min(course.progress + 10, 100) >= 100 ? "completed" : "in_progress"
          }
        : course
    ))
  }, [])

  const completeCourse = useCallback((courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: "completed" as const, progress: 100 }
        : course
    ))
    // Add certificate
    const course = courses.find(c => c.id === courseId)
    if (course) {
      setCertificates(prev => [...prev, {
        id: `cert-${Date.now()}`,
        title: course.title,
        date: new Date().toLocaleDateString(),
        format: "Online",
        status: "Completed",
        timeTaken: course.duration,
        type: "CPD",
        category: course.category,
      }])
    }
  }, [courses])

  const toggleSaveCourse = useCallback((courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isSaved: !course.isSaved }
        : course
    ))
  }, [])

  const updateCourseProgress = useCallback((courseId: string, progress: number) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            progress,
            status: progress >= 100 ? "completed" : progress > 0 ? "in_progress" : "not_started"
          }
        : course
    ))
  }, [])

  // PDP actions
  const createPDP = useCallback((year: number) => {
    const newPlan: PDPPlan = {
      id: String(year),
      year,
      status: "not_started",
      progress: 0,
      startDate: `January 1, ${year}`,
      endDate: `December 31, ${year}`,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      sections: [
        { id: "1", step: 1, title: "Career Objectives", description: "Define your professional goals and career aspirations", status: "not_started" },
        { id: "2", step: 2, title: "Skills Assessment", description: "Identify current skills and areas for development", status: "not_started" },
        { id: "3", step: 3, title: "Learning Plan", description: "Select courses and learning activities to achieve your goals", status: "not_started" },
        { id: "4", step: 4, title: "Timeline & Milestones", description: "Set deadlines and track your progress", status: "not_started" },
        { id: "5", step: 5, title: "Review & Reflection", description: "Evaluate your progress and adjust your plan", status: "not_started" },
      ],
    }
    setPDPPlans(prev => [newPlan, ...prev])
  }, [])

  const updatePDPSection = useCallback((planId: string, sectionId: string, status: PDPSection["status"]) => {
    setPDPPlans(prev => prev.map(plan => {
      if (plan.id !== planId) return plan
      const updatedSections = plan.sections.map(section => 
        section.id === sectionId ? { ...section, status } : section
      )
      const completedCount = updatedSections.filter(s => s.status === "completed").length
      const progress = Math.round((completedCount / updatedSections.length) * 100)
      return {
        ...plan,
        sections: updatedSections,
        progress,
        status: progress === 100 ? "completed" : progress > 0 ? "in_progress" : "not_started",
        lastUpdated: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      }
    }))
  }, [])

  // Filter actions
  const setFilter = useCallback((key: keyof typeof defaultFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
    setSearchQuery("")
  }, [])

  // Certificate actions
  const exportCertificates = useCallback(() => {
    const csvContent = [
      ["Title", "Date", "Format", "Status", "Time Taken", "Type", "Category"],
      ...certificates.map(cert => [cert.title, cert.date, cert.format, cert.status, cert.timeTaken, cert.type, cert.category])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "certificates.csv"
    a.click()
    URL.revokeObjectURL(url)
  }, [certificates])

  // Computed values
  const inProgressCourses = courses.filter(c => c.status === "in_progress")
  const completedCourses = courses.filter(c => c.status === "completed")
  const savedCourses = courses.filter(c => c.isSaved)

  const filteredCourses = courses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (filters.category && course.category !== filters.category) return false
    if (filters.status) {
      if (filters.status === "Not started" && course.status !== "not_started") return false
      if (filters.status === "Continue Learning" && course.status !== "in_progress") return false
      if (filters.status === "Complete" && course.status !== "completed") return false
      if (filters.status === "Bookmarked" && !course.isSaved) return false
    }
    return true
  })

  return (
    <AppContext.Provider value={{
      user,
      courses,
      pdpPlans,
      certificates,
      cpdEntries,
      searchQuery,
      filters,
      updateProfile,
      addJobRole,
      removeJobRole,
      startCourse,
      resumeCourse,
      completeCourse,
      toggleSaveCourse,
      updateCourseProgress,
      createPDP,
      updatePDPSection,
      setSearchQuery,
      setFilter,
      resetFilters,
      exportCertificates,
      inProgressCourses,
      completedCourses,
      savedCourses,
      filteredCourses,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
