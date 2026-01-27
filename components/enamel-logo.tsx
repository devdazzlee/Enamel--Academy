export function EnamelLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="48"
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Graduation cap */}
        <rect x="8" y="0" width="24" height="4" fill="#1a1a1a" rx="1" />
        <rect x="12" y="4" width="16" height="3" fill="#1a1a1a" />
        <circle cx="30" cy="2" r="3" fill="#8b5cf6" />
        <path d="M30 5 L30 10" stroke="#1a1a1a" strokeWidth="1.5" />
        <rect x="28" y="10" width="4" height="2" fill="#f59e0b" rx="0.5" />
        
        {/* Tooth */}
        <path
          d="M10 18 C10 14, 14 12, 20 12 C26 12, 30 14, 30 18 L30 32 C30 36, 27 40, 24 44 L24 46 C24 47, 23 48, 22 48 L22 48 C21 48, 20 47, 20 46 L20 44 C20 44, 20 44, 20 44 L20 46 C20 47, 19 48, 18 48 L18 48 C17 48, 16 47, 16 46 L16 44 C13 40, 10 36, 10 32 L10 18Z"
          fill="#1a1a1a"
        />
        <ellipse cx="20" cy="24" rx="6" ry="4" fill="white" />
      </svg>
      <span className="text-xl font-semibold tracking-tight">
        <span className="font-bold">Enamel</span>
        <span className="font-normal text-muted-foreground"> Academy</span>
      </span>
    </div>
  )
}
