import {
  Competency,
  TrainingDocument,
  MCQQuestion,
  Assessment,
  QuizAttempt,
  IGOTCourse,
  DepartmentMetric,
  NotificationItem,
} from '../types';
import { OFFICIAL_NSSTA_COURSES, NSSTA_OFFICIAL_URL } from './nsstaData';
import { MOSPI_OFFICIAL_RESOURCES, MOSPI_OFFICIAL_URL } from './mospiResources';
import { PS26101_COMPETENCY_FRAMEWORK } from './competencyFramework';

export { NSSTA_OFFICIAL_URL, MOSPI_OFFICIAL_URL };
export { OFFICIAL_NSSTA_COURSES, MOSPI_OFFICIAL_RESOURCES, PS26101_COMPETENCY_FRAMEWORK };

/**
 * Official MoSPI & NSSTA Competencies (PS 26101 Framework)
 * Categorized across 4 core domains:
 * 1. Statistical Competencies
 * 2. Technical Competencies
 * 3. Digital Governance Competencies
 * 4. Behavioural & Managerial Competencies
 * Sourced from NSSTA (https://nssta.gov.in/) & MoSPI (https://www.mospi.gov.in/)
 */
export const MOSPI_COMPETENCIES: Competency[] = PS26101_COMPETENCY_FRAMEWORK;

/**
 * Official MoSPI Methodological Manuals and Training Source Documents
 * Derived from published manuals by NAD, SDRD, FOD, and PSD.
 * Verified Source: https://www.mospi.gov.in/
 */
export const INITIAL_DOCUMENTS: TrainingDocument[] = [
  {
    id: 'doc-mospi-01',
    title: 'Periodic Labour Force Survey (PLFS) - Instructions to Field Staff & CAPI Manual',
    division: 'Field Operations Division (FOD) / SDRD',
    filename: 'PLFS_Instructions_Field_Staff_Manual.pdf',
    uploadedAt: 'Official MoSPI Release',
    pagesCount: 142,
    status: 'ready',
    questionsCount: 14,
    source: 'MoSPI Official',
    sourceUrl: MOSPI_OFFICIAL_URL,
    category: 'Labour Statistics',
    topic: 'Activity Status, CAPI Validation & Household Listing',
    textContent: `MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MoSPI)
GOVERNMENT OF INDIA
PERIODIC LABOUR FORCE SURVEY (PLFS) - CONCEPTS, DEFINITIONS AND PROCEDURES

1. OBJECTIVES AND OVERVIEW:
The Periodic Labour Force Survey (PLFS) is designed to estimate key employment and unemployment indicators (viz. Worker Population Ratio, Labour Force Participation Rate, Unemployment Rate) in both rural and urban areas. In urban areas, a quarterly frequency is maintained using a rotational panel sampling scheme, while in rural areas an annual survey is conducted.

2. ACTIVITY STATUS FRAMEWORK:
The activity status of an individual is determined based on the activities pursued during a specified reference period.
(a) Usual Principal Activity Status (ps): Determined on the major time criterion during the 365 days preceding the date of survey. An individual is classified as employed, unemployed, or out of labour force if they spent relatively longer time (major time) in that activity status.
(b) Usual Subsidiary Economic Activity Status (ss): An activity pursued for a significant period of not less than 30 days during the 365 days reference period by an individual whose principal status was not that activity.
(c) Current Weekly Status (CWS): Determined on the basis of activities pursued during a reference period of 7 days preceding the date of survey. A person is considered employed under CWS if they worked for at least 1 hour on at least one day during the 7-day reference week.

3. SAMPLING DESIGN AND LISTING:
The survey adopts a stratified multi-stage design. The First Stage Units (FSUs) are the Urban Frame Survey (UFS) blocks in urban areas and Census villages in rural areas. Within each selected FSU, listing of all households is conducted with utmost care. Selected households are stratified into second stage strata based on household monthly per capita consumer expenditure (MPCE) or number of members with higher secondary education.

4. COMPUTER ASSISTED PERSONAL INTERVIEWING (CAPI):
Field Investigators must conduct interviews using hand-held tablets running the designated CAPI software. The CAPI system enforces real-time range checks, consistency validations between educational level and occupation code (NCO-2015), and records geographic coordinates of the sample household. Field supervisors must re-interview a mandated 10% sub-sample for quality verification.`,
  },
  {
    id: 'doc-mospi-02',
    title: 'Consumer Price Index (CPI Base 2012=100) - Technical Compilation Methodology',
    division: 'Price Statistics Division (PSD)',
    filename: 'CPI_Technical_Methodology_Base2012.pdf',
    uploadedAt: 'Official MoSPI Release',
    pagesCount: 88,
    status: 'ready',
    questionsCount: 12,
    source: 'MoSPI Official',
    sourceUrl: MOSPI_OFFICIAL_URL,
    category: 'Price Statistics',
    topic: 'Price Relatives, Laspeyres Index & Market Pricing',
    textContent: `MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MoSPI)
PRICE STATISTICS DIVISION (PSD)
METHODOLOGY OF CONSUMER PRICE INDEX (CPI) NUMBERS (BASE: 2012=100)

1. BASKET OF GOODS AND SERVICES:
The Consumer Price Index (CPI) measures changes over time in the general level of prices of goods and services that a reference population acquires, uses, or pays for consumption. The weighting diagrams for CPI (Rural, Urban, and Combined) are derived from the Household Consumer Expenditure Survey (CES).

2. INDEX FORMULATION:
MoSPI computes elementary aggregate price relatives using the geometric mean of price relatives for comparable specifications. The aggregation across sub-groups and commodity groups is carried out using the modified Laspeyres formula:
I = [ Sum_i ( (P_it / P_i0) * W_i0 ) / Sum_i ( W_i0 ) ] * 100
where P_it is the current month price, P_i0 is the base period price, and W_i0 is the fixed expenditure weight allocated to item i.

3. MARKET QUOTATIONS AND SUBSTITUTIONS:
Data collection is carried out across designated selected markets (1,181 rural markets and 1,114 urban markets nationwide). Price collectors must collect prices on designated market days. If a selected variety is temporarily unavailable, quotation collectors must apply strict substitution rules: an equivalent substitute of the same quality must be selected, and overlapping prices must be recorded to ensure seamless linking without creating artificial inflation spikes.`,
  },
  {
    id: 'doc-mospi-03',
    title: 'National Accounts Statistics: Sources and Methods (Base 2011-12) - GVA & GDP',
    division: 'National Accounts Division (NAD)',
    filename: 'NAS_Sources_and_Methods_Base2011_12.pdf',
    uploadedAt: 'Official MoSPI Release',
    pagesCount: 210,
    status: 'ready',
    questionsCount: 16,
    source: 'MoSPI Official',
    sourceUrl: MOSPI_OFFICIAL_URL,
    category: 'National Accounts',
    topic: 'Gross Value Added, SNA 2008 & Corporate Financials (MCA-21)',
    textContent: `MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MoSPI)
NATIONAL ACCOUNTS DIVISION (NAD)
NATIONAL ACCOUNTS STATISTICS: SOURCES AND METHODS

1. CONCEPTUAL ARCHITECTURE & SNA 2008:
In conformity with the United Nations System of National Accounts (SNA 2008), India’s National Accounts Statistics (NAS) shifted headline economic growth reporting to Gross Value Added (GVA) at basic prices and Gross Domestic Product (GDP) at market prices, adopting base year 2011-12.

2. RELATIONSHIP BETWEEN GVA AND GDP:
Gross Value Added (GVA) at basic prices is defined as the value of output of goods and services produced less the value of intermediate consumption used in production.
The mathematical transition to GDP at market prices is formulated as:
GDP at Market Prices = GVA at Basic Prices + Net Taxes on Products
where:
Net Taxes on Products = Taxes on Products (e.g., GST, Excise, Import Duties) - Subsidies on Products (e.g., Food, Fertilizer, Petroleum Subsidies).
Production taxes (such as land revenues, stamp duties) are already included in GVA at basic prices, whereas product taxes are levied per unit of good or service.

3. CORPORATE SECTOR ESTIMATION VIA MCA-21:
A major methodological enhancement in the 2011-12 series is the use of the Ministry of Corporate Affairs e-filing database (MCA-21). Financial statements of over 500,000 active companies are processed to compute value added directly from audited balance sheets and profit & loss statements, replacing the older RBI sample expansion approach.`,
  },
  {
    id: 'doc-mospi-04',
    title: 'NSSTA Curriculum on Sampling Methods in Large-Scale Sample Surveys',
    division: 'National Statistical Systems Training Academy (NSSTA)',
    filename: 'NSSTA_Large_Scale_Sampling_Curriculum.pdf',
    uploadedAt: 'Official NSSTA Release',
    pagesCount: 165,
    status: 'ready',
    questionsCount: 18,
    source: 'NSSTA Official',
    sourceUrl: NSSTA_OFFICIAL_URL,
    category: 'Statistical Theory',
    topic: 'Stratification, PPS Selection & Multipliers',
    textContent: `NATIONAL STATISTICAL SYSTEMS TRAINING ACADEMY (NSSTA)
GREATER NOIDA, UTTAR PRADESH
INSTRUCTIONAL MODULE: SAMPLING TECHNIQUES IN OFFICIAL LARGE-SCALE SURVEYS

1. STRATIFICATION AND FIRST STAGE UNITS (FSUs):
In large-scale socio-economic surveys conducted by the National Sample Survey Office (NSSO), multi-stage stratified designs are employed to ensure representation across all agro-climatic and administrative strata. In rural areas, each district forms a stratum. Within each stratum, sub-strata are formed based on village population size.

2. SELECTION PROCEDURES:
FSUs are selected using Probability Proportional to Size with Replacement (PPSWR) or Circular Systematic Sampling where size is census population. In urban areas, Urban Frame Survey (UFS) blocks are selected using simple random sampling without replacement (SRSWOR).

3. ESTIMATION PROCEDURE AND DESIGN WEIGHTS:
Because sample selection probabilities differ across stages, survey estimators require sample multipliers (design weights).
The multiplier for any selected unit is the inverse of its inclusion probability:
w_i = 1 / pi_i
Sub-sample replicates are selected independently to provide unbiased estimates of the sampling variance and standard error:
Var(Y_hat) = (1 / (k*(k-1))) * Sum_{r=1}^k (Y_hat_r - Y_hat)^2
where k is the number of independent sub-sample replicates.`,
  },
];

/**
 * Official MoSPI & NSSTA Multiple Choice Questions
 * Sourced directly from official guidelines and statistical concepts.
 * Verified Source: https://nssta.gov.in/ and https://www.mospi.gov.in/
 */
export const INITIAL_QUESTIONS: MCQQuestion[] = [
  {
    id: 'q-stat-01',
    documentId: 'doc-mospi-01',
    question: 'Under the Periodic Labour Force Survey (PLFS) criteria, what is the minimum duration required for an individual to be classified as employed under Current Weekly Status (CWS)?',
    options: [
      'At least 1 hour on at least one day during the 7-day reference week',
      'At least 4 hours daily for at least 3 consecutive days',
      'At least 14 hours cumulative over the 7-day reference period',
      'At least 30 days during the reference year',
    ],
    correctIndex: 0,
    explanation: 'According to official MoSPI PLFS definitions, a person is classified as employed under Current Weekly Status (CWS) if they worked for at least 1 hour on at least one day during the 7 days preceding the date of survey.',
    competency: 'Labour & Employment Statistics',
    difficulty: 'Beginner',
    fracRole: 'Statistical Investigator Grade II / Field Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI PLFS Manual',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'q-stat-02',
    documentId: 'doc-mospi-02',
    question: 'In the compilation of the Consumer Price Index (CPI Base 2012=100) by MoSPI, which formula is utilized to aggregate group and sub-group indices from elementary price relatives?',
    options: [
      'Paasche Index with current period quantity weights',
      'Modified Laspeyres Index with base period expenditure weights',
      'Fisher Ideal Index combining geometric and arithmetic weights',
      'Marshall-Edgeworth Index with combined quantity bases',
    ],
    correctIndex: 1,
    explanation: 'MoSPI computes elementary aggregate price relatives using geometric means, and aggregates them into group and general CPI numbers using the modified Laspeyres formula with fixed base period consumer expenditure weights.',
    competency: 'Price Statistics & Index Numbers',
    difficulty: 'Intermediate',
    fracRole: 'Price Index Compiler / Assistant Director',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI CPI Manual',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'q-stat-03',
    documentId: 'doc-mospi-03',
    question: 'In India’s National Accounts Statistics (SNA 2008 framework), what is the exact relationship between Gross Value Added (GVA) at basic prices and Gross Domestic Product (GDP) at market prices?',
    options: [
      'GDP at Market Prices = GVA at Basic Prices + Net Product Taxes (Product Taxes - Product Subsidies)',
      'GDP at Market Prices = GVA at Basic Prices - Production Taxes + Production Subsidies',
      'GDP at Market Prices = GVA at Factor Cost + Depreciation + Net Factor Income from Abroad',
      'GDP at Market Prices = GVA at Basic Prices - Intermediate Consumption',
    ],
    correctIndex: 0,
    explanation: 'Under SNA 2008 and India’s base 2011-12 series: GDP at Market Prices = GVA at Basic Prices + Taxes on Products - Subsidies on Products (i.e. Net Product Taxes). Production taxes and subsidies are already accounted for in basic prices.',
    competency: 'National Accounts & Macroeconomics',
    difficulty: 'Intermediate',
    fracRole: 'Macroeconomic Accounts Compiler / SSO',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI NAS Sources & Methods',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'q-stat-04',
    documentId: 'doc-mospi-04',
    question: 'In large-scale sample survey design, what does a Design Effect (Deff) greater than 1.0 signify for a multi-stage cluster sampling design compared to Simple Random Sampling (SRS)?',
    options: [
      'Cluster sampling has higher statistical precision than SRS for the same sample size',
      'Cluster sampling exhibits intra-cluster correlation, requiring a larger sample size to achieve the same variance as SRS',
      'The sample selection contains zero non-sampling errors',
      'The inclusion probabilities across all sampling stages are strictly equal',
    ],
    correctIndex: 1,
    explanation: 'Design Effect (Deff) = Var(cluster) / Var(SRS). A Deff > 1 indicates that due to positive intra-cluster correlation (homogeneity within clusters), the sampling variance is higher than under SRS, necessitating a larger sample size to achieve equal precision.',
    competency: 'Sampling Methods & Techniques',
    difficulty: 'Advanced',
    fracRole: 'Survey Design Analyst / Sampling Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'NSSTA Sampling Curriculum',
    sourceUrl: NSSTA_OFFICIAL_URL,
  },
  {
    id: 'q-stat-05',
    documentId: 'doc-mospi-01',
    question: 'How is Usual Principal Activity Status (ps) determined for a survey respondent in the Periodic Labour Force Survey?',
    options: [
      'Based on the activity pursued for at least 183 days during the reference week',
      'Based on the major time criterion (activity pursued for relatively longest duration) during the 365 days preceding the survey',
      'Based solely on the activity pursued on the exact day of enumeration',
      'Based on whether the respondent holds formal contract employment',
    ],
    correctIndex: 1,
    explanation: 'Usual Principal Activity Status (ps) is identified using the major time criterion: the activity status on which the respondent spent the relatively longest time during the 365 days reference period prior to the interview date.',
    competency: 'Labour & Employment Statistics',
    difficulty: 'Intermediate',
    fracRole: 'Statistical Investigator Grade II / Field Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI PLFS Instructions',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'q-stat-06',
    documentId: 'doc-mospi-03',
    question: 'Which comprehensive corporate financial database is utilized in India’s National Accounts (Base 2011-12) to compile value added in the private corporate non-financial sector?',
    options: [
      'SEBI Listing Disclosures Portal',
      'Ministry of Corporate Affairs MCA-21 e-filing balance sheet database',
      'RBI Annual Schedule of Banking Operations',
      'National Stock Exchange Market Capitalization Ledger',
    ],
    correctIndex: 1,
    explanation: 'The MCA-21 e-governance database of the Ministry of Corporate Affairs is directly processed by NAD to compile value added for hundreds of thousands of active private corporate entities, replacing earlier sample expansion methods.',
    competency: 'National Accounts & Macroeconomics',
    difficulty: 'Intermediate',
    fracRole: 'Macroeconomic Accounts Compiler / SSO',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI NAS Sources & Methods',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'q-stat-07',
    documentId: 'doc-mospi-02',
    question: 'When a designated item specification in a market is permanently discontinued during CPI field price collection, what is the mandated MoSPI replacement protocol?',
    options: [
      'Delete the item from the index basket and redistribute its weight to food items',
      'Select a popular substitute of comparable quality, record overlapping prices, and link the index without creating artificial price jumps',
      'Impute a zero price until the annual base revision',
      'Carry forward the last recorded price indefinitely',
    ],
    correctIndex: 1,
    explanation: 'MoSPI replacement protocol mandates identifying a substitute of matching quality and specifications. Prices for both the old and new varieties are obtained in an overlapping period to enable spliced linking without spurious inflation.',
    competency: 'Price Statistics & Index Numbers',
    difficulty: 'Advanced',
    fracRole: 'Price Index Compiler / Assistant Director',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI CPI Manual',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'q-stat-08',
    documentId: 'doc-mospi-04',
    question: 'In NSS multi-stage stratified survey estimation, what is the design multiplier (weight) assigned to an individual sample observation?',
    options: [
      'The inverse of the overall inclusion probability of that sample observation across all stages',
      'The ratio of total population to total surveyed households in the district',
      'A constant factor equal to the number of survey rounds completed',
      'The square root of the household consumption expenditure',
    ],
    correctIndex: 0,
    explanation: 'In multi-stage probability sampling, each unit’s sampling multiplier (design weight) is mathematically formulated as the inverse of its probability of selection across all stages: w_i = 1 / pi_i.',
    competency: 'Sampling Methods & Techniques',
    difficulty: 'Advanced',
    fracRole: 'Survey Design Analyst / Sampling Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'NSSTA Sampling Curriculum',
    sourceUrl: NSSTA_OFFICIAL_URL,
  },
  {
    id: 'q-stat-09',
    documentId: 'doc-mospi-04',
    question: 'Which Python/R statistical function is appropriate for calculating survey-weighted mean estimates from multi-stage NSS survey microdata?',
    options: [
      'Ordinary arithmetic mean without weights (df["val"].mean())',
      'Weighted mean using survey multipliers: np.average(df["val"], weights=df["weight"]) or R survey::svymean()',
      'Median of unweighted observations',
      'Standard z-score transformation without inclusion probability',
    ],
    correctIndex: 1,
    explanation: 'Survey microdata requires weighted estimation where each sample value is multiplied by its design weight: sum(w_i * x_i) / sum(w_i). In Python this is computed via np.average(df["val"], weights=df["weight"]) and in R using the survey package svymean().',
    competency: 'Statistical Computing (Python/R)',
    difficulty: 'Intermediate',
    fracRole: 'Data Analytics Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'NSSTA Statistical Computing Module',
    sourceUrl: NSSTA_OFFICIAL_URL,
  },
  {
    id: 'q-stat-10',
    documentId: 'doc-mospi-01',
    question: 'Under the National Quality Assurance Framework (NQAF) and the Collection of Statistics Act 2008, what is the statutory confidentiality obligation regarding survey microdata?',
    options: [
      'Individual respondent identities, names, and exact addresses must be anonymized and protected against public disclosure',
      'All raw respondent names may be published openly without restriction',
      'Confidentiality only applies to corporate entities and not private households',
      'Survey data may be shared with commercial advertisers without anonymization',
    ],
    correctIndex: 0,
    explanation: 'The Collection of Statistics Act 2008 and NQAF strictly mandate that all statistical returns are confidential. No individual respondent identity or address may be disclosed or used for any purpose other than statistical compilation.',
    competency: 'Data Quality & Digital Governance (NQAF)',
    difficulty: 'Beginner',
    fracRole: 'Statistical Quality & Governance Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Training Director (NSSTA)',
    source: 'MoSPI NQAF Directives',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
];

/**
 * Official MoSPI & NSSTA Assessments
 * Verified against official statistical standards.
 */
export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'asmt-mospi-01',
    title: 'MoSPI Statistical Investigator Competency Assessment (PS 26101 Standard)',
    division: 'Field Operations Division (FOD) / SDRD',
    competenciesCovered: [
      'Sampling Methods & Techniques',
      'Price Statistics & Index Numbers',
      'National Accounts & Macroeconomics',
      'Labour & Employment Statistics',
      'Statistical Computing (Python/R)',
      'Data Quality & Digital Governance (NQAF)',
    ],
    questionIds: ['q-stat-01', 'q-stat-02', 'q-stat-03', 'q-stat-04', 'q-stat-05', 'q-stat-06', 'q-stat-07', 'q-stat-08', 'q-stat-09', 'q-stat-10'],
    durationMinutes: 20,
    passPercentage: 70,
    targetCadre: 'Senior Statistical Officer (SSO) / Statistical Investigator Gr. II',
    active: true,
    source: 'NSSTA Official Assessment Standard',
    sourceUrl: NSSTA_OFFICIAL_URL,
  },
  {
    id: 'asmt-mospi-02',
    title: 'National Accounts & GVA Methodology Assessment (SNA 2008 Standard)',
    division: 'National Accounts Division (NAD)',
    competenciesCovered: [
      'National Accounts & Macroeconomics',
      'Data Quality & Digital Governance (NQAF)',
    ],
    questionIds: ['q-stat-03', 'q-stat-06', 'q-stat-10'],
    durationMinutes: 15,
    passPercentage: 75,
    targetCadre: 'Macroeconomic Accounts Compiler / Senior Statistical Officer',
    active: true,
    source: 'MoSPI NAD Training Standard',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
  {
    id: 'asmt-mospi-03',
    title: 'Sampling Techniques & Large-Scale Survey Design Diagnostic',
    division: 'Survey Design & Research Division (SDRD)',
    competenciesCovered: [
      'Sampling Methods & Techniques',
      'Statistical Computing (Python/R)',
    ],
    questionIds: ['q-stat-04', 'q-stat-08', 'q-stat-09'],
    durationMinutes: 15,
    passPercentage: 70,
    targetCadre: 'Sampling Analyst / ISS Junior Time Scale',
    active: true,
    source: 'NSSTA Sampling Methods Curriculum',
    sourceUrl: NSSTA_OFFICIAL_URL,
  },
  {
    id: 'asmt-mospi-04',
    title: 'Price Statistics & CPI Index Compilation Technical Exam',
    division: 'Price Statistics Division (PSD)',
    competenciesCovered: [
      'Price Statistics & Index Numbers',
      'Data Quality & Digital Governance (NQAF)',
    ],
    questionIds: ['q-stat-02', 'q-stat-07', 'q-stat-10'],
    durationMinutes: 15,
    passPercentage: 70,
    targetCadre: 'Price Index Compiler / Assistant Director',
    active: true,
    source: 'MoSPI Price Statistics Division',
    sourceUrl: MOSPI_OFFICIAL_URL,
  },
];

/**
 * Initial Prototype Evaluation Attempt
 * Demonstrates a real diagnostic assessment evaluation against official PS 26101 benchmarks.
 * Clearly labeled as Prototype Evaluation Data.
 */
export const INITIAL_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att-demo-01',
    assessmentId: 'asmt-mospi-01',
    assessmentTitle: 'MoSPI Statistical Investigator Competency Assessment (PS 26101 Standard)',
    officialName: 'Statistical Officer (SSO)',
    officialRole: 'Senior Statistical Officer (SSO)',
    division: 'Field Operations Division (FOD)',
    attemptedAt: 'Recent Diagnostic Evaluation (Prototype Data)',
    answers: {
      'q-stat-01': 0, // Labour - Correct
      'q-stat-02': 0, // Price - Incorrect (Paasche instead of Laspeyres)
      'q-stat-03': 0, // NAS - Correct
      'q-stat-04': 0, // Sampling - Incorrect
      'q-stat-05': 1, // Labour - Correct
      'q-stat-06': 1, // NAS - Correct
      'q-stat-07': 1, // Price - Correct
      'q-stat-08': 1, // Sampling - Incorrect (wrong formula)
      'q-stat-09': 0, // Tech - Incorrect
      'q-stat-10': 0, // Gov - Correct
    },
    scorePercentage: 60.0,
    totalQuestions: 10,
    correctAnswersCount: 6,
    competencyBreakdown: {
      'Sampling Methods & Techniques': {
        total: 2,
        correct: 0,
        percentage: 0,
        isGap: true,
        currentLevel: 1,
        requiredLevel: 4,
        gapLevels: 3,
        priority: 'High',
        recommendationReason: 'Recommended because your Sampling Methods & Techniques competency is below the required Level 4 for your selected role.',
      },
      'Price Statistics & Index Numbers': {
        total: 2,
        correct: 1,
        percentage: 50,
        isGap: true,
        currentLevel: 2,
        requiredLevel: 4,
        gapLevels: 2,
        priority: 'High',
        recommendationReason: 'Recommended because your Price Statistics & Index Numbers competency is below the required Level 4 for your selected role.',
      },
      'Statistical Computing (Python/R)': {
        total: 1,
        correct: 0,
        percentage: 0,
        isGap: true,
        currentLevel: 1,
        requiredLevel: 4,
        gapLevels: 3,
        priority: 'High',
        recommendationReason: 'Recommended because your Statistical Computing (Python/R) competency is below the required Level 4 for your selected role.',
      },
      'National Accounts & Macroeconomics': {
        total: 2,
        correct: 2,
        percentage: 100,
        isGap: false,
        currentLevel: 5,
        requiredLevel: 4,
        gapLevels: 0,
        priority: 'Low',
      },
      'Labour & Employment Statistics': {
        total: 2,
        correct: 2,
        percentage: 100,
        isGap: false,
        currentLevel: 5,
        requiredLevel: 4,
        gapLevels: 0,
        priority: 'Low',
      },
      'Data Quality & Digital Governance (NQAF)': {
        total: 1,
        correct: 1,
        percentage: 100,
        isGap: false,
        currentLevel: 4,
        requiredLevel: 4,
        gapLevels: 0,
        priority: 'Low',
      },
    },
  },
];

/**
 * Official NSSTA Course Offerings on iGOT Karmayogi
 * Exported from official NSSTA data.
 */
export const IGOT_COURSES: IGOTCourse[] = OFFICIAL_NSSTA_COURSES;

/**
 * MoSPI Division-Wise Prototype Cadre Benchmarks
 * Modeled on the 5 official operational divisions of MoSPI.
 * Explicitly labeled as Prototype Data modeled on sanctioned cadre estimates.
 */
export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  {
    id: 'div-fod',
    departmentName: 'Field Operations Division (FOD)',
    shortCode: 'FOD',
    totalOfficials: 1850,
    assessedCount: 1420,
    averageScore: 71.4,
    criticalGapsCount: 412,
    primaryGapCompetency: 'Sampling Methods & Techniques',
    readinessRate: 71,
    benchmarkType: 'Prototype Benchmark',
  },
  {
    id: 'div-sdrd',
    departmentName: 'Survey Design & Research Division (SDRD)',
    shortCode: 'SDRD',
    totalOfficials: 340,
    assessedCount: 295,
    averageScore: 78.6,
    criticalGapsCount: 54,
    primaryGapCompetency: 'Statistical Computing (Python/R)',
    readinessRate: 82,
    benchmarkType: 'Prototype Benchmark',
  },
  {
    id: 'div-nad',
    departmentName: 'National Accounts Division (NAD)',
    shortCode: 'NAD',
    totalOfficials: 280,
    assessedCount: 250,
    averageScore: 82.1,
    criticalGapsCount: 38,
    primaryGapCompetency: 'National Accounts & Macroeconomics',
    readinessRate: 85,
    benchmarkType: 'Prototype Benchmark',
  },
  {
    id: 'div-psd',
    departmentName: 'Price Statistics Division (PSD)',
    shortCode: 'PSD',
    totalOfficials: 210,
    assessedCount: 180,
    averageScore: 74.3,
    criticalGapsCount: 46,
    primaryGapCompetency: 'Price Statistics & Index Numbers',
    readinessRate: 74,
    benchmarkType: 'Prototype Benchmark',
  },
  {
    id: 'div-ssd',
    departmentName: 'Social Statistics Division (SSD)',
    shortCode: 'SSD',
    totalOfficials: 240,
    assessedCount: 195,
    averageScore: 79.2,
    criticalGapsCount: 41,
    primaryGapCompetency: 'Social & Sustainable Development (SDG) Metrics',
    readinessRate: 79,
    benchmarkType: 'Prototype Benchmark',
  },
];

/**
 * Initial Institutional System Notifications
 */
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    type: 'gap_alert',
    title: 'Competency Gap Flagged in Sampling Methods',
    message: 'Your recent diagnostic assessment flagged a deficit in multi-stage stratified sampling. NSSTA course "Sampling Methods in Large-Scale Surveys" has been mapped to your learning path.',
    timestamp: 'Today, 09:30 AM',
    read: false,
    actionLabel: 'View Gaps',
    actionTab: 'gap-analysis',
  },
  {
    id: 'notif-02',
    type: 'course_recommendation',
    title: 'Official NSSTA Module Enrolment Ready',
    message: 'Recommended module "Index Numbers & Price Statistics" is available for capacity building on iGOT Karmayogi.',
    timestamp: 'Yesterday',
    read: false,
    actionLabel: 'View Module',
    actionTab: 'igot-courses',
  },
  {
    id: 'notif-03',
    type: 'assessment',
    title: 'New MoSPI Assessment Published',
    message: 'National Accounts Division has scheduled the SNA 2008 & GVA Methodology Assessment for Indian Statistical Service cadre.',
    timestamp: '2 days ago',
    read: true,
    actionLabel: 'Take Assessment',
    actionTab: 'learner-assessments',
  },
];
