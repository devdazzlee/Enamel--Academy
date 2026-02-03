"use client"

import React, { useState, useRef, useEffect } from "react"

interface OTPInputProps {
  value: string[]
  onChange: (value: string[]) => void
}

export function OTPInput({ value, onChange }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [...value]
    const inputValue = e.target.value

    if (inputValue.length <= 1) {
      newValue[index] = inputValue
      onChange(newValue)

      // Move to next input if current input is filled
      if (inputValue && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newValue = Array(6).fill("")
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newValue[i] = pastedData[i]
    }
    
    onChange(newValue)
    
    // Focus on the next empty input or the last one
    const nextEmptyIndex = newValue.findIndex(val => val === "")
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex justify-center gap-2">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center bg-white border border-[#e5e7eb] rounded-lg text-lg font-medium text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] transition-colors"
        />
      ))}
    </div>
  )
}
