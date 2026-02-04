"use client"

import { useState } from "react"
import { Target, TrendingUp, BookOpen, Calendar, RefreshCw, ChevronDown, ChevronUp, Check, Clock, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  {
    step: 1,
    title: "Career Objectives",
    description: "Define your professional goals and career aspirations",
    icon: Target,
    status: "Completed",
    content: {
      objectives: [
        "Become a specialist in restorative dentistry",
        "Complete advanced certification in dental implants",
        "Develop leadership skills for practice management"
      ],
      timeline: "Short-term (1-2 years)",
      notes: "Focus on clinical skills first, then practice management"
    }
  },
  {
    step: 2,
    title: "Skills Assessment",
    description: "Identify current skills and areas for development",
    icon: TrendingUp,
    status: "Completed",
    content: {
      currentSkills: [
        "General Dentistry - Expert",
        "Patient Communication - Advanced", 
        "Digital Radiography - Intermediate",
        "Practice Management - Beginner"
      ],
      areasForDevelopment: [
        "Advanced Implant Procedures",
        "Orthodontic Treatments",
        "Team Leadership"
      ],
      assessmentDate: "January 2025"
    }
  },
  {
    step: 3,
    title: "Learning Plan",
    description: "Select courses and learning activities to achieve your goals",
    icon: BookOpen,
    status: "In Progress",
    content: {
      enrolledCourses: [
        "Advanced Implantology - 65% Complete",
        "Dental Practice Management - 30% Complete"
      ],
      recommendedCourses: [
        "Orthodontic Basics for General Dentists",
        "Advanced Restorative Techniques"
      ],
      totalHours: 120,
      completedHours: 45
    }
  },
  {
    step: 4,
    title: "Timeline & Milestones",
    description: "Set deadlines and track your progress",
    icon: Calendar,
    status: "In Progress",
    highlighted: true,
    content: {
      milestones: [
        { title: "Complete Implantology Course", deadline: "March 2025", status: "on-track" },
        { title: "Attend Dental Conference", deadline: "April 2025", status: "on-track" },
        { title: "Obtain Practice Management Certification", deadline: "June 2025", status: "delayed" }
      ],
      nextDeadline: "March 31, 2025"
    }
  },
  {
    step: 5,
    title: "Review & Reflection",
    description: "Evaluate your progress and adjust your plan",
    icon: RefreshCw,
    status: "Not Started",
    content: {
      lastReview: "Not yet completed",
      nextReview: "Scheduled for April 2025",
      reflectionPoints: [
        "Progress towards career goals",
        "Effectiveness of learning plan",
        "Adjustments needed for timeline"
      ]
    }
  },
]

export function PDPSections() {
  const [expandedSections, setExpandedSections] = useState<number[]>([])

  const toggleSection = (step: number) => {
    setExpandedSections(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    )
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">PDP Sections</h2>
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon
          const isCompleted = section.status === "Completed"
          const isInProgress = section.status === "In Progress"
          const isExpanded = expandedSections.includes(section.step)
          
          return (
            <div key={section.step} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => toggleSection(section.step)}
                className={cn(
                  "w-full p-4 flex items-center gap-4 transition-colors hover:bg-muted/50",
                  section.highlighted ? "bg-primary/5 border-primary" : ""
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isCompleted ? "bg-primary/10" : "bg-muted"
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    isCompleted ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-muted-foreground">Step {section.step}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                      isCompleted ? "bg-green-100 text-green-700" :
                      isInProgress ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted && <Check className="h-3 w-3" />}
                      {isInProgress && <Clock className="h-3 w-3" />}
                      {section.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isInProgress && (
                    <button className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      <Play className="h-3 w-3" />
                    </button>
                  )}
                  <div className={cn(
                    "transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                  )}>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </button>
              
              {/* Dropdown Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border">
                  <div className="pt-4 space-y-4">
                    {section.step === 1 && (
                      <>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Career Objectives</h4>
                          <ul className="space-y-1">
                            {(section.content.objectives ?? []).map((objective, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Timeline</h4>
                            <p className="text-sm text-muted-foreground">{section.content.timeline}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Notes</h4>
                            <p className="text-sm text-muted-foreground">{section.content.notes}</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {section.step === 2 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Current Skills</h4>
                            <ul className="space-y-1">
                              {(section.content.currentSkills ?? []).map((skill, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    skill.includes("Expert") ? "bg-green-500" :
                                    skill.includes("Advanced") ? "bg-blue-500" :
                                    skill.includes("Intermediate") ? "bg-yellow-500" :
                                    "bg-gray-400"
                                  )} />
                                  <span className="text-muted-foreground">{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Areas for Development</h4>
                            <ul className="space-y-1">
                              {(section.content.areasForDevelopment ?? []).map((area, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Target className="h-3 w-3 text-primary" />
                                  {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Assessment Date</h4>
                          <p className="text-sm text-muted-foreground">{section.content.assessmentDate}</p>
                        </div>
                      </>
                    )}
                    
                    {section.step === 3 && (
                      <>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Enrolled Courses</h4>
                          <ul className="space-y-2">
                            {(section.content.enrolledCourses ?? []).map((course, index) => (
                              <li key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                                <span className="text-sm text-muted-foreground">{course}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Recommended Courses</h4>
                          <ul className="space-y-1">
                            {(section.content.recommendedCourses ?? []).map((course, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <BookOpen className="h-3 w-3 text-primary" />
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Progress</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${((section.content.completedHours ?? 0) / (section.content.totalHours ?? 1)) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {section.content.completedHours ?? 0}/{section.content.totalHours ?? 0}h
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {section.step === 4 && (
                      <>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Milestones</h4>
                          <div className="space-y-2">
                            {(section.content.milestones ?? []).map((milestone, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{milestone.title}</p>
                                  <p className="text-xs text-muted-foreground">Deadline: {milestone.deadline}</p>
                                </div>
                                <span className={cn(
                                  "text-xs px-2 py-1 rounded-full",
                                  milestone.status === "on-track" ? "bg-green-100 text-green-700" :
                                  "bg-yellow-100 text-yellow-700"
                                )}>
                                  {milestone.status === "on-track" ? "On Track" : "Delayed"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Next Deadline</h4>
                          <p className="text-sm text-muted-foreground">{section.content.nextDeadline}</p>
                        </div>
                      </>
                    )}
                    
                    {section.step === 5 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Last Review</h4>
                            <p className="text-sm text-muted-foreground">{section.content.lastReview}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Next Review</h4>
                            <p className="text-sm text-muted-foreground">{section.content.nextReview}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Reflection Points</h4>
                          <ul className="space-y-1">
                            {(section.content.reflectionPoints ?? []).map((point, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <RefreshCw className="h-3 w-3 text-primary" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
