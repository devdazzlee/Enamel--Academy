import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PDPOverview } from "@/components/pdp/pdp-overview"
import { PDPSections } from "@/components/pdp/pdp-sections"
import { PDPTable } from "@/components/pdp/pdp-table"
import { Plus, Edit } from "lucide-react"
import Link from "next/link"

export default function PDPPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            <span className="text-primary">My Personal</span>{" "}
            <span className="text-muted-foreground">Development Plan</span>
          </h1>
          <Link 
            href="/pdp/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New PDP
          </Link>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-foreground">2025 Annual Plan</h2>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary rounded-full">
                  In Progress
                </span>
              </div>
              <p className="text-sm text-muted-foreground">January 1, 2025 - December 31, 2025</p>
              <p className="text-xs text-muted-foreground">Last updated: January 15, 2025</p>
            </div>
            <Link
              href="/pdp/2025"
              className="flex items-center gap-2 text-primary text-sm hover:underline"
            >
              <Edit className="h-4 w-4" />
              Edit PDP
            </Link>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-primary font-medium">Overall Progress</span>
              <span className="text-primary font-medium">35%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "35%" }} />
            </div>
          </div>
        </div>

        <PDPSections />
        <PDPTable />
      </main>
      <Footer />
    </div>
  )
}
