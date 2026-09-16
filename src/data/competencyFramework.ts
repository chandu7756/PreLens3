import { Competency, IGOTCourse, OfficialResource, SkillGapRecord } from '../types';
import { OFFICIAL_NSSTA_COURSES, NSSTA_OFFICIAL_URL } from './nsstaData';
import { MOSPI_OFFICIAL_RESOURCES, MOSPI_OFFICIAL_URL } from './mospiResources';

/**
 * PS 26101 Official Competency Framework
 * Structured across 4 explicit domains:
 * 1. Statistical Competencies
 * 2. Technical Competencies
 * 3. Digital Governance Competencies
 * 4. Behavioural & Managerial Competencies
 *
 * Sourced from NSSTA and MoSPI civil service competency mappings.
 */
export const PS26101_COMPETENCY_FRAMEWORK: Competency[] = [
  // 1. STATISTICAL DOMAIN
  {
    id: 'ps-stat-01',
    name: 'Sampling Methods & Techniques',
    category: 'Statistical',
    topic: 'Large-Scale Survey Sampling',
    description: 'Proficiency in multi-stage stratified sampling designs, PPS sampling, sample size determination, sampling frame creation, and calculation of design effects and sampling errors.',
    targetBenchmark: 70,
    targetDepartment: 'Survey Design & Research Division (SDRD) / FOD',
    fracRole: 'Statistical Officer / Sampling Analyst',
    source: 'NSSTA Official',
    sourceUrl: NSSTA_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 2,
    gapLevels: 2,
    priority: 'High',
  },
  {
    id: 'ps-stat-02',
    name: 'National Accounts & Macroeconomics',
    category: 'Statistical',
    topic: 'GVA, GDP & System of National Accounts',
    description: 'Understanding SNA 2008 principles, Gross Value Added at basic prices, intermediate consumption, corporate financial statement parsing (MCA-21), and input-output tables.',
    targetBenchmark: 70,
    targetDepartment: 'National Accounts Division (NAD)',
    fracRole: 'Macroeconomic Accounts Compiler',
    source: 'MoSPI & NSSTA',
    sourceUrl: MOSPI_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 3,
    gapLevels: 1,
    priority: 'Medium',
  },
  {
    id: 'ps-stat-03',
    name: 'Price Statistics & Index Numbers',
    category: 'Statistical',
    topic: 'CPI, WPI & Inflation Measurement',
    description: 'Methodological knowledge of Laspeyres, Paasche, and Fisher indices, geometric means, market price quotation collection, replacement item adjustments, and CPI compilation.',
    targetBenchmark: 70,
    targetDepartment: 'Price Statistics Division (PSD)',
    fracRole: 'Price Index Officer',
    source: 'MoSPI & NSSTA',
    sourceUrl: MOSPI_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 2,
    gapLevels: 2,
    priority: 'High',
  },
  {
    id: 'ps-stat-04',
    name: 'Labour & Employment Statistics',
    category: 'Statistical',
    topic: 'PLFS, Activity Status & Employment Ratios',
    description: 'Mastery of activity classifications (Usual Status ps+ss, Current Weekly Status), Worker Population Ratio (WPR), Labour Force Participation Rate (LFPR), and CAPI field validation.',
    targetBenchmark: 70,
    targetDepartment: 'Field Operations Division (FOD) / SDRD',
    fracRole: 'Labour Survey Investigator',
    source: 'MoSPI & NSSTA',
    sourceUrl: MOSPI_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 4,
    gapLevels: 0,
    priority: 'Low',
  },
  {
    id: 'ps-stat-05',
    name: 'Social & Sustainable Development (SDG) Metrics',
    category: 'Statistical',
    topic: 'SDG Indicators & Gender Statistics',
    description: 'Knowledge of the 300+ indicators in India’s National Indicator Framework (NIF), disaggregated social metrics, multidimensional poverty, and administrative data harmonization.',
    targetBenchmark: 70,
    targetDepartment: 'Social Statistics Division (SSD)',
    fracRole: 'SDG & Social Data Specialist',
    source: 'MoSPI Official',
    sourceUrl: MOSPI_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 3,
    currentLevel: 3,
    gapLevels: 0,
    priority: 'Low',
  },

  // 2. TECHNICAL DOMAIN
  {
    id: 'ps-tech-01',
    name: 'Statistical Computing (Python/R)',
    category: 'Technical',
    topic: 'Data Wrangling, Scripting & Imputation',
    description: 'Practical scripting skills in Python (pandas, numpy, scipy) and R for data cleaning, weighted estimation, missing data imputation, and reproducible statistical pipelines.',
    targetBenchmark: 70,
    targetDepartment: 'Computer Centre / Data Informatics',
    fracRole: 'Data Analytics Officer',
    source: 'NSSTA Official',
    sourceUrl: NSSTA_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 2,
    gapLevels: 2,
    priority: 'High',
  },
  {
    id: 'ps-tech-02',
    name: 'Data Visualization & Statistical Storytelling',
    category: 'Technical',
    topic: 'Dissemination, Dashboards & Infographics',
    description: 'Effective communication of official statistics to policymakers and public through interactive dashboards, tabular clarity, charting standards, and storytelling.',
    targetBenchmark: 70,
    targetDepartment: 'Coordination and Publication Division (CPD)',
    fracRole: 'Dissemination Specialist',
    source: 'NSSTA Official',
    sourceUrl: NSSTA_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 3,
    currentLevel: 3,
    gapLevels: 0,
    priority: 'Low',
  },

  // 3. DIGITAL GOVERNANCE DOMAIN
  {
    id: 'ps-gov-01',
    name: 'Data Quality & Digital Governance (NQAF)',
    category: 'Digital Governance',
    topic: 'NQAF, Confidentiality & Data Protection',
    description: 'Adherence to the National Quality Assurance Framework (NQAF), Collection of Statistics Act 2008, respondent anonymization, microdata disclosure control, and government cloud security.',
    targetBenchmark: 70,
    targetDepartment: 'Coordination & Administration',
    fracRole: 'Statistical Quality & Governance Officer',
    source: 'MoSPI & NSSTA',
    sourceUrl: MOSPI_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 3,
    gapLevels: 1,
    priority: 'Medium',
  },

  // 4. BEHAVIOURAL & MANAGERIAL DOMAIN
  {
    id: 'ps-mgt-01',
    name: 'Field Supervision & Operational Leadership',
    category: 'Behavioural & Managerial',
    topic: 'Inspection Logistics & Enumerator Coordination',
    description: 'Managing field teams across geographical circles, supervisory spot inspections, sample household rapport building, conflict resolution, and quality audit trails.',
    targetBenchmark: 70,
    targetDepartment: 'Field Operations Division (FOD)',
    fracRole: 'Supervising Officer / Assistant Director',
    source: 'NSSTA Official',
    sourceUrl: NSSTA_OFFICIAL_URL,
    framework: 'PS 26101',
    requiredLevel: 4,
    currentLevel: 4,
    gapLevels: 0,
    priority: 'Low',
  },
];

/**
 * Role-based Required Competency Level Mapping (1-5 Scale)
 * Scale: 1 = Basic Awareness, 2 = Working Knowledge, 3 = Proficient, 4 = Advanced, 5 = Expert Master
 */
export const ROLE_COMPETENCY_REQUIREMENTS: Record<string, Record<string, number>> = {
  // Statistical Officer / Senior Statistical Officer (ISS Cadre)
  'learner': {
    'Sampling Methods & Techniques': 4,
    'National Accounts & Macroeconomics': 4,
    'Price Statistics & Index Numbers': 4,
    'Labour & Employment Statistics': 4,
    'Social & Sustainable Development (SDG) Metrics': 3,
    'Statistical Computing (Python/R)': 4,
    'Data Visualization & Statistical Storytelling': 3,
    'Data Quality & Digital Governance (NQAF)': 4,
    'Field Supervision & Operational Leadership': 4,
  },
  // Training Administrator / Director (MoSPI Admin)
  'admin': {
    'Sampling Methods & Techniques': 5,
    'National Accounts & Macroeconomics': 5,
    'Price Statistics & Index Numbers': 4,
    'Labour & Employment Statistics': 4,
    'Social & Sustainable Development (SDG) Metrics': 4,
    'Statistical Computing (Python/R)': 3,
    'Data Visualization & Statistical Storytelling': 4,
    'Data Quality & Digital Governance (NQAF)': 5,
    'Field Supervision & Operational Leadership': 5,
  },
};

/**
 * Calculate Skill Gaps based on Current Competency vs Required Competency
 * Formula: gapLevels = max(0, requiredLevel - currentLevel)
 * isGap = currentLevel < requiredLevel
 */
export function calculateSkillGaps(
  currentCompetencyScores: Record<string, number>, // percentage e.g. { 'Sampling Methods & Techniques': 50 }
  userRole: 'admin' | 'learner' = 'learner'
): SkillGapRecord[] {
  const roleReqs = ROLE_COMPETENCY_REQUIREMENTS[userRole] || ROLE_COMPETENCY_REQUIREMENTS['learner'];

  return PS26101_COMPETENCY_FRAMEWORK.map((comp) => {
    const requiredLevel = roleReqs[comp.name] || 4;
    // Derive current level from percentage score (0-100% -> 1-5 scale)
    const scorePct = currentCompetencyScores[comp.name] !== undefined ? currentCompetencyScores[comp.name] : 60;
    const currentLevel = Math.max(1, Math.min(5, Math.ceil(scorePct / 20)));
    const gapLevels = Math.max(0, requiredLevel - currentLevel);
    const isGap = scorePct < comp.targetBenchmark || currentLevel < requiredLevel;

    const priority: 'High' | 'Medium' | 'Low' =
      gapLevels >= 2 ? 'High' : gapLevels === 1 ? 'Medium' : 'Low';

    // Find mapped NSSTA course
    const matchedCourse = OFFICIAL_NSSTA_COURSES.find(
      (c) => c.mappedCompetency.toLowerCase() === comp.name.toLowerCase()
    ) || OFFICIAL_NSSTA_COURSES[0];

    const reason = `Recommended because your ${comp.name} competency is evaluated at Level ${currentLevel}/5, which is below the required Level ${requiredLevel}/5 for your selected cadre role.`;

    return {
      competencyId: comp.id,
      competencyName: comp.name,
      category: comp.category as any,
      topic: comp.topic || 'Official Statistics',
      currentLevel,
      requiredLevel,
      gapLevels,
      priority,
      recommendedCourseId: matchedCourse.id,
      recommendedCourseTitle: matchedCourse.title,
      source: 'NSSTA',
      sourceUrl: NSSTA_OFFICIAL_URL,
      reason,
    };
  });
}

/**
 * Recommendation Engine:
 * User Role + Competency Assessment + Skill Gap + Relevant NSSTA Training + Relevant MoSPI Resources = Personalized Learning Path
 */
export function generatePersonalizedRecommendations(
  currentGaps: SkillGapRecord[]
): {
  courses: IGOTCourse[];
  resources: OfficialResource[];
  reasonMap: Record<string, string>;
  attribution: string;
} {
  const gapNames = currentGaps.filter((g) => g.gapLevels > 0).map((g) => g.competencyName);

  // Match courses targeting gaps first
  const recommendedCourses = OFFICIAL_NSSTA_COURSES.filter((c) =>
    gapNames.includes(c.mappedCompetency)
  );

  // Match official MoSPI resources
  const recommendedResources = MOSPI_OFFICIAL_RESOURCES.slice(0, 4);

  const reasonMap: Record<string, string> = {};
  currentGaps.forEach((g) => {
    if (g.gapLevels > 0) {
      reasonMap[g.competencyName] = g.reason;
    }
  });

  return {
    courses: recommendedCourses.length > 0 ? recommendedCourses : OFFICIAL_NSSTA_COURSES,
    resources: recommendedResources,
    reasonMap,
    attribution: 'The recommendation is generated by PreLens using official source information from NSSTA and MoSPI.',
  };
}
