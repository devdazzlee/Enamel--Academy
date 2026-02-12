"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Check, Shield, HelpCircle, Lock } from "lucide-react";
import Link from "next/link";

const securityQuestions = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What is your favorite book?",
  "What is the name of your first school?",
  "What is your favorite movie?",
  "What is your dream job?",
  "What is your favorite food?"
];

export default function SecurityQuestionPage() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [confirmAnswer, setConfirmAnswer] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === confirmAnswer.toLowerCase()) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link 
            href="/settings"
            className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Settings
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a]">Security Question</h1>
                <p className="text-sm sm:text-base text-[#6b7280]">Add an extra layer of security to your account</p>
              </div>
            </div>

            {isSuccess && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <p className="text-sm text-green-800">Security question successfully updated!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Security Question */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Select Security Question
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <select
                    value={selectedQuestion}
                    onChange={(e) => setSelectedQuestion(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] appearance-none text-sm sm:text-base"
                    required
                  >
                    <option value="">Choose a security question...</option>
                    {securityQuestions.map((question) => (
                      <option key={question} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Answer
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] text-sm sm:text-base"
                    placeholder="Enter your answer"
                    required
                  />
                </div>
              </div>

              {/* Confirm Answer */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Confirm Answer
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={confirmAnswer}
                    onChange={(e) => setConfirmAnswer(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] text-sm sm:text-base"
                    placeholder="Confirm your answer"
                    required
                  />
                </div>
                {confirmAnswer && answer.toLowerCase() !== confirmAnswer.toLowerCase() && (
                  <p className="mt-2 text-xs sm:text-sm text-red-600">Answers do not match</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors text-sm sm:text-base"
              >
                Update Security Question
              </button>
            </form>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Security Tip:</strong> Choose a question and answer that you'll easily remember but others won't be able to guess. Avoid using common information that can be found on your social media profiles.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
