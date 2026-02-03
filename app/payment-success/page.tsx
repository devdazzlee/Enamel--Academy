"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowRight, Download, Mail } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after 10 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for your subscription. Your account has been upgraded and you now have full access to all course content.
          </p>

          {/* Order Details */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6 text-left">
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium">Essentials</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">£42.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing Cycle:</span>
                <span className="font-medium">Annual</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">TXN-2024-123456</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </button>
            
            <button className="w-full px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition flex items-center justify-center gap-2">
              <Download size={20} />
              Download Receipt
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 mb-2">
              <Mail size={20} />
              <span className="font-semibold">Confirmation Sent</span>
            </div>
            <p className="text-sm text-blue-700">
              A confirmation email with your receipt has been sent to your registered email address.
            </p>
          </div>

          {/* Auto-redirect Notice */}
          <p className="text-sm text-muted-foreground mt-6">
            You will be automatically redirected to your dashboard in 10 seconds...
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
