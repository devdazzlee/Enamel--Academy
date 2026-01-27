export function CPDUserInfo() {
  const userInfo = [
    { label: "Name", value: "Dr. Jane Elis" },
    { label: "GDC Number", value: "80978" },
    { label: "Covering the Period", value: "Jan 2023 - Dec 2027" },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {userInfo.map((info) => (
        <div key={info.label} className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-sm font-medium text-foreground mb-1">{info.label}</p>
          <p className="text-muted-foreground">{info.value}</p>
        </div>
      ))}
    </div>
  )
}
