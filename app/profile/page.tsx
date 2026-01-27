"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function ProfilePage() {
  const [jobRoles, setJobRoles] = useState([
    "Clinical Dental Technician",
    "Dental Hygienist",
  ]);

  const removeJobRole = (role: string) => {
    setJobRoles(jobRoles.filter((r) => r !== role));
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-semibold text-white">
            <span className="font-bold">Manage</span> Profile
          </h1>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-lg font-semibold mb-2">
              <span className="text-[#1a1a1a]">Ti</span>
              <span className="text-[#8b5cf6]">tle</span>
            </label>
            <Input
              placeholder="Title"
              className="bg-white border-0 rounded-xl h-12 text-[#6b7280]"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              <span className="text-[#1a1a1a]">First </span>
              <span className="text-[#8b5cf6]">name</span>
            </label>
            <Input
              placeholder="name"
              className="bg-white border-0 rounded-xl h-12 text-[#6b7280]"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              <span className="text-[#1a1a1a]">Last </span>
              <span className="text-[#8b5cf6]">name</span>
            </label>
            <Input
              placeholder="last name"
              className="bg-white border-0 rounded-xl h-12 text-[#6b7280]"
            />
          </div>
        </div>

        {/* Job Role Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-[#1a1a1a]">Your </span>
            <span className="text-[#8b5cf6]">Job </span>
            <span className="text-[#d4a574]">Role</span>
          </h2>
          <p className="text-[#6b7280] text-sm mb-4">
            You have selected the job role closest to your profession. This
            allows us to tailor your CPD experience to show all relevant courses
            to you.
          </p>

          {/* Notice Box */}
          <div className="bg-[#e9d5ff] rounded-xl p-4 mb-4">
            <p className="text-[#6b7280] text-sm">
              If the selected job role is GDC Registered you will be required to
              enter a GDC Registration Number.
            </p>
          </div>

          {/* Job Role Tags */}
          <div className="bg-white rounded-xl p-4 flex flex-wrap items-center gap-2">
            {jobRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-2 bg-[#8b5cf6] text-white px-4 py-2 rounded-lg text-sm"
              >
                {role}
                <button
                  onClick={() => removeJobRole(role)}
                  className="hover:bg-white/20 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
            <div className="flex-1" />
            <button className="text-[#8b5cf6] hover:text-[#7c3aed]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GDC Registration Number */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-[#1a1a1a]">GDC Registration </span>
            <span className="text-[#d4a574]">Number</span>
          </h2>
          <Input
            placeholder="123456789"
            className="bg-white border-0 rounded-xl h-12 text-[#6b7280]"
          />
        </div>

        {/* CPD Cycle Start Year */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-[#1a1a1a]">CPD Cycle </span>
            <span className="text-[#8b5cf6]">Start </span>
            <span className="text-[#d4a574]">Year</span>
          </h2>
          <p className="text-[#6b7280] text-sm mb-2">
            <span className="font-semibold">Please note:</span> To change your
            CPD cycle start year you must contact us
          </p>
          <Input
            placeholder="2025"
            className="bg-white border-0 rounded-xl h-12 text-[#6b7280]"
            disabled
          />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Membership Information Card */}
          <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] rounded-2xl p-6 w-full md:w-96">
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/30 pb-2">
              Membership Information
            </h3>
            <div className="space-y-2 text-white text-sm">
              <p>
                <span className="font-semibold">Member since:</span> 13/01/2026
              </p>
              <p>
                <span className="font-semibold">Type:</span> Pay As You Go /
                Free - Tier
              </p>
              <p>
                <span className="font-semibold">Membership status:</span> N/A
              </p>
            </div>
          </div>

          {/* Update Button */}
          <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-3 rounded-lg h-auto">
            Update Details
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
