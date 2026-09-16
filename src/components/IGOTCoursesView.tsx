import React, { useState } from 'react';
import { IGOTCourse, QuizAttempt } from '../types';
import { NSSTA_TRAINING_PROGRAMMES, NSSTA_OFFICIAL_URL, IGOT_OFFICIAL_URL } from '../data/nsstaData';
import { MOSPI_OFFICIAL_RESOURCES, MOSPI_OFFICIAL_URL } from '../data/mospiResources';
import { openExternalPortal } from '../utils/linkOpener';
import { COURSE_CURRICULA } from '../data/courseCurricula';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Layers,
  Building2,
  FileText,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface IGOTCoursesViewProps {
  courses: IGOTCourse[];
  latestAttempt: QuizAttempt | null;
  onUpdateCourse: (updated: IGOTCourse) => void;
  onRetakeAssessment: () => void;
  initialSearchQuery?: string | null;
  onStartStudyCourse?: (course: IGOTCourse) => void;
}

export const IGOTCoursesView: React.FC<IGOTCoursesViewProps> = ({
  courses,
  latestAttempt,
  onUpdateCourse,
  onRetakeAssessment,
  initialSearchQuery,
  onStartStudyCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const [filterMode, setFilterMode] = useState<'all' | 'recommended' | 'enrolled'>('all');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialSearchQuery !== undefined && initialSearchQuery !== null) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const toggleSyllabus = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSyllabusId((prev) => (prev === courseId ? null : courseId));
  };

  // Identify competencies flagged as gap
  const gapCompetencies = latestAttempt
    ? Object.entries(latestAttempt.competencyBreakdown || {})
        .filter(([_, stats]: [string, { isGap: boolean }]) => stats.isGap)
        .map(([name]) => name)
    : [];

  const filteredCourses = courses.filter((course) => {
    const isRecommended = gapCompetencies.includes(course.mappedCompetency);
    if (filterMode === 'recommended' && !isRecommended) return false;
    if (filterMode === 'enrolled' && !course.isEnrolled) return false;

    if (searchQuery.trim()) {
      const matchTitle = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchComp = course.mappedCompetency.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCode = course.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTitle || matchComp || matchCode;
    }
    return true;
  });

  const handleToggleEnroll = (course: IGOTCourse) => {
    const isEnrolledNow = !course.isEnrolled;
    const updated: IGOTCourse = {
      ...course,
      isEnrolled: isEnrolledNow,
      progressPercentage: isEnrolledNow ? Math.max(course.progressPercentage || 0, 0) : 0,
    };
    onUpdateCourse(updated);
    return updated;
  };

  const handleEnrollAndStudy = (course: IGOTCourse, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = handleToggleEnroll(course);
    if (onStartStudyCourse) {
      onStartStudyCourse(updated);
    } else {
      const targetUrl = course.sourceUrl || IGOT_OFFICIAL_URL;
      openExternalPortal(targetUrl, `iGOT Karmayogi: ${course.title}`, e);
    }
  };

  const handleOpenStudyClassroom = (course: IGOTCourse, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onStartStudyCourse) {
      onStartStudyCourse(course);
    } else {
      const targetUrl = course.sourceUrl || IGOT_OFFICIAL_URL;
      openExternalPortal(targetUrl, `iGOT Karmayogi: ${course.title}`, e);
    }
  };

  return (
    <div id="igot-courses-container" className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Official MoSPI Capacity Building Pathways</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Personalized iGOT Karmayogi &amp; NSSTA Training Pathways
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Curated official curricula from the National Statistical Systems Training Academy (NSSTA), featuring interactive in-app lessons, practical field case studies, and official competency completion certificates.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={IGOT_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalPortal(IGOT_OFFICIAL_URL, 'iGOT Karmayogi Official Portal', e)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all border border-purple-200 cursor-pointer shadow-2xs hover:border-purple-300 active:scale-[0.98]"
            >
              <span>iGOT Karmayogi Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={NSSTA_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalPortal(NSSTA_OFFICIAL_URL, 'National Statistical Systems Training Academy (NSSTA)', e)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer shadow-2xs hover:border-slate-300 active:scale-[0.98]"
            >
              <span>NSSTA Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onRetakeAssessment}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Verify Improvement (Re-Test)</span>
            </button>
          </div>
        </div>

        {/* How Study & Progress Works Explainer Callout */}
        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200/90 text-xs text-indigo-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-950 mb-0.5">Interactive In-App Study Classroom:</strong>
              <span className="text-indigo-900/90">
                Clicking <strong>&quot;Enroll &amp; Enter Study Hall&quot;</strong> opens the course curriculum right here. Read official MoSPI directives, examine field dilemmas, and complete knowledge checks to build verified progress towards your certificate.
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-indigo-200/80 text-indigo-950 font-bold text-[10px] uppercase tracking-wider shrink-0">
            Self-Paced Learning
          </span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Courses ({courses.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('recommended')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'recommended'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Gap-Targeted ({courses.filter((c) => gapCompetencies.includes(c.mappedCompetency)).length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('enrolled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'enrolled'
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Study ({courses.filter((c) => c.isEnrolled).length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search modules or competencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isGapTargeted = gapCompetencies.includes(course.mappedCompetency);
          const isCompleted = (course.progressPercentage || 0) >= 100;
          const curriculum = COURSE_CURRICULA[course.id];
          const isExpanded = expandedSyllabusId === course.id;
          const recReason =
            course.recommendationReason ||
            `Recommended because your ${course.mappedCompetency} competency is below the required level for your selected role.`;

          return (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className={`p-6 rounded-2xl bg-white border flex flex-col justify-between space-y-5 transition-all shadow-2xs hover:shadow-md ${
                isGapTargeted
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {course.code}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {course.badge}
                  </span>
                </div>

                {isGapTargeted && (
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Role-Gap Remediation Target</span>
                    </div>
                    <p className="text-[11px] text-amber-900 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-200/70 leading-snug">
                      {recReason}
                    </p>
                  </div>
                )}

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Metadata Pill Box */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1.5 text-slate-600">
                  <div>
                    Mapped Competency: <strong className="text-slate-800">{course.mappedCompetency}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-0.5">
                    <span>Provider: {course.provider}</span>
                    <span>{course.durationHours}</span>
                  </div>

                  {/* Expandable Syllabus Preview */}
                  {curriculum && (
                    <div className="pt-1.5 border-t border-slate-200/70">
                      <button
                        type="button"
                        onClick={(e) => toggleSyllabus(course.id, e)}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide 4 Units' : 'Preview 4 Curriculum Units'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-1 p-2 rounded-lg bg-white border border-slate-200 text-[11px] animate-in fade-in duration-150">
                          {curriculum.modules.map((m) => (
                            <div key={m.id} className="flex items-center justify-between text-slate-700 py-0.5">
                              <span className="truncate pr-1">Unit {m.moduleNumber}: {m.title}</span>
                              <span className="text-[10px] text-slate-400 shrink-0">{m.durationMinutes}m</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action / Progress Area */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                {course.isEnrolled && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">Course Progress</span>
                      <span className="font-mono font-bold text-slate-900">
                        {course.progressPercentage || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                        style={{ width: `${course.progressPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {course.isEnrolled ? (
                    isCompleted ? (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          type="button"
                          onClick={(e) => handleOpenStudyClassroom(course, e)}
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          title="Review Course Curriculum & View Official Certificate"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Review &amp; Certificate</span>
                        </button>
                        <a
                          href={course.sourceUrl || IGOT_OFFICIAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) =>
                            openExternalPortal(
                              course.sourceUrl || IGOT_OFFICIAL_URL,
                              `iGOT Karmayogi: ${course.title}`,
                              e
                            )
                          }
                          className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs hover:border-slate-300 active:scale-[0.98]"
                          title="Open External Official Courseware on iGOT"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          type="button"
                          onClick={(e) => handleOpenStudyClassroom(course, e)}
                          className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-xs transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                          title="Open interactive classroom to study units and make progress"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Resume In-App Study ({course.progressPercentage || 0}%)</span>
                        </button>
                        <a
                          href={course.sourceUrl || IGOT_OFFICIAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) =>
                            openExternalPortal(
                              course.sourceUrl || IGOT_OFFICIAL_URL,
                              `iGOT Karmayogi: ${course.title}`,
                              e
                            )
                          }
                          className="p-2 rounded-xl border border-indigo-200 hover:bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-2xs hover:border-indigo-300 active:scale-[0.98]"
                          title="Open Course on iGOT Karmayogi External Portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        type="button"
                        onClick={(e) => handleEnrollAndStudy(course, e)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        title="Enroll and study interactive units inside the portal"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
                        <span>Enroll &amp; Enter Study Hall</span>
                      </button>
                      <a
                        href={course.sourceUrl || IGOT_OFFICIAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) =>
                          openExternalPortal(
                            course.sourceUrl || IGOT_OFFICIAL_URL,
                            `iGOT Karmayogi: ${course.title}`,
                            e
                          )
                        }
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all cursor-pointer shrink-0 shadow-2xs hover:border-slate-300 active:scale-[0.98]"
                        title="Open External Portal Directly"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official NSSTA Training Programmes Registry */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              <Building2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Official Institutional Registry</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              National Statistical Systems Training Academy (NSSTA) Course Catalog
            </h2>
            <p className="text-xs text-slate-500">
              In-person and hybrid capacity-building programmes conducted at NSSTA Campus, Greater Noida.
            </p>
          </div>
          <a
            href={NSSTA_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => openExternalPortal(NSSTA_OFFICIAL_URL, 'NSSTA Training Calendar', e)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span>View Full NSSTA Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NSSTA_TRAINING_PROGRAMMES.map((prog) => (
            <div
              key={prog.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {prog.id.toUpperCase()}
                  </span>
                  <span className="font-semibold text-slate-500">{prog.category}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {prog.title}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Duration: {prog.duration}</span>
                <span className="font-semibold text-slate-700">{prog.cadre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
