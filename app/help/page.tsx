"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col">
      <Navigation activeItem="Help & Support" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-semibold text-white">
            <span className="font-bold">Enamel</span> Academy
          </h1>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4 mb-8">
          {/* Sales Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-[#1a1a1a]">Sal</span>
              <span className="text-[#8b5cf6]">es</span>
            </h2>
            <p className="text-[#4b5563]">+44 (0)330 165 9711</p>
          </div>

          {/* Customer Support Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-[#1a1a1a]">Customer </span>
              <span className="text-[#8b5cf6]">Support</span>
            </h2>
            <p className="text-[#4b5563]">+44 (0)330 165 9712</p>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-[#1a1a1a]">Em</span>
              <span className="text-[#8b5cf6]">ail</span>
            </h2>
            <p className="text-[#4b5563]">ilearn@mail.com</p>
          </div>

          {/* Office Hours Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-[#1a1a1a]">Office </span>
              <span className="text-[#8b5cf6]">Hours</span>
            </h2>
            <p className="text-[#4b5563]">Monday to Friday, 09:30 – 17:00</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
