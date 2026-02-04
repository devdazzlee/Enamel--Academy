import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { RecommendedCourses } from "@/components/dashboard/recommended-courses"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6">
        <WelcomeBanner />
        <ContinueLearning />
        <RecommendedCourses />
      </main>
      <Footer />
    </div>
  )
}
