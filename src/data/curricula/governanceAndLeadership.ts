import { CourseCurriculum } from '../curriculumTypes';

export const GOVERNANCE_AND_LEADERSHIP_CURRICULA: Record<string, CourseCurriculum> = {
  'nssta-crs-007': {
    courseId: 'nssta-crs-007',
    courseCode: 'NSSTA-GOV-01',
    courseTitle: 'National Quality Assurance Framework (NQAF) & Data Privacy in Official Statistics',
    mappedCompetency: 'Data Quality & Digital Governance (NQAF)',
    totalModules: 3,
    overview: 'Statutory and operational standards for official statistics quality management, legal confidentiality under the Collection of Statistics Act 2008, respondent anonymization, disclosure prevention, and the 19 UN-NQAF quality principles.',
    prerequisites: 'Knowledge of official statistical procedures, public data ethics, and survey operations.',
    learningOutcome: 'Apply UN NQAF quality dimensions, enforce statutory confidentiality under Section 9 & 11 of the Collection of Statistics Act, execute statistical disclosure controls (k-anonymity, l-diversity), and conduct data audits.',
    modules: [
      {
        id: 'mod-07-1',
        moduleNumber: 1,
        title: 'The Collection of Statistics Act 2008 & Statutory Confidentiality',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Understand the legal powers of statistical officers, statutory protections for respondents, and mandatory confidentiality obligations under the Act.',
        learningObjectives: [
          'Analyze the statutory provisions of the Collection of Statistics Act 2008 and the 2017 Amendment.',
          'Understand the strict legal confidentiality mandate under Section 9.',
          'Evaluate the legal immunity of statistical returns under Section 11 in judicial civil and criminal proceedings.',
          'Examine penal provisions under Section 15 for unauthorized data disclosure by statistical officers.',
        ],
        keySections: [
          {
            heading: '1. The Legal Foundation of Indian Official Statistics',
            content: 'The Collection of Statistics Act 2008 (Act No. 7 of 2009), which replaced the colonial 1953 Act, provides the modern statutory architecture for official data collection in India. The Act empowers the Central Government, State Governments, and Union Territory administrations to appoint Statistics Officers and conduct mandatory socio-economic, agricultural, and industrial inquiries.',
            subContent: 'In exchange for the legal obligation placed on citizens and commercial establishments to furnish truthful information, the Act provides absolute, non-negotiable statutory confidentiality to informants. Under Section 9, all information furnished in a statistical return is strictly confidential and cannot be accessed by police, tax authorities, or private litigants.',
            bulletPoints: [
              'Section 9 (Confidentiality): No information or individual return may be published or disclosed in a manner that reveals the identity of any person or enterprise without prior written consent.',
              'Section 11 (Judicial Inadmissibility): No statistical return or portion thereof is admissible in evidence in any civil or criminal proceeding against the person furnishing it, except in a prosecution for an offense under the Act itself.',
              'Section 15 (Penalties for Officers): Any statistical officer or employee who willfully discloses confidential information is punishable with imprisonment for a term up to 6 months, or fine up to Rs. 2,000, or both.',
            ],
            guidelineNote: 'Tax Secrecy Separation: Survey returns collected by MoSPI can NEVER be shared with the Income Tax Department or GST authorities. Statistical officers must explicitly reassure fearful informants of this absolute legal firewall.',
            statutoryReference: 'Collection of Statistics Act 2008 (Ministry of Law and Justice, Gazette of India)',
          },
          {
            heading: '2. The 2017 Amendment and Extended Jurisdiction',
            content: 'The Collection of Statistics (Amendment) Act 2017 extended the territorial jurisdiction of statistical collection to the erstwhile State of Jammu & Kashmir and modernized rules governing digital data transmission and electronic storage security.',
          },
        ],
        workedExample: {
          title: 'Responding to a Tax Enforcement Request for ASI Enterprise Energy Records',
          scenario: 'The State Commercial Tax Department serves a formal notice under the State GST Act to an FOD Regional Office demanding individual Schedule A and energy consumption data of 5 sampled steel rolling mills suspected of tax evasion.',
          steps: [
            {
              step: 'Step 1: Review the Statutory Request under Section 9 & 11',
              computation: 'Examine Section 9(1) of the Collection of Statistics Act 2008: "No information furnished... shall be used for any purpose other than for statistical purposes."',
              rationale: 'The statutory language explicitly forbids non-statistical enforcement use.',
            },
            {
              step: 'Step 2: Apply Judicial Inadmissibility Shield (Section 11)',
              computation: 'Section 11 explicitly bars returns from being admitted as evidence in external revenue investigations.',
              rationale: 'Prevents statistical returns from being weaponized against informants.',
            },
            {
              step: 'Step 3: Draft Official Ministry Response',
              computation: 'Prepare standard refusal citation signed by the Regional Director explaining that compliance would violate Section 9 and expose officers to criminal prosecution under Section 15.',
              rationale: 'Protects the integrity of official statistics and maintains industrial trust.',
            },
          ],
          outcome: 'The tax department request is legally declined. Public trust in ASI data confidentiality is safeguarded.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Display of Official Credentials',
            mandatoryRequirement: 'Field investigators must present official bilingual photo identity cards and the gazetted Survey Notification upon entering any household or enterprise.',
            scrutinyCheck: 'Never conduct an interview without carrying the formal authorization letter.',
          },
          {
            stepNo: 2,
            activity: 'Secure Disposal of Scratch Notes',
            mandatoryRequirement: 'All preliminary field notebooks containing informant phone numbers or names must be shredded after CAPI verification.',
            scrutinyCheck: 'Prevent confidential contact numbers from leaking into public recycling waste.',
          },
        ],
        regulatoryReferences: [
          'Collection of Statistics Act 2008 (Act No. 7 of 2009)',
          'Collection of Statistics Rules 2011 (MoSPI Notification G.S.R. 388(E))',
          'National Statistical Commission Guidelines on Legal Data Protections',
        ],
        officialCaseStudy: {
          title: 'Court Summons for Individual Survey Schedules in Civil Litigation',
          context: 'A civil court subpoenaed MoSPI to produce individual household asset schedules of a citizen involved in a private property dispute.',
          challenge: 'Demands by judicial authorities for confidential statistical returns.',
          solution: 'MoSPI legal cell cited Section 11 of the Collection of Statistics Act, which provides that statistical returns are immune from subpoena in any civil or criminal judicial proceeding except for prosecutions under the Act itself.',
          statStandard: 'Collection of Statistics Act 2008 (Section 11 Judicial Immunity)',
        },
        knowledgeCheck: {
          question: 'Under the Collection of Statistics Act 2008, can individual respondent survey returns be subpoenaed by a civil court as evidence in a private litigation?',
          options: [
            'Yes, any court can demand any statistical record anytime',
            'No, statistical returns are statutorily protected and inadmissible as evidence in non-statistical civil/criminal proceedings',
            'Yes, provided a nominal court fee is deposited',
            'Only if the respondent is over 60 years of age',
          ],
          correctIndex: 1,
          explanation: 'The Act provides strict statutory immunity: confidential statistical returns cannot be summoned or used as evidence against a respondent in civil proceedings, safeguarding public trust.',
        },
      },
      {
        id: 'mod-07-2',
        moduleNumber: 2,
        title: 'United Nations NQAF Principles for Official Statistics',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Explore the 19 Principles of the National Quality Assurance Framework covering institutional environment, statistical processes, and statistical outputs.',
        learningObjectives: [
          'Analyze the four levels of the UN National Quality Assurance Framework (UN-NQAF).',
          'Evaluate core output quality dimensions: Relevance, Accuracy, Timeliness, Accessibility, Interpretability, and Coherence.',
          'Implement the Advance Release Calendar to safeguard official statistical impartiality.',
          'Execute quality audit reviews of ministerial data releases.',
        ],
        keySections: [
          {
            heading: '1. The Multi-Tier Architecture of UN-NQAF',
            content: 'In 2019, the United Nations Statistical Commission adopted the revised National Quality Assurance Frameworks (UN-NQAF) to guide national statistical offices in systematically evaluating, maintaining, and improving data quality across all government releases.',
            subContent: 'UN-NQAF organizes quality across four progressive levels: Level 1 (Managing the Statistical System: professional independence, coordination); Level 2 (Managing the Institutional Environment: adequacy of resources, quality commitment); Level 3 (Managing Statistical Processes: sound methodology, appropriate statistical procedures); and Level 4 (Managing Statistical Outputs: relevance, accuracy, timeliness, accessibility, coherence).',
            bulletPoints: [
              'Relevance: The degree to which statistical information meets the current and emerging needs of users, planners, and policymakers.',
              'Accuracy & Reliability: Closeness of estimates to the unknown true population values.',
              'Timeliness & Punctuality: Minimal lag between reference period and publication date; strict adherence to pre-announced release calendars.',
              'Accessibility & Clarity: Data made available in open formats (CSV, JSON) with full metadata documentation.',
              'Coherence & Comparability: Uniform definitions ensuring comparability across states and longitudinal rounds.',
            ],
            guidelineNote: 'Advance Release Calendar Rule: Punctuality is the cornerstone of statistical credibility. When inflation or GDP data releases are delayed or leaked before the scheduled hour, market integrity is severely compromised.',
          },
          {
            heading: '2. Operationalizing Quality Commitments in Field Offices',
            content: 'Every MoSPI regional office must conduct quarterly quality audits assessing non-response rates, average interview durations, and listing discrepancy rates, logging them in the central Quality Information Management System (QIMS).',
          },
        ],
        workedExample: {
          title: 'Computing Quality Metrics: Unit Non-Response and Punctuality Index',
          scenario: 'In an annual survey cycle across 30 states, MoSPI commits to releasing results within 90 days of field completion. 27 states met the deadline exactly; 3 states faced a 12-day delay. The nationwide target sample was 100,000 households; 94,500 responded, 3,500 were locked, and 2,000 refused.',
          steps: [
            {
              step: 'Step 1: Compute Overall Unit Response Rate (URR)',
              computation: 'URR = [ Completed Interviews / Total Eligible Sample ] * 100 = [ 94,500 / 100,000 ] * 100 = 94.5%',
              rationale: 'Measures sample coverage completeness.',
            },
            {
              step: 'Step 2: Compute Refusal Rate vs Casualty Rate',
              computation: 'Refusal Rate = (2,000 / 100,000) * 100 = 2.0%; Casualty Rate (Locked) = (3,500 / 100,000) * 100 = 3.5%',
              rationale: 'Distinguishes between active informant unwillingness and passive absence.',
            },
            {
              step: 'Step 3: Compute Punctuality Compliance Score',
              computation: 'Punctuality Score = (27 / 30) * 100 = 90.0% of regional releases punctual.',
              rationale: 'Standard NQAF output dimension indicator.',
            },
          ],
          outcome: 'The survey passes international NQAF quality thresholds (URR > 90%, Punctuality > 85%).',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Pre-Release Embargo Verification',
            mandatoryRequirement: 'Store all embargoed statistical tables in encrypted offline servers until exactly 5:30 PM on release day.',
            scrutinyCheck: 'Audit access logs to verify zero unauthorized previews before press release.',
          },
          {
            stepNo: 2,
            activity: 'Metadata Completeness Check',
            mandatoryRequirement: 'Every published table must include standard footnotes specifying survey round, reference period, and sample size.',
            scrutinyCheck: 'Prevent public misinterpretation of provisional estimates.',
          },
        ],
        regulatoryReferences: [
          'United Nations: Manual on National Quality Assurance Frameworks (UN-NQAF 2019)',
          'Fundamental Principles of Official Statistics (UN General Assembly Resolution 68/261)',
        ],
        officialCaseStudy: {
          title: 'Advance Release Calendar Compliance for Headline CPI',
          context: 'Inflation numbers are eagerly anticipated by the Reserve Bank of India for monetary policy decisions.',
          challenge: 'Pressure to release preliminary figures or delay releases during public holidays.',
          solution: 'MoSPI instituted an inflexible Advance Release Calendar: CPI is released strictly at 5:30 PM on the 12th of every month (or previous working day if a gazetted holiday), ensuring absolute transparency.',
          statStandard: 'MoSPI National Quality Assurance Framework Manual',
        },
        knowledgeCheck: {
          question: 'Releasing official statistical reports strictly on pre-announced dates and times published months in advance satisfies which NQAF quality dimension?',
          options: [
            'Timeliness and Punctuality',
            'Statistical Redundancy',
            'Subjective Discretion',
            'Internal Secrecy',
          ],
          correctIndex: 0,
          explanation: 'Adherence to an Advance Release Calendar fulfills the core NQAF dimension of Timeliness and Punctuality, building public and market confidence in official data.',
        },
      },
      {
        id: 'mod-07-3',
        moduleNumber: 3,
        title: 'Statistical Disclosure Control (SDC) & Microdata Anonymization',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Techniques for anonymizing public microdata files to prevent re-identification of citizens and firms using k-anonymity, top-coding, and perturbation.',
        learningObjectives: [
          'Differentiate Direct Identifiers from Quasi-Identifiers in survey datasets.',
          'Execute k-Anonymity (k >= 5) and l-Diversity mathematical transformations.',
          'Apply top-coding and bottom-coding to high-risk demographic and financial variables.',
          'Implement geographic masking and village-level aggregation protocols.',
        ],
        keySections: [
          {
            heading: '1. The Danger of Re-Identification via Data Linkage',
            content: 'Simply stripping direct identifiers (such as respondent name, phone number, and physical house number) from a microdata file is insufficient to protect respondent privacy. By linking external public registries (e.g., voter lists, vehicle registrations, property records) with quasi-identifiers (such as date of birth, gender, 6-digit postal PIN code, and occupation), computer scientists can re-identify individual respondents with alarming accuracy.',
            subContent: 'Statistical Disclosure Control (SDC) is the mathematical discipline that alters data prior to public dissemination, reducing re-identification risk below acceptable thresholds while preserving statistical analytical properties.',
            bulletPoints: [
              'Direct Identifiers: Unambiguous keys (Name, Aadhaar, Phone, PAN, Address). Must be completely suppressed in 100% of public files.',
              'Quasi-Identifiers: Attributes that in combination can uniquely identify someone (Age, Gender, Marital Status, District, Detailed Occupation).',
              'k-Anonymity: A dataset satisfies k-anonymity if every unique combination of quasi-identifiers is shared by at least k distinct individuals (standard MoSPI threshold: k = 5).',
              'Top-Coding: Pooling extreme high values (e.g., incomes > Rs. 50 lakh or ages > 85) into a single open-ended category.',
            ],
          },
          {
            heading: '2. Perturbation and Micro-Aggregation',
            content: 'For continuous variables with high disclosure risk (e.g., total enterprise revenue in a sector dominated by 2 firms), MoSPI applies micro-aggregation (replacing values with group means of small clusters) or controlled random noise addition.',
          },
        ],
        workedExample: {
          title: 'Applying k-Anonymity (k=5) and Top-Coding to a High-Risk Rural Microdata Subset',
          scenario: 'In a sample village microdata file, one record belongs to an 88-year-old male who is a retired high-court judge with monthly pension of Rs. 220,000. In the village, he is the only person over 80 and the only legal professional.',
          steps: [
            {
              step: 'Step 1: Identify Re-Identification Vulnerability',
              computation: 'Quasi-identifier tuple (Age: 88, Sex: Male, Occupation: Judge, Village: 0102) has frequency n = 1 in the village.',
              rationale: 'A researcher cross-referencing village records can instantly pinpoint this judge.',
            },
            {
              step: 'Step 2: Apply Top-Coding to Age and Pension',
              computation: 'Age 88 -> Recoded to "85+"; Pension Rs. 220,000 -> Recoded to "100,000+".',
              rationale: 'Collapses extreme tail outliers into broad brackets.',
            },
            {
              step: 'Step 3: Apply Geographic Masking and Occupation Generalization',
              computation: 'Suppress Village Code; report only District Code. Recode NCO 4-digit "High Court Judge" to 2-digit "Legal Professional".',
              rationale: 'Increases the group size within the district from n = 1 to n = 14 legal professionals.',
            },
            {
              step: 'Step 4: Verify k-Anonymity Criterion',
              computation: 'Equivalence class frequency is now n = 14 (which exceeds k = 5 threshold).',
              rationale: 'Re-identification is now statistically unfeasible.',
            },
          ],
          outcome: 'The record satisfies k-anonymity (k=5) and is approved for public dissemination on NADA.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Automated SDC Pipeline Execution',
            mandatoryRequirement: 'Run official R `sdcMicro` package scripts on all processed microdata before file release.',
            scrutinyCheck: 'Confirm that global disclosure risk metric is below 0.05 (5%).',
          },
          {
            stepNo: 2,
            activity: 'Dominance Rule Check in Enterprise Data',
            mandatoryRequirement: 'In industrial tables, if top 2 enterprises account for > 75% of sector output, suppress cell value.',
            scrutinyCheck: 'Prevent competitors from estimating a rival’s proprietary production figures.',
          },
        ],
        regulatoryReferences: [
          'Templ, M.: Statistical Disclosure Control for Microdata: Methods and Applications in R (Springer)',
          'National Data Sharing and Accessibility Policy (NDSAP) 2012',
        ],
        officialCaseStudy: {
          title: 'Anonymization Audit of PLFS Microdata on NADA Portal',
          context: 'A research team attempted to re-identify survey respondents by matching public voter lists with microdata ages and occupation codes.',
          challenge: 'Preventing linkable re-identification while preserving statistical utility.',
          solution: 'MoSPI applied k-anonymity (k=5) and suppressed village identifiers, rendering individual record matching statistically unfeasible.',
          statStandard: 'MoSPI Data Dissemination and Anonymization Policy',
        },
        knowledgeCheck: {
          question: 'What is "top-coding" in statistical disclosure control of survey microdata?',
          options: [
            'Placing the most important computer code at the top of the file',
            'Replacing all values above a predetermined threshold (e.g. incomes above 1 crore or ages above 85) with an upper category code to prevent unique re-identification',
            'Encrypting the entire dataset so nobody can read it',
            'Ranking all respondents by test score',
          ],
          correctIndex: 1,
          explanation: 'Top-coding pools rare, extreme values into an open-ended upper category (e.g., 85+ or 10,00,000+), preventing unique re-identification of outliers while preserving aggregate statistical utility.',
        },
      },
    ],
  },

  'nssta-crs-008': {
    courseId: 'nssta-crs-008',
    courseCode: 'NSSTA-MGT-01',
    courseTitle: 'Field Operations Leadership and Survey Logistics Management',
    mappedCompetency: 'Field Supervision & Operational Leadership',
    totalModules: 3,
    overview: 'Practical field administration, logistics coordination, supervisory inspection protocols, investigator leadership, non-response mitigation, and conflict resolution across MoSPI Regional and Sub-Regional offices.',
    prerequisites: 'Basic knowledge of field survey schedules, administrative structures, and supervisory hierarchy.',
    learningOutcome: 'Draft Monthly Tour Programmes (MTP), conduct concurrent inspections and back-checks, resolve informant refusals, and maintain uncompromised data fidelity under difficult field conditions.',
    modules: [
      {
        id: 'mod-08-1',
        moduleNumber: 1,
        title: 'Operational Planning & Field Camp Logistics in FOD',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Establish tour programmes, manage field investigator allocations, and coordinate logistics with local district administrations.',
        learningObjectives: [
          'Draft Monthly Tour Programmes (MTP) balancing transit time, rural haat days, and seasonal terrain obstacles.',
          'Coordinate village entry protocols with local revenue officers (Patwari / Tehsildar).',
          'Manage sub-round allocation quotas (Sub-Rounds 1, 2, 3, 4) across survey quarters.',
          'Ensure logistical readiness: solar power banks, transport arrangements, and emergency contingency plans.',
        ],
        keySections: [
          {
            heading: '1. The Operational Hierarchy and Tour Planning in FOD',
            content: 'The Field Operations Division (FOD) of MoSPI operates through 6 Zonal Offices, 53 Regional Offices, and 116 Sub-Regional Offices across India. To survey tens of thousands of First Stage Units (FSUs) annually, meticulous logistics and tour planning are essential.',
            subContent: 'Every survey round (12 months) is divided into four equal Sub-Rounds of 3 months each. In each sub-round, an equal number of FSUs must be surveyed to eliminate seasonal bias. Field officers prepare Monthly Tour Programmes (MTP) submitted to the Regional Director. The MTP must sequence sample units along logical travel corridors to minimize transit costs while respecting local realities (such as weekly market days or festival harvesting).',
            bulletPoints: [
              'Sub-Round Balance: Quarter 1 (July-Sept), Quarter 2 (Oct-Dec), Quarter 3 (Jan-March), Quarter 4 (April-June). Exactly 25% of sample FSUs must be completed in each quarter.',
              'Weekly Market (Haat) Coordination: Rural informants trade and purchase groceries on fixed weekly market days. Visiting households on haat days results in wasted visits and high temporary absence.',
              'Village Headman Entry Protocol: Official courtesy visits to the Panchayat Pradhan or village headman prevent rumors and guarantee investigator security.',
            ],
            guidelineNote: 'Sub-round crossover is strictly prohibited. Any FSU not completed by the final day of the survey quarter is marked as an administrative casualty unless explicitly re-scheduled by SDRD.',
          },
          {
            heading: '2. Logistics in Extreme Terrains',
            content: 'From high-altitude snowbound valleys in Ladakh to riverine islands (chars) in Assam and desert hamlets in Rajasthan, FOD officers must deploy solar charging kits, satellite phones, and customized boat/mule transport allowances.',
          },
        ],
        workedExample: {
          title: 'Optimizing a Monthly Tour Programme for an FOD Survey Team',
          scenario: 'A Junior Statistical Officer (JSO) has 6 rural FSUs assigned in Sub-Round 1 across District Bastar. Villages V1 and V2 are in northern plains (weekly haat: Monday); V3 and V4 are in central forest belt (weekly haat: Thursday); V5 and V6 are in southern riverine valley accessible only during dry spells.',
          steps: [
            {
              step: 'Step 1: Analyze Seasonal and Market Constraints',
              computation: 'Late July brings heavy monsoon flooding to the southern valley. V5 and V6 must be completed in early July before river swelling cuts off bridge access.',
              rationale: 'Avoids trapped teams and survey casualties.',
            },
            {
              step: 'Step 2: Schedule Corridor Travel Days',
              computation: 'Days 1-8: Travel to V5 & V6; complete listing and 16 interviews. Avoid Sunday church gatherings.',
              rationale: 'Completes high-risk riverine terrain first.',
            },
            {
              step: 'Step 3: Sequence Northern and Central Units around Market Days',
              computation: 'Days 10-18: Survey V1 & V2 on Tuesday-Saturday (avoiding Monday market in V1). Days 20-28: Survey V3 & V4 on Friday-Wednesday (avoiding Thursday forest haat).',
              rationale: 'Ensures household heads are home, slashing informant non-response by 80%.',
            },
          ],
          outcome: 'All 6 FSUs are completed with zero casualties within the 30-day window.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Patwari Coordination Letter',
            mandatoryRequirement: 'Send formal advance intimation letter to the Block Development Officer (BDO) and Tehsildar 7 days prior to field arrival.',
            scrutinyCheck: 'Request revenue patwari assistance to resolve ambiguous village boundary maps.',
          },
          {
            stepNo: 2,
            activity: 'Hardware Readiness Check',
            mandatoryRequirement: 'Inspect CAPI tablet chargers, solar panels, and spare stylus pens before departure.',
            scrutinyCheck: 'Ensure offline map tile packages for the target district are pre-downloaded.',
          },
        ],
        regulatoryReferences: [
          'MoSPI FOD Manual of Administration and Field Organization (Vol. I)',
          'General Financial Rules (GFR) 2017: Tour Travel Allowances for Field Staff',
        ],
        officialCaseStudy: {
          title: 'Flood Rescheduling in FOD Guwahati Sub-Division',
          context: 'Brahmaputra flooding inundated 6 allocated FSUs during the July-September survey quarter.',
          challenge: 'Avoiding survey backlog without endangering field personnel.',
          solution: 'The Superintending Officer coordinated with SDRD to swap sub-round schedules, substituting elevated urban blocks while deferring riverine villages to dry season.',
          statStandard: 'FOD Field Administration Guidelines',
        },
        knowledgeCheck: {
          question: 'Why must field survey tour programmes account for local weekly rural market days (haats)?',
          options: [
            'Because investigators are legally required to buy vegetables during duty',
            'Because many household heads are away at market on haat days, leading to high informant absence and non-response if visits are not planned around them',
            'Because all banks are closed on haat days',
            'Because survey tablets do not work in open markets',
          ],
          correctIndex: 1,
          explanation: 'On weekly market days, adult informants are away trading, so visiting households on haat days results in wasted visits and high temporary absence.',
        },
      },
      {
        id: 'mod-08-2',
        moduleNumber: 2,
        title: 'Handling Informant Refusal & Non-Response Mitigation',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Techniques for building respondent trust, explaining survey benefits, de-escalating skepticism, and reducing non-response bias.',
        learningObjectives: [
          'De-escalate informant apprehension regarding tax audits, NRC/census rumors, and welfare exclusion.',
          'Present bilingual MoSPI authorization credentials and explanatory citizen brochures effectively.',
          'Differentiate between temporary absence, casualty, and hard refusal.',
          'Gain access to gated urban high-rise societies through Resident Welfare Associations (RWAs).',
        ],
        keySections: [
          {
            heading: '1. Root Causes of Informant Resistance and Professional De-escalation',
            content: 'In modern socio-economic surveys, field officers frequently encounter apprehension. In rural areas, rumors often circulate that survey questions regarding land ownership or gold jewelry are intended to disqualify families from BPL rations or PM-Kisan benefits. In affluent urban areas, informants fear income tax audits or burglary scouting.',
            subContent: 'Field investigators must never argue, display irritation, or threaten informants. Professional de-escalation begins with calm empathy, polite body language, and presenting official bilingual brochures explaining how survey aggregates determine public schools, hospital beds, and road infrastructure.',
            bulletPoints: [
              'Statutory Reassurance: Clearly state that individual data is strictly confidential under Section 9 of the Collection of Statistics Act 2008 and cannot be shared with tax or police authorities.',
              'Panchayat Assistance: In difficult villages, request the presence of the respected local village elder or school teacher to vouch for the investigator’s bona fides.',
              'Urban RWA Protocol: Gated societies cannot be accessed by knocking cold. The Senior Statistical Officer must meet the RWA President in advance, showing formal Ministry authorization.',
            ],
            guidelineNote: 'The 3-Visit Rule: A household can only be classified as a "Temporary Absence / Casualty" after 3 separate visits conducted at different times of day (morning, afternoon, evening) on at least 2 distinct calendar days.',
          },
          {
            heading: '2. Documenting Non-Response Reasons in Schedule 0.0',
            content: 'When an interview cannot be completed despite exhaustive efforts, the investigator must log the exact statutory reason code in Block 2: (1) Informant reluctant / refused; (2) Entire household temporarily absent; (3) Language barrier / no competent informant; (4) Serious illness or bereavement in household.',
          },
        ],
        workedExample: {
          title: 'De-escalating a Coordinated Informant Boycott in an Urban Gated Community',
          scenario: 'In a luxury apartment complex of 400 flats in Bengaluru, the security guard denies entry to a MoSPI investigator conducting the Household Consumer Expenditure Survey. The RWA WhatsApp group had circulated a warning alleging that "bogus government surveyors are collecting data for new municipal wealth taxes".',
          steps: [
            {
              step: 'Step 1: Halt Direct Canvassing and Avoid Conflict',
              computation: 'Investigator does not attempt unauthorized entry or confront security guards; reports immediately to Senior Statistical Officer (SSO).',
              rationale: 'Prevents escalating hostility and police involvement.',
            },
            {
              step: 'Step 2: Formal Institutional Engagement',
              computation: 'SSO contacts the RWA Management Committee, presenting formal Ministry notification, bilingual gazette order, and sample blank schedules.',
              rationale: 'Dispels rumors by proving official statutory legitimacy.',
            },
            {
              step: 'Step 3: Digital Town Hall and Circular Issuance',
              computation: 'RWA President issues an official notice on the society noticeboard and app verifying MoSPI credentials and endorsing survey cooperation.',
              rationale: 'Converts community gatekeepers into active facilitators.',
            },
          ],
          outcome: 'All 8 sampled households in the complex cooperate willingly; zero non-response casualties recorded.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Bilingual Pamphlet Distribution',
            mandatoryRequirement: 'Hand the official MoSPI "Why Official Statistics Matter" brochure in the regional language to the household head before asking questions.',
            scrutinyCheck: 'Confirm informant understands that no personal identifying data is sold or commercialized.',
          },
          {
            stepNo: 2,
            activity: 'Formal Casualty Form Completion',
            mandatoryRequirement: 'If an informant persists in refusal after 3 visits, submit Form C-1 countersigned by the Assistant Director.',
            scrutinyCheck: 'Supervisor must verify that casual substitution by an unselected friendly neighbor was NOT performed.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Urban Survey Access Directives 2022',
          'Groves, R.M. & Couper, M.P.: Nonresponse in Household Interview Surveys (John Wiley)',
        ],
        officialCaseStudy: {
          title: 'Gated Community Access in Urban Bengaluru',
          context: 'Security associations in large high-rise apartment complexes refused entry to MoSPI investigators conducting the Consumer Expenditure Survey.',
          challenge: 'Severe urban non-response bias.',
          solution: 'The Regional Director liaised directly with the Resident Welfare Association (RWA) federation, holding an evening town hall and issuing formal authorization badges.',
          statStandard: 'MoSPI Urban Survey Access Directives',
        },
        knowledgeCheck: {
          question: 'When encountering an informant reluctant to share financial data due to income tax concerns, what is the correct professional response?',
          options: [
            'Threaten the informant with immediate police arrest',
            'Explain the statutory confidentiality under Section 9 of the Collection of Statistics Act 2008 and show that data is aggregated solely for national planning without tax agency sharing',
            'Invent false numbers on the tablet and leave',
            'Offer personal cash payments to the informant',
          ],
          correctIndex: 1,
          explanation: 'Officers must build trust by clearly explaining statutory confidentiality under the Collection of Statistics Act and highlighting that survey returns are legally quarantined from tax enforcement.',
        },
      },
      {
        id: 'mod-08-3',
        moduleNumber: 3,
        title: 'Supervisory Audits, Scrutiny & Field Reconciliation',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Execute concurrent inspections, back-checks, scrutiny meetings, and Schedule 0.0 validation to ensure pristine data fidelity across field zones.',
        learningObjectives: [
          'Differentiate between Concurrent Inspections (live observation) and Independent Back-Checks (post-survey re-interview).',
          'Execute scrutiny audits on Schedule 0.0 listing maps, household counts, and second-stage strata.',
          'Identify common field shortcuts (heaping, curbstoning, straight-lining).',
          'Conduct monthly regional office scrutiny review meetings.',
        ],
        keySections: [
          {
            heading: '1. The Twin Pillars of Quality Supervision: Concurrent vs Back-Check',
            content: 'In the Field Operations Division, data fidelity depends entirely on vigilant supervisory presence. Supervisors cannot rely solely on post-facto office data scrubbing. Two distinct physical inspection protocols are statutory requirements:',
            subContent: 'In a Concurrent Inspection, the Senior Statistical Officer (SSO) or Assistant Director (AD) accompanies the Junior Statistical Officer (JSO) into the household and sits quietly observing the entire interview. The supervisor evaluates questioning technique, probing sensitivity, and CAPI navigation, providing constructive corrective coaching after departing the dwelling.',
            bulletPoints: [
              'Concurrent Inspection: Focuses on coaching, interpersonal technique, and correcting systematic misconceptions in real time.',
              'Independent Back-Check: The supervisor visits a completed household independently 2 to 5 days after the primary investigator, without the primary investigator present.',
              'Verification Schedule: The supervisor re-asks key benchmark questions (total household members, land owned, principal source of income, major durables) and compares answers against the uploaded CAPI return.',
              'Curbstoning Detection: Falsification of interviews by an investigator sitting on a "curbstone" or hotel room is immediately uncovered during back-checks.',
            ],
            guidelineNote: 'Discrepancy Threshold: If a back-check reveals > 15% discrepancy in household demographic composition or an invented interview, the officer faces disciplinary inquiry and all work from that sub-round is re-surveyed.',
          },
          {
            heading: '2. Spotting Age Heaping and Rounding Anomalies',
            content: 'Supervisors must scrutinize demographic blocks for "age heaping" (abnormal concentration of reported ages ending in 0 or 5, e.g., 25, 30, 35, 40) which indicates lack of thorough probing by investigators.',
          },
        ],
        workedExample: {
          title: 'Executing a Back-Check Audit on Household Consumer Expenditure Schedule',
          scenario: 'An SSO conducts an independent back-check on Household #4 in Village Kalyanpur. The primary investigator logged: Household size = 4; Monthly food expenditure = Rs. 3,200; Land owned = 0.5 acres. During the back-check, the supervisor discovers the household actually consists of 7 permanent members, operates 4.5 acres of irrigated land, and spends ~Rs. 11,000 monthly.',
          steps: [
            {
              step: 'Step 1: Quantify Discrepancy Magnitude',
              computation: 'Household Size error = (7 - 4) / 7 = 42.8% omission; Land error = (4.5 - 0.5) / 4.5 = 88.8% under-reporting.',
              rationale: 'Massive discordance indicates severe investigator negligence or proxy reporting.',
            },
            {
              step: 'Step 2: Investigate Primary Interview Method',
              computation: 'Interview with JSO reveals he interviewed a passing neighbor outside the house because the gate was closed, fabricating Schedule 0.0 details.',
              rationale: 'Confirms violation of personal interview mandate.',
            },
            {
              step: 'Step 3: Remediation and Escalation',
              computation: 'Schedule #4 is deleted; JSO is ordered to re-canvass the entire FSU with supervisor presence; formal scrutiny warning issued.',
              rationale: 'Purges fraudulent data from national survey pool.',
            },
          ],
          outcome: 'FSU data is remediated accurately; supervisory vigilance prevents aggregate distortion.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Back-Check Ratio Adherence',
            mandatoryRequirement: 'SSO must log at least 2 independent back-checks in every assigned FSU before approving the batch.',
            scrutinyCheck: 'Supervisor notes must be digitally signed in the CAPI supervisory module.',
          },
          {
            stepNo: 2,
            activity: 'Schedule 0.0 Listing Reconciliation',
            mandatoryRequirement: 'Compare listed household count with previous Census count; investigate any sudden > 25% drop.',
            scrutinyCheck: 'Ensure outer tribal or tenant clusters were not skipped during listing.',
          },
        ],
        regulatoryReferences: [
          'MoSPI FOD Supervisory Manual for SSOs and ADs (2020 Edition)',
          'Central Civil Services (Classification, Control and Appeal) Rules: Disciplinary Standards for Official Inquiries',
        ],
        officialCaseStudy: {
          title: 'Detection of Under-Reported Casual Labour in FOD Nagpur',
          context: 'Scrutiny of an FSU showed zero casual labour entries across 12 sampled rural households.',
          challenge: 'Unusual occupational homogeneity in an agricultural region.',
          solution: 'The Assistant Director conducted back-checks, revealing the investigator had misunderstood the informal daily wage classification; the schedule was remediated immediately.',
          statStandard: 'FOD Supervisory Manual for SSOs and ADs',
        },
        knowledgeCheck: {
          question: 'What is the primary operational distinction between a "Concurrent Inspection" and a "Back-Check" in FOD survey supervision?',
          options: [
            'Concurrent inspection is done via phone; back-check is done via letter',
            'In concurrent inspection, the supervisor observes the investigator conducting the interview; in a back-check, the supervisor re-interviews the household independently to verify recorded data',
            'They are two identical terms with no difference',
            'Back-check is only performed on deceased respondents',
          ],
          correctIndex: 1,
          explanation: 'Concurrent inspection assesses and guides the investigator in action, whereas a back-check independently verifies completed data accuracy without the primary investigator present.',
        },
      },
    ],
  },
};
