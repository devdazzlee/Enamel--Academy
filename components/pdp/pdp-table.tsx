import Link from "next/link"

const pdpList = [
  {
    period: "2025 Annual Plan",
    status: "In Progress",
    progress: 35,
    progressColor: "bg-primary",
  },
  {
    period: "2024 Annual Plan",
    status: "Completed",
    progress: 100,
    progressColor: "bg-green-500",
  },
  {
    period: "2023 Annual Plan",
    status: "Completed",
    progress: 100,
    progressColor: "bg-green-500",
  },
]

export function PDPTable() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">My PDPs</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Period</th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Status</th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Progress</th>
              <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdpList.map((pdp) => (
              <tr key={pdp.period} className="border-b border-border last:border-0">
                <td className="px-4 py-4 text-sm text-foreground">{pdp.period}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                    pdp.status === "Completed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-primary/10 text-primary border border-primary"
                  }`}>
                    {pdp.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${pdp.progressColor}`} 
                        style={{ width: `${pdp.progress}%` }} 
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{pdp.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <Link 
                    href={`/pdp/${pdp.period.split(" ")[0].toLowerCase()}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
