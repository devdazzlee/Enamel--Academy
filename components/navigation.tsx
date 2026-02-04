"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { EnamelLogo } from "./enamel-logo"
import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  CreditCard,
  BookOpen,
  FileText,
  Activity,
  Award,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  Shield,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/dashboard", label: "Learning Hub", icon: LayoutGrid },
  { href: "/pricing", label: "Subscription Plans", icon: CreditCard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/pdp", label: "Your PDP", icon: FileText },
  { href: "/track-cpd", label: "Track CPD", icon: Activity },
  { href: "/certificates", label: "CPD Certificates", icon: Award },
  { href: "/help", label: "Help & Support", icon: HelpCircle },
  { href: "/contact", label: "Contact Us", icon: MessageSquare },
]

interface NavigationProps {
  activeItem?: string
}

export function Navigation({ activeItem }: NavigationProps) {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="w-full px-4">
        <nav className="flex items-center justify-between h-16 relative">
          <Link href="/dashboard" className="flex-shrink-0">
            <EnamelLogo />
          </Link>
          
          <div className="hidden xl:flex items-center absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.label || pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap rounded-lg transition-colors",
                    isActive
                      ? "bg-[#8b5cf6]/10 text-[#8b5cf6] font-medium"
                      : "text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f5f5f5]"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#6b7280] hover:text-[#1a1a1a] rounded-lg hover:bg-[#f5f5f5] transition-colors">
                  <User className="h-4 w-4" />
                  <span>meta xoft</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
          </div>
        </nav>
      </div>
    </header>
  )
}
