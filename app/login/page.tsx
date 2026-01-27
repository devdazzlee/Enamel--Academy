"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EnamelLogo } from "@/components/enamel-logo"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

// Example login credentials
const DEMO_CREDENTIALS = {
  email: "demo@enamelacademy.com",
  password: "Demo@123",
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Check credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password. Please try again.")
    }
  }

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
  }

  return (
    <main className="min-h-screen bg-[#e8e8e8] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-10">
          <EnamelLogo className="mb-2" />
          <p className="text-[#6b7280] text-sm">Sign up into your account</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 p-4 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl">
          <p className="text-sm font-medium text-[#1a1a1a] mb-2">Demo Credentials:</p>
          <p className="text-sm text-[#6b7280]">
            <span className="font-medium">Email:</span> {DEMO_CREDENTIALS.email}
          </p>
          <p className="text-sm text-[#6b7280]">
            <span className="font-medium">Password:</span> {DEMO_CREDENTIALS.password}
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="mt-2 text-sm text-[#8b5cf6] hover:underline"
          >
            Click to auto-fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-[#e5e7eb] rounded-full text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] transition-colors"
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border border-[#e5e7eb] rounded-full text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1a1a1a] transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="px-16 py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors"
            >
              Log In
            </button>
            <Link
              href="/forgot-password"
              className="text-[#1a1a1a] underline text-sm hover:text-[#8b5cf6] transition-colors"
            >
              Forgot Password
            </Link>
          </div>

          <p className="text-sm text-[#6b7280]">
            {"Don't have an account? "}
            <Link href="/signup" className="text-[#8b5cf6] hover:underline">
              Sign Up Now
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
