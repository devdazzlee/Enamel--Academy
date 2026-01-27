import { FileText, Scale, Search, Shield } from "lucide-react"

const recommendations = [
  { title: "Complaints Handling", duration: "45 minutes", icon: FileText },
  { title: "Legal & Ethical", duration: "40 minutes", icon: Scale },
  { title: "Oral Cancer: Early Detection", duration: "1 hour", icon: Search },
  { title: "Safeguarding", duration: "0 minutes", icon: Shield },
]

export function RecommendedCPD() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-primary">Recom</span>
        <span className="text-muted-foreground">mended</span>
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {recommendations.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full mb-3">
                {item.duration}
              </span>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
