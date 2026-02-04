"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Info, CheckCircle } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { AlertModal } from "@/components/ui/alert-modal"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Answer {
  questionId: number
  selectedOption: number | null
}

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const { courses } = useApp()
  const courseId = params.courseId as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [modal, setModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    type?: "warning" | "error" | "success"
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "warning"
  })

  const course = courses.find(c => c.id === courseId)
  
  if (!course) {
    return <div>Course not found</div>
  }

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the first step in managing a patient who has collapsed in the dental chair?",
      options: [
        "Administer oxygen immediately",
        "Check responsiveness and breathing",
        "Call emergency services",
        "Start chest compressions"
      ],
      correctAnswer: 1,
      explanation: "The first priority is to check if the patient is responsive and ensure they have a patent airway. This follows the ABC (Airway, Breathing, Circulation) approach to emergency management."
    },
    {
      id: 2,
      question: "Which medication is most commonly used for managing anaphylaxis in dental practice?",
      options: [
        "Epinephrine",
        "Diphenhydramine",
        "Corticosteroids",
        "Albuterol"
      ],
      correctAnswer: 0,
      explanation: "Epinephrine (adrenaline) is the first-line treatment for anaphylaxis. It rapidly reverses airway edema, bronchospasm, and hypotension."
    },
    {
      id: 3,
      question: "What is the recommended ratio for chest compressions to breaths in adult CPR?",
      options: [
        "15:2",
        "30:2",
        "5:1",
        "20:2"
      ],
      correctAnswer: 1,
      explanation: "Current AHA guidelines recommend 30 chest compressions followed by 2 rescue breaths for adult CPR, providing better circulation and oxygenation."
    },
    {
      id: 4,
      question: "Which of the following is the most common cause of syncope in dental patients?",
      options: [
        "Hypoglycemia",
        "Vasovagal response",
        "Cardiac arrhythmia",
        "Orthostatic hypotension"
      ],
      correctAnswer: 1,
      explanation: "Vasovagal syncope is the most common cause, triggered by fear, anxiety, or pain during dental procedures, leading to a sudden drop in heart rate and blood pressure."
    }
  ]

  useEffect(() => {
    // Initialize answers array
    const initialAnswers: Answer[] = questions.map(q => ({
      questionId: q.id,
      selectedOption: null
    }))
    setAnswers(initialAnswers)
  }, [])

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, selectedOption: optionIndex }
          : answer
      )
    )
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNext = () => {
    // Check if current question is answered
    const currentAnswer = answers.find(a => a.questionId === questions[currentQuestion].id)
    if (!currentAnswer || currentAnswer.selectedOption === null) {
      // Show modal instead of alert
      setModal({
        isOpen: true,
        title: "Question Required",
        message: "Please answer the current question before proceeding.",
        type: "warning"
      })
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    // Allow jumping to previous questions without validation
    if (questionIndex < currentQuestion) {
      setCurrentQuestion(questionIndex)
      return
    }

    // For jumping to future questions, check if all previous questions are answered
    let canJump = true
    for (let i = 0; i < questionIndex; i++) {
      const answer = answers.find(a => a.questionId === questions[i].id)
      if (!answer || answer.selectedOption === null) {
        canJump = false
        break
      }
    }

    if (!canJump) {
      setModal({
        isOpen: true,
        title: "Questions Required",
        message: "Please answer all previous questions before jumping ahead.",
        type: "warning"
      })
      return
    }

    setCurrentQuestion(questionIndex)
  }

  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredQuestions = answers.filter(a => a.selectedOption === null)
    if (unansweredQuestions.length > 0) {
      setModal({
        isOpen: true,
        title: "Incomplete Assessment",
        message: `Please answer all questions before submitting. You have ${unansweredQuestions.length} unanswered question(s).`,
        type: "warning"
      })
      return
    }
    setShowResults(true)
  }

  const handleExit = () => {
    router.push(`/course/${courseId}`)
  }

  const answeredCount = answers.filter(a => a.selectedOption !== null).length
  const currentQuestionData = questions[currentQuestion]
  const currentAnswer = answers.find(a => a.questionId === currentQuestionData.id)
  const isAnswered = currentAnswer?.selectedOption !== null

  const calculateScore = () => {
    let correct = 0
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId)
      if (question && answer.selectedOption === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 80

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-[#8b5cf6] text-white px-4 sm:px-6 py-4 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={handleExit}
                className="flex items-center gap-2 text-white hover:text-[#e0e7ff] transition-colors text-sm sm:text-base flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Exit Assessment</span>
                <span className="sm:hidden">Exit</span>
              </button>
              <div className="text-center flex-1 min-w-0 px-2">
                <h1 className="text-lg sm:text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Assessment Results</h1>
                <p className="text-[#e0e7ff] text-xs sm:text-sm leading-tight overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>{course.title}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs sm:text-sm font-medium whitespace-nowrap">{score}/{questions.length} Correct</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Assessment Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 mb-6 sm:mb-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-base sm:text-lg mb-3 sm:mb-4 ${
                passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                Assessment {passed ? 'Passed' : 'Not Passed'}
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                You scored {percentage.toFixed(0)}%. You need {80}% to pass.
              </p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{percentage.toFixed(0)}%</div>
                <div className="text-xs sm:text-sm text-gray-600">Your Score</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{score}/{questions.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">80%</div>
                <div className="text-xs sm:text-sm text-gray-600">Pass Mark</div>
              </div>
            </div>

            <div className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Don't worry! Review the course materials and try again. There's no limit to the number of attempts.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              {passed ? (
                <button
                  onClick={() => router.push(`/course/${courseId}/reflection`)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#7c3aed] text-white rounded-md font-medium hover:bg-[#6d28d9] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Proceed to Reflection
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={handleExit}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
                  >
                    Review Course
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false)
                      setCurrentQuestion(0)
                      setAnswers(questions.map(q => ({
                        questionId: q.id,
                        selectedOption: null
                      })))
                    }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#6366f1] text-white rounded-md font-medium hover:bg-[#5558e3] transition-colors text-sm sm:text-base"
                  >
                    Retake Assessment
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Answer Review Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Answer Review</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Review your answers and explanations.</p>
            
            <div className="space-y-4 sm:space-y-6">
              {questions.map((question, index) => {
                const answer = answers.find(a => a.questionId === question.id)
                const isCorrect = answer?.selectedOption === question.correctAnswer
                const userAnswerIndex = answer?.selectedOption
                
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        Q{index + 1} {question.question}
                      </h3>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0`}>
                        {isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isCorrectOption = optionIndex === question.correctAnswer
                        const isUserOption = optionIndex === userAnswerIndex
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-2 sm:p-3 rounded-lg border ${
                              isCorrectOption
                                ? 'bg-green-50 border-green-200'
                                : isUserOption && !isCorrect
                                ? 'bg-red-50 border-red-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <span className="text-gray-900 text-sm sm:text-base">{option}</span>
                              <div className="flex gap-2 sm:gap-4">
                                {isCorrectOption && (
                                  <span className="text-xs sm:text-sm font-medium text-green-700">Correct</span>
                                )}
                                {isUserOption && !isCorrect && (
                                  <span className="text-xs sm:text-sm font-medium text-red-700">Your Answer</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Explanation:</h4>
                      <p className="text-blue-800 text-xs sm:text-sm">{question.explanation}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#8b5cf6] text-white px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6">
            <button 
              onClick={handleExit}
              className="flex items-center gap-2 hover:text-[#e0e7ff] transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Exit Assessment</span>
              <span className="sm:hidden">Exit</span>
            </button>
            <div className="text-center flex-1 min-w-0 px-2">
              <h1 className="text-lg sm:text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Course Assessment</h1>
              <p className="text-[#e0e7ff] text-xs sm:text-sm leading-tight overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>{course.title}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs sm:text-sm font-medium whitespace-nowrap">{answeredCount}/{questions.length} Answered</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round((answeredCount / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-[#6366f1] rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 mx-4 sm:mx-6 mt-4 sm:mt-6 max-w-4xl">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm text-blue-800">
            <p className="font-medium mb-1">Assessment Information</p>
            <p>
              This assessment contains {questions.length} multiple-choice questions. You need to score at least 80% to pass. 
              You can navigate between questions and change your answers before submitting. 
              If you don't pass, you can retake the assessment as many times as needed.
            </p>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <main className="flex-1 px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#8b5cf6]">Question {currentQuestion + 1}</h2>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0`}>
                {isAnswered 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
                }
                {isAnswered ? 'Answered' : 'Not answered'}
              </span>
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                {currentQuestionData.question}
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                    currentAnswer?.selectedOption === index
                      ? 'border-[#8b5cf6] bg-[#f3f4ff] text-[#8b5cf6] font-medium'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0`}>
                      {currentAnswer?.selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm sm:text-base">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Pagination */}
      <footer className="bg-gray-100 px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm sm:text-base ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            <div className="flex gap-1 sm:gap-2 flex-1 justify-center">
              {questions.map((_, index) => {
                const isAnswered = answers[index]?.selectedOption !== null
                const canJump = index <= currentQuestion || 
                  questions.slice(0, index).every((_, i) => answers[i]?.selectedOption !== null)
                
                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    disabled={!canJump}
                    className={`w-6 h-6 sm:w-8 sm:h-8 sm:w-10 sm:h-10 rounded-full font-medium transition-colors text-xs sm:text-sm ${
                      index === currentQuestion
                        ? 'bg-[#8b5cf6] text-white'
                        : isAnswered
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : canJump
                        ? 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors text-xs sm:text-sm sm:text-base"
            >
              <span className="hidden sm:inline">{currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}</span>
              <span className="sm:hidden">{currentQuestion === questions.length - 1 ? 'Sub' : 'Next'}</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Alert Modal */}
      <AlertModal
        isOpen={modal.isOpen}
        onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  )
}
