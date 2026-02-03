"use client"

import React, { useState } from "react"
import { EnamelLogo } from "@/components/enamel-logo"
import { OTPInput } from "@/components/otp-input"

export default function OTPVerifyPage() {
  const [otp, setOtp] = useState(Array(6).fill(""))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")
    console.log("OTP submitted:", otpCode)
    // Handle OTP verification logic
  }

  return (
    <main className="min-h-screen bg-[#e8e8e8] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-10">
          <EnamelLogo className="mb-6" />
          <p className="text-[#6b7280] text-sm text-center">
            Verification code sent to your email.{" "}
            <span className="text-[#8b5cf6] font-medium">Check Inbox</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <OTPInput value={otp} onChange={setOtp} />

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full px-16 py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
