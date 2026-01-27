"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Save, Target, TrendingUp, BookOpen, Calendar, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function CreatePDPPage() {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    startDate: "",
    endDate: "",
    careerObjectives: [""],
    skillsAssessment: {
      currentSkills: [{ skill: "", level: "Beginner" }],
      developmentAreas: [""]
    },
    learningPlan: {
      enrolledCourses: [{ title: "", hours: 0, progress: 0 }],
      recommendedCourses: [""]
    },
    milestones: [{ title: "", deadline: "", status: "on-track" }],
    reviewSchedule: ""
  })

  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const handleCreate = () => {
    if (!formData.title || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields")
      return
    }

    setIsCreating(true)
    setTimeout(() => {
      setIsCreating(false)
      alert("PDP created successfully!")
      // In a real app, this would save to backend and redirect
    }, 1500)
  }

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      careerObjectives: [...prev.careerObjectives, ""]
    }))
  }

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      careerObjectives: prev.careerObjectives.filter((_, i) => i !== index)
    }))
  }

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      careerObjectives: prev.careerObjectives.map((obj, i) => i === index ? value : obj)
    }))
  }

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skillsAssessment: {
        ...prev.skillsAssessment,
        currentSkills: [...prev.skillsAssessment.currentSkills, { skill: "", level: "Beginner" }]
      }
    }))
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skillsAssessment: {
        ...prev.skillsAssessment,
        currentSkills: prev.skillsAssessment.currentSkills.filter((_, i) => i !== index)
      }
    }))
  }

  const updateSkill = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      skillsAssessment: {
        ...prev.skillsAssessment,
        currentSkills: prev.skillsAssessment.currentSkills.map((skill, i) => 
          i === index ? { ...skill, [field]: value } : skill
        )
      }
    }))
  }

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: "", deadline: "", status: "on-track" }]
    }))
  }

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  const updateMilestone = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }))
  }

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
              <span className="text-primary">Create</span>{" "}
              <span className="text-muted-foreground">Development Plan</span>
            </h1>
            <p className="text-muted-foreground">Set up your personal development plan for the year</p>
          </div>
          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create PDP
              </>
            )}
          </button>
        </div>

        {/* Basic Information */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plan Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., 2025 Annual Plan"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Career Objectives */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Career Objectives
            </h2>
            <button
              onClick={addObjective}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
            >
              Add Objective
            </button>
          </div>
          <div className="space-y-3">
            {formData.careerObjectives.map((objective, index) => (
              <div key={index} className="flex items-center gap-3">
                <Target className="h-4 w-4 text-primary flex-shrink-0" />
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder="Enter your career objective..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {formData.careerObjectives.length > 1 && (
                  <button
                    onClick={() => removeObjective(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Assessment */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skills Assessment
            </h2>
            <button
              onClick={addSkill}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
            >
              Add Skill
            </button>
          </div>
          <div className="space-y-3">
            {formData.skillsAssessment.currentSkills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={skill.skill}
                  onChange={(e) => updateSkill(index, "skill", e.target.value)}
                  placeholder="Skill name..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(index, "level", e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
                {formData.skillsAssessment.currentSkills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Milestones
            </h2>
            <button
              onClick={addMilestone}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
            >
              Add Milestone
            </button>
          </div>
          <div className="space-y-3">
            {formData.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => updateMilestone(index, "title", e.target.value)}
                  placeholder="Milestone title..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="date"
                  value={milestone.deadline}
                  onChange={(e) => updateMilestone(index, "deadline", e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {formData.milestones.length > 1 && (
                  <button
                    onClick={() => removeMilestone(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Review Schedule */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Review Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Next Review Date</label>
              <input
                type="date"
                value={formData.reviewSchedule}
                onChange={(e) => setFormData(prev => ({ ...prev, reviewSchedule: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
