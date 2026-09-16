import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Award,
  ExternalLink,
  Clock,
  GraduationCap,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Building2,
  FileCheck2,
  ArrowRight,
  Printer,
  X,
  Lightbulb,
  Layers,
  FileText,
  Bookmark,
  Info,
  Calculator,
  ListChecks,
  Play,
  Pause,
  ClipboardCheck,
} from 'lucide-react';
import { IGOTCourse, UserProfile } from '../types';
import { COURSE_CURRICULA, CourseCurriculum, CourseModuleLesson } from '../data/courseCurricula';
import { openExternalPortal } from '../utils/linkOpener';

interface CourseStudyClassroomProps {
  course: IGOTCourse;
  currentUser: UserProfile;
  onUpdateCourse: (updated: IGOTCourse) => void;
  onClose: () => void;
  onRetakeAssessment?: () => void;
}

type LessonStage = 'theory' | 'worked_example' | 'field_sop' | 'case_study' | 'quiz';

export const CourseStudyClassroom: React.FC<CourseStudyClassroomProps> = ({
  course,
  currentUser,
  onUpdateCourse,
  onClose,
  onRetakeAssessment,
}) => {
  const curriculum: CourseCurriculum | undefined = COURSE_CURRICULA[course.id];

  // If no detailed curriculum found, fallback gracefully
  const modulesList: CourseModuleLesson[] = curriculum?.modules || [];
  const totalModulesCount = modulesList.length || course.modulesCount || 4;

  // Track completed module IDs in state
  const initialCompletedCount = Math.round(
    ((course.progressPercentage || 0) / 100) * totalModulesCount
  );

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    return modulesList.slice(0, initialCompletedCount).map((m) => m.id);
  });

  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(() => {
    const firstIncomplete = modulesList.findIndex(
      (m) => !modulesList.slice(0, initialCompletedCount).some((c) => c.id === m.id)
    );
    return firstIncomplete >= 0 ? firstIncomplete : 0;
  });

  // 5-Stage stepper inside the active module: 'theory' | 'worked_example' | 'field_sop' | 'case_study' | 'quiz'
  const [activeStage, setActiveStage] = useState<LessonStage>('theory');

  // Time proportionality study timer
  const [unitTimerSeconds, setUnitTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Field SOP checklist reviewed state
  const [checkedSopSteps, setCheckedSopSteps] = useState<Record<string, boolean>>({});

  // Text scale accessibility toggle
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);

  // Quick Reference Sheet Drawer
  const [showQuickRef, setShowQuickRef] = useState<boolean>(false);

  // Knowledge check state for the active module
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  // Toast / notification state inside classroom
  const [progressToast, setProgressToast] = useState<{ message: string; percent: number } | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Active module
  const activeModule: CourseModuleLesson | undefined = modulesList[activeModuleIndex];

  // Calculate current progress percentage
  const currentProgress = Math.min(
    100,
    Math.round((completedModuleIds.length / totalModulesCount) * 100)
  );

  // Reset stage, quiz choice & timer when switching modules
  useEffect(() => {
    setActiveStage('theory');
    setSelectedOption(null);
    setAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setUnitTimerSeconds(0);
    setIsTimerRunning(true);
  }, [activeModuleIndex]);

  // Live ticking reading timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setUnitTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleSopStep = (stepKey: string) => {
    setCheckedSopSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Ensure course is marked enrolled when studying
  useEffect(() => {
    if (!course.isEnrolled) {
      onUpdateCourse({
        ...course,
        isEnrolled: true,
        progressPercentage: Math.max(
          course.progressPercentage || 0,
          Math.round((completedModuleIds.length / totalModulesCount) * 100)
        ),
      });
    }
  }, []);

  const handleOptionSelect = (index: number) => {
    if (answerSubmitted) return;
    setSelectedOption(index);
  };

  const handleVerifyKnowledge = () => {
    if (selectedOption === null || !activeModule) return;
    const correct = selectedOption === activeModule.knowledgeCheck.correctIndex;
    setIsAnswerCorrect(correct);
    setAnswerSubmitted(true);
  };

  const handleMarkModuleComplete = () => {
    if (!activeModule) return;

    let updatedCompleted = completedModuleIds;
    if (!completedModuleIds.includes(activeModule.id)) {
      updatedCompleted = [...completedModuleIds, activeModule.id];
      setCompletedModuleIds(updatedCompleted);
    }

    const newPercentage = Math.min(
      100,
      Math.round((updatedCompleted.length / totalModulesCount) * 100)
    );

    // Update parent course state
    onUpdateCourse({
      ...course,
      isEnrolled: true,
      progressPercentage: newPercentage,
    });

    setProgressToast({
      message: `Unit ${activeModule.moduleNumber} Completed! Course progress updated to ${newPercentage}%.`,
      percent: newPercentage,
    });

    setTimeout(() => {
      setProgressToast(null);
    }, 4500);

    // If more modules exist, prompt or advance to next module after brief interval
    if (activeModuleIndex < modulesList.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    } else if (newPercentage === 100) {
      setShowCertificateModal(true);
    }
  };

  const isCurrentModuleCompleted = activeModule ? completedModuleIds.includes(activeModule.id) : false;

  return (
    <div
      id="course-study-classroom-container"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-start p-2 sm:p-4 md:p-6"
    >
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Government Academy Header Bar */}
        <header className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="study-classroom-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0 cursor-pointer"
              title="Return to previous portal view"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Study Hall</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {course.code}
                </span>
                <span className="text-[11px] font-semibold text-amber-400/90 hidden sm:inline flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  NSSTA Academy • MoSPI
                </span>
                <span className="text-slate-400 text-xs hidden md:inline">•</span>
                <span className="text-slate-300 text-xs hidden md:inline truncate">
                  Competency: <strong>{course.mappedCompetency}</strong>
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white truncate mt-0.5" title={course.title}>
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Quick Reference Button */}
            <button
              type="button"
              onClick={() => setShowQuickRef(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Open quick statistical formula & terminology reference sheet"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Formula Sheet</span>
            </button>

            {/* Font Scale Button */}
            <button
              type="button"
              onClick={() => setIsLargeFont(!isLargeFont)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
              title={isLargeFont ? 'Switch to normal font size' : 'Enlarge reading font size'}
            >
              {isLargeFont ? 'A-' : 'A+'}
            </button>

            {/* Overall Progress Meter */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                  Course Progress
                </div>
                <div className="text-xs font-bold text-emerald-400">
                  {currentProgress}% ({completedModuleIds.length}/{totalModulesCount} Units)
                </div>
              </div>
              <div className="w-16 sm:w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
            </div>

            {/* External iGOT Fallback */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openExternalPortal(
                  course.sourceUrl || 'https://igotkarmayogi.gov.in/',
                  `iGOT Karmayogi: ${course.title}`,
                  e
                );
              }}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
              title="Open official external iGOT Karmayogi catalog page in separate tab"
            >
              <span className="hidden md:inline">iGOT Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close study classroom"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Progress Alert Notification Toast */}
        {progressToast && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center justify-between gap-3 text-emerald-950 text-xs font-medium animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{progressToast.message}</span>
            </div>
            {progressToast.percent === 100 ? (
              <button
                type="button"
                onClick={() => setShowCertificateModal(true)}
                className="font-bold underline text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>Claim Official MoSPI Certificate</span>
              </button>
            ) : (
              <span className="text-[11px] text-emerald-800">
                Continue to the next unit to complete the curriculum!
              </span>
            )}
          </div>
        )}

        {/* Main Content Workspace: Sidebar + Reader */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Module Syllabus Navigator (Left Panel) */}
          <aside className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
            {/* Curriculum Header */}
            <div className="p-4 border-b border-slate-200 bg-white/70">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Curriculum Units
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  {totalModulesCount} Learning Units
                </span>
              </div>
              <h2 className="text-xs font-bold text-slate-900">
                Course Syllabus & Progression
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Study units in sequence. Completing each unit’s checkpoint advances course progress.
              </p>
            </div>

            {/* Units List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-48 md:max-h-full">
              {modulesList.map((mod, idx) => {
                const isCompleted = completedModuleIds.includes(mod.id);
                const isActive = activeModuleIndex === idx;

                return (
                  <button
                    key={mod.id}
                    id={`curriculum-nav-mod-${idx}`}
                    type="button"
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 border cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-200 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50'
                        : 'bg-white border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isActive
                              ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                              : 'border-slate-300 bg-slate-100 text-slate-600'
                          }`}
                        >
                          {mod.moduleNumber}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Unit {mod.moduleNumber}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 flex items-center gap-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {mod.durationMinutes}m
                        </span>
                      </div>
                      <h3
                        className={`text-xs font-semibold leading-snug line-clamp-2 ${
                          isActive ? 'text-indigo-950 font-bold' : 'text-slate-800'
                        }`}
                      >
                        {mod.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-1.5">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed (+{Math.round(100 / totalModulesCount)}%)
                          </span>
                        ) : isActive ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                            In Progress
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">
                            Up Next
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Certification Status Footer Box */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>MoSPI Certification</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {currentProgress}% / 100%
                </span>
              </div>

              {currentProgress === 100 ? (
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Official Certificate</span>
                </button>
              ) : (
                <div className="space-y-1.5">
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Complete remaining {totalModulesCount - completedModuleIds.length} unit
                    {totalModulesCount - completedModuleIds.length !== 1 ? 's' : ''} to unlock your verified training credential.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Module Study Reader Canvas (Right Panel) */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-white flex flex-col">
            {activeModule ? (
              <div className="max-w-3xl mx-auto w-full space-y-6 flex-1">
                {/* Unit Header & Time Proportionality Bar */}
                <div className="border-b border-slate-200 pb-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                        Unit {activeModule.moduleNumber} of {totalModulesCount}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        <span>~{activeModule.durationMinutes} Min Study Unit</span>
                      </span>
                      {activeModule.wordCountEstimate && (
                        <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 hidden sm:inline-flex items-center gap-1">
                          <FileText className="w-3 h-3 text-slate-400" />
                          <span>~{activeModule.wordCountEstimate} Words Academic Standard</span>
                        </span>
                      )}
                    </div>

                    {/* Active Study Session Timer */}
                    <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-mono shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-slate-300 text-[11px]">Time Studied:</span>
                      <span className="font-bold text-amber-300">{formatTimer(unitTimerSeconds)}</span>
                      <span className="text-slate-400 text-[10px]">/ {activeModule.durationMinutes}:00</span>
                      <button
                        type="button"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                        className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                      >
                        {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h2 className={`font-bold text-slate-900 tracking-tight leading-snug ${isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                      {activeModule.title}
                    </h2>
                    <p className={`mt-2 text-slate-600 leading-relaxed ${isLargeFont ? 'text-base' : 'text-sm'}`}>
                      {activeModule.summary}
                    </p>
                  </div>

                  {/* 5-Stage Tab Stepper */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setActiveStage('theory')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeStage === 'theory'
                          ? 'bg-white text-indigo-950 shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="truncate">1. Core Theory</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStage('worked_example')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeStage === 'worked_example'
                          ? 'bg-white text-indigo-950 shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">2. Worked Math</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStage('field_sop')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeStage === 'field_sop'
                          ? 'bg-white text-indigo-950 shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <ListChecks className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">3. Field SOPs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStage('case_study')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeStage === 'case_study'
                          ? 'bg-white text-indigo-950 shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">4. Field Case</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStage('quiz')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer col-span-2 sm:col-span-1 ${
                        activeStage === 'quiz'
                          ? 'bg-white text-indigo-950 shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">5. Checkpoint</span>
                    </button>
                  </div>
                </div>

                {/* STAGE 1: CORE CONCEPTS & THEORY */}
                {activeStage === 'theory' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Fast Takeaways Card */}
                    <div className="bg-indigo-50/70 rounded-xl p-4 sm:p-5 border border-indigo-200/80 space-y-2.5">
                      <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Executive Summary • Key Competencies & Learning Objectives</span>
                      </div>
                      <ul className="space-y-1.5">
                        {activeModule.learningObjectives.map((obj, i) => (
                          <li key={i} className={`flex items-start gap-2 text-indigo-950/90 ${isLargeFont ? 'text-sm' : 'text-xs'}`}>
                            <span className="text-indigo-600 font-bold shrink-0">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                      {activeModule.keySections.map((sec, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className={`font-bold text-slate-900 ${isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                            {sec.heading}
                          </h3>
                          <p className={`text-slate-700 leading-relaxed ${isLargeFont ? 'text-base' : 'text-sm'}`}>
                            {sec.content}
                          </p>

                          {sec.subContent && (
                            <p className={`text-slate-600 leading-relaxed pl-3 border-l-2 border-slate-300 ${isLargeFont ? 'text-base' : 'text-sm'}`}>
                              {sec.subContent}
                            </p>
                          )}

                          {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-indigo-500 space-y-2">
                              {sec.bulletPoints.map((bp, bidx) => (
                                <div
                                  key={bidx}
                                  className={`text-slate-800 flex items-start gap-2 leading-relaxed ${
                                    isLargeFont ? 'text-sm' : 'text-xs sm:text-sm'
                                  }`}
                                >
                                  <span className="text-indigo-600 font-bold shrink-0">•</span>
                                  <span>{bp}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {sec.technicalFormula && (
                            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-slate-800">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
                                <Bookmark className="w-3 h-3" />
                                Technical Mathematical Formulation / Syntax:
                              </div>
                              <pre className="whitespace-pre-wrap">{sec.technicalFormula}</pre>
                            </div>
                          )}

                          {sec.guidelineNote && (
                            <div className="bg-amber-50/80 rounded-xl p-3.5 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-2.5">
                              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-amber-950">MoSPI Circular Standard: </strong>
                                <span>{sec.guidelineNote}</span>
                              </div>
                            </div>
                          )}

                          {sec.statutoryReference && (
                            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                              <Bookmark className="w-3 h-3 text-slate-400" />
                              <span>Statutory Reference: {sec.statutoryReference}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Official Regulatory References Card */}
                    {activeModule.regulatoryReferences && activeModule.regulatoryReferences.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-600" />
                          Official Statutory & Regulatory References
                        </span>
                        <ul className="space-y-1">
                          {activeModule.regulatoryReferences.map((ref, ridx) => (
                            <li key={ridx} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="text-indigo-500 font-semibold">•</span>
                              <span>{ref}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Stage 1 Footer Navigator */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Part 1 of 5: Core Theory
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStage('worked_example')}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Continue to Part 2: Worked Math & Formulations</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 2: WORKED NUMERICAL & METHODOLOGICAL EXAMPLE */}
                {activeStage === 'worked_example' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    {activeModule.workedExample ? (
                      <div className="space-y-6">
                        <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-5 sm:p-6 space-y-4">
                          <div className="flex items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                <Calculator className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-950 block">
                                  Official Computational / Methodological Demonstration
                                </span>
                                <span className="text-[11px] text-amber-800">
                                  Step-by-step statistical calculations and policy justification
                                </span>
                              </div>
                            </div>

                            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                              Part 2: Worked Example
                            </span>
                          </div>

                          <h3 className={`font-bold text-slate-900 ${isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                            {activeModule.workedExample.title}
                          </h3>

                          {/* Scenario */}
                          <div className="bg-white rounded-xl p-4 border border-amber-200/80 space-y-1">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Empirical Scenario & Data Inputs
                            </span>
                            <p className={`text-slate-800 leading-relaxed ${isLargeFont ? 'text-base' : 'text-xs sm:text-sm'}`}>
                              {activeModule.workedExample.scenario}
                            </p>
                          </div>

                          {/* Ordered Computation Steps */}
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                              Ordered Analytical Steps
                            </span>

                            {activeModule.workedExample.steps.map((st, sidx) => (
                              <div key={sidx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
                                <div className="font-bold text-indigo-950 text-xs sm:text-sm flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold shrink-0">
                                    {sidx + 1}
                                  </span>
                                  <span>{st.step}</span>
                                </div>

                                <div className="bg-slate-900 text-amber-300 font-mono text-xs p-3 rounded-lg overflow-x-auto shadow-inner border border-slate-800">
                                  <pre className="whitespace-pre-wrap">{st.computation}</pre>
                                </div>

                                <p className="text-xs text-slate-600 pl-2 border-l-2 border-indigo-200">
                                  <strong className="text-slate-800">Statistical Rationale: </strong>
                                  {st.rationale}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Outcome */}
                          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-1">
                            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Final Policy Outcome & Statistical Conclusion
                            </span>
                            <p className={`text-emerald-950 font-medium leading-relaxed ${isLargeFont ? 'text-base' : 'text-xs sm:text-sm'}`}>
                              {activeModule.workedExample.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-sm">
                        No separate numerical demonstration configured for this unit. Please proceed to Field SOPs.
                      </div>
                    )}

                    {/* Stage 2 Footer Navigator */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveStage('theory')}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Theory</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveStage('field_sop')}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Continue to Part 3: Field SOPs & Scrutiny</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 3: FIELD SOPS & INSPECTION CHECKLIST */}
                {activeStage === 'field_sop' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200 p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            <ListChecks className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 block">
                              Field Standard Operating Procedures & Scrutiny Checklist
                            </span>
                            <span className="text-[11px] text-emerald-800">
                              Mandatory operational compliance steps for field investigators and supervisors
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                          Part 3: SOP Verification
                        </span>
                      </div>

                      <p className={`text-slate-700 leading-relaxed ${isLargeFont ? 'text-base' : 'text-xs sm:text-sm'}`}>
                        Review and verify each mandatory operational check below. Click each checklist item as you review to track your operational mastery:
                      </p>

                      {/* SOP Items */}
                      <div className="space-y-3">
                        {activeModule.fieldSopChecklist && activeModule.fieldSopChecklist.length > 0 ? (
                          activeModule.fieldSopChecklist.map((sop) => {
                            const stepKey = `${activeModule.id}-sop-${sop.stepNo}`;
                            const isChecked = !!checkedSopSteps[stepKey];

                            return (
                              <div
                                key={sop.stepNo}
                                onClick={() => toggleSopStep(stepKey)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                                  isChecked
                                    ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                                      isChecked
                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                        : 'border-slate-300 bg-white'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </div>

                                  <div className="flex-1 space-y-1.5">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                        Step {sop.stepNo}: {sop.activity}
                                      </span>
                                      {isChecked && (
                                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                          Verified
                                        </span>
                                      )}
                                    </div>

                                    <div className="text-xs text-slate-800">
                                      <strong className="text-slate-900">Mandatory Operational Requirement: </strong>
                                      <span>{sop.mandatoryRequirement}</span>
                                    </div>

                                    <div className="text-xs text-amber-950 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/80 flex items-start gap-1.5 mt-1">
                                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                      <div>
                                        <strong>Supervisory Scrutiny Check: </strong>
                                        <span>{sop.scrutinyCheck}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                            Standard field protocol applies as documented in MoSPI Field Administration Guidelines.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 3 Footer Navigator */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveStage('worked_example')}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Worked Math</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveStage('case_study')}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Continue to Part 4: MoSPI Field Case</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 4: MOSPI FIELD APPLICATION & CASE STUDY */}
                {activeStage === 'case_study' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="bg-blue-50/80 rounded-2xl border border-blue-200 p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between gap-2 border-b border-blue-200/80 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block">
                              MoSPI Practical Field Scenario
                            </span>
                            <span className="text-[11px] text-blue-700">
                              Real-world case study based on NSS and national survey fieldwork
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                          {activeModule.officialCaseStudy.statStandard}
                        </span>
                      </div>

                      <h3 className={`font-bold text-slate-900 ${isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                        {activeModule.officialCaseStudy.title}
                      </h3>

                      <div className="space-y-3">
                        <div className="bg-white rounded-xl p-4 border border-blue-100 space-y-1">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Field Background & Context
                          </span>
                          <p className={`text-slate-700 leading-relaxed ${isLargeFont ? 'text-base' : 'text-xs sm:text-sm'}`}>
                            {activeModule.officialCaseStudy.context}
                          </p>
                        </div>

                        <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200 space-y-1">
                          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            The Field Dilemma / Challenge
                          </span>
                          <p className={`text-amber-950 leading-relaxed ${isLargeFont ? 'text-base' : 'text-xs sm:text-sm'}`}>
                            {activeModule.officialCaseStudy.challenge}
                          </p>
                        </div>

                        <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-1">
                          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Official Standard Resolution (Approved Protocol)
                          </span>
                          <p className={`text-emerald-950 leading-relaxed font-medium ${isLargeFont ? 'text-base' : 'text-xs sm:text-sm'}`}>
                            {activeModule.officialCaseStudy.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 4 Footer Navigator */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveStage('field_sop')}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Field SOPs</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveStage('quiz')}
                        className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Proceed to Part 5: Knowledge Check</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 5: KNOWLEDGE CHECKPOINT & COMPLETION */}
                {activeStage === 'quiz' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/30 p-5 sm:p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-indigo-950">
                              Unit {activeModule.moduleNumber} Knowledge Checkpoint
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              Answer this official scenario question to verify comprehension and record progress.
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                          Required for Unit Completion
                        </span>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs">
                        <p className={`font-semibold text-slate-900 leading-snug ${isLargeFont ? 'text-base' : 'text-sm'}`}>
                          {activeModule.knowledgeCheck.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-2.5">
                        {activeModule.knowledgeCheck.options.map((opt, oidx) => {
                          const isSelected = selectedOption === oidx;
                          const isCorrectChoice = oidx === activeModule.knowledgeCheck.correctIndex;

                          let optionStyle =
                            'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                          if (answerSubmitted) {
                            if (isCorrectChoice) {
                              optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                            } else if (isSelected && !isAnswerCorrect) {
                              optionStyle = 'border-red-400 bg-red-50 text-red-950';
                            } else {
                              optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400';
                            }
                          } else if (isSelected) {
                            optionStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold ring-2 ring-indigo-200 shadow-xs';
                          }

                          return (
                            <button
                              key={oidx}
                              type="button"
                              onClick={() => handleOptionSelect(oidx)}
                              disabled={answerSubmitted}
                              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle} ${
                                isLargeFont ? 'text-base' : 'text-xs sm:text-sm'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                                  isSelected
                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Verify Answer Button */}
                      {!answerSubmitted ? (
                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setActiveStage('case_study')}
                            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                          >
                            ← Review Case Study
                          </button>

                          <button
                            type="button"
                            onClick={handleVerifyKnowledge}
                            disabled={selectedOption === null}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Verify Answer</span>
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                            isAnswerCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-amber-50 border-amber-300 text-amber-950'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1.5">
                            {isAnswerCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                                <span>Correct! Verified for statistical accuracy.</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                                <span>Review Recommended. Official Explanation:</span>
                              </>
                            )}
                          </div>
                          <p className="leading-relaxed text-slate-800">
                            {activeModule.knowledgeCheck.explanation}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Unit Completion Action */}
                    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveStage('case_study')}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Review Case Study</span>
                      </button>

                      {isCurrentModuleCompleted ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Unit {activeModule.moduleNumber} Completed (+{Math.round(100 / totalModulesCount)}%)</span>
                          </span>

                          {activeModuleIndex < modulesList.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => setActiveModuleIndex(activeModuleIndex + 1)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <span>Next: Unit {activeModule.moduleNumber + 1}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setShowCertificateModal(true)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>View Certificate</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          id="study-mark-complete-btn"
                          type="button"
                          onClick={handleMarkModuleComplete}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                          title="Save this unit as completed and update your course progress"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>
                            Complete Unit {activeModule.moduleNumber} & Record Progress (+{Math.round(100 / totalModulesCount)}%)
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 my-auto">
                <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <p>Select a module from the curriculum menu to begin studying.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* QUICK REFERENCE FORMULA & TERMINOLOGY MODAL */}
      {showQuickRef && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in duration-150">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm">
                  Formula & Terminology Reference Sheet • {course.code}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickRef(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-950">
                <span className="font-bold">Competency Field: </span>
                <span>{course.mappedCompetency}</span>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Technical Specifications Across Units
                </h4>
                {modulesList.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-800 text-xs block">
                      Unit {m.moduleNumber}: {m.title}
                    </span>
                    {m.keySections
                      .filter((s) => s.technicalFormula)
                      .map((s, si) => (
                        <div key={si} className="bg-slate-900 text-amber-300 font-mono text-xs p-2.5 rounded-lg">
                          <span className="text-[10px] text-slate-400 block mb-0.5">{s.heading}</span>
                          <pre className="whitespace-pre-wrap">{s.technicalFormula}</pre>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowQuickRef(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                Return to Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL COMPLETION CERTIFICATE MODAL */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-4 border-amber-400 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative overflow-hidden my-auto">
            {/* Background Watermark */}
            <div className="absolute right-2 bottom-2 opacity-[0.04] pointer-events-none">
              <Award className="w-80 h-80 text-amber-950" />
            </div>

            {/* Header with National Emblem / Academy Banner */}
            <div className="text-center space-y-2 border-b border-amber-200 pb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-amber-700" />
                Ministry of Statistics & Programme Implementation (MoSPI)
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Certificate of Competency Completion
              </h2>
              <p className="text-xs text-slate-600">
                National Statistical Systems Training Academy (NSSTA) • Mission Karmayogi
              </p>
            </div>

            {/* Recipient Details */}
            <div className="text-center space-y-4 py-1">
              <p className="text-xs sm:text-sm text-slate-600">This is to officially certify that</p>
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-950 tracking-tight underline decoration-amber-400 decoration-2 underline-offset-4">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentUser.designation} • {currentUser.division}
                <br />
                Employee Verification Code: <span className="font-mono font-bold text-slate-800">{currentUser.employeeCode}</span>
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-w-lg mx-auto space-y-2">
                <p className="text-xs text-slate-500">
                  has successfully studied, completed all practical units, and verified competency in:
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {course.title}
                </p>
                <div className="pt-1 flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Status: 100% Curriculum Completed
                  </span>
                  <span className="text-[11px] font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    FRAC Competency: {course.mappedCompetency}
                  </span>
                </div>
              </div>
            </div>

            {/* Authority Footer & Verification */}
            <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
              <div className="text-center sm:text-left">
                <div>Issuing Authority: <strong>NSSTA, Greater Noida</strong></div>
                <div>Credential ID: <span className="font-mono font-bold text-slate-700">{course.code}-2026-CERT</span></div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Print or save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>

                {onRetakeAssessment && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowCertificateModal(false);
                      onClose();
                      onRetakeAssessment();
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    title="Take the diagnostic assessment again to verify that your competency gap is closed"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
