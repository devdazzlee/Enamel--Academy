 "use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft,
  Target,
  TrendingUp,
  FileText,
  Calendar,
  Eye,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle
} from 'lucide-react';

export default function PDPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pdpName: '',
    startDate: '',
    endDate: '',
    careerObjectives: [''],
    currentSkills: [{ skill: '', level: 'Advanced' }],
    skillsToDevelop: [{ skill: '', target: 'Advanced' }],
    selectedCourses: [],
    additionalResources: '',
    duration: '',
    milestones: [
      { quarter: 'Q1 2025', goal: 'Complete Endodontics course' },
      { quarter: 'Q2 2025', goal: 'Finish Digital Smile Design' }
    ],
    assessmentMethods: [],
    successCriteria: ['Complete 50 CPD hours', 'Obtain 2 new certifications']
  });

  const steps = [
    { number: 1, title: 'Career Objectives', icon: <Target size={20} />, completed: false },
    { number: 2, title: 'Skills Assessment', icon: <TrendingUp size={20} />, completed: false },
    { number: 3, title: 'Learning Plan', icon: <FileText size={20} />, completed: false },
    { number: 4, title: 'Timeline', icon: <Calendar size={20} />, completed: false },
    { number: 5, title: 'Review Criteria', icon: <Eye size={20} />, completed: false }
  ];

  const dentalSpecialties = [
    'Endodontics',
    'Implantology',
    'Prosthodontics',
    'Orthodontics',
    'Periodontics',
    'Oral Surgery',
    'Aesthetic Dentistry',
    'Pediatric Dentistry',
    'Restorative Dentistry',
    'Digital Dentistry'
  ];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  
  const courses = [
    'Advanced Endodontics Masterclass',
    'Digital Smile Design Workshop',
    'Implantology Certification Program',
    'Aesthetic Dentistry Techniques',
    'Modern Prosthodontics Course',
    'Orthodontic Biomechanics',
    'Periodontal Surgery Advanced',
    'Pediatric Behavior Management',
    'CAD/CAM Technology in Dentistry',
    'Cone Beam CT Interpretation'
  ];

  const durations = ['3 Months', '6 Months', '12 Months', '24 Months'];

  const assessmentOptions = [
    'Course completion certificates',
    'Practical skills assessment',
    'Case study presentations',
    'Peer review feedback',
    'Patient satisfaction surveys',
    'CPD hours tracking',
    'Portfolio of completed cases',
    'Competency-based evaluation'
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addObjective = () => {
    setFormData({
      ...formData,
      careerObjectives: [...formData.careerObjectives, '']
    });
  };

  const removeObjective = (index) => {
    const newObjectives = formData.careerObjectives.filter((_, i) => i !== index);
    setFormData({ ...formData, careerObjectives: newObjectives });
  };

  const addCurrentSkill = () => {
    setFormData({
      ...formData,
      currentSkills: [...formData.currentSkills, { skill: '', level: 'Advanced' }]
    });
  };

  const addSkillToDevelop = () => {
    setFormData({
      ...formData,
      skillsToDevelop: [...formData.skillsToDevelop, { skill: '', target: 'Advanced' }]
    });
  };

  const toggleCourse = (course) => {
    const isSelected = formData.selectedCourses.includes(course);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedCourses: formData.selectedCourses.filter(c => c !== course)
      });
    } else {
      setFormData({
        ...formData,
        selectedCourses: [...formData.selectedCourses, course]
      });
    }
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { quarter: '', goal: '' }]
    });
  };

  const removeMilestone = (index) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({ ...formData, milestones: newMilestones });
  };

  const toggleAssessment = (method) => {
    const isSelected = formData.assessmentMethods.includes(method);
    if (isSelected) {
      setFormData({
        ...formData,
        assessmentMethods: formData.assessmentMethods.filter(m => m !== method)
      });
    } else {
      setFormData({
        ...formData,
        assessmentMethods: [...formData.assessmentMethods, method]
      });
    }
  };

  const addSuccessCriteria = () => {
    setFormData({
      ...formData,
      successCriteria: [...formData.successCriteria, '']
    });
  };

  const removeSuccessCriteria = (index) => {
    const newCriteria = formData.successCriteria.filter((_, i) => i !== index);
    setFormData({ ...formData, successCriteria: newCriteria });
  };

  useEffect(() => {
    const stepParam = searchParams.get('step');
    const parsed = stepParam ? parseInt(stepParam, 10) : NaN;
    if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 5) {
      setCurrentStep(parsed);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button onClick={() => router.push('/pdp')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            Create New Personal Development Plan
          </h1>
          <p className="text-gray-600">Plan your professional development journey</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg p-8 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      currentStep === step.number 
                        ? 'bg-purple-600 text-white' 
                        : currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle size={24} /> : step.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep === step.number ? 'text-purple-700' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Step 1: Career Objectives */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Career Objectives</h2>
                  <p className="text-gray-600">Define your professional goals in dental practice</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PDP Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2025 Professional Development Plan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.pdpName}
                    onChange={(e) => setFormData({ ...formData, pdpName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Career Objectives
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    What dental specialties or skills do you want to develop?
                  </p>
                  {formData.careerObjectives.map((objective, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <select
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={objective}
                        onChange={(e) => {
                          const newObjectives = [...formData.careerObjectives];
                          newObjectives[index] = e.target.value;
                          setFormData({ ...formData, careerObjectives: newObjectives });
                        }}
                      >
                        <option value="">Select a dental specialty</option>
                        {dentalSpecialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeObjective(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addObjective}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Objective
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills Assessment */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Skills Assessment</h2>
                  <p className="text-gray-600">Evaluate your current skills and identify areas for growth</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Current Skills</h3>
                  <p className="text-sm text-gray-600 mb-4">List your current dental skills and proficiency levels</p>
                  {formData.currentSkills.map((skill, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <select
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={skill.skill}
                        onChange={(e) => {
                          const newSkills = [...formData.currentSkills];
                          newSkills[index].skill = e.target.value;
                          setFormData({ ...formData, currentSkills: newSkills });
                        }}
                      >
                        <option value="">Select Skill</option>
                        {dentalSpecialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                      <select
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={skill.level}
                        onChange={(e) => {
                          const newSkills = [...formData.currentSkills];
                          newSkills[index].level = e.target.value;
                          setFormData({ ...formData, currentSkills: newSkills });
                        }}
                      >
                        {skillLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const newSkills = formData.currentSkills.filter((_, i) => i !== index);
                          setFormData({ ...formData, currentSkills: newSkills });
                        }}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addCurrentSkill}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Current Skill
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Skills to Develop</h3>
                  <p className="text-sm text-gray-600 mb-4">Identify skills you want to improve and your target proficiency</p>
                  {formData.skillsToDevelop.map((skill, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <select
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={skill.skill}
                        onChange={(e) => {
                          const newSkills = [...formData.skillsToDevelop];
                          newSkills[index].skill = e.target.value;
                          setFormData({ ...formData, skillsToDevelop: newSkills });
                        }}
                      >
                        <option value="">Select Skill</option>
                        {dentalSpecialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                      <select
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={skill.target}
                        onChange={(e) => {
                          const newSkills = [...formData.skillsToDevelop];
                          newSkills[index].target = e.target.value;
                          setFormData({ ...formData, skillsToDevelop: newSkills });
                        }}
                      >
                        {skillLevels.map(level => (
                          <option key={level} value={`Target: ${level}`}>Target: {level}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const newSkills = formData.skillsToDevelop.filter((_, i) => i !== index);
                          setFormData({ ...formData, skillsToDevelop: newSkills });
                        }}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSkillToDevelop}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Skill to Develop
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Learning Plan */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Learning Plan</h2>
                  <p className="text-gray-600">Select courses and learning activities to achieve your goals</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Select Courses</h3>
                  <p className="text-sm text-gray-600 mb-4">Choose the courses you want to include in your learning plan</p>
                  <div className="grid grid-cols-2 gap-3">
                    {courses.map((course) => (
                      <label key={course} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedCourses.includes(course)}
                          onChange={() => toggleCourse(course)}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-700">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Additional Resources</h3>
                  <textarea
                    placeholder="Journal subscriptions, mentorship programs, clinical practice hours..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="4"
                    value={formData.additionalResources}
                    onChange={(e) => setFormData({ ...formData, additionalResources: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Timeline & Milestones */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Timeline & Milestones</h2>
                  <p className="text-gray-600">Set deadlines and track your progress</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  >
                    <option value="">Select Duration</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Milestones</h3>
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Q1 2025"
                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={milestone.quarter}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index].quarter = e.target.value;
                          setFormData({ ...formData, milestones: newMilestones });
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Complete Endodontics course"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={milestone.goal}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index].goal = e.target.value;
                          setFormData({ ...formData, milestones: newMilestones });
                        }}
                      />
                      <button
                        onClick={() => removeMilestone(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addMilestone}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Milestone
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Reflection */}
          {currentStep === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Eye size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Review & Reflection</h2>
                  <p className="text-gray-600">Evaluate your progress and adjust your plan</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Assessment Methods</h3>
                  <p className="text-sm text-gray-600 mb-4">Select how you'll evaluate your progress</p>
                  <div className="grid grid-cols-2 gap-3">
                    {assessmentOptions.map((method) => (
                      <label key={method} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.assessmentMethods.includes(method)}
                          onChange={() => toggleAssessment(method)}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Success Criteria</h3>
                  <p className="text-sm text-gray-600 mb-3">Define specific outcomes that indicate success</p>
                  {formData.successCriteria.map((criteria, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Complete 50 CPD hours"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={criteria}
                        onChange={(e) => {
                          const newCriteria = [...formData.successCriteria];
                          newCriteria[index] = e.target.value;
                          setFormData({ ...formData, successCriteria: newCriteria });
                        }}
                      />
                      <button
                        onClick={() => removeSuccessCriteria(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSuccessCriteria}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Success Criteria
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            {currentStep === 5 ? (
              <button
                onClick={() => router.push('/pdp?view=detail')}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}