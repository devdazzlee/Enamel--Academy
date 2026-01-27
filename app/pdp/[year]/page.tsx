import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Printer, Download, Check, Target, TrendingUp, BookOpen, Calendar, RefreshCw } from "lucide-react"
import Link from "next/link"

export default async function PDPDetailPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params
  const isCompleted = year === "2023"

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <Link href="/pdp" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to My PDPs
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{year} Annual Plan</h1>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                isCompleted ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary border border-primary"
              }`}>
                {isCompleted ? "Completed" : "In Progress"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">January 1, {year} - December 31, {year}</p>
            <p className="text-xs text-muted-foreground">Last updated: December 15, {year}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-primary font-medium">100%</span>
          </div>
          <div className="h-3 bg-gradient-to-r from-primary to-green-500 rounded-full" />
        </div>

        {/* Career Objectives */}
        <section className="bg-card rounded-xl border border-border p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Career Objectives</h2>
                <p className="text-sm text-muted-foreground">Your professional goals and career aspirations</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
          </div>
          <div className="space-y-2 pl-13">
            {[
              "Become a specialist in Advanced Endodontics",
              "Achieve proficiency in Digital Smile Design",
              "Obtain Implantology Certification",
              "Develop expertise in aesthetic dentistry procedures"
            ].map((objective) => (
              <div key={objective} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{objective}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Assessment */}
        <section className="bg-card rounded-xl border border-border p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Skills Assessment</h2>
                <p className="text-sm text-muted-foreground">Current skills and areas for development</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div>
              <h3 className="font-medium text-foreground mb-3">Current Skills</h3>
              <div className="space-y-2">
                {[
                  { skill: "General Dentistry", level: "Advanced" },
                  { skill: "Root Canal Treatment", level: "Intermediate" },
                  { skill: "Crown & Bridge Work", level: "Intermediate" },
                  { skill: "Patient Communication", level: "Advanced" },
                ].map((item) => (
                  <div key={item.skill} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.skill}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      item.level === "Advanced" ? "text-primary" : "text-orange-600"
                    }`}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Skills to Develop</h3>
              <div className="space-y-2">
                {[
                  { skill: "Endodontics", target: "Advanced" },
                  { skill: "Implantology", target: "Intermediate" },
                  { skill: "Digital Dentistry", target: "Intermediate" },
                  { skill: "Aesthetic Procedures", target: "Advanced" },
                ].map((item) => (
                  <div key={item.skill} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.skill}</span>
                    <span className="text-xs text-primary">Target: {item.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Learning Plan */}
        <section className="bg-card rounded-xl border border-border p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Learning Plan</h2>
                <p className="text-sm text-muted-foreground">Selected courses and learning activities</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
          </div>
          <div className="space-y-3 mt-4">
            {[
              { course: "Advanced Endodontics Masterclass", duration: "40 hours" },
              { course: "Digital Smile Design Workshop", duration: "20 hours" },
              { course: "Implantology Certification Program", duration: "60 hours" },
              { course: "Aesthetic Dentistry Techniques", duration: "30 hours" },
            ].map((item) => (
              <div key={item.course} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{item.course}</p>
                  <p className="text-xs text-muted-foreground">Duration: {item.duration}</p>
                </div>
                <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline & Milestones */}
        <section className="bg-card rounded-xl border border-border p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Timeline & Milestones</h2>
                <p className="text-sm text-muted-foreground">Key deadlines and progress checkpoints</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
          </div>
          <div className="space-y-4 mt-4 pl-4 border-l-2 border-primary">
            {[
              { quarter: "Q1 2025", milestone: "Complete Endodontics course" },
              { quarter: "Q2 2025", milestone: "Finish Digital Smile Design" },
              { quarter: "Q3 2025", milestone: "Start Implantology certification" },
              { quarter: "Q4 2025", milestone: "Complete all certifications" },
            ].map((item) => (
              <div key={item.quarter} className="relative">
                <div className="absolute -left-[21px] w-3 h-3 bg-green-500 rounded-full" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{item.quarter}</span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.milestone}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Review & Reflection */}
        <section className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Review & Reflection</h2>
                <p className="text-sm text-muted-foreground">Progress evaluation and personal insights</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-foreground mb-3">Key Achievements</h3>
            <div className="space-y-2 mb-4">
              {[
                "Successfully completed 4 advanced courses",
                "Gained proficiency in 3 new dental specialties",
                "Logged 150 CPD hours",
                "Improved patient satisfaction scores by 25%"
              ].map((achievement) => (
                <div key={achievement} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{achievement}</span>
                </div>
              ))}
            </div>
            <h3 className="font-medium text-foreground mb-2">Personal Reflection</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This year has been transformative for my dental career. The combination of advanced endodontics training and digital dentistry skills has significantly enhanced my clinical capabilities. I feel more confident in complex cases and have received excellent patient feedback.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
