"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Users, Shield, Eye, Edit, Trash2, Check, X } from "lucide-react";
import Link from "next/link";

interface Permission {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: "active" | "inactive";
  lastActive: string;
}

const mockPermissions: Permission[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.j@dentclinic.com",
    role: "Dentist",
    permissions: ["View Reports", "Manage Courses", "Access CPD"],
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "mike.c@dentclinic.com",
    role: "Assistant",
    permissions: ["View Reports", "Access CPD"],
    status: "active",
    lastActive: "1 day ago"
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@dentclinic.com",
    role: "Hygienist", 
    permissions: ["View Reports"],
    status: "inactive",
    lastActive: "3 days ago"
  }
];

const availablePermissions = [
  "View Reports",
  "Manage Courses", 
  "Access CPD",
  "Manage Team",
  "Admin Access"
];

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const togglePermission = (userId: string, permission: string) => {
    setPermissions(prev => prev.map(user => {
      if (user.id === userId) {
        const hasPermission = user.permissions.includes(permission);
        return {
          ...user,
          permissions: hasPermission 
            ? user.permissions.filter(p => p !== permission)
            : [...user.permissions, permission]
        };
      }
      return user;
    }));
  };

  const toggleStatus = (userId: string) => {
    setPermissions(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "active" ? "inactive" : "active"
        };
      }
      return user;
    }));
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/settings"
              className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Settings
            </Link>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6] text-white rounded-lg text-sm font-medium hover:bg-[#7c3aed] transition-colors"
          >
            <Users className="h-4 w-4" />
            Add User
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8">
          <h1 className="text-2xl font-semibold mb-6">
            <span className="text-[#1a1a1a]">Manage </span>
            <span className="text-[#8b5cf6]">Permissions</span>
          </h1>

          {/* Add User Form */}
          {showAddForm && (
            <div className="mb-8 p-6 bg-[#f8f9fa] rounded-xl border border-border">
              <h3 className="text-lg font-medium mb-4">Add New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20"
                />
                <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20">
                  <option>Select Role</option>
                  <option>Dentist</option>
                  <option>Assistant</option>
                  <option>Hygienist</option>
                  <option>Admin</option>
                </select>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors">
                    Add User
                  </button>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Permissions List */}
          <div className="space-y-6">
            {permissions.map((user) => (
              <div key={user.id} className="border border-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-[#8b5cf6]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a]">{user.name}</h3>
                      <p className="text-sm text-[#6b7280]">{user.email}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-[#6b7280]">{user.role}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.status === "active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {user.status}
                        </span>
                        <span className="text-xs text-[#6b7280]">Last active: {user.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {user.status === "active" ? <Eye className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="text-sm font-medium text-[#1a1a1a] mb-3">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {availablePermissions.map((permission) => (
                      <button
                        key={permission}
                        onClick={() => togglePermission(user.id, permission)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          user.permissions.includes(permission)
                            ? "bg-[#8b5cf6]/10 border-[#8b5cf6] text-[#8b5cf6]"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {user.permissions.includes(permission) && <Check className="inline h-3 w-3 mr-1" />}
                        {permission}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
