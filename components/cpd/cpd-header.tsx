import { ChevronDown, Download } from "lucide-react"

export function CPDHeader() {
  return (
    <div className="bg-gradient-to-r from-primary via-primary to-accent rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">Track CPD</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground">
            <span>Jan 2023 - Dec 2027</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-primary-foreground/30 rounded-lg text-primary-foreground hover:bg-white/10 transition-colors">
            <Download className="h-4 w-4" />
            Export GDC Report
          </button>
        </div>
      </div>
    </div>
  )
}
