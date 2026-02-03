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
    },
    {
      id: 5,
      question: "What is the maximum recommended dose of local anesthetic with epinephrine for a healthy adult?",
      options: [
        "2 mg articaine",
        "4 mg articaine",
        "7 mg articaine",
        "10 mg articaine"
      ],
      correctAnswer: 2,
      explanation: "The maximum recommended dose of articaine with epinephrine for a healthy adult is 7 mg (approximately 7 cartridges of 1.8 mL)."
    },
    {
      id: 6,
      question: "Which vital sign change is most indicative of early respiratory distress?",
      options: [
        "Blood pressure increase",
        "Heart rate elevation",
        "Oxygen saturation below 95%",
        "Temperature elevation"
      ],
      correctAnswer: 2,
      explanation: "Oxygen saturation below 95% is an early indicator of respiratory compromise and should be monitored closely in all dental patients."
    },
    {
      id: 7,
      question: "What is the appropriate position for a patient experiencing syncope in the dental chair?",
      options: [
        "Upright position",
        "Supine with legs elevated",
        "Left lateral position",
        "Semi-reclined position"
      ],
      correctAnswer: 1,
      explanation: "Supine position with legs elevated (Trendelenburg position) improves cerebral blood flow and helps resolve syncope quickly."
    },
    {
      id: 8,
      question: "Which medication should be readily available for managing acute asthma attacks in dental practice?",
      options: [
        "Epinephrine auto-injector",
        "Albuterol inhaler",
        "Nitroglycerin spray",
        "Aspirin tablets"
      ],
      correctAnswer: 1,
      explanation: "Albuterol (salbutamol) inhaler is the rescue medication for acute asthma attacks, providing rapid bronchodilation."
    },
    {
      id: 9,
      question: "What is the maximum dose of epinephrine for local anesthetic in patients with cardiovascular disease?",
      options: [
        "0.04 mg",
        "0.2 mg",
        "0.4 mg",
        "1.0 mg"
      ],
      correctAnswer: 0,
      explanation: "Patients with cardiovascular disease should receive no more than 0.04 mg of epinephrine to avoid cardiac complications."
    },
    {
      id: 10,
      question: "Which sign is most specific for angina pectoris during dental treatment?",
      options: [
        "Sharp, stabbing pain",
        "Pain relieved by nitroglycerin",
        "Pain worsened by palpation",
        "Pain associated with swallowing"
      ],
      correctAnswer: 1,
      explanation: "Angina pain is typically relieved by nitroglycerin within 1-3 minutes, which is a key diagnostic feature."
    },
    {
      id: 11,
      question: "What is the first-line treatment for a patient experiencing a seizure in the dental office?",
      options: [
        "Administer diazepam",
        "Protect from injury and maintain airway",
        "Apply restraints",
        "Call emergency services immediately"
      ],
      correctAnswer: 1,
      explanation: "The priority is to protect the patient from injury and maintain a patent airway. Most seizures are self-limiting and don't require immediate medication."
    },
    {
      id: 12,
      question: "Which condition requires immediate medical attention and postponement of dental treatment?",
      options: [
        "Controlled hypertension",
        "Recent myocardial infarction (within 6 months)",
        "Well-managed diabetes",
        "Stable angina"
      ],
      correctAnswer: 1,
      explanation: "Recent myocardial infarction within 6 months is a contraindication for elective dental treatment due to the high risk of cardiac complications."
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
        <header className="bg-[#8b5cf6] text-white px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleExit}
                className="flex items-center gap-2 text-white hover:text-[#e0e7ff] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Exit Assessment
              </button>
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Assessment Results</h1>
                <p className="text-[#e0e7ff]">{course.title}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{score}/{questions.length} Correct</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Assessment Summary */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 rounded-md font-semibold text-lg mb-4 ${
                passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                Assessment {passed ? 'Passed' : 'Not Passed'}
              </div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                You scored {percentage.toFixed(0)}%. You need {80}% to pass.
              </p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">{percentage.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Your Score</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">{score}/{questions.length}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">80%</div>
                <div className="text-sm text-gray-600">Pass Mark</div>
              </div>
            </div>

            <div className="text-center text-gray-600 mb-8">
              Don't worry! Review the course materials and try again. There's no limit to the number of attempts.
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {passed ? (
                <button
                  onClick={() => router.push(`/course/${courseId}/reflection`)}
                  className="w-full px-6 py-3 bg-[#7c3aed] text-white rounded-md font-medium hover:bg-[#6d28d9] transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Reflection
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={handleExit}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
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
                    className="px-6 py-2 bg-[#6366f1] text-white rounded-md font-medium hover:bg-[#5558e3] transition-colors"
                  >
                    Retake Assessment
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Answer Review Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Answer Review</h2>
            <p className="text-gray-600 mb-6">Review your answers and explanations.</p>
            
            <div className="space-y-6">
              {questions.map((question, index) => {
                const answer = answers.find(a => a.questionId === question.id)
                const isCorrect = answer?.selectedOption === question.correctAnswer
                const userAnswerIndex = answer?.selectedOption
                
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Q{index + 1} {question.question}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
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
                            className={`p-3 rounded-lg border ${
                              isCorrectOption
                                ? 'bg-green-50 border-green-200'
                                : isUserOption && !isCorrect
                                ? 'bg-red-50 border-red-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900">{option}</span>
                              {isCorrectOption && (
                                <span className="text-sm font-medium text-green-700">Correct</span>
                              )}
                              {isUserOption && !isCorrect && (
                                <span className="text-sm font-medium text-red-700">Your Answer</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-blue-800 text-sm">{question.explanation}</p>
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
      <header className="bg-[#8b5cf6] text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleExit}
              className="flex items-center gap-2 hover:text-[#e0e7ff] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Exit Assessment
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Course Assessment</h1>
              <p className="text-[#e0e7ff]">{course.title}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{answeredCount}/{questions.length} Answered</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
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
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-6 mt-6 max-w-4xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
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
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#8b5cf6]">Question {currentQuestion + 1}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAnswered 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {isAnswered ? 'Answered' : 'Not answered'}
              </span>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                {currentQuestionData.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    currentAnswer?.selectedOption === index
                      ? 'border-[#8b5cf6] bg-[#f3f4ff] text-[#8b5cf6] font-medium'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      currentAnswer?.selectedOption === index
                        ? 'border-[#8b5cf6] bg-[#8b5cf6]'
                        : 'border-gray-300'
                    }`}>
                      {currentAnswer?.selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Pagination */}
      <footer className="bg-gray-100 px-6 py-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-2">
              {questions.map((_, index) => {
                const isAnswered = answers[index]?.selectedOption !== null
                const canJump = index <= currentQuestion || 
                  questions.slice(0, index).every((_, i) => answers[i]?.selectedOption !== null)
                
                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    disabled={!canJump}
                    className={`w-10 h-10 rounded-full font-medium transition-colors ${
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
              className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              <ChevronRight className="w-4 h-4" />
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
