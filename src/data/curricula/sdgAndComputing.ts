import { CourseCurriculum } from '../curriculumTypes';

export const SDG_AND_COMPUTING_CURRICULA: Record<string, CourseCurriculum> = {
  'nssta-crs-005': {
    courseId: 'nssta-crs-005',
    courseCode: 'NSSTA-STAT-05',
    courseTitle: 'Social Statistics and the Sustainable Development Goals (SDG) National Indicator Framework',
    mappedCompetency: 'Social & Sustainable Development (SDG) Metrics',
    totalModules: 3,
    overview: 'In-depth operational study of the UN 2030 Sustainable Development Goals, India’s localized National Indicator Framework (NIF), baseline monitoring, inter-ministerial administrative data flows, and sub-national State/District Indicator Frameworks (SIF/DIF).',
    prerequisites: 'Descriptive statistics, public policy indicators, and administrative data systems.',
    learningOutcome: 'Map line ministry administrative systems to SDG indicators, evaluate indicator metadata sheets, compute composite state development scores, and execute small-area disaggregations for district monitoring.',
    modules: [
      {
        id: 'mod-05-1',
        moduleNumber: 1,
        title: 'Architecture of India’s SDG National Indicator Framework (NIF)',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Understand the multi-tier statistical architecture tracking 17 Goals, 169 Targets, and India’s ~300 national indicators.',
        learningObjectives: [
          'Explain why India adapted the UN Global Indicator Framework into a customized National Indicator Framework (NIF).',
          'Analyze the statutory mandate of MoSPI Social Statistics Division (SSD) as the national coordinating and compiling agency.',
          'Differentiate between Outcome Indicators, Process Indicators, and Structural Indicators.',
          'Review the data flow channels connecting central line ministries, autonomous bodies, and NITI Aayog.',
        ],
        keySections: [
          {
            heading: '1. National Adaptation: The Birth of India’s NIF',
            content: 'In September 2015, the United Nations General Assembly adopted the 2030 Agenda for Sustainable Development, comprising 17 Sustainable Development Goals (SDGs) and 169 targets. To track global progress, the UN Statistical Commission formulated the Global Indicator Framework (GIF) consisting of 231 unique indicators.',
            subContent: 'However, international indicators often assume data sources (e.g., universal civil registration, satellite raster registries) that are either unsuited to domestic realities or miss crucial Indian socio-economic priorities (such as rural sanitation under Swachh Bharat, institutional deliveries under Janani Suraksha Yojana, or rural electricity access under Saubhagya). The Government of India designated MoSPI as the nodal statistical ministry to formulate the National Indicator Framework (NIF).',
            bulletPoints: [
              'Scale of NIF: Tracks ~300 priority indicators mapped directly across all 17 Goals and 169 Targets.',
              'Institutional Nodal Role: MoSPI Social Statistics Division (SSD) leads the technical methodology, while NITI Aayog drives policy coordination and the SDG India Index.',
              'Data Harmonization: Ensures longitudinal consistency across administrative records and large-scale sample surveys (NSS, NFHS, SRS).',
            ],
            guidelineNote: 'The NIF is reviewed periodically by a High-Level Steering Committee chaired by the Chief Statistician of India, retiring redundant indicators and introducing new digital administrative feeds.',
            statutoryReference: 'MoSPI Resolution on SDG Monitoring Framework (Gazette of India, Part I, Sec. 1)',
          },
          {
            heading: '2. Indicator Categorization and Baseline Mechanics',
            content: 'NIF indicators are classified into Outcome Indicators (measuring final socio-economic impact, e.g., Maternal Mortality Ratio), Output/Process Indicators (measuring public delivery, e.g., percentage of schools with functional girls’ toilets), and Input Indicators (measuring budgetary outlays). Every indicator must possess a verified baseline year (typically 2015-16) and a defined 2030 target trajectory.',
          },
        ],
        workedExample: {
          title: 'Computing Target Trajectory and Annual Reduction Rate for Under-5 Mortality (SDG 3.2)',
          scenario: 'Under SDG Target 3.2, India’s baseline Under-5 Mortality Rate (U5MR) was 43 deaths per 1,000 live births in 2015-16. The national 2030 target is set at 25 per 1,000 live births over a 15-year period.',
          steps: [
            {
              step: 'Step 1: Compute Total Required Absolute Reduction',
              computation: 'Delta = Baseline - Target = 43 - 25 = 18 deaths per 1,000 live births',
              rationale: 'Absolute gap that public health interventions must eliminate.',
            },
            {
              step: 'Step 2: Calculate Required Compound Annual Reduction Rate (CARR)',
              computation: 'CARR = 1 - (Target / Baseline)^(1 / t) = 1 - (25 / 43)^(1 / 15) = 1 - (0.5814)^(0.0667) = 1 - 0.9644 = 0.0356 (or 3.56% annually)',
              rationale: 'The constant geometric rate at which mortality must decline each year.',
            },
            {
              step: 'Step 3: Evaluate Progress in Year 2020 (SRS Reported U5MR = 32)',
              computation: 'Target Benchmark for 2020: 43 * (1 - 0.0356)^5 = 43 * 0.834 = 35.8 deaths per 1,000. Actual SRS = 32.',
              rationale: 'Because actual U5MR (32) is lower than the required benchmark (35.8), the nation is trending ahead of schedule on Target 3.2.',
            },
          ],
          outcome: 'Target 3.2 is categorized as "On Track" (Green Category) in the official MoSPI NIF Progress Report.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Administrative Data Validation',
            mandatoryRequirement: 'Obtain official written endorsement from the statistical advisor of the reporting line ministry for any annual indicator update.',
            scrutinyCheck: 'Confirm that numerator and denominator match the exact age/geographical boundaries specified in the NIF metadata sheet.',
          },
          {
            stepNo: 2,
            activity: 'Unit Harmonization',
            mandatoryRequirement: 'Verify that ratios are not mistakenly entered as percentages (e.g., Maternal Mortality Ratio is per 100,000 live births, while Infant Mortality Rate is per 1,000 live births).',
            scrutinyCheck: 'Prevent severe scale order errors in national data consolidation.',
          },
        ],
        regulatoryReferences: [
          'UN-DESA: Guidelines for Producing National SDG Indicator Reports',
          'MoSPI: National Indicator Framework Baseline Report on SDGs 2019',
          'NITI Aayog: SDG India Index & Dashboard Methodology Documents',
        ],
        officialCaseStudy: {
          title: 'Harmonization of Maternal Mortality Ratio (MMR) Tracking',
          context: 'Different states utilized conflicting definition windows for maternal death monitoring.',
          challenge: 'Cross-state comparability in SDG Goal 3 (Good Health and Well-being).',
          solution: 'MoSPI standardized all calculations on Sample Registration System (SRS) actuarial metrics, ensuring uniform longitudinal tracking.',
          statStandard: 'MoSPI SDG National Indicator Framework Progress Report',
        },
        knowledgeCheck: {
          question: 'Which division within MoSPI acts as the nodal coordinator for compiling and monitoring India’s Sustainable Development Goals (SDG) National Indicator Framework?',
          options: [
            'Price Statistics Division (PSD)',
            'Social Statistics Division (SSD)',
            'National Accounts Division (NAD)',
            'Economic Statistics Division (ESD)',
          ],
          correctIndex: 1,
          explanation: 'The Social Statistics Division (SSD) within MoSPI is the official nodal body responsible for developing, maintaining, and publishing India’s SDG National Indicator Framework.',
        },
      },
      {
        id: 'mod-05-2',
        moduleNumber: 2,
        title: 'Metadata Standards & Data Flow from Line Ministries',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Institutional coordination mechanisms, metadata cards, data flow pipelines, and quality scrubbing protocols between MoSPI and central line ministries.',
        learningObjectives: [
          'Inspect and interpret standardized SDG indicator metadata sheets.',
          'Analyze periodicity, numerator/denominator definitions, and disaggregation boundaries.',
          'Audit administrative data systems (UDISE+, HMIS, Jal Jeevan Mission MIS) vs field survey data.',
        ],
        keySections: [
          {
            heading: '1. The Anatomy of an SDG Indicator Metadata Card',
            content: 'In official statistics, an indicator without metadata is ambiguous and prone to misinterpretation. Every NIF indicator is governed by a legally binding metadata card that defines: (1) Exact Indicator Name and UN Goal/Target mapping; (2) Data Source Agency (e.g., Ministry of Health, Ministry of Education); (3) Mathematical Definition and Formula; (4) Unit of Measurement; (5) Periodicity of Release (Quarterly, Annual, Triennial); (6) Disaggregation Levels (Rural/Urban, Male/Female, Social Group); and (7) Known Limitations.',
            subContent: 'When discrepancies arise between administrative portals (which track registered government scheme beneficiaries) and independent household surveys (which sample the entire population), the metadata sheet explicitly designates the primary statistical anchor.',
          },
          {
            heading: '2. Complementary Use of Administrative Data and Field Surveys',
            content: 'Administrative MIS databases offer the tremendous advantage of continuous, real-time census reporting at zero additional survey cost. However, they are vulnerable to over-reporting incentives and often miss citizens who do not interact with formal government systems. MoSPI pairs administrative data with periodic NSS/NFHS survey validation.',
          },
        ],
        workedExample: {
          title: 'Reconciling Functional Tap Water Coverage (SDG 6.1): Administrative MIS vs Survey Sample',
          scenario: 'In a state of 10 million rural households, the departmental administrative MIS records 8.5 million tap connections installed (85% coverage). An independent NSS validation survey samples 1,200 households across 150 villages and finds 720 households with functional tap water receiving adequate potable water (>55 lpcd daily).',
          steps: [
            {
              step: 'Step 1: Compute Survey-Weighted Point Estimate and Confidence Interval',
              computation: 'Survey Point Estimate = 720 / 1,200 = 60.0% coverage. Standard Error SE = sqrt( (0.6 * 0.4) / 1,200 ) = sqrt( 0.0002 ) = 0.0141 (1.41%). 95% Confidence Interval = 60.0% +/- 2.8% [57.2% to 62.8%].',
              rationale: 'Demonstrates statistically significant divergence from the 85% administrative claim.',
            },
            {
              step: 'Step 2: Investigate Operational Discrepancy',
              computation: 'Field scrutiny reveals that 25% of physically installed pipes suffer from dry-season groundwater depletion or pipeline pressure failure.',
              rationale: 'Distinguishes between "Infrastructure Installed" (administrative output) and "Functional Safe Water Received" (SDG outcome).',
            },
            {
              step: 'Step 3: Apply Metadata Standard',
              computation: 'NIF Metadata Card 6.1.1 designates functionality as mandatory for indicator qualification.',
              rationale: 'Official reporting incorporates the functional discount factor.',
            },
          ],
          outcome: 'The state NIF report logs 60% functional water coverage, driving targeted infrastructure maintenance funding.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Metadata Compliance Verification',
            mandatoryRequirement: 'Check that reporting line ministry data conforms strictly to the approved NIF metadata definition before ingestion.',
            scrutinyCheck: 'If a ministry changes its reporting definition mid-year, compute overlap linking factors to avoid artificial trend spikes.',
          },
          {
            stepNo: 2,
            activity: 'Periodicity Audit',
            mandatoryRequirement: 'Ensure that data reported for financial year t is published within 6 months of financial year close.',
            scrutinyCheck: 'Flag chronic reporting delays for review by the National Statistical Commission.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Compendium of SDG Indicator Metadata (Volumes I & II)',
          'NITI Aayog National Data Governance Framework Policy (NDGFP)',
        ],
        officialCaseStudy: {
          title: 'SDG 6 Drinking Water Access Tracking',
          context: 'Data flowed from both Jal Jeevan Mission administrative MIS and NSS Housing surveys.',
          challenge: 'Administrative connections vs actual household tap water functionality.',
          solution: 'SSD established complementary reporting: administrative output data tracked alongside independent NSS field validation.',
          statStandard: 'MoSPI Guidelines on Administrative Data Use',
        },
        knowledgeCheck: {
          question: 'Why does each SDG indicator require a comprehensive metadata card under MoSPI standards?',
          options: [
            'To protect the names of government employees from public disclosure',
            'To clearly specify mathematical definitions, data sources, frequency, and computational methodology for uniform multi-agency reporting',
            'To convert all data into foreign currencies',
            'To prevent academic researchers from accessing official statistics',
          ],
          correctIndex: 1,
          explanation: 'Metadata cards establish unambiguous definitions, formulas, data collection methods, and limitations, ensuring data consistency across different ministries and states.',
        },
      },
      {
        id: 'mod-05-3',
        moduleNumber: 3,
        title: 'State Indicator Frameworks (SIF) & District Monitoring',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Sub-national localization of SDG tracking down to district and block administrative levels using composite normalization and Small Area Estimation.',
        learningObjectives: [
          'Evaluate State Indicator Frameworks (SIF) and District Indicator Frameworks (DIF).',
          'Execute Min-Max score normalization to compute composite SDG performance indices.',
          'Classify administrative districts into Aspirant, Performer, Front Runner, and Achiever categories.',
          'Apply Small Area Estimation (SAE) methods when survey sample sizes are insufficient at district levels.',
        ],
        keySections: [
          {
            heading: '1. Localizing SDGs: The State and District Indicator Frameworks',
            content: 'Because India is a federal union of states where subjects such as health, sanitation, agriculture, and water are largely administered at the state and local Panchayat levels, achieving national SDG targets requires deep sub-national localization. MoSPI and NSSTA guide State Directorates of Economics and Statistics (DES) in constructing State Indicator Frameworks (SIF) and District Indicator Frameworks (DIF).',
            subContent: 'A DIF typically contains 60 to 100 core indicators computable at the district collectorate level. It allows the District Magistrate (DM/Collector) to identify lagging blocks, monitor aspirational district programmes, and allocate district mineral foundation (DMF) and untied development funds with empirical precision.',
          },
          {
            heading: '2. Composite Index Normalization: The Min-Max Methodology',
            content: 'To summarize performance across diverse indicators measured in completely different units (e.g., mortality rates, literacy percentages, megawatts of solar power), NITI Aayog and state DES use the Min-Max normalization formula. This rescales every indicator onto a standardized scale from 0 to 100.',
            technicalFormula: 'Positive Indicator (Higher is better): Score = [ (Actual Value - Target Minimum) / (Target Maximum - Target Minimum) ] * 100\nNegative Indicator (Lower is better): Score = [ (Target Maximum - Actual Value) / (Target Maximum - Target Minimum) ] * 100\nComposite Score = Arithmetic Average of all normalized indicator scores in the Goal',
            bulletPoints: [
              'Aspirant Category: Score 0 - 49 (Urgent targeted intervention required).',
              'Performer Category: Score 50 - 64 (Making steady progress).',
              'Front Runner: Score 65 - 99 (High achievement, near target).',
              'Achiever: Score 100 (Full achievement of 2030 target).',
            ],
          },
        ],
        workedExample: {
          title: 'Computing Normalized Composite Score for SDG Goal 4 (Quality Education) in District Balasore',
          scenario: 'Balasore district records three educational indicators: (1) Adjusted Net Enrolment Ratio (ANER) in Upper Primary = 88% (Target: Min = 50%, Max = 100%); (2) Drop-Out Rate in Secondary School = 12% (Negative indicator, Target: Min = 0%, Max = 30%); (3) Percentage of Schools with Electricity = 95% (Target: Min = 60%, Max = 100%).',
          steps: [
            {
              step: 'Step 1: Normalize Indicator 1 (ANER, Positive Indicator)',
              computation: 'Score_1 = [ (88 - 50) / (100 - 50) ] * 100 = [ 38 / 50 ] * 100 = 76.0',
              rationale: 'Normalized distance between minimum threshold and full enrollment.',
            },
            {
              step: 'Step 2: Normalize Indicator 2 (Drop-Out Rate, Negative Indicator)',
              computation: 'Score_2 = [ (30 - 12) / (30 - 0) ] * 100 = [ 18 / 30 ] * 100 = 60.0',
              rationale: 'For negative indicators, lower dropout yields a higher normalized score.',
            },
            {
              step: 'Step 3: Normalize Indicator 3 (School Electricity, Positive Indicator)',
              computation: 'Score_3 = [ (95 - 60) / (100 - 60) ] * 100 = [ 35 / 40 ] * 100 = 87.5',
              rationale: 'Normalized infrastructure metric.',
            },
            {
              step: 'Step 4: Compute Composite Goal 4 Score',
              computation: 'Composite Score = (76.0 + 60.0 + 87.5) / 3 = 223.5 / 3 = 74.5',
              rationale: 'Unweighted composite arithmetic average of all normalized dimensions.',
            },
          ],
          outcome: 'Balasore achieves a Composite Score of 74.5, placing it firmly in the "Front Runner" category (Score 65–99) for SDG Goal 4.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Outlier Truncation / Winsorization',
            mandatoryRequirement: 'Cap extreme outlier values at the 97.5th percentile boundary before applying Min-Max scaling.',
            scrutinyCheck: 'Prevents a single extreme mining or tribal district from distorting the normalization range for all other districts.',
          },
          {
            stepNo: 2,
            activity: 'District Review Meeting Presentation',
            mandatoryRequirement: 'Publish monthly district dashboard cards highlighting the 3 lowest-scoring indicators in red visual tags.',
            scrutinyCheck: 'Verify that district collectors can track empirical progress before quarterly planning meetings.',
          },
        ],
        regulatoryReferences: [
          'NITI Aayog: Aspirational Districts Programme Monitoring Guidelines',
          'NSSTA Training Manual on Sub-National Statistics Localization',
        ],
        officialCaseStudy: {
          title: 'District Indicator Framework Deployment in Odisha',
          context: 'Districts required high-frequency tracking of nutrition and immunization indicators.',
          challenge: 'Sample survey sample sizes were insufficient for district-level direct estimation.',
          solution: 'Small Area Estimation (SAE) techniques were taught by NSSTA to combine administrative child health records with survey estimates.',
          statStandard: 'NSSTA District Statistics Localization Compendium',
        },
        knowledgeCheck: {
          question: 'In official SDG composite index calculation, if an indicator is negative (e.g. maternal mortality or school dropout rate where lower is better), how is the Min-Max normalized score computed?',
          options: [
            'By dividing the actual value by 100',
            'Score = [ (Target Maximum - Actual Value) / (Target Maximum - Target Minimum) ] * 100',
            'Negative indicators are deleted from the calculation',
            'By taking the reciprocal of the actual value',
          ],
          correctIndex: 1,
          explanation: 'For negative indicators where lower values indicate superior performance, Score = [ (Target Max - Actual) / (Target Max - Target Min) ] * 100, ensuring that lower mortality/dropouts receive higher scores.',
        },
      },
    ],
  },

  'nssta-crs-006': {
    courseId: 'nssta-crs-006',
    courseCode: 'NSSTA-TECH-01',
    courseTitle: 'Statistical Computing for Official Data: Python and R Data Wrangling',
    mappedCompetency: 'Statistical Computing (Python/R)',
    totalModules: 3,
    overview: 'Practical data science tools for official statistics: automated sanity audits, tabular summarization, survey-weighted estimation, outlier detection, and reproducible processing scripts using Python and R.',
    prerequisites: 'Basic programming concepts in Python or R, and survey microdata layout familiarity.',
    learningOutcome: 'Write automated data ingestion scripts for fixed-width microdata, compute weighted survey estimates, execute automated outlier detection, and generate reproducible publication tables.',
    modules: [
      {
        id: 'mod-06-1',
        moduleNumber: 1,
        title: 'Loading & Cleaning MoSPI Survey Microdata in Python (Pandas/NumPy)',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Process fixed-width and CSV microdata files from NSS/PLFS surveys using Pandas dataframes and automated schema validators.',
        learningObjectives: [
          'Parse fixed-width ASCII microdata files using column specification tuples.',
          'Filter sub-samples, state codes, and strata without memory overflow.',
          'Handle official missing data codes (-1, 99999, 9999999) correctly.',
          'Structure multi-level relational datasets (Household Block vs Person Block).',
        ],
        keySections: [
          {
            heading: '1. The Structure of MoSPI Microdata Releases',
            content: 'MoSPI survey microdata files are traditionally released on the National Data Archive (NADA) portal as fixed-width ASCII text files accompanied by comprehensive layout documents. Each row in the file corresponds to a survey schedule block (e.g., Block 3: Household Characteristics; Block 4: Demographic details of members; Block 5: Activity status).',
            subContent: 'Because files can span millions of records, manual spreadsheet manipulation is prone to silent corruption (e.g., Excel dropping leading zeros from State/District codes or truncating rows exceeding 1,048,576). Writing robust Python parsing pipelines using Pandas and NumPy guarantees reproducible, error-free ingestion.',
            technicalFormula: 'import pandas as pd\n\n# Defining column boundaries from official layout PDF\ncol_specs = [(0, 3), (3, 11), (11, 13), (13, 15), (15, 18), (18, 26)]\ncol_names = ["round", "fsu_id", "state_code", "stratum", "sub_stratum", "multiplier"]\n\ndf = pd.read_fwf("nss_data.txt", colspecs=col_specs, names=col_names, dtype={"state_code": str})',
          },
          {
            heading: '2. Handling Sentinel Missing Values',
            content: 'In government survey files, missing observations are never recorded as null or NaN. Instead, the survey designer uses sentinel integers (e.g., 99999 for missing expenditure, 99 for unknown age, or -1 for not applicable). If an analyst blindly runs df["expenditure"].mean(), these sentinel values severely corrupt the resulting average.',
          },
        ],
        workedExample: {
          title: 'Parsing and Scrubbing NSS 78th Round Household Consumption Microdata',
          scenario: 'An analyst has a 500 MB fixed-width file containing 120,000 household rows. In the monthly food expenditure column (chars 45-52), value 999999 denotes "Non-reporting/Refusal" and -1 denotes "Not Applicable". The multiplier column is in chars 53-62 with 2 implied decimal places.',
          steps: [
            {
              step: 'Step 1: Read Fixed-Width File with Explicit Data Types',
              computation: 'df = pd.read_fwf("consumption.txt", colspecs=[(0,8), (44,52), (52,62)], names=["hh_id", "food_exp", "raw_mult"])',
              rationale: 'Reads only the required columns, conserving memory.',
            },
            {
              step: 'Step 2: Replace Sentinel Codes with NaN',
              computation: 'df["food_exp"] = df["food_exp"].replace([999999, -1], np.nan)',
              rationale: 'Prevents 999,999 from entering statistical calculations.',
            },
            {
              step: 'Step 3: Correct Multiplier Decimals',
              computation: 'df["weight"] = df["raw_mult"] / 100.0',
              rationale: 'Official MoSPI multipliers are stored as integers with 2 implied decimal places to save storage.',
            },
            {
              step: 'Step 4: Verify Clean Data Distribution',
              computation: 'Clean mean = df["food_exp"].dropna().mean() => Validated Rs. 4,250 vs Corrupted Rs. 14,800 if 999999 was included.',
              rationale: 'Eliminates 350% calculation error.',
            },
          ],
          outcome: 'Dataset is clean, validated, and ready for official survey-weighted analysis.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'File Hash Verification',
            mandatoryRequirement: 'Compute SHA-256 checksum of raw microdata file immediately after downloading from NADA portal.',
            scrutinyCheck: 'Confirm hash matches the published MoSPI release gazette checksum.',
          },
          {
            stepNo: 2,
            activity: 'State Code Format Check',
            mandatoryRequirement: 'Ensure State Codes are stored as 2-character strings ("01", "02", ... "36") to preserve leading zeros.',
            scrutinyCheck: 'Prevent "01" (Jammu & Kashmir) from being converted to integer 1 and lost during merging.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Computer Centre Data Dissemination Guidelines 2021',
          'NADA Microdata Archive Documentation Standards',
        ],
        officialCaseStudy: {
          title: 'Automated Microdata Audit Pipeline in SDRD',
          context: 'Processing 120,000 household returns historically took 4 weeks of manual spreadsheet cross-referencing.',
          challenge: 'Detecting data truncation and corrupt field delimiters.',
          solution: 'SDRD built an open-source Python validation pipeline that ingests raw survey files and flags 100% of formatting discrepancies in under 3 minutes.',
          statStandard: 'NSSTA Technical Guide on Python for Survey Analysts',
        },
        knowledgeCheck: {
          question: 'In MoSPI survey microdata files, what is the best practice for handling negative values such as -1 or 99999 in numeric expenditure columns?',
          options: [
            'Treat them as normal numbers and include them in average expenditure calculation',
            'Identify them as missing/not-applicable data codes as defined in the layout document and handle them explicitly',
            'Multiply all numbers in the dataset by -1',
            'Delete the entire database immediately',
          ],
          correctIndex: 1,
          explanation: 'Official layout specifications define specific sentinel values (such as 99999 or -1) to designate missing data or not-applicable categories, which must be filtered or imputed rather than averaged directly.',
        },
      },
      {
        id: 'mod-06-2',
        moduleNumber: 2,
        title: 'Survey-Weighted Estimation: Computing National Estimates from Microdata',
        durationMinutes: 30,
        wordCountEstimate: 1200,
        summary: 'Learn how to apply survey multipliers to calculate aggregate totals, proportions, and standard errors in Python and R.',
        learningObjectives: [
          'Differentiate between unweighted sample statistics and survey-weighted population estimates.',
          'Execute survey-weighted means and proportions in Python using NumPy and Statsmodels.',
          'Use R survey package (`svydesign`, `svymean`, `svyby`) for complex multi-stage variance estimation.',
          'Generate official publication cross-tabulations with sub-sample variance estimates.',
        ],
        keySections: [
          {
            heading: '1. Why Unweighted Statistics Are Fatal in Official Reporting',
            content: 'Because official surveys employ stratified multi-stage designs with unequal sampling fractions across rural/urban areas and small states (e.g., Goa or Sikkim have higher sampling fractions than Uttar Pradesh to ensure state-level precision), calculating an unweighted sample mean is completely meaningless.',
            subContent: 'Every sampled household carries an inflation multiplier (weight) representing how many households in the population it represents. The Horvitz-Thompson weighted estimator must be applied to all aggregations.',
            technicalFormula: 'Weighted Mean = sum( w_i * y_i ) / sum( w_i )\n\n# Python Implementation:\nimport numpy as np\nweighted_mean = np.average(df["monthly_income"], weights=df["multiplier"])\n\n# R Implementation (Survey Package):\nlibrary(survey)\ndesign <- svydesign(id=~fsu, strata=~stratum, weights=~multiplier, data=df, nest=TRUE)\nsvymean(~monthly_income, design)',
          },
          {
            heading: '2. Estimating Standard Errors and Coefficients of Variation (CV)',
            content: 'In official statistical releases, every estimate must be accompanied by its standard error or Relative Standard Error (RSE / CV). If an estimate has an RSE exceeding 20%, MoSPI standard practice requires publishing it with an asterisk warning denoting low precision.',
          },
        ],
        workedExample: {
          title: 'Computing Survey-Weighted Average Monthly Consumption in R',
          scenario: 'An analyst examines a microdata sample of 1,000 households from PLFS. Urban households (500 rows) have average sample income = Rs. 35,000 and average weight = 400. Rural households (500 rows) have average sample income = Rs. 15,000 and average weight = 1,200.',
          steps: [
            {
              step: 'Step 1: Compute the Unweighted Sample Mean (The Wrong Way)',
              computation: 'Unweighted Mean = (35,000 + 15,000) / 2 = Rs. 25,000',
              rationale: 'Treats urban and rural observations equally, ignoring that rural population is 3x larger.',
            },
            {
              step: 'Step 2: Compute Total Represented Populations',
              computation: 'Urban Pop = 500 * 400 = 200,000 households; Rural Pop = 500 * 1,200 = 600,000 households. Total Pop = 800,000.',
              rationale: 'Accounts for the correct demographic weights.',
            },
            {
              step: 'Step 3: Compute the Survey-Weighted Mean (The Correct Way)',
              computation: 'Weighted Mean = [ (200,000 * 35,000) + (600,000 * 15,000) ] / 800,000 = [ 7,000M + 9,000M ] / 800,000 = Rs. 20,000',
              rationale: 'Reflects the true national average income.',
            },
          ],
          outcome: 'The true population average is Rs. 20,000. The unweighted mean (Rs. 25,000) was an erroneous 25% overestimate.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Weight Normalization Check',
            mandatoryRequirement: 'Confirm sum of weights in the dataset equals the projected Census population for the survey reference year.',
            scrutinyCheck: 'If sum of weights deviates by > 5%, investigate sub-stratum multiplier adjustments.',
          },
          {
            stepNo: 2,
            activity: 'Sub-Sample Split Verification',
            mandatoryRequirement: 'Compute separate estimates for Sub-sample 1 and Sub-sample 2 to verify orthogonal consistency.',
            scrutinyCheck: 'Flag large divergences between sub-sample estimates for supervisor investigation.',
          },
        ],
        regulatoryReferences: [
          'Lumley, T.: Complex Surveys: A Guide to Analysis Using R (Wiley)',
          'NSS Estimation Procedure Manual (NSSTA Technical Series No. 2)',
        ],
        officialCaseStudy: {
          title: 'Discrepancy Resolution in State GVA Estimates',
          context: 'A junior analyst computed average enterprise output by running df["output"].mean(), producing a figure 40% higher than official state reports.',
          challenge: 'Explaining why unweighted sample mean was fundamentally invalid.',
          solution: 'The academy demonstrated that large industrial enterprises were sampled with higher probabilities, so their weights were smaller; applying correct multipliers yielded the exact official estimate.',
          statStandard: 'NSSTA Official Data Science Manual (Ch. 6)',
        },
        knowledgeCheck: {
          question: 'Which Python function correctly computes a population-weighted average expenditure from survey microdata with a sampling weight column?',
          options: [
            'df["expenditure"].mean()',
            'np.average(df["expenditure"], weights=df["weight"])',
            'df["expenditure"].sum() / len(df)',
            'df["expenditure"].median() * 2',
          ],
          correctIndex: 1,
          explanation: 'np.average(df["expenditure"], weights=df["weight"]) correctly incorporates the survey sampling weights to compute an unbiased population estimate.',
        },
      },
      {
        id: 'mod-06-3',
        moduleNumber: 3,
        title: 'Reproducible Tabulation & Outlier Detection Protocols',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Automate table generation matching official MoSPI report formats and detect rogue outliers using IQR and Z-scores.',
        learningObjectives: [
          'Generate publication-ready two-way cross-tabulations with survey weights and margins.',
          'Implement automated outlier detection using Tukey’s Interquartile Range (IQR) and Mahalanobis distance.',
          'Export formatted tables directly into official publication templates.',
        ],
        keySections: [
          {
            heading: '1. Automated Outlier Detection in Batch Ingestion',
            content: 'In large-scale surveys, extreme values often reflect data entry typos (such as a field investigator typing an extra zero or accidentally entering the household annual income instead of monthly income). Because weighted averages are sensitive to extreme values, automated statistical screening is mandatory.',
            technicalFormula: 'IQR = Q3 - Q1\nLower Fence = Q1 - 1.5 * IQR\nUpper Fence = Q3 + 1.5 * IQR\nExtreme Outer Fence = Q3 + 3.0 * IQR',
            bulletPoints: [
              'Soft Outliers (Between 1.5 and 3.0 IQR): Flagged for verification against primary CAPI schedule logs.',
              'Hard Outliers (> 3.0 IQR): Automatically quarantined; investigator must provide audited documentation or the record is imputed.',
            ],
          },
          {
            heading: '2. Reproducible Scripted Pipelines vs Manual Spreadsheets',
            content: 'In MoSPI data divisions, reproducing published tables from raw microdata must be achieved with a single script execution. Scripted pipelines guarantee an immutable audit trail, version-controlled repository storage, and instant regeneration when revised data batches arrive.',
          },
        ],
        workedExample: {
          title: 'Detecting Decimal Displacement Error in Industrial Electricity Expense',
          scenario: 'In an industrial survey of 500 textile factories, median monthly electricity expense is Q1 = Rs. 120,000 and Q3 = Rs. 340,000. One factory schedule records an electricity expense of Rs. 34,000,000.',
          steps: [
            {
              step: 'Step 1: Compute the Interquartile Range (IQR)',
              computation: 'IQR = Q3 - Q1 = 340,000 - 120,000 = Rs. 220,000',
              rationale: 'Measures the middle 50% spread of factory electricity consumption.',
            },
            {
              step: 'Step 2: Calculate Extreme Upper Fence Threshold',
              computation: 'Upper Extreme Fence = Q3 + 3.0 * IQR = 340,000 + 3 * 220,000 = 340,000 + 660,000 = Rs. 1,000,000',
              rationale: 'Any value exceeding Rs. 1,000,000 is flagged as an extreme outlier.',
            },
            {
              step: 'Step 3: Evaluate the Flagged Record',
              computation: 'Reported Rs. 34,000,000 is 34 times above the extreme fence. Audit reveals the investigator entered the figure in single rupees instead of "in thousands of rupees" as specified on the schedule header.',
              rationale: 'Detects the 1,000x decimal shift error before it corrupts sector totals.',
            },
          ],
          outcome: 'The schedule is corrected to Rs. 34,000 (thousands), saving the state manufacturing energy index from a massive distortion.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Automated Script Regression Test',
            mandatoryRequirement: 'Run automated unit tests on tabulation scripts before generating final release tables.',
            scrutinyCheck: 'Verify that row totals and column totals in two-way tables reconcile exactly to 100.0%.',
          },
          {
            stepNo: 2,
            activity: 'Audit Log Storage',
            mandatoryRequirement: 'Archive the complete Git commit hash and data execution log alongside published tables.',
            scrutinyCheck: 'Enable any official auditing body to re-run the script and obtain identical results.',
          },
        ],
        regulatoryReferences: [
          'MoSPI Code of Practice for Official Statistics: Reproducibility Standard',
          'Tukey, J.W.: Exploratory Data Analysis (Addison-Wesley)',
        ],
        officialCaseStudy: {
          title: 'Decimal Shift Detection in Annual Survey of Industries (ASI)',
          context: 'An enterprise schedule recorded electrical power expense in single rupees rather than thousands of rupees.',
          challenge: 'Extreme skew in sectoral energy intensity ratios.',
          solution: 'An automated Python IQR script detected the 1000-fold deviation; the field office re-verified the original audited balance sheet.',
          statStandard: 'MoSPI ESD Quality Inspection Standard',
        },
        knowledgeCheck: {
          question: 'What is the advantage of using scripted reproducible workflows (Python/R) over manual spreadsheet manipulation for official statistics?',
          options: [
            'Scripts guarantee that the government will never need to conduct another census',
            'Scripts provide an immutable audit trail, automated error checking, and exact reproducibility across survey rounds',
            'Spreadsheets cannot display numbers larger than 100',
            'Scripts eliminate the need to collect data from citizens',
          ],
          correctIndex: 1,
          explanation: 'Scripted workflows guarantee an exact audit trail, eliminate manual copy-paste errors, and allow the exact same data cleaning rules to be applied consistently across rounds.',
        },
      },
    ],
  },
};
