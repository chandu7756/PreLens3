export interface WorkedExampleStep {
  step: string;
  computation?: string;
  rationale: string;
}

export interface FieldSopItem {
  stepNo: number;
  activity: string;
  mandatoryRequirement: string;
  scrutinyCheck: string;
}

export interface KeySection {
  heading: string;
  content: string;
  subContent?: string;
  bulletPoints?: string[];
  technicalFormula?: string;
  guidelineNote?: string;
  statutoryReference?: string;
}

export interface CourseModuleLesson {
  id: string;
  moduleNumber: number;
  title: string;
  durationMinutes: number;
  wordCountEstimate?: number;
  summary: string;
  learningObjectives: string[];
  keySections: KeySection[];
  workedExample?: {
    title: string;
    scenario: string;
    steps: WorkedExampleStep[];
    outcome: string;
  };
  fieldSopChecklist?: FieldSopItem[];
  regulatoryReferences?: string[];
  officialCaseStudy: {
    title: string;
    context: string;
    challenge: string;
    solution: string;
    statStandard: string;
  };
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseCurriculum {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  mappedCompetency: string;
  totalModules: number;
  overview: string;
  prerequisites: string;
  learningOutcome: string;
  modules: CourseModuleLesson[];
}
