"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { EnamelLogo } from "@/components/enamel-logo"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center mb-10">
          <EnamelLogo className="mb-2" />
          <p className="text-muted-foreground text-sm">Sign up into your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">First Name :</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your name.."
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Last Name :</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your name.."
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email Id :</label>
              <input
                type="email"
                name="email"
                placeholder="info@xyz.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Mobile No. :</label>
              <input
                type="tel"
                name="mobile"
                placeholder="+91 - 98596 58000"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Password :</label>
              <input
                type="password"
                name="password"
                placeholder="xxxxxxxxxx"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Confirm Password :</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="xxxxxxxxxx"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-16 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign up
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign In Now
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
