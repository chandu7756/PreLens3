import React, { useEffect, useState } from 'react';
import {
  QuizAttempt,
  IGOTCourse,
  ActiveTab,
} from '../types';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Award,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldAlert,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Lightbulb,
  Building2,
  Layers,
  Check,
  MessageCircle,
  Bot,
  Bookmark,
  StickyNote,
  FileCode2,
  Circle,
  X,
  Send,
  LoaderCircle,
} from 'lucide-react';
import { openExternalPortal } from '../utils/linkOpener';
import { IGOT_OFFICIAL_URL } from '../data/nsstaData';
import { COURSE_CURRICULA } from '../data/courseCurricula';

interface CompetencyGapAnalysisProps {
  latestAttempt: QuizAttempt | null;
  courses: IGOTCourse[];
  onUpdateCourse?: (updated: IGOTCourse) => void;
  onStartStudyCourse?: (course: IGOTCourse) => void;
  onNavigateToCourses: (suggestedCompetency?: string) => void;
  onRetakeAssessment: () => void;
}

export const CompetencyGapAnalysis: React.FC<CompetencyGapAnalysisProps> = ({
  latestAttempt,
  courses,
  onUpdateCourse,
  onStartStudyCourse,
  onNavigateToCourses,
  onRetakeAssessment,
}) => {
  const [enrolledNotice, setEnrolledNotice] = useState<{
    title: string;
    courseId: string;
  } | null>(null);

  // Expanded syllabus accordion for gap cards
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);
  const [completedGapNames, setCompletedGapNames] = useState<Set<string>>(new Set());
  const [bookmarkedGapNames, setBookmarkedGapNames] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('preplens-saved-gaps') || '[]'));
    } catch {
      return new Set();
    }
  });
  const [gapNotes, setGapNotes] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('preplens-gap-notes') || '{}');
    } catch {
      return {};
    }
  });
  const [noteContext, setNoteContext] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [roadmapView, setRoadmapView] = useState<'overview' | 'topics' | 'resources'>('overview');
  const [mentorContext, setMentorContext] = useState<{
    mode: 'discussion' | 'coach';
    competency: string;
    score: number;
    currentLevel: number;
    requiredLevel: number;
  } | null>(null);
  const [mentorMessages, setMentorMessages] = useState<{ role: 'mentor' | 'learner'; text: string }[]>([]);
  const [mentorInput, setMentorInput] = useState('');
  const [isMentorLoading, setIsMentorLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('preplens-saved-gaps', JSON.stringify([...bookmarkedGapNames]));
  }, [bookmarkedGapNames]);

  useEffect(() => {
    localStorage.setItem('preplens-gap-notes', JSON.stringify(gapNotes));
  }, [gapNotes]);

  const toggleSyllabus = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSyllabusId((prev) => (prev === courseId ? null : courseId));
  };

  const toggleGapSet = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    competencyName: string
  ) => {
    setter((previous) => {
      const next = new Set(previous);
      if (next.has(competencyName)) next.delete(competencyName);
      else next.add(competencyName);
      return next;
    });
  };

  const requestMentorReply = async (
    context: NonNullable<typeof mentorContext>,
    question = ''
  ) => {
    setIsMentorLoading(true);
    try {
      const response = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...context, question }),
      });
      const data = await response.json();
      setMentorMessages((previous) => [...previous, { role: 'mentor', text: data.reply || 'I could not prepare a response just now. Try again.' }]);
    } catch {
      setMentorMessages((previous) => [...previous, {
        role: 'mentor',
        text: 'The mentor service is temporarily unavailable. Review the linked course modules and try asking again in a moment.',
      }]);
    } finally {
      setIsMentorLoading(false);
    }
  };

  const openMentor = async (
    mode: 'discussion' | 'coach',
    competency: string,
    stat: CompetencyStat
  ) => {
    const context = {
      mode,
      competency,
      score: stat.percentage,
      currentLevel: stat.currentLevel ?? 1,
      requiredLevel: stat.requiredLevel ?? 4,
    };
    setMentorContext(context);
    setMentorMessages([]);
    await requestMentorReply(context);
  };

  const submitMentorMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const question = mentorInput.trim();
    if (!question || !mentorContext || isMentorLoading) return;
    setMentorInput('');
    setMentorMessages((previous) => [...previous, { role: 'learner', text: question }]);
    await requestMentorReply(mentorContext, question);
  };

  const openNotes = (competencyName: string) => {
    setNoteContext(competencyName);
    setNoteDraft(gapNotes[competencyName] || '');
  };

  const saveNote = () => {
    if (!noteContext) return;
    setGapNotes((previous) => ({ ...previous, [noteContext]: noteDraft.trim() }));
    setNoteContext(null);
  };

  const handleCourseAction = (course: IGOTCourse, e: React.MouseEvent) => {
    e.stopPropagation();
    const isEnrolledAlready = course.isEnrolled;

    const updatedCourse: IGOTCourse = {
      ...course,
      isEnrolled: true,
      progressPercentage: course.progressPercentage ?? 0,
    };

    if (!isEnrolledAlready && onUpdateCourse) {
      onUpdateCourse(updatedCourse);
    }

    setEnrolledNotice({
      title: course.title,
      courseId: course.id,
    });

    setTimeout(() => {
      setEnrolledNotice(null);
    }, 5000);

    // Open Interactive Course Study Classroom in-app where progress actually happens!
    if (onStartStudyCourse) {
      onStartStudyCourse(updatedCourse);
    } else {
      const targetUrl = course.sourceUrl || IGOT_OFFICIAL_URL;
      openExternalPortal(
        targetUrl,
        `iGOT Karmayogi: ${course.title}`,
        e
      );
    }
  };

  if (!latestAttempt) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-4">
        <TrendingUp className="w-10 h-10 mx-auto text-indigo-500" />
        <h2 className="text-lg font-bold text-slate-900">
          No Assessment Evaluated Yet
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Take one of the assigned MoSPI competency assessments to generate a real-time gap analysis and personalized training roadmap.
        </p>
        <button
          type="button"
          onClick={onRetakeAssessment}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
        >
          <span>Start Diagnostic Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  type CompetencyStat = {
    total: number;
    correct: number;
    percentage: number;
    isGap: boolean;
    currentLevel?: number;
    requiredLevel?: number;
    gapLevels?: number;
    priority?: 'High' | 'Medium' | 'Low';
    recommendationReason?: string;
  };

  const breakdownEntries = Object.entries(latestAttempt.competencyBreakdown) as [string, CompetencyStat][];
  const criticalGaps = breakdownEntries.filter(([_, stats]) => stats.isGap);
  const proficientCompetencies = breakdownEntries.filter(([_, stats]) => !stats.isGap);

  return (
    <div id="competency-gap-analysis-container" className="space-y-6">
      {/* Top Diagnostic Summary Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              National Statistical Capacity Diagnostic (FRAC Framework)
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Competency Gap Analysis & Learning Pathways
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Based on your latest assessment for <strong>{latestAttempt.roleName}</strong>, our diagnostic engine mapped your strengths and identified target competencies requiring capacity building.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Overall Score
              </span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">
                {latestAttempt.scorePercentage}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {latestAttempt.scorePercentage >= 70 ? 'Benchmark Passed' : 'Below 70% Target'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Skill Gaps
              </span>
              <span className={`text-lg font-extrabold font-mono ${
                criticalGaps.length > 0 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {criticalGaps.length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {criticalGaps.length > 0 ? 'Action Needed' : 'Benchmark Met'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Gap Alert & Interactive Remediation Section */}
      {criticalGaps.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-amber-950">
                  Capacity Building Required: {criticalGaps.length} Competency Gap{criticalGaps.length !== 1 ? 's' : ''} Below 70% Benchmark
                </h3>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  MoSPI Training Directive
                </span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                As per MoSPI statistical guidelines, scores below the 70% benchmark require targeted study. You can study official NSSTA modules directly in the <strong>In-App Study Classroom</strong> to close your gap and verify mastery.
              </p>
            </div>
          </div>

          {/* How In-App Training Works Guidance Box */}
          <div className="bg-white/90 rounded-xl p-3.5 border border-amber-200/90 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-[11px] uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>How to Close Your Competency Gap in 4 Easy Steps:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-indigo-950 block mb-0.5">1. Enroll & Study</strong>
                <span>Click &quot;Enroll &amp; Enter Study Hall&quot; to begin in-app lessons without leaving the portal.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-indigo-950 block mb-0.5">2. Read & Analyze</strong>
                <span>Review official MoSPI directives, formula sheets, and practical field case studies.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-indigo-950 block mb-0.5">3. Pass Checkpoints</strong>
                <span>Verify each unit via quick 1-question scenario checks to build progress (+25% each).</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-indigo-950 block mb-0.5">4. Certify & Re-Test</strong>
                <span>Earn your official MoSPI Certificate at 100% and retake the diagnostic to close your gap!</span>
              </div>
            </div>
          </div>

          {/* Roadmap-style skill gap tracker */}
          <div className="relative rounded-xl border border-sky-900/80 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_34%),linear-gradient(135deg,#0b1328_0%,#101e3c_55%,#0b1731_100%)] overflow-hidden shadow-[0_18px_45px_rgba(2,8,23,0.28)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80" />
            <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-sky-900/70">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-sky-300">Personal learning roadmap <span className="ml-1 text-cyan-400">/ live plan</span></p>
                  <h3 className="mt-1 text-sm sm:text-base font-bold text-white tracking-tight">Close your identified skill gaps</h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-100 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800 shadow-[0_0_14px_rgba(14,165,233,0.12)]">
                  {completedGapNames.size}/{criticalGaps.length} complete
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 overflow-x-auto text-[11px] whitespace-nowrap">
                {[
                  ['overview', 'Overview'],
                  ['topics', 'Topics & Techniques'],
                  ['resources', 'Official Resources'],
                ].map(([view, label]) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setRoadmapView(view as typeof roadmapView)}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      roadmapView === view
                        ? 'border-cyan-300 text-cyan-200 font-bold drop-shadow-[0_0_8px_rgba(103,232,249,0.35)]'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {roadmapView === 'resources' ? (
              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-200">
                  <strong className="block text-sky-300 mb-1">NSSTA curriculum</strong>
                  Structured modules aligned to the competency framework and your target role.
                </div>
                <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-200">
                  <strong className="block text-sky-300 mb-1">MoSPI reference material</strong>
                  Use official methods, standards, and statistical guidance while studying each gap.
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                  <div className="grid grid-cols-[minmax(220px,1.8fr)_55px_repeat(4,70px)_100px] items-center px-4 sm:px-5 py-2 bg-sky-950/55 text-[9px] uppercase tracking-[0.14em] font-bold text-sky-200/65">
                    <span>{roadmapView === 'topics' ? 'Topic / Competency' : 'Skill gap'}</span>
                    <span className="text-center">Done</span>
                    <span className="text-center">Discuss</span>
                    <span className="text-center">AI coach</span>
                    <span className="text-center">Save</span>
                    <span className="text-center">Notes</span>
                    <span className="text-right">Course</span>
                  </div>
                  <div className="divide-y divide-dashed divide-sky-900/70">
                    {criticalGaps.map(([compName, stat]) => {
                      const matchedCourse = courses.find((course) => course.mappedCompetency === compName);
                      const isComplete = completedGapNames.has(compName);
                      const isBookmarked = bookmarkedGapNames.has(compName);

                      return (
                        <div key={`roadmap-${compName}`} className={`group grid grid-cols-[minmax(220px,1.8fr)_55px_repeat(4,70px)_100px] items-center px-4 sm:px-5 py-3 text-[11px] transition-all ${isComplete ? 'bg-emerald-950/20' : 'hover:bg-sky-900/25 hover:translate-x-0.5'}`}>
                          <div className="min-w-0 pr-3">
                            <span className={`block font-semibold truncate transition-colors ${isComplete ? 'text-emerald-300 line-through' : 'text-sky-100 group-hover:text-white'}`}>{compName}</span>
                            <span className="text-[10px] text-sky-200/45">Level {stat.currentLevel ?? 1} of {stat.requiredLevel ?? 4} required · {stat.percentage}% score</span>
                          </div>
                          <button type="button" onClick={() => toggleGapSet(setCompletedGapNames, compName)} className="mx-auto text-slate-400 hover:text-emerald-400 cursor-pointer" title={isComplete ? 'Mark as incomplete' : 'Mark as complete'}>
                            {isComplete ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
                          </button>
                          <button type="button" onClick={() => void openMentor('discussion', compName, stat)} className="mx-auto text-slate-400 hover:text-sky-300 cursor-pointer" title="Open discussion"><MessageCircle className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => void openMentor('coach', compName, stat)} className="mx-auto text-slate-400 hover:text-sky-300 cursor-pointer" title="Ask AI coach"><Bot className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => toggleGapSet(setBookmarkedGapNames, compName)} className="mx-auto cursor-pointer" title={isBookmarked ? 'Remove saved gap' : 'Save gap'}><Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-amber-400'}`} /></button>
                          <button type="button" onClick={() => openNotes(compName)} className={`mx-auto cursor-pointer ${gapNotes[compName] ? 'text-sky-300' : 'text-slate-400 hover:text-sky-300'}`} title={gapNotes[compName] ? 'Edit notes' : 'Add notes'}><StickyNote className="w-3.5 h-3.5" /></button>
                          {matchedCourse ? (
                            <button type="button" onClick={(event) => handleCourseAction(matchedCourse, event)} className="ml-auto inline-flex items-center gap-1 text-sky-300 hover:text-white font-semibold cursor-pointer" title={`Open ${matchedCourse.title}`}>
                              <FileCode2 className="w-3.5 h-3.5" />
                              <span>Study</span>
                            </button>
                          ) : <span className="text-right text-slate-600">-</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {mentorContext && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/45 p-0 sm:p-6" role="dialog" aria-modal="true" aria-label="PrepLens AI Mentor">
              <div className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300"><Bot className="w-4 h-4" /></div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-sky-300">PrepLens Mentor</p>
                      <h3 className="text-sm font-bold truncate">{mentorContext.mode === 'coach' ? 'AI Coach' : 'Discussion Room'}</h3>
                    </div>
                  </div>
                  <button type="button" onClick={() => setMentorContext(null)} className="p-1.5 text-slate-300 hover:text-white cursor-pointer" title="Close mentor"><X className="w-4 h-4" /></button>
                </div>
                <div className="px-4 py-2.5 bg-sky-50 border-b border-sky-100 text-[11px] text-slate-700">
                  <span className="font-bold text-slate-900">Focus:</span> {mentorContext.competency} <span className="text-slate-400">·</span> {mentorContext.score}% diagnostic score
                </div>
                <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50">
                  {mentorMessages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex ${message.role === 'learner' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[88%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${message.role === 'learner' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-xs'}`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isMentorLoading && <div className="flex items-center gap-2 text-[11px] text-slate-500"><LoaderCircle className="w-3.5 h-3.5 animate-spin" /> Mentor is thinking...</div>}
                </div>
                <form onSubmit={submitMentorMessage} className="p-3 border-t border-slate-200 flex items-center gap-2">
                  <input value={mentorInput} onChange={(event) => setMentorInput(event.target.value)} placeholder={mentorContext.mode === 'coach' ? 'Ask for an example or next step...' : 'Share your question or field situation...'} className="min-w-0 flex-1 px-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                  <button type="submit" disabled={!mentorInput.trim() || isMentorLoading} className="p-2.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" title="Send message"><Send className="w-4 h-4" /></button>
                </form>
              </div>
            </div>
          )}

          {noteContext && (
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-950/45 p-0 sm:p-6" role="dialog" aria-modal="true" aria-label="Skill gap notes">
              <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900 text-white">
                  <div className="flex items-center gap-2"><StickyNote className="w-4 h-4 text-sky-300" /><h3 className="text-sm font-bold">Notes</h3></div>
                  <button type="button" onClick={() => setNoteContext(null)} className="text-slate-300 hover:text-white cursor-pointer" title="Close notes"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-[11px] text-slate-500">Personal study notes for <strong className="text-slate-700">{noteContext}</strong></p>
                  <textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} autoFocus rows={6} placeholder="Capture a formula, example, question, or field observation..." className="w-full resize-none rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={() => setNoteContext(null)} className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer">Cancel</button>
                    <button type="button" onClick={saveNote} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 cursor-pointer"><Check className="w-3.5 h-3.5" /> Save note</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {enrolledNotice && (
            <div className="p-3 rounded-xl bg-emerald-100/90 border border-emerald-300 flex items-center justify-between gap-3 text-xs text-emerald-950 animate-in fade-in duration-150 shadow-2xs">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="truncate">
                  Successfully enrolled in <strong>{enrolledNotice.title}</strong>! In-App Study Classroom is active.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigateToCourses(enrolledNotice.title)}
                  className="font-bold underline text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  View in Courses Tab
                </button>
                <button
                  type="button"
                  onClick={() => setEnrolledNotice(null)}
                  className="text-emerald-700 hover:text-emerald-900 p-0.5 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Gap Remediation Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {criticalGaps.map(([compName, stat]) => {
              const matchedCourse = courses.find((c) => c.mappedCompetency === compName);
              const courseCurriculum = matchedCourse ? COURSE_CURRICULA[matchedCourse.id] : undefined;
              const isExpanded = matchedCourse ? expandedSyllabusId === matchedCourse.id : false;
              const isEnrolled = matchedCourse?.isEnrolled;
              const progress = matchedCourse?.progressPercentage || 0;

              return (
                <div
                  key={compName}
                  className="p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    {/* Header & Score Metric */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                          Identified Gap Area
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {compName}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                          {stat.percentage}% (Score: {stat.correct}/{stat.total})
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Target: 70%
                        </span>
                      </div>
                    </div>

                    {/* Cadre Level Progression Bar */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span>Current: <strong className="text-slate-800">Level {stat.currentLevel ?? 1}</strong></span>
                        <span className="text-slate-400">→</span>
                        <span>Required: <strong className="text-indigo-700">Level {stat.requiredLevel ?? 4}</strong></span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {stat.priority || 'High'} Priority
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      {stat.recommendationReason ||
                        `Your diagnostic assessment in ${compName} indicated unfamiliarity with advanced statistical methods required for this role.`}
                    </p>
                  </div>

                  {/* Assigned Course & Action Section */}
                  {matchedCourse && (
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/80 space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span className="font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-indigo-600" />
                            Assigned NSSTA Curriculum
                          </span>
                          <span className="font-mono text-slate-500">{matchedCourse.code}</span>
                        </div>

                        <div className="text-xs font-bold text-slate-900 leading-snug">
                          {matchedCourse.title}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-indigo-100/60">
                          <span>{matchedCourse.modulesCount || 4} Interactive Units</span>
                          <span>{matchedCourse.durationHours}</span>
                        </div>

                        {/* Expandable Syllabus Preview */}
                        {courseCurriculum && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={(e) => toggleSyllabus(matchedCourse.id, e)}
                              className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide Syllabus Preview' : 'Preview 4 Curriculum Units'}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="mt-2 space-y-1.5 p-2 rounded-lg bg-white border border-indigo-100 text-[11px] animate-in fade-in duration-150">
                                {courseCurriculum.modules.map((m) => (
                                  <div key={m.id} className="flex items-center justify-between text-slate-700 py-0.5">
                                    <span className="truncate pr-2">
                                      Unit {m.moduleNumber}: {m.title}
                                    </span>
                                    <span className="text-[10px] text-slate-400 shrink-0">
                                      {m.durationMinutes}m
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Enrolled Status / Progress Bar */}
                      {isEnrolled && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Study In Progress
                            </span>
                            <span className="font-bold text-slate-900">{progress}% Completed</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Primary Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleCourseAction(matchedCourse, e)}
                          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs ${
                            isEnrolled
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                          title={
                            isEnrolled
                              ? 'Resume studying modules in the in-app classroom'
                              : 'Enroll now and study modules directly inside the portal'
                          }
                        >
                          {isEnrolled ? (
                            <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span>
                            {isEnrolled
                              ? `Resume In-App Study (${progress}%)`
                              : 'Enroll & Enter Study Hall'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openExternalPortal(
                              matchedCourse.sourceUrl || IGOT_OFFICIAL_URL,
                              `iGOT Karmayogi: ${matchedCourse.title}`,
                              e
                            );
                          }}
                          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                          title="Open official course page on external iGOT Karmayogi portal"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Competency Breakdown Grid */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              FRAC Competency Diagnostic Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated against MoSPI official civil services benchmarks (Passing: 70%)
            </p>
          </div>
          <button
            type="button"
            onClick={onRetakeAssessment}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Take Assessment</span>
          </button>
        </div>

        <div className="space-y-4">
          {breakdownEntries.map(([compName, stats]) => {
            const isGap = stats.isGap;

            return (
              <div
                key={compName}
                id={`gap-card-${compName.replace(/\s+/g, '-').toLowerCase()}`}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900">{compName}</span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Tested: {stats.total} questions</span>
                      <span>•</span>
                      <span>Correct: {stats.correct}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isGap
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      {isGap ? 'Gap Identified (<70%)' : 'Proficient (Passed)'}
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {stats.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar with Benchmark Marker */}
                <div className="relative pt-1">
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isGap ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.max(5, stats.percentage)}%` }}
                    />
                  </div>
                  {/* 70% threshold pin */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-700/60"
                    style={{ left: '70%' }}
                    title="70% Passing Benchmark"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>0%</span>
                  <span className="text-slate-700 font-semibold">Benchmark: 70%</span>
                  <span>100%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Next Steps / iGOT Action Bar */}
      <div className="p-6 rounded-2xl bg-indigo-900 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <span>Ready to Address Identified Skill Gaps?</span>
          </h3>
          <p className="text-xs text-indigo-200 max-w-xl">
            Access curated iGOT Karmayogi modules aligned directly with the National Statistical Systems Training Academy (NSSTA) guidelines.
          </p>
        </div>

        <button
          id="btn-goto-igot-pathways"
          type="button"
          onClick={() => onNavigateToCourses()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <span>View All iGOT Course Pathways</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
