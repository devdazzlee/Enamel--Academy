const topics = [
  {
    title: "Medical Emergencies",
    goal: "Your Goal is 2 Hours",
    years: [
      { year: 1, progress: 88 },
      { year: 2, progress: 0 },
      { year: 3, progress: 0 },
      { year: 4, progress: 0 },
    ],
  },
  {
    title: "Disinfection & Discontamination",
    goal: "Your Goal is 5 Hours Over 5 Years",
    progress: 90,
    singleBar: true,
  },
  {
    title: "Radiography & Radiation Protection",
    goal: "Your Goal is 5 Hours Over 5 Years",
    progress: 60,
    singleBar: true,
  },
]

export function HighlyRecommended() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-primary">Highly</span>{" "}
        <span className="text-muted-foreground">Recommended</span>
      </h2>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.title} className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-medium text-foreground mb-2">{topic.title}</h3>
            {topic.singleBar ? (
              <div>
                <p className="text-xs text-muted-foreground mb-2">{topic.goal}</p>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-primary">{topic.progress}%</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                {topic.years?.map((year) => (
                  <div key={year.year} className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{topic.goal}</span>
                      <span className="text-xs text-primary">Year {year.year}</span>
                    </div>
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                        style={{ width: `${year.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-center mt-1">
                      <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                        {year.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
