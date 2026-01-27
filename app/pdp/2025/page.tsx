"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Save, Plus, Trash2, Target, TrendingUp, BookOpen, Calendar, RefreshCw, Check, Clock } from "lucide-react"
import Link from "next/link"

export default function PDP2025Page() {
  const [formData, setFormData] = useState({
    title: "2025 Annual Plan",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    careerObjectives: [
      "Become a specialist in restorative dentistry",
      "Complete advanced certification in dental implants",
      "Develop leadership skills for practice management"
    ],
    skillsAssessment: {
      currentSkills: [
        { skill: "General Dentistry", level: "Expert" },
        { skill: "Patient Communication", level: "Advanced" },
        { skill: "Digital Radiography", level: "Intermediate" },
        { skill: "Practice Management", level: "Beginner" }
      ],
      developmentAreas: [
        "Advanced Implant Procedures",
        "Orthodontic Treatments",
        "Team Leadership"
      ]
    },
    learningPlan: {
      enrolledCourses: [
        { title: "Advanced Implantology", progress: 65, hours: 40 },
        { title: "Dental Practice Management", progress: 30, hours: 30 }
      ],
      recommendedCourses: [
        "Orthodontic Basics for General Dentists",
        "Advanced Restorative Techniques"
      ]
    },
    milestones: [
      { title: "Complete Implantology Course", deadline: "2025-03-31", status: "on-track" },
      { title: "Attend Dental Conference", deadline: "2025-04-15", status: "on-track" },
      { title: "Obtain Practice Management Certification", deadline: "2025-06-30", status: "delayed" }
    ],
    reviewSchedule: "2025-04-01"
  })

  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("PDP saved successfully!")
    }, 1500)
  }

  const addObjective = () => {
    const newObjective = prompt("Enter new career objective:")
    if (newObjective) {
      setFormData(prev => ({
        ...prev,
        careerObjectives: [...prev.careerObjectives, newObjective]
      }))
    }
  }

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      careerObjectives: prev.careerObjectives.filter((_, i) => i !== index)
    }))
  }

  const addMilestone = () => {
    const title = prompt("Enter milestone title:")
    const deadline = prompt("Enter deadline (YYYY-MM-DD):")
    if (title && deadline) {
      setFormData(prev => ({
        ...prev,
        milestones: [...prev.milestones, { title, deadline, status: "on-track" }]
      }))
    }
  }

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  const updateMilestoneStatus = (index: number, status: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, status } : milestone
      )
    }))
  }

  const totalHours = formData.learningPlan.enrolledCourses.reduce((sum, course) => sum + course.hours, 0)
  const completedHours = formData.learningPlan.enrolledCourses.reduce((sum, course) => sum + (course.hours * course.progress / 100), 0)
  const overallProgress = Math.round((completedHours / totalHours) * 100)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/pdp"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to PDP
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              <span className="text-primary">Edit</span>{" "}
              <span className="text-muted-foreground">Development Plan</span>
            </h1>
            <p className="text-muted-foreground">{formData.title}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Progress Overview */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Plan Period</h3>
              <p className="text-sm text-muted-foreground">{formData.startDate} - {formData.endDate}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Overall Progress</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Next Review</h3>
              <p className="text-sm text-muted-foreground">{formData.reviewSchedule}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex gap-6">
            {["overview", "objectives", "skills", "learning", "milestones"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Career Objectives
                </h3>
                <ul className="space-y-2">
                  {formData.careerObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Skills Progress
                </h3>
                <div className="space-y-3">
                  {formData.skillsAssessment.currentSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{skill.skill}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        skill.level === "Expert" ? "bg-green-100 text-green-700" :
                        skill.level === "Advanced" ? "bg-blue-100 text-blue-700" :
                        skill.level === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "objectives" && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Career Objectives
                </h3>
                <button
                  onClick={addObjective}
                  className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  Add Objective
                </button>
              </div>
              <div className="space-y-3">
                {formData.careerObjectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...formData.careerObjectives]
                        newObjectives[index] = e.target.value
                        setFormData(prev => ({ ...prev, careerObjectives: newObjectives }))
                      }}
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => removeObjective(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Current Skills
                </h3>
                <div className="space-y-3">
                  {formData.skillsAssessment.currentSkills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={skill.skill}
                          onChange={(e) => {
                            const newSkills = [...formData.skillsAssessment.currentSkills]
                            newSkills[index] = { ...skill, skill: e.target.value }
                            setFormData(prev => ({
                              ...prev,
                              skillsAssessment: { ...prev.skillsAssessment, currentSkills: newSkills }
                            }))
                          }}
                          className="bg-transparent border-none focus:outline-none text-sm font-medium"
                        />
                        <select
                          value={skill.level}
                          onChange={(e) => {
                            const newSkills = [...formData.skillsAssessment.currentSkills]
                            newSkills[index] = { ...skill, level: e.target.value }
                            setFormData(prev => ({
                              ...prev,
                              skillsAssessment: { ...prev.skillsAssessment, currentSkills: newSkills }
                            }))
                          }}
                          className="text-xs px-2 py-1 rounded border border-border"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>Expert</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Development Areas</h3>
                <ul className="space-y-2">
                  {formData.skillsAssessment.developmentAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Target className="h-3 w-3 text-primary" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "learning" && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Enrolled Courses
                </h3>
                <div className="space-y-4">
                  {formData.learningPlan.enrolledCourses.map((course, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{course.title}</h4>
                        <span className="text-sm text-muted-foreground">{course.hours}h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Recommended Courses</h3>
                <ul className="space-y-2">
                  {formData.learningPlan.recommendedCourses.map((course, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-3 w-3 text-primary" />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Timeline & Milestones
                </h3>
                <button
                  onClick={addMilestone}
                  className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  Add Milestone
                </button>
              </div>
              <div className="space-y-3">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">Deadline: {milestone.deadline}</p>
                    </div>
                    <select
                      value={milestone.status}
                      onChange={(e) => updateMilestoneStatus(index, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border ${
                        milestone.status === "on-track" ? "bg-green-100 text-green-700 border-green-200" :
                        "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      <option value="on-track">On Track</option>
                      <option value="delayed">Delayed</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => removeMilestone(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
