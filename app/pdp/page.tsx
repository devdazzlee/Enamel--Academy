import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import PDPDashboard from "../(pdp)/pdp-dashboard/pdp-dashboard"
import PDPForm from "../(pdp)/pdp-form/pdp-form"
import PDPDetailView from "../(pdp)/pdp-detailView/pdp-detailView"

export default async function PDPPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; id?: string }>
}) {
  const sp = await searchParams
  const view = sp?.view ?? "dashboard"

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6">
        {view === "form" ? (
          <PDPForm />
        ) : view === "detail" ? (
          <PDPDetailView />
        ) : (
          <PDPDashboard />
        )}
      </main>
      <Footer />
    </div>
  )
}
