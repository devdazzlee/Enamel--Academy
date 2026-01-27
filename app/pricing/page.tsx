import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Check, Phone } from "lucide-react"

const plans = [
  {
    type: "Team Subscription",
    name: "You and your Team",
    priceLabel: "From",
    price: "£2.92",
    priceSuffix: "+VAT",
    period: "per user / per month",
    description: "Unlimited access to the Essentials range of enhanced CPD courses and practice management features",
    features: [
      "Invite self employed team members to your practice.",
      "View your team members certificates.",
      "Assign courses to your team members.",
      "Access to practice management Learning Hub.",
      "Personal CPD Tracker and Learning Hub.",
      "Automated Personal Development Plan features.",
      "GDC Reports and Annual Statements.",
    ],
    buttonText: "Call Us Now",
    buttonIcon: Phone,
    highlighted: true,
  },
  {
    type: "Individual Subscription",
    name: "Essentials",
    priceLabel: "Only",
    price: "£42.00*",
    period: "per year",
    description: "Unlimited access to the Essentials range of enhanced CPD courses.",
    features: [
      "Instant access to 230+ CPD courses.",
      "Personal CPD Tracker and Learning Hub.",
      "Automated Personal Development Plan features.",
      "GDC Reports and Annual Statements.",
      "Your subscription will automatically renew every twelve months.",
    ],
    buttonText: "Subscribe Now",
  },
  {
    type: "Individual Subscription",
    name: "Pro",
    priceLabel: "Only",
    price: "£142.00*",
    period: "per year",
    description: "Unlimited access to our entire clinical Courses",
    features: [
      "Instant access to 230+ Essentials CPD courses.",
      "Instant access to 100+ Pro CPD courses.",
      "Personal CPD Tracker and Learning Hub.",
      "Automated Personal Development Plan features.",
      "GDC Reports and Annual Statements.",
      "Your subscription will automatically renew every twelve months.",
    ],
    buttonText: "Subscribe Now",
  },
  {
    type: "Individual Courses",
    name: "Pay as you go",
    priceLabel: "Prices from",
    price: "£4.99 - £36",
    period: "individual courses only",
    description: "Pay as you go, buying the online verifiable CPD courses that you need, when you need them",
    features: [
      "Pay as you go, buying the online Enhanced CPD courses that you need, when you need them.",
      "Take courses whenever and wherever you want.",
      "Courses written by industry experts.",
      "New courses added every month.",
    ],
    buttonText: "Subscribe Now",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">
          <span className="text-primary">Pric</span>
          <span className="text-muted-foreground">ing</span>
        </h1>

        <div className="space-y-6">
          {plans.map((plan) => {
            const ButtonIcon = plan.buttonIcon
            return (
              <div
                key={plan.name}
                className="bg-card rounded-2xl border border-border overflow-hidden flex"
              >
                {/* Price Card */}
                <div className="w-64 flex-shrink-0 bg-gradient-to-b from-primary/80 to-primary/40 p-6 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-white/80 mb-1">Pricing</p>
                  <p className="text-xs text-white/60 mb-2">{plan.priceLabel}</p>
                  <p className="text-4xl font-bold text-white mb-1">
                    {plan.price}
                    {plan.priceSuffix && <span className="text-lg">{plan.priceSuffix}</span>}
                  </p>
                  <p className="text-xs text-white/60">{plan.period}</p>
                </div>

                {/* Plan Details */}
                <div className="flex-1 p-6">
                  <p className="text-xs text-muted-foreground mb-1">{plan.type}</p>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
