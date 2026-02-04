"use client"

import React, { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Settings, Maximize2, ChevronDown, ChevronRight, Check, CheckCircle } from "lucide-react"
import { useApp } from "@/lib/app-context"
import ReactPlayer from "react-player"

export default function CoursePlayerPage() {
  const params = useParams()
  const router = useRouter()
  const { courses } = useApp()
  const courseId = params.courseId as string

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["section1"])
  const [playbackRate, setPlaybackRate] = useState(1)
  
  const playerRef = useRef<HTMLVideoElement>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  const course = courses.find(c => c.id === courseId)
  
  if (!course) {
    return <div>Course not found</div>
  }

  const totalDuration = 15 * 60 // 15 minutes in seconds
  const currentLesson = {
    title: "Initial Patient Assessment",
    section: "Section 2: Emergency Assessment",
    duration: "15:30"
  }

  const courseContent = [
    {
      id: "section1",
      title: "Introduction to Medical Emergencies",
      lessons: [
        { id: "1", title: "Course Overview and Objectives", duration: "8:24", completed: true },
        { id: "2", title: "Types of Medical Emergencies", duration: "12:15", completed: true }
      ]
    },
    {
      id: "section2",
      title: "Emergency Assessment",
      lessons: [
        { id: "3", title: "Initial Patient Assessment", duration: "15:30", completed: false, current: true },
        { id: "4", title: "Vital Signs Monitoring", duration: "10:45", completed: false }
      ]
    },
    {
      id: "section3",
      title: "Basic Life Support",
      lessons: [
        { id: "5", title: "CPR Fundamentals", duration: "18:20", completed: false },
        { id: "6", title: "AED Usage", duration: "12:30", completed: false }
      ]
    },
    {
      id: "section4",
      title: "Specific Emergency Situations",
      lessons: [
        { id: "7", title: "Managing Syncope", duration: "18:45", completed: false },
        { id: "8", title: "Anaphylaxis Management", duration: "15:20", completed: false }
      ]
    }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const handlePlayPause = () => {
    const video = playerRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSkipBack = () => {
    const video = playerRef.current
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10)
    }
  }

  const handleSkipForward = () => {
    const video = playerRef.current
    if (video) {
      video.currentTime = Math.min(duration, video.currentTime + 10)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    const video = playerRef.current
    if (video) {
      video.volume = newVolume
      video.muted = newVolume === 0
    }
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleMuteToggle = () => {
    const video = playerRef.current
    if (video) {
      video.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = playerRef.current
    if (video) {
      const newTime = (parseFloat(e.target.value) / 100) * duration
      video.currentTime = newTime
    }
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement && playerContainerRef.current) {
      playerContainerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleProgress = (progress: { played: number; playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#333] gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-[#8b5cf6] hover:text-[#a78bfa] transition-colors text-sm sm:text-base"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="hidden sm:inline">Back to Course</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-base sm:text-xl font-semibold leading-tight overflow-hidden flex-1 min-w-0 px-2" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>{course.title}</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="w-full sm:w-48 bg-[#333] rounded-full h-2">
            <div className="bg-[#8b5cf6] h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }} />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span>{course.progress}% complete</span>
            <span>1 of {course.lessons} lessons</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Video Player Section */}
        <main className="flex-1 flex flex-col">
          {/* Video Player */}
          <div ref={playerContainerRef} className="relative bg-black aspect-video">
            <video
              ref={playerRef}
              className="w-full h-full"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={handleEnded}
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay Play Button */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                onClick={handlePlayPause}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#8b5cf6] rounded-full flex items-center justify-center hover:bg-[#7c3aed] transition-colors">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="bg-[#2a2a2a] px-3 sm:px-6 py-2 sm:py-4">
            {/* Primary Controls Row */}
            <div className="flex items-center gap-2 sm:gap-4 mb-3">
              <SkipBack 
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-white transition-colors flex-shrink-0" 
                onClick={handleSkipBack}
              />
              <button 
                onClick={handlePlayPause}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center hover:bg-[#7c3aed] transition-colors flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" />
                )}
              </button>
              <SkipForward 
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-white transition-colors flex-shrink-0"
                onClick={handleSkipForward}
              />
              
              {/* Progress Bar */}
              <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0 px-2">
                <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap flex-shrink-0">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-[#333] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#8b5cf6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer min-w-[20px]"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${progress}%, #333 ${progress}%, #333 100%)`
                  }}
                />
                <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap flex-shrink-0">{formatTime(duration)}</span>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
                <button 
                  onClick={handleMuteToggle}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="hidden sm:block w-20 h-1 bg-[#333] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-[#8b5cf6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="relative">
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  {showSettings && (
                    <div className="absolute bottom-8 right-0 bg-[#333] rounded-lg p-2 min-w-[120px] sm:min-w-[150px] z-50">
                      <div className="text-xs text-gray-400 mb-2">Playback Speed</div>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => {
                            setPlaybackRate(rate)
                            setShowSettings(false)
                          }}
                          className={`block w-full text-left px-2 py-1 text-xs sm:text-sm rounded hover:bg-[#444] ${
                            playbackRate === rate ? 'bg-[#8b5cf6] text-white' : 'text-gray-300'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Maximize2 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-white transition-colors p-1"
                  onClick={handleFullscreen}
                />
              </div>
            </div>
            
            {/* Lesson Info */}
            <div className="border-t border-[#444] pt-2 mt-2">
              <h3 className="text-sm sm:text-base font-medium mb-1 truncate pr-2">{currentLesson.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 truncate pr-2">{currentLesson.section}</p>
            </div>
          </div>

          {/* Mark Complete Button */}
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 justify-center sm:justify-start text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Mark Lesson as Complete
            </button>
          </div>
        </main>

        {/* Course Content Sidebar */}
        <aside className="w-full lg:w-96 bg-[#2a2a2a] border-t lg:border-t-0 lg:border-l border-[#333] overflow-y-auto max-h-96 lg:max-h-none">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Course Content</h2>
            
            <div className="space-y-3 sm:space-y-4">
              {courseContent.map((section) => (
                <div key={section.id} className="border border-[#333] rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between hover:bg-[#333] transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      {expandedSections.includes(section.id) ? (
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm sm:text-base truncate">{section.title}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">{section.lessons.length} lessons</span>
                  </button>
                  
                  {expandedSections.includes(section.id) && (
                    <div className="border-t border-[#333]">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between hover:bg-[#333] transition-colors ${
                            lesson.current ? 'bg-[#8b5cf6]/20 border-l-2 border-[#8b5cf6]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            ) : lesson.current ? (
                              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#8b5cf6] rounded-full flex items-center justify-center flex-shrink-0">
                                <Play className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 sm:w-5 sm:h-5 border border-gray-500 rounded-full flex-shrink-0" />
                            )}
                            <span className={`text-xs sm:text-sm ${lesson.current ? 'text-[#8b5cf6]' : 'text-gray-300'} truncate`}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => router.push(`/course/${courseId}/assessment`)}
              className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Take Assessment
            </button>
            
            <button className="w-full mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-colors text-sm sm:text-base">
              Download Certificate
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
