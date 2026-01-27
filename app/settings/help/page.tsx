"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Search, Book, Video, FileText, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    articles: [
      {
        question: "How do I create my account?",
        answer: "To create your account, click on the Sign Up button on the homepage. Fill in your personal details, choose your subscription plan, and follow the verification process sent to your email."
      },
      {
        question: "What subscription plans are available?",
        answer: "We offer Individual plans (Essentials and Pro) and Team subscriptions. Individual plans start from £42/year, while Team plans start from £2.92 per user per month."
      },
      {
        question: "How do I navigate the dashboard?",
        answer: "The dashboard is your main hub. You can access courses, track your CPD, view certificates, and manage your profile from the navigation menu at the top."
      }
    ]
  },
  {
    id: "courses",
    title: "Courses & Learning",
    icon: Video,
    articles: [
      {
        question: "How do I enroll in a course?",
        answer: "Browse the Courses page, select a course that interests you, and click 'Start Course' or 'Enroll Now'. The course will be added to your learning dashboard."
      },
      {
        question: "Can I download course materials?",
        answer: "Yes, most courses include downloadable PDFs, worksheets, and reference materials. Look for the download icon in each lesson."
      },
      {
        question: "How long do I have access to courses?",
        answer: "With an active subscription, you have unlimited access to all courses in your plan. Individual course purchases provide lifetime access to that specific course."
      }
    ]
  },
  {
    id: "cpd-certificates",
    title: "CPD & Certificates",
    icon: FileText,
    articles: [
      {
        question: "How are CPD points calculated?",
        answer: "CPD points are automatically calculated based on course completion time. 1 hour of learning typically equals 1 CPD point, as per GDC guidelines."
      },
      {
        question: "How do I download my certificates?",
        answer: "Go to the CPD Certificates page, filter by date or course, and click the download button next to each completed course."
      },
      {
        question: "Are certificates verifiable?",
        answer: "Yes, all certificates include a unique verification code that employers and regulatory bodies can use to verify your completion."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: MessageCircle,
    articles: [
      {
        question: "What browsers are supported?",
        answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome or Safari."
      },
      {
        question: "Why can't I view videos?",
        answer: "Check your internet connection and ensure JavaScript is enabled. Try clearing your browser cache or using a different browser."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the reset link sent to your email."
      }
    ]
  }
];

export default function SettingsHelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["getting-started"]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/settings"
            className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Settings
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8">
          <h1 className="text-2xl font-semibold mb-6">
            <span className="text-[#1a1a1a]">Help </span>
            <span className="text-[#8b5cf6]">Center</span>
          </h1>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6]"
            />
          </div>

          {/* Help Categories */}
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategories.includes(category.id);

              return (
                <div key={category.id} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-6 py-4 bg-[#f8f9fa] hover:bg-[#f0f1f3] transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[#8b5cf6]" />
                      <span className="font-medium text-[#1a1a1a]">{category.title}</span>
                      <span className="text-sm text-[#6b7280]">({category.articles.length} articles)</span>
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-[#6b7280]" /> : <ChevronDown className="h-5 w-5 text-[#6b7280]" />}
                  </button>

                  {isExpanded && (
                    <div className="p-6 space-y-4">
                      {category.articles.map((article, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                          <h3 className="font-medium text-[#1a1a1a] mb-2">{article.question}</h3>
                          <p className="text-sm text-[#6b7280] leading-relaxed">{article.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Need Help */}
          <div className="mt-8 p-6 bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 rounded-xl">
            <h3 className="font-semibold text-[#1a1a1a] mb-2">Still need help?</h3>
            <p className="text-sm text-[#6b7280] mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/settings/contact"
                className="px-4 py-2 bg-[#8b5cf6] text-white rounded-lg text-sm font-medium hover:bg-[#7c3aed] transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/help"
                className="px-4 py-2 bg-white border border-[#8b5cf6] text-[#8b5cf6] rounded-lg text-sm font-medium hover:bg-[#8b5cf6]/10 transition-colors"
              >
                View Full Help Site
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
