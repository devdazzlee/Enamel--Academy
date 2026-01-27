"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Check } from "lucide-react";
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

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-border p-8">
            <h1 className="text-2xl font-semibold mb-6">
              <span className="text-[#1a1a1a]">Security </span>
              <span className="text-[#8b5cf6]">Question</span>
            </h1>

            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <p className="text-green-800">Security question successfully updated!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Security Question */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Select Security Question
                </label>
                <select
                  value={selectedQuestion}
                  onChange={(e) => setSelectedQuestion(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6]"
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

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Answer
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6]"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              {/* Confirm Answer */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Confirm Answer
                </label>
                <input
                  type="text"
                  value={confirmAnswer}
                  onChange={(e) => setConfirmAnswer(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6]"
                  placeholder="Confirm your answer"
                  required
                />
                {confirmAnswer && answer.toLowerCase() !== confirmAnswer.toLowerCase() && (
                  <p className="mt-2 text-sm text-red-600">Answers do not match</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors"
              >
                Update Security Question
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Make sure to choose a question and answer that you'll remember but others won't easily guess.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
