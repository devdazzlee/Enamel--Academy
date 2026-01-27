import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CPDHeader } from "@/components/cpd/cpd-header"
import { CPDUserInfo } from "@/components/cpd/cpd-user-info"
import { EnhancedCPDScheme } from "@/components/cpd/enhanced-cpd-scheme"
import { HighlyRecommended } from "@/components/cpd/highly-recommended"
import { RecommendedCPD } from "@/components/cpd/recommended-cpd"

export default function TrackCPDPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <CPDHeader />
        <CPDUserInfo />
        <EnhancedCPDScheme />
        <HighlyRecommended />
        <RecommendedCPD />
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            <span className="text-primary">Verifiable</span>{" "}
            <span className="text-muted-foreground">CPD Log</span>
          </h2>
        </section>
      </main>
      <Footer />
    </div>
  )
}
