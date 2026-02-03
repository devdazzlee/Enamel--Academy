"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, CreditCard, Shield, Check, User, MapPin } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'United Kingdom',
    cardNumber: '', cardName: '', expiryDate: '', cvv: '',
    plan: 'Essentials', billingCycle: 'annual'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      router.push('/payment-success')
    }, 3000)
  }

  const selectedPlan = { name: formData.plan, price: formData.plan === 'Essentials' ? '£42.00' : '£142.00', period: 'per year' }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto w-full px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.push('/pricing')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft size={20} />
              <span>Back to Pricing</span>
            </button>
            <h1 className="text-2xl font-semibold">Complete Your Subscription</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full px-3 py-2 border rounded-lg" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full px-3 py-2 border rounded-lg" />
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code" className="w-full px-3 py-2 border rounded-lg" />
                    <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="Card Number" className="w-full px-3 py-2 border rounded-lg" />
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="Cardholder Name" className="w-full px-3 py-2 border rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" className="w-full px-3 py-2 border rounded-lg" />
                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="CVV" className="w-full px-3 py-2 border rounded-lg" />
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{selectedPlan.name}</span>
                    <span>{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{selectedPlan.period}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{selectedPlan.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <Shield size={20} />
                  <span className="font-semibold">Secure Payment</span>
                </div>
                <p className="text-sm text-green-700">Your payment information is encrypted and secure.</p>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition"
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
