import { CourseCurriculum } from '../curriculumTypes';

export const STAT_METHODS_CURRICULA: Record<string, CourseCurriculum> = {
  'nssta-crs-001': {
    courseId: 'nssta-crs-001',
    courseCode: 'NSSTA-STAT-01',
    courseTitle: 'Sampling Methods and Techniques Used in Large-Scale Sample Surveys',
    mappedCompetency: 'Sampling Methods & Techniques',
    totalModules: 4,
    overview: 'This official NSSTA module equips MoSPI statistical officers with theoretical foundations and field execution techniques for multi-stage stratified sampling designs utilized in NSS, PLFS, and HCES surveys.',
    prerequisites: 'Foundations of probability theory, expectation algebra, variance estimators, and official statistical terminology.',
    learningOutcome: 'Design multi-stage survey frames, compute primary sampling unit (PSU) inclusion probabilities, calibrate design weights, execute hamlet-group stratification, and minimize non-sampling errors.',
    modules: [
      {
        id: 'mod-01-1',
        moduleNumber: 1,
        title: 'Foundations of Stratified Multi-Stage Sampling in MoSPI Surveys',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Understand why MoSPI adopts multi-stage stratification over simple random sampling for socio-economic surveys across diverse geographical regions.',
        learningObjectives: [
          'Differentiate between Simple Random Sampling (SRS) and Stratified Multi-Stage Cluster Sampling in official nationwide data collection.',
          'Define Primary Sampling Units (PSUs), Sub-Sampling Units (SSUs), and Ultimate Sampling Units (USUs) across rural and urban frames.',
          'Analyze how intra-cluster correlation affects sampling variance and understand the necessity of design weights in unbiased estimation.',
          'Examine the statutory basis of sampling frames under the Collection of Statistics Act 2008.',
        ],
        keySections: [
          {
            heading: '1. The Multi-Stage Architecture in Official Socio-Economic Enquiries',
            content: 'In large-scale surveys such as the Periodic Labour Force Survey (PLFS) and Household Consumer Expenditure Survey (HCES), complete frame enumeration of all 300+ million households across India is economically and logistically impossible. While Simple Random Sampling (SRS) has desirable theoretical properties, it would disperse investigators across hundreds of thousands of isolated locations, multiplying travel expenditures and supervisory dilution.',
            subContent: 'MoSPI therefore utilizes a stratified multi-stage design. The country is first divided into geographical sectors (Rural and Urban). Within each district or group of districts, strata are constructed using demographic thresholds. First Stage Units (FSUs) are selected with Probability Proportional to Size (PPS). Inside each selected FSU, a complete listing of households is conducted, and secondary stratification (SSS) is applied based on household affluence or principal source of livelihood.',
            bulletPoints: [
              'First Stage Units (FSUs): Census 2011 villages in the rural sector and Urban Frame Survey (UFS) blocks in the urban sector.',
              'Second Stage Stratification (SSS): Households within selected FSUs are stratified by socio-economic indicators (e.g., household land holding size, major income source, or asset deciles).',
              'Ultimate Units (USUs): Individual households or enterprises selected via Circular Systematic Sampling to ensure spatial representation.',
              'Sample Multipliers: Every surveyed household is assigned an inflation multiplier equal to the inverse of its joint selection probability across all stages.',
            ],
            guidelineNote: 'MoSPI Guidelines mandate that in rural areas, large villages with population over 1,200 must be divided into 2 or more hamlet-groups (hg) of approximately equal population to prevent investigator burnout and unmanageable listing loads.',
            statutoryReference: 'Section 4(2), Collection of Statistics Act 2008 & NSS 78th Round Design Document',
          },
          {
            heading: '2. Inclusion Probabilities and Selection Multipliers in Self-Weighting Designs',
            content: 'Under a multi-stage design, each unit does not have an equal raw probability of selection. However, the design aims to be approximately self-weighting within sub-strata to ensure unbiased estimation and minimum variance. The selection probability of an FSU is proportional to its size (PPS with replacement or without replacement using the Hanurav-Vijayan or Brewer algorithm).',
            subContent: 'When selecting n FSUs out of N in a stratum with size measures Z_i (such as Census population), the first-stage inclusion probability pi_i is calculated as n * (Z_i / Z). In the second stage, if m_i households are chosen out of M_i listed households in the selected FSU, the conditional selection probability is m_i / M_i. The joint selection probability f_ij is the product of both stages.',
            technicalFormula: 'f_ij = P(FSU_i) * P(HH_j | FSU_i) = [ (n * Z_i) / Z ] * [ m_i / M_i ]\nDesign Multiplier (Weight) W_ij = 1 / f_ij',
            bulletPoints: [
              'Self-Weighting Condition: If m_i is set proportional to M_i / Z_i, the composite multiplier W_ij becomes constant across all households in the stratum.',
              'Unbiased Estimation: The Horvitz-Thompson estimator Y_hat = sum( y_ij * W_ij ) provides an unbiased estimate of the total population parameter Y.',
            ],
          },
          {
            heading: '3. Variance Estimation via Sub-Sample Orthogonal Splitting',
            content: 'Because multi-stage designs involve clustering and unequal probabilities, analytical variance calculation using standard textbook formulas is computationally complex and often sensitive to model assumptions. MoSPI incorporates orthogonal interpenetrating sub-samples (Sub-sample 1 and Sub-sample 2) in every allocated stratum.',
            subContent: 'Both sub-samples are surveyed independently by different investigators or teams during the same sub-round. This enables immediate calculation of variance through the simple squared difference between the two sub-sample estimates: Var(Y_hat) = ((Y_hat_1 - Y_hat_2) / 2)^2, offering a direct empirical measure of sampling and non-sampling variability without Taylor linearization.',
          },
        ],
        workedExample: {
          title: 'Calculating Selection Probabilities and Design Multipliers for a Rural FSU',
          scenario: 'In District Raipur (Rural Stratum 01), total rural population Z = 800,000 across 600 villages. MoSPI allocates n = 8 FSUs to be selected using PPS. Sample Village "Kawardha" has a Census population Z_i = 4,000. In Kawardha, the investigator lists M_i = 320 households, from which m_i = 8 households are sampled.',
          steps: [
            {
              step: 'Step 1: Compute First Stage Inclusion Probability P(FSU_i)',
              computation: 'P(FSU_i) = (n * Z_i) / Z = (8 * 4,000) / 800,000 = 32,000 / 800,000 = 0.040 (or 1 in 25)',
              rationale: 'Under PPS, larger villages have higher chance of selection proportional to population size.',
            },
            {
              step: 'Step 2: Compute Second Stage Conditional Probability P(HH_j | FSU_i)',
              computation: 'P(HH_j | FSU_i) = m_i / M_i = 8 / 320 = 0.025 (or 1 in 40)',
              rationale: 'Circular systematic sampling within the listed household frame of the selected village.',
            },
            {
              step: 'Step 3: Compute Overall Joint Inclusion Probability f_ij',
              computation: 'f_ij = P(FSU_i) * P(HH_j | FSU_i) = 0.040 * 0.025 = 0.0010 (or 1 in 1,000)',
              rationale: 'The joint probability of an ultimate household being included in the sample.',
            },
            {
              step: 'Step 4: Determine the Final Design Multiplier (Sampling Weight)',
              computation: 'Weight W_ij = 1 / f_ij = 1 / 0.0010 = 1,000',
              rationale: 'Each interviewed household in Kawardha represents 1,000 households in the target population.',
            },
          ],
          outcome: 'Every sample record from Kawardha will carry a multiplier of 1,000 during tabulation. If the sample households report average monthly consumption of Rs. 4,500, the expanded stratum expenditure contribution is Rs. 36 million.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Boundary Verification',
            mandatoryRequirement: 'Match Census 2011 Village Boundary Map with revenue patwari records and local landmarks before commencing listing.',
            scrutinyCheck: 'SSO must verify that nearby hamlets or railway colonies belonging to the revenue village are not inadvertently omitted.',
          },
          {
            stepNo: 2,
            activity: 'Threshold Population Estimation',
            mandatoryRequirement: 'Obtain approximate current household count from Anganwadi worker, Panchayat Secretary, and village head.',
            scrutinyCheck: 'If count exceeds 250 households (~1,200 population), hamlet-group formation protocol must be initiated immediately.',
          },
          {
            stepNo: 3,
            activity: 'Schedule 0.0 Preparation',
            mandatoryRequirement: 'List all structures, dwellings, and households systematically from northwest corner to southeast corner.',
            scrutinyCheck: 'Confirm no duplicate listings for multi-family shared houses.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Technical Guidelines on Sample Survey Design (Vol. 1)',
          'NSS Report No. 585: Technical Note on Sample Design and Estimation Procedure',
          'UN Statistics Division: Handbook of Household Surveys (Series F No. 96)',
        ],
        officialCaseStudy: {
          title: 'Case Study: Stratum Allocation in FOD Regional Office Raipur',
          context: 'During NSS 78th round preparations, a rural stratum experienced significant boundary shifts due to newly created district administrative headquarters.',
          challenge: 'Direct SRS resulted in zero samples from newly electrified tribal hamlets due to geographical clustering bias.',
          solution: 'The sampling division instituted implicit stratification by ordering villages by tribal population percentage and applying circular systematic sampling with PPS.',
          statStandard: 'NSSTA Technical Handbook on Multi-Stage Sampling (Section 3.4)',
        },
        knowledgeCheck: {
          question: 'What is the primary operational reason MoSPI uses multi-stage cluster sampling rather than Simple Random Sampling (SRS) across India?',
          options: [
            'Cluster sampling has lower theoretical variance than SRS for any fixed sample size',
            'Constructing a complete up-to-date sampling frame of all households across India is cost-prohibitive and geographically unmanageable',
            'Cluster sampling guarantees zero non-sampling error',
            'Simple Random Sampling is prohibited by the Collection of Statistics Act',
          ],
          correctIndex: 1,
          explanation: 'In nationwide surveys, creating an all-India list of individual households is impossible. Using Census villages and UFS blocks as first-stage clusters allows investigators to focus listing operations only in sampled clusters.',
        },
      },
      {
        id: 'mod-01-2',
        moduleNumber: 2,
        title: 'Probability Proportional to Size (PPS) Selection & Hamlet-Group Formation',
        durationMinutes: 35,
        wordCountEstimate: 1250,
        summary: 'Master the mechanics of PPS selection without replacement and practical protocols for hamlet-group and sub-block formation in oversized sample units.',
        learningObjectives: [
          'Calculate cumulative sizes and random start selection intervals for PPS systematic selection.',
          'Execute hamlet-group (hg) formation in oversized rural villages and sub-blocks in urban blocks.',
          'Apply Urban Frame Survey (UFS) block division rules adhering to permanent physical boundaries.',
          'Compute modified sample multipliers when only selected hamlet-groups are listed.',
        ],
        keySections: [
          {
            heading: '1. Why Large Villages Must Be Partitioned (Hamlet-Group Formation)',
            content: 'In India, village populations range from small hamlets with 50 residents to giant peri-urban villages with over 20,000 residents. When an allocated sample village exceeds the threshold population (standardly 1,200 persons or roughly 250 households in Census frames), enumerating the entire village would overwhelm field investigators, taking weeks and inducing severe fatigue errors.',
            subContent: 'To maintain listing quality, MoSPI partitions oversized villages into a predetermined number of hamlet-groups (hg) of approximately equal population size. The investigator only conducts detailed listing in a small subset of these hamlet-groups (typically 2 hamlet-groups: one with maximum demographic vulnerability purposively retained, and one chosen at random from the remaining).',
            bulletPoints: [
              'Population 1,200 to 1,799 (250 to 349 households): Form exactly 2 hamlet-groups of equal size.',
              'Population 1,800 to 2,399 (350 to 474 households): Form 3 hamlet-groups.',
              'Population 2,400 to 2,999 (475 to 599 households): Form 4 hamlet-groups.',
              'Population 3,000 to 3,599 (600 to 724 households): Form 5 hamlet-groups, and so forth (+1 hg per 600 persons).',
              'Purposive Retention Rule: In specific social rounds, the hamlet-group containing the highest concentration of SC/ST or economically weaker population is designated as hg 1 and selected with certainty.',
            ],
            guidelineNote: 'Hamlet-groups must be demarcated using permanent, clearly identifiable natural or artificial boundaries (roads, canals, railway tracks, temples, school premises) and meticulously mapped in Schedule 0.0 sketch maps.',
          },
          {
            heading: '2. Calculation of Sampling Multipliers with Hamlet-Group Partitioning',
            content: 'When an FSU is divided into D hamlet-groups and only d hamlet-groups are sampled (typically d = 2), the probability of selection for households within the sampled hamlet-groups is reduced by the fraction (d / D). Consequently, the sampling weight must be adjusted upwards by the factor (D / d) to maintain unbiased estimation.',
            technicalFormula: 'Modified Weight W = (1 / P_fsu) * (D / d) * (M_hg / m_hg)\nwhere D = total hamlet-groups formed, d = number of hamlet-groups sampled (usually 2)',
            bulletPoints: [
              'If D = 4 hamlet-groups are formed and d = 2 are selected, the hamlet-group multiplier factor is 4/2 = 2.0.',
              'Failure to multiply by D/d causes an immediate 50% underestimation bias in final population aggregates.',
            ],
          },
          {
            heading: '3. Urban Frame Survey (UFS) Sub-Block Formation Rules',
            content: 'In the urban sector, UFS blocks are designed to contain roughly 100–150 households (about 600–800 persons). However, due to rapid urban construction and high-rise apartments, a UFS block may expand to 800+ households. In such instances, Sub-Block formation is mandatory using street corridors, floor numbers, or wing divisions.',
          },
        ],
        workedExample: {
          title: 'Hamlet-Group Formation and Sampling Weight Calculation in an Expanding Village',
          scenario: 'Village "Bhimpur" has an initial Census 2011 population of 1,050. When the Senior Statistical Officer (SSO) arrives, local inquiries reveal rapid expansion to 2,250 persons (~450 households). The initial FSU selection probability was P_fsu = 0.05.',
          steps: [
            {
              step: 'Step 1: Determine Required Number of Hamlet-Groups (D)',
              computation: 'Current population is 2,250 (falls in 1,800–2,399 range) => D = 3 hamlet-groups.',
              rationale: 'According to MoSPI Table of Formation, 1,800 to 2,399 population requires exactly 3 hamlet-groups of ~750 persons (~150 households) each.',
            },
            {
              step: 'Step 2: Demarcate and Sample Hamlet-Groups',
              computation: 'Demarcate hg 1 (North of canal), hg 2 (South of canal, East of main road), hg 3 (West of main road). Sample d = 2 hamlet-groups (hg 1 and hg 2).',
              rationale: 'Standard MoSPI survey instructions mandate sampling 2 hamlet-groups when D >= 2.',
            },
            {
              step: 'Step 3: Conduct Listing in Sampled Hamlet-Groups',
              computation: 'Listed M_1 = 150 households in hg 1; Listed M_2 = 140 households in hg 2. Total M_sampled = 290 households. Sample size m = 8 households (4 from each hg).',
              rationale: 'Detailed Schedule 0.0 is completed only for the 2 sampled hamlet-groups, saving 160 households from redundant listing.',
            },
            {
              step: 'Step 4: Compute Inflation Multiplier for a Sample Household in hg 1',
              computation: 'W = (1 / P_fsu) * (D / d) * (M_1 / m_1) = (1 / 0.05) * (3 / 1) * (150 / 4) = 20 * 3 * 37.5 = 2,250',
              rationale: 'The multiplier accounts for FSU selection (20x), hamlet-group selection (3x), and within-hg systematic sampling (37.5x).',
            },
          ],
          outcome: 'The weight of 2,250 correctly expands each sample household to reflect the full population of Bhimpur village.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Reconnaissance and Demarcation',
            mandatoryRequirement: 'Walk entire perimeter of village with local revenue assistant to confirm natural and man-made dividing lines.',
            scrutinyCheck: 'Confirm that hamlet-group boundaries do not cut through the middle of residential compounds.',
          },
          {
            stepNo: 2,
            activity: 'Equalization Check',
            mandatoryRequirement: 'Ensure that population in each formed hamlet-group does not deviate by more than 20% from the target average.',
            scrutinyCheck: 'If one hamlet-group has 1,400 people and another has 300, redraw boundaries to balance counts.',
          },
          {
            stepNo: 3,
            activity: 'Random Selection Verification',
            mandatoryRequirement: 'Use random numbers table provided by SDRD headquarters to select hamlet-groups; never select arbitrarily.',
            scrutinyCheck: 'Record selected random numbers in Block 2 of Schedule 0.0.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Field Operations Division: Handbook of Instructions for Field Staff (Vol. I)',
          'Urban Frame Survey (UFS) Technical Guidelines 2020',
          'Cochran, W.G.: Sampling Techniques (3rd Edition, Chapter 10)',
        ],
        officialCaseStudy: {
          title: 'Field Execution: HCES 2022-23 Listing Protocol in Purulia',
          context: 'An FOD investigator arrived at village Ramnagar with Census 2011 population of 950, but on-ground expansion revealed over 2,200 current residents.',
          challenge: 'Enumerating all 480 households would delay the 10-day survey camp by two weeks.',
          solution: 'The Sub-Divisional Officer directed the formation of 3 distinct hamlet-groups using the village canal and post office road as boundaries, selecting two for detailed listing.',
          statStandard: 'MoSPI FOD Field Instructions Manual Vol. 1, Chapter 2',
        },
        knowledgeCheck: {
          question: 'If a sample village has an estimated current population of 2,100 persons, into how many hamlet-groups should the investigator divide the village according to standard MoSPI norms?',
          options: [
            '2 hamlet-groups',
            '3 hamlet-groups',
            '5 hamlet-groups',
            'No division is permitted without written Ministry gazette order',
          ],
          correctIndex: 1,
          explanation: 'Under MoSPI standard survey instructions, a population between 1,800 and 2,399 requires formation of exactly 3 hamlet-groups of approximately equal size.',
        },
      },
      {
        id: 'mod-01-3',
        moduleNumber: 3,
        title: 'Design Effect (Deff) & Sample Weight Calibration',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Quantify the loss of precision caused by spatial clustering and master the mathematical computation of survey multipliers, post-stratification, and non-response calibration.',
        learningObjectives: [
          'Calculate and interpret the Design Effect (Deff) and Design Factor (Deft).',
          'Evaluate intra-cluster correlation coefficient (roh) and its sensitivity to cluster sample size.',
          'Apply post-stratification adjustment factors to calibrate sample weights against independent Census projections.',
          'Differentiate between unit non-response adjustments and item imputation.',
        ],
        keySections: [
          {
            heading: '1. The Mathematics of Design Effect (Deff)',
            content: 'In sample design, precision is defined as the inverse of the estimator variance. Because households residing in the same village or urban block frequently share similar socio-economic characteristics (soil fertility, local wages, ethnic composition), observations within a cluster are positively correlated. This intra-cluster homogeneity violates the independence assumption of Simple Random Sampling.',
            subContent: 'The Design Effect (Deff), formulated by Leslie Kish, measures how many times larger the variance of a complex cluster sample is compared to an SRS sample of identical size. It depends on two parameters: the average cluster size m (number of households interviewed per FSU) and the intra-cluster correlation coefficient (roh).',
            technicalFormula: 'Deff = Var_complex(estimate) / Var_srs(estimate) = 1 + (m - 1) * roh\nDeft = sqrt(Deff)',
            bulletPoints: [
              'roh measures the degree of similarity between units within the same cluster relative to units in different clusters.',
              'If roh = 0, Deff = 1.0 (cluster sampling is as efficient as SRS).',
              'If m = 12 and roh = 0.10, Deff = 1 + 11 * 0.10 = 2.10. This means the complex sample variance is 2.1x higher, effectively halving the effective sample size.',
            ],
            guidelineNote: 'To reduce Deff, SDRD survey designers optimize sample allocation by surveying fewer households per cluster (e.g., reducing m from 16 to 8) across a larger number of clusters.',
          },
          {
            heading: '2. Post-Stratification and Non-Response Calibration Weights',
            content: 'Even with rigorous sampling, realised sample distributions may deviate from known population totals due to differential non-response (e.g., wealthy urban households refusing to answer, or young migrant males being absent). Post-stratification adjusts the design weights W_ij so that the weighted sample totals match external benchmark totals (such as Registrar General of India population projections).',
            technicalFormula: 'Calibrated Weight W*_ij = W_ij * ( Population_Total_k / Estimated_Sample_Total_k )\nwhere k denotes the post-stratum (e.g., Rural Females aged 15-29 in Karnataka)',
          },
        ],
        workedExample: {
          title: 'Computing Design Effect and Effective Sample Size in a Labour Survey',
          scenario: 'In an urban survey measuring unemployment, SDRD surveys n = 100 UFS blocks with m = 8 households per block, giving a total sample size of n_total = 800 households. Statistical analysis reveals an intra-cluster correlation roh = 0.08 for unemployment status.',
          steps: [
            {
              step: 'Step 1: Compute the Design Effect (Deff)',
              computation: 'Deff = 1 + (m - 1) * roh = 1 + (8 - 1) * 0.08 = 1 + 7 * 0.08 = 1 + 0.56 = 1.56',
              rationale: 'Measures variance inflation resulting from clustering 8 households per UFS block.',
            },
            {
              step: 'Step 2: Compute the Design Factor (Deft)',
              computation: 'Deft = sqrt(Deff) = sqrt(1.56) = 1.249',
              rationale: 'Confidence intervals under the cluster design are 1.25 times wider than under SRS.',
            },
            {
              step: 'Step 3: Compute Effective Sample Size (n_eff)',
              computation: 'n_eff = n_total / Deff = 800 / 1.56 = 512.8 ~ 513 households',
              rationale: 'The 800 clustered households provide the same statistical information as 513 independent SRS households.',
            },
          ],
          outcome: 'The survey designer knows that to achieve the statistical power of 800 SRS respondents, the cluster sample must be expanded to 800 * 1.56 = 1,248 households.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Casualty Tracking',
            mandatoryRequirement: 'If a sampled household is locked or permanently shifted, minimum 3 return visits at different times of day are required before declaring a casualty.',
            scrutinyCheck: 'Every casualty must be personally countersigned by the Assistant Director with reason code in Schedule 0.0.',
          },
          {
            stepNo: 2,
            activity: 'Substitution Protocol',
            mandatoryRequirement: 'Under standard NSS protocol, arbitrary substitution of a non-responding household by a friendly neighbor is strictly prohibited.',
            scrutinyCheck: 'Inspectors who substitute without formal SDRD replacement orders are issued immediate audit show-cause.',
          },
        ],
        regulatoryReferences: [
          'Kish, L.: Survey Sampling (John Wiley & Sons)',
          'Srivastava, A.K. & Bathla, H.V.L.: Sampling Techniques for Agricultural Surveys',
          'NSS Methodology Report: Weight Calibration and Post-Stratification in PLFS',
        ],
        officialCaseStudy: {
          title: 'Design Audit: PLFS Unemployment Rate Variance in Urban Tamil Nadu',
          context: 'Analysis showed a Deff of 2.4 for urban female labour force participation, leading to wider confidence bounds than projected.',
          challenge: 'Large intra-block correlation in high-density informal settlement clusters.',
          solution: 'SDRD revised the cluster size from 12 households per UFS block to 8 households per block across a larger number of blocks, reducing Deff to 1.4.',
          statStandard: 'NSSTA Research Monograph on Survey Precision (Vol. 14)',
        },
        knowledgeCheck: {
          question: 'If the intra-cluster correlation (roh) in a survey design is 0.05 and the average cluster size is 9 households, what is the theoretical Design Effect (Deff)?',
          options: [
            '1.00',
            '1.40',
            '1.85',
            '2.40',
          ],
          correctIndex: 1,
          explanation: 'Deff = 1 + (m - 1) * roh = 1 + (9 - 1) * 0.05 = 1 + 8 * 0.05 = 1 + 0.40 = 1.40.',
        },
      },
      {
        id: 'mod-01-4',
        moduleNumber: 4,
        title: 'Non-Sampling Errors & Quality Assurance in Field Data Capture',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Mitigate non-sampling bias, respondent recall decay, boundary confusion, and listing discrepancies under the National Quality Assurance Framework.',
        learningObjectives: [
          'Classify non-sampling errors into specification, coverage, response, non-response, and processing errors.',
          'Execute supervisory concurrent inspections, spot checks, and independent back-checks.',
          'Operate automated CAPI validation rules preventing logical contradictions in real time.',
          'Implement the UN National Quality Assurance Framework (NQAF) principles in field offices.',
        ],
        keySections: [
          {
            heading: '1. The Asymmetry of Non-Sampling Errors',
            content: 'While sampling error decreases monotonically as sample size increases, non-sampling error behaves in the exact opposite manner. As sample size expands, non-sampling error frequently explodes due to the difficulty of recruiting qualified interviewers, declining training standards, supervisory dilution, and investigator fatigue.',
            subContent: 'Non-sampling errors are present in complete censuses as well as sample surveys. In socio-economic surveys, the most damaging non-sampling errors include boundary misidentification (omitting outer hamlets), recall loss over long reference periods, and respondent suspicion regarding taxation or welfare eligibility.',
            bulletPoints: [
              'Listing Coverage Errors: Failure to identify newly formed residential clusters, slums, or institutional living quarters.',
              'Recall Decay: Informants forgetting minor food expenditures over a 30-day reference window (addressed in HCES via Modified Mixed Reference Period MMRP).',
              'Investigator Conditioning: Rushed interviews leading to suggestive questions and fabricated responses.',
            ],
            guidelineNote: 'To control field operations, MoSPI mandates that every survey sub-round is strictly completed within its 3-month calendar window; carry-forward across quarters is forbidden.',
          },
          {
            heading: '2. Multi-Tier Supervisory Hierarchy in Field Operations Division (FOD)',
            content: 'FOD maintains a rigid statutory supervision chain. For every assigned FSU, the primary investigator (Junior Statistical Officer or Field Investigator) is monitored by a Senior Statistical Officer (SSO). The SSO must perform minimum 25% concurrent inspections (observing the interview live) and minimum 5% independent back-checks (re-interviewing the household on key variables after the investigator departs).',
          },
        ],
        workedExample: {
          title: 'Calculating Scrutiny Error Rate and Inspection Quota for an FOD Sub-Region',
          scenario: 'An FOD Sub-Regional Office has 12 Field Investigators assigned to complete 120 FSUs in Sub-Round 2. Each FSU contains 8 detailed household schedules, totaling 960 schedules. The Senior Statistical Officer must enforce MoSPI inspection quotas.',
          steps: [
            {
              step: 'Step 1: Calculate Minimum Concurrent Inspection Quota',
              computation: 'Quota = 25% of 120 FSUs = 30 FSUs (representing 240 household interviews)',
              rationale: 'SSO must be physically present inside the dwelling during listing and interview.',
            },
            {
              step: 'Step 2: Calculate Minimum Independent Back-Check Quota',
              computation: 'Back-Check Quota = 5% of 960 schedules = 48 completed schedules',
              rationale: 'Re-visited independently to verify household composition, land owned, and major consumption items.',
            },
            {
              step: 'Step 3: Analyze Discrepancy Tolerance Threshold',
              computation: 'If back-check reveals > 10% discrepancy in household income classification, the entire FSU is rejected and re-enumerated.',
              rationale: 'Prevents investigator carelessness from corrupting state aggregates.',
            },
          ],
          outcome: 'The SSO logged 32 concurrent inspections and 50 back-checks, identifying 2 invalid schedules that were corrected before central server sync.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'GPS Telemetry Validation',
            mandatoryRequirement: 'CAPI tablet must capture valid GPS coordinates with < 15m horizontal accuracy within the village boundary at interview start.',
            scrutinyCheck: 'Interviews recorded with identical coordinates or outside FSU boundary are automatically quarantined by the server.',
          },
          {
            stepNo: 2,
            activity: 'Timestamp Duration Check',
            mandatoryRequirement: 'A complete household schedule must take minimum 45 minutes to administer.',
            scrutinyCheck: 'Interviews completed in under 20 minutes are flagged for immediate supervisory back-check.',
          },
        ],
        regulatoryReferences: [
          'UN National Quality Assurance Frameworks (UN-NQAF)',
          'MoSPI Data Quality Assurance Division (DQAD) Charter',
          'Collection of Statistics Rules 2011: Verification and Inspection Provisions',
        ],
        officialCaseStudy: {
          title: 'Quality Check: CAPI GPS Verification in Western Zone',
          context: 'An investigator logged 8 completed rural household interviews within 45 minutes.',
          challenge: 'Automated telemetry flagged timestamps and geocodes located at a roadside dhaba 4 km from the sample village.',
          solution: 'The system rejected the batch; the regional officer conducted a mandatory re-interview of the entire FSU with supervisor accompaniment.',
          statStandard: 'MoSPI Digital CAPI Governance Charter',
        },
        knowledgeCheck: {
          question: 'Under MoSPI Field Operations Division guidelines, what percentage of completed household schedules must be personally spot-checked or inspected by Senior Statistical Officers?',
          options: [
            '100% of all schedules',
            'Minimum 25% of completed schedules',
            'Only 2% of schedules',
            'Inspections are discretionary and not mandatory',
          ],
          correctIndex: 1,
          explanation: 'FOD standard operating procedures mandate that SSOs inspect at least 25% of primary schedules in every assigned FSU to guarantee listing fidelity and data reliability.',
        },
      },
    ],
  },

  'nssta-crs-002': {
    courseId: 'nssta-crs-002',
    courseCode: 'NSSTA-STAT-02',
    courseTitle: 'Index Numbers and Price Statistics: CPI and WPI Compilation Methodology',
    mappedCompetency: 'Price Statistics & Index Numbers',
    totalModules: 3,
    overview: 'Master the technical mechanics of price collection, elementary aggregate computation, item basket weighting, quality adjustment, and headline CPI/WPI compilation based on official MoSPI base 2012=100 methodologies.',
    prerequisites: 'Foundational understanding of weighted arithmetic and geometric means, index number axioms, and market sampling.',
    learningOutcome: 'Compile elementary price relatives using geometric averages, aggregate indices via modified Laspeyres formula, execute item substitution protocols, and resolve missing quotations.',
    modules: [
      {
        id: 'mod-02-1',
        moduleNumber: 1,
        title: 'Architecture of All-India Consumer Price Index (CPI Base 2012=100)',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Explore the weighting diagrams, rural/urban market quotations, and commodity basket representation of India’s Consumer Price Index.',
        learningObjectives: [
          'Analyze how the Consumer Expenditure Survey (CES) determines CPI item weights across States and UTs.',
          'Differentiate CPI (Rural), CPI (Urban), and CPI (Combined) aggregation pipelines.',
          'Understand the monthly price collection cycle across 1,181 rural villages and 1,114 urban markets.',
          'Examine the treatment of subsidized items under PDS and housing rental index compilation.',
        ],
        keySections: [
          {
            heading: '1. The Weighting Diagram and Commodity Basket Architecture',
            content: 'The Consumer Price Index (CPI) measures changes over time in the general level of prices of consumer goods and services acquired by households for consumption. India’s CPI (Base 2012=100), released monthly by the National Statistical Office (NSO), is derived from consumption expenditure patterns captured in the 68th Round of the Consumer Expenditure Survey (2011-12).',
            subContent: 'The index comprises 299 items in the Rural basket and 310 items in the Urban basket, classified into six major groups following the international Classification of Individual Consumption According to Purpose (COICOP). Group weights differ significantly between Rural and Urban sectors, reflecting structural expenditure differences.',
            bulletPoints: [
              'Group 1: Food and Beverages (Rural: 54.18%, Urban: 36.29%, Combined: 45.86%). The single largest component in India’s headline index.',
              'Group 2: Pan, Tobacco and Intoxicants (Rural: 3.26%, Urban: 1.36%, Combined: 2.38%).',
              'Group 3: Clothing and Footwear (Rural: 7.36%, Urban: 5.57%, Combined: 6.53%).',
              'Group 4: Housing (Urban only: 21.67% of Urban basket, 10.07% of Combined basket).',
              'Group 5: Fuel and Light (Rural: 7.94%, Urban: 5.58%, Combined: 6.84%).',
              'Group 6: Miscellaneous: Health, Education, Transport, Personal Care (Rural: 27.26%, Urban: 29.53%, Combined: 28.32%).',
            ],
            guidelineNote: 'Housing index is collected exclusively from 1,114 urban markets across 310 towns on a 6-monthly rotating sample of rented dwellings. No rural housing index is compiled due to the absence of an organized rural rental market.',
          },
          {
            heading: '2. Market Selection and Quotation Canvassing Protocol',
            content: 'Price data is collected on a weekly rotating schedule by postal department staff (in 1,181 rural villages) and FOD price collectors (in 1,114 urban markets across 310 towns). To ensure price continuity, investigators visit designated sample shops on fixed days of the week (e.g., Shop A every first Friday, Shop B every third Friday).',
          },
        ],
        workedExample: {
          title: 'Calculating All-India Combined CPI Group Weight from Rural and Urban Sub-Indices',
          scenario: 'In the base year 2012, total consumption expenditure was estimated at Rs. 4,200 billion in Rural India and Rs. 3,800 billion in Urban India (Total: Rs. 8,000 billion). In Rural, Food & Beverages expenditure share is 54.18%. In Urban, Food & Beverages share is 36.29%.',
          steps: [
            {
              step: 'Step 1: Determine Sectoral Macro Weights',
              computation: 'W_rural = 4,200 / 8,000 = 0.525 (52.5%); W_urban = 3,800 / 8,000 = 0.475 (47.5%)',
              rationale: 'Reflects the macro consumption expenditure proportion of rural vs urban households.',
            },
            {
              step: 'Step 2: Compute Combined Weight for Food and Beverages',
              computation: 'W_comb = (W_rural * Weight_rural_food) + (W_urban * Weight_urban_food) = (0.525 * 54.18) + (0.475 * 36.29) = 28.444 + 17.238 = 45.682% ~ 45.86%',
              rationale: 'Combines rural and urban expenditure baskets into the single national headline benchmark.',
            },
          ],
          outcome: 'Food and Beverages carries a combined weight of 45.86%, which explains why agricultural supply shocks directly drive headline CPI inflation in India.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Quotation Timing and Day Fixation',
            mandatoryRequirement: 'Collect quotations strictly between 10:00 AM and 2:00 PM on designated market transaction days.',
            scrutinyCheck: 'Weekend market prices must not be mixed with mid-week wholesale rates.',
          },
          {
            stepNo: 2,
            activity: 'PDS Dual Pricing Capture',
            mandatoryRequirement: 'Record both Fair Price Shop (PDS) subsidized prices and Open Market prices for rice, wheat, and kerosene.',
            scrutinyCheck: 'Ensure official ration entitlement quota weights are applied as prescribed by PSD.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Manual on Consumer Price Index (Base 2012=100)',
          'IMF / ILO / World Bank / OECD: Consumer Price Index Manual: Theory and Practice',
          'Technical Advisory Committee on Prices and Cost of Living (TAC on PCL) Directives',
        ],
        officialCaseStudy: {
          title: 'Price Index Compilation during Commodity Outliers',
          context: 'During a monsoon flood in Maharashtra, onion quotations in 14 urban markets spiked by 300% before supplies dried up completely for 10 days.',
          challenge: 'Handling zero quotation returns without skewing the entire vegetable sub-group.',
          solution: 'Price Statistics Division applied standard imputations: when no transactions take place, the price relative of the higher-level subgroup is imputed, preserving trend integrity.',
          statStandard: 'MoSPI Price Statistics Division Manual on Item Imputation (Ch. 4)',
        },
        knowledgeCheck: {
          question: 'In India’s All-India CPI (Combined, Base 2012=100), which major group carries the highest percentage weight?',
          options: [
            'Miscellaneous (Health, Education, Transport)',
            'Housing',
            'Food and Beverages',
            'Fuel and Light',
          ],
          correctIndex: 2,
          explanation: 'Food and Beverages carries the largest single group weight in India’s CPI Combined at 45.86%, reflecting typical consumer expenditure patterns in developing economies.',
        },
      },
      {
        id: 'mod-02-2',
        moduleNumber: 2,
        title: 'Formulae & Aggregation: From Price Relatives to Headline Index',
        durationMinutes: 35,
        wordCountEstimate: 1200,
        summary: 'Deep dive into elementary price aggregate mathematics, Jevons geometric index, and Modified Laspeyres second-stage weighted aggregation.',
        learningObjectives: [
          'Compute elementary price relatives using the Jevons Geometric Mean formula.',
          'Understand why the Dutot and Carli formulations introduce measurement biases.',
          'Aggregate item indices into sub-groups, groups, and General CPI using Modified Laspeyres.',
          'Execute the two-stage aggregation pipeline across State and All-India levels.',
        ],
        keySections: [
          {
            heading: '1. Elementary Aggregates: Why MoSPI Uses the Jevons Index',
            content: 'At the lowest level of aggregation (individual market shops within a town), expenditure values for each individual shop are not available—only raw price quotations are recorded. To combine these shop-level quotations into an elementary price relative for an item in a state, statistical agencies must choose an aggregation formula.',
            subContent: 'Historically, agencies used the Carli formula (arithmetic average of price relatives) or Dutot formula (ratio of arithmetic average prices). However, axiomatic index theory proved that Carli suffers from severe upward bias and fails the time reversal test, while Dutot is sensitive to arbitrary units of measurement (e.g., pricing by kilogram vs gram). MoSPI adopted the Jevons Index (geometric mean of price relatives), which satisfies the time reversal and transitivity tests.',
            technicalFormula: 'Jevons Index: R_item = [ prod_{k=1}^K (p_t,k / p_0,k) ]^(1/K) = [ prod p_t,k ]^(1/K) / [ prod p_0,k ]^(1/K)\nModified Laspeyres: I_t = [ sum ( W_i * R_i,t ) ] / [ sum W_i ]',
            bulletPoints: [
              'Time Reversal Axiom: An index that doubles when prices double must halve when prices are reversed. Jevons satisfies this; Carli yields an index > 1.0.',
              'Transitivity: Compiling from month 0 to 1, and 1 to 2, equals compiling directly from 0 to 2.',
            ],
          },
          {
            heading: '2. Second-Stage Aggregation to Headline CPI',
            content: 'Once elementary item indices are compiled for all 310 items in each State/UT, they are aggregated hierarchically: Item -> Sub-Group -> Group -> State General Index -> All-India General Index. The aggregation uses base-period expenditure shares as fixed weights.',
          },
        ],
        workedExample: {
          title: 'Computing Elementary Jevons Index and Sub-Group Aggregation',
          scenario: 'In Market "Chandni Chowk", base year prices and current month prices for 3 brands of Mustard Oil (1 Litre) are collected: Brand A (Base: Rs. 100, Current: Rs. 121), Brand B (Base: Rs. 120, Current: Rs. 144), Brand C (Base: Rs. 80, Current: Rs. 100).',
          steps: [
            {
              step: 'Step 1: Compute Individual Price Relatives',
              computation: 'r_A = 121/100 = 1.21; r_B = 144/120 = 1.20; r_C = 100/80 = 1.25',
              rationale: 'Current price divided by base price for each sampled quotation.',
            },
            {
              step: 'Step 2: Compute Jevons Geometric Mean Elementary Index',
              computation: 'R_jevons = (1.21 * 1.20 * 1.25)^(1/3) = (1.815)^(1/3) = 1.2198 (or 121.98)',
              rationale: 'Geometric average of price relatives eliminates upward substitution bias.',
            },
            {
              step: 'Step 3: Compare with Carli Arithmetic Average',
              computation: 'R_carli = (1.21 + 1.20 + 1.25) / 3 = 3.66 / 3 = 1.2200 (or 122.00)',
              rationale: 'Notice Carli (122.00) is strictly higher than Jevons (121.98), demonstrating the arithmetic upward wedge.',
            },
          ],
          outcome: 'The elementary index for Mustard Oil in Chandni Chowk is 121.98, reflecting a 21.98% price rise relative to the 2012 base.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Outlier Scrutiny',
            mandatoryRequirement: 'Any item quotation showing > 20% increase or decrease within one month triggers an automated validation flag.',
            scrutinyCheck: 'Investigator must add explanatory remarks (e.g., seasonal crop failure, festival demand) before upload.',
          },
          {
            stepNo: 2,
            activity: 'Price Base Maintenance',
            mandatoryRequirement: 'Base year prices must never be edited locally by field officers without explicit circular from PSD headquarters.',
            scrutinyCheck: 'Verify base prices match the official 2012 gazetted master price file.',
          },
        ],
        regulatoryReferences: [
          'ILO / IMF CPI Manual: Formula and Axiomatic Properties (Chapter 9)',
          'National Statistical Commission (NSC) Report on Price Statistics',
        ],
        officialCaseStudy: {
          title: 'Re-basing Calibration: Shift to Modified Laspeyres in NAD/PSD',
          context: 'Earlier historical index series utilized Carli arithmetic mean of price relatives at elementary levels.',
          challenge: 'Carli formulation consistently overstated inflation by 0.3-0.5% due to arithmetic asymmetry.',
          solution: 'MoSPI adopted international standard Jevons geometric mean aggregation at the quotation level, aligning with IMF and ILO standards.',
          statStandard: 'Manual on Consumer Price Index (ILO / MoSPI Technical Standard)',
        },
        knowledgeCheck: {
          question: 'Which mathematical formula does MoSPI use to compute elementary aggregate price relatives across individual market quotations before weighting?',
          options: [
            'Carli Arithmetic Average of Price Relatives',
            'Dutot Ratio of Arithmetic Average Prices',
            'Jevons Geometric Mean of Price Relatives',
            'Harmonic Mean of Quantities',
          ],
          correctIndex: 2,
          explanation: 'MoSPI utilizes the Jevons Index (geometric mean of price relatives) for elementary aggregates because it is invariant to units of measurement and satisfies the time reversal property.',
        },
      },
      {
        id: 'mod-02-3',
        moduleNumber: 3,
        title: 'Item Substitution, Quality Adjustment & Digital Price Portals',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Protocol for managing discontinued varieties, hedonic quality adjustment, electronic price transmission via mobile apps, and validation scrubbing.',
        learningObjectives: [
          'Execute the variety substitution protocol when a sampled product disappears from market shelves.',
          'Apply overlap pricing, spliced linking, and direct quality adjustment.',
          'Operate the MoSPI Price Collection Mobile Application and GPS-stamped transmission routines.',
        ],
        keySections: [
          {
            heading: '1. The Variety Substitution Decision Tree',
            content: 'Consumer goods evolve continuously. A specific soap brand, packaged edible oil, or fabric variety sampled in 2012 may be discontinued by manufacturers. When an item variety ceases to be available, field collectors cannot simply skip the item, enter zero, or arbitrarily pick an unrelated luxury replacement.',
            subContent: 'MoSPI mandates a strict 3-tier substitution protocol. If the item is temporarily unavailable (e.g., out of stock for < 2 months), the price is imputed from adjacent shops. If permanently discontinued, the collector must select the most popular comparable replacement variety currently sold in the same shop.',
            bulletPoints: [
              'Step 1: Check temporary vs permanent absence. If absent for 2 consecutive months, treat as permanently unavailable.',
              'Step 2: Identify replacement variety with closest functional utility, pack size, and market turnover.',
              'Step 3: Collect overlap prices: ascertain the price of the new variety in the current month AND its estimated or recorded price in the preceding month to splice the index cleanly.',
            ],
            technicalFormula: 'Splicing Factor = Price_new(t-1) / Price_old(t-1)\nAdjusted Base Price = Base_Price_old * [ Price_new(t-1) / Price_old(t-1) ]',
          },
          {
            heading: '2. Explicit Quality Adjustments for Technological Goods',
            content: 'When replacing electronics or consumer durables (e.g., cathode-ray TVs replaced by LED smart TVs, or incandescent bulbs replaced by LED lamps), price increases frequently reflect superior technology and longevity rather than inflation. MoSPI applies explicit quality adjustments based on technical specifications or hedonic regressions to prevent artificial inflation spikes.',
          },
        ],
        workedExample: {
          title: 'Splicing a Discontinued Commodity Variety Using Overlap Pricing',
          scenario: 'In Shop 12, "Brand X Toothpaste 100g" (Base Price 2012 = Rs. 30) is permanently discontinued in Month t. In Month t-1, Brand X sold for Rs. 60. The collector identifies "Brand Y Toothpaste 100g" as the direct substitute, selling for Rs. 70 in Month t-1 and Rs. 75 in Month t.',
          steps: [
            {
              step: 'Step 1: Calculate the Overlap Price Relative in Month t-1',
              computation: 'Overlap Ratio = Price_Y(t-1) / Price_X(t-1) = 70 / 60 = 1.1667',
              rationale: 'Quantifies the price differential between the old and new varieties at the moment of transition.',
            },
            {
              step: 'Step 2: Adjust the Base Year Price for the New Variety',
              computation: 'Adjusted Base Price_Y(0) = Base Price_X(0) * Overlap Ratio = 30 * 1.1667 = Rs. 35.00',
              rationale: 'Re-scales the 2012 base price so that the new brand links smoothly without an artificial jump.',
            },
            {
              step: 'Step 3: Compute the Price Relative for Month t',
              computation: 'Price Relative = Price_Y(t) / Adjusted Base Price_Y(0) = 75 / 35.00 = 2.1428 (Index: 214.28)',
              rationale: 'Accurately measures pure inflation (+7.14% from Month t-1 to t) rather than variety switching cost.',
            },
          ],
          outcome: 'The series continues smoothly without distorting the Oral Hygiene sub-index.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Substitution Authorization',
            mandatoryRequirement: 'Complete Form P-3 for every substituted variety, documenting brand, specification, unit, and reason for change.',
            scrutinyCheck: 'Form P-3 must be approved by the Assistant Director (Prices) before the schedule is finalized.',
          },
          {
            stepNo: 2,
            activity: 'CAPI Upload Verification',
            mandatoryRequirement: 'Transmit price schedules via secure mobile portal by the 25th of the reference month.',
            scrutinyCheck: 'Ensure server response code "ACK-200" is generated with cryptographic hash.',
          },
        ],
        regulatoryReferences: [
          'MoSPI PSD Circular No. 4/2019: Operational Guidelines on Variety Substitution',
          'UN-ECE Practical Guide to Producing Consumer Price Indices',
        ],
        officialCaseStudy: {
          title: 'Product Phase-Out: Incandescent Bulbs to LED Lamps',
          context: 'Over a 3-year span, 60-watt incandescent bulbs disappeared from urban markets as energy-saving LED lamps became universal.',
          challenge: 'Direct price comparison suggested a 400% price spike, whereas the light output and lifespan were radically superior.',
          solution: 'PSD applied explicit quality adjustment based on lumen-hours utility, dampening the artificial price spike.',
          statStandard: 'MoSPI Operational Directives for Market Scrutiny Officers',
        },
        knowledgeCheck: {
          question: 'When a specific branded item becomes permanently unavailable in a sampled market, what is the mandatory protocol for the price collector?',
          options: [
            'Immediately drop the entire commodity from the state index forever',
            'Select the most popular comparable replacement variety and collect overlap pricing to splice the series',
            'Record the price as zero rupees',
            'Guess the price based on national newspaper advertisements',
          ],
          correctIndex: 1,
          explanation: 'Standard protocol mandates identifying a comparable substitute variety with highest turnover, establishing an overlap link to splice the historical price index without creating an artificial inflation spike.',
        },
      },
    ],
  },
};
