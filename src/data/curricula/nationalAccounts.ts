import { CourseCurriculum } from '../curriculumTypes';

export const NATIONAL_ACCOUNTS_CURRICULA: Record<string, CourseCurriculum> = {
  'nssta-crs-003': {
    courseId: 'nssta-crs-003',
    courseCode: 'NSSTA-STAT-03',
    courseTitle: 'National Accounts Statistics: GVA, GDP and System of National Accounts (SNA 2008)',
    mappedCompetency: 'National Accounts & Macroeconomics',
    totalModules: 3,
    overview: 'Comprehensive training on India’s official macroeconomic accounting architecture: Gross Value Added (GVA) at basic prices, Gross Domestic Product (GDP) at market prices, institutional sectors, double deflation, and the MCA-21 corporate database integration under the UN-SNA 2008 framework.',
    prerequisites: 'Foundations of macroeconomics, corporate balance sheet accounting, double-entry bookkeeping, and national income identities.',
    learningOutcome: 'Reconcile GDP at market prices from GVA at basic prices, disaggregate production vs product taxes, execute double deflation across manufacturing sectors, and construct Supply and Use Tables (SUT).',
    modules: [
      {
        id: 'mod-03-1',
        moduleNumber: 1,
        title: 'Macroeconomic Aggregates: GVA at Basic Prices vs. GDP at Market Prices',
        durationMinutes: 35,
        wordCountEstimate: 1250,
        summary: 'Master the accounting identities connecting Factor Cost, Basic Prices, and Market Prices under India Base 2011-12.',
        learningObjectives: [
          'Differentiate between Production Taxes/Subsidies and Product Taxes/Subsidies with statutory tax examples.',
          'Formulate Gross Value Added (GVA) at Basic Prices from GVA at Factor Cost.',
          'Derive Gross Domestic Product (GDP) at Market Prices using Net Product Taxes.',
          'Analyze the economic divergence wedge between GVA growth and GDP growth.',
        ],
        keySections: [
          {
            heading: '1. The Paradigm Shift to SNA 2008 in India’s 2015 Re-Basing',
            content: 'In January 2015, the Central Statistics Office (CSO, now NSO under MoSPI) released the new series of National Accounts with 2011-12 as the base year, replacing the earlier 2004-05 series. This revision implemented the System of National Accounts 2008 (SNA 2008)—the international statistical standard adopted by the United Nations, IMF, OECD, and World Bank.',
            subContent: 'Under the previous 2004-05 series, India’s headline economic growth was measured by GDP at Factor Cost. Under the 2011-12 series, headline growth is officially measured by GDP at Market Prices, bringing India in line with global conventions. Concurrently, sectoral economic activity (agriculture, industry, services) is measured by Gross Value Added (GVA) at Basic Prices.',
            bulletPoints: [
              'GVA at Factor Cost: Sum of payments to factors of production (Compensation of Employees + Operating Surplus/Mixed Income + Consumption of Fixed Capital). No taxes or subsidies are included.',
              'GVA at Basic Prices: What the producer actually receives per unit of output produced, minus taxes on products, plus subsidies on products. It includes Production Taxes (less Production Subsidies).',
              'GDP at Market Prices: The total market value of all final goods and services produced within the economic boundary. It equals GVA at Basic Prices plus Net Product Taxes.',
            ],
            technicalFormula: 'GVA at Basic Prices = GVA at Factor Cost + (Production Taxes - Production Subsidies)\nGDP at Market Prices = GVA at Basic Prices + (Product Taxes - Product Subsidies)\nNet Product Taxes = Product Taxes - Product Subsidies',
            guidelineNote: 'Production taxes/subsidies are independent of the volume of production (e.g., land revenues, municipal property tax, stamp duties; production subsidies include subsidies to small industries). Product taxes/subsidies depend directly on each physical unit or value of output (GST, excise duty, customs, petroleum cess, food and fertilizer subsidies).',
            statutoryReference: 'MoSPI National Accounts Statistics: Sources and Methods (2015 Edition, Ch. 2)',
          },
          {
            heading: '2. Understanding the Wedge Between GVA and GDP Growth',
            content: 'Because GDP at Market Prices includes Net Product Taxes, GDP growth and GVA growth can diverge significantly during years of major fiscal policy shifts or commodity price swings. For instance, when government tax collections surge or subsidy expenditures decline sharply, GDP growth will outpace GVA growth. Conversely, when subsidies expand (e.g., higher food/fertilizer payouts), GVA growth will exceed GDP growth.',
          },
        ],
        workedExample: {
          title: 'Reconciling GVA at Basic Prices and GDP at Market Prices for FY 2022-23',
          scenario: 'The National Accounts Division (NAD) compiles preliminary annual estimates: Nominal GVA at Factor Cost = Rs. 220 lakh crore. Production Taxes collected = Rs. 4.5 lakh crore; Production Subsidies paid = Rs. 1.2 lakh crore. Product Taxes (GST, Customs, Excise) = Rs. 26.8 lakh crore; Product Subsidies (Food, Fertilizer, Fuel) = Rs. 5.1 lakh crore.',
          steps: [
            {
              step: 'Step 1: Compute Net Production Taxes',
              computation: 'Net Production Taxes = Production Taxes - Production Subsidies = 4.5 - 1.2 = Rs. 3.3 lakh crore',
              rationale: 'Taxes on production independent of quantity (e.g., land rent, factory registration).',
            },
            {
              step: 'Step 2: Calculate GVA at Basic Prices',
              computation: 'GVA at Basic Prices = GVA at Factor Cost + Net Production Taxes = 220 + 3.3 = Rs. 223.3 lakh crore',
              rationale: 'The official headline measure of aggregate sectoral economic value addition.',
            },
            {
              step: 'Step 3: Compute Net Product Taxes',
              computation: 'Net Product Taxes = Product Taxes - Product Subsidies = 26.8 - 5.1 = Rs. 21.7 lakh crore',
              rationale: 'Indirect commodity taxes minus direct price subsidies paid by government.',
            },
            {
              step: 'Step 4: Calculate Headline GDP at Market Prices',
              computation: 'GDP at Market Prices = GVA at Basic Prices + Net Product Taxes = 223.3 + 21.7 = Rs. 245.0 lakh crore',
              rationale: 'The final official size of the Indian national economy at market valuations.',
            },
          ],
          outcome: 'Nominal GDP is Rs. 245.0 lakh crore. The Net Product Tax wedge contributes Rs. 21.7 lakh crore to the economy’s market valuation.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Controller General of Accounts (CGA) Data Scrutiny',
            mandatoryRequirement: 'Obtain monthly tax and subsidy statements directly from CGA portal; cross-verify gross tax receipts against state VAT/GST portals.',
            scrutinyCheck: 'Confirm that tax refunds are netted out from gross collections before calculating Product Taxes.',
          },
          {
            stepNo: 2,
            activity: 'Classification Audit',
            mandatoryRequirement: 'Strictly maintain the SNA 2008 boundary separating production taxes from product taxes.',
            scrutinyCheck: 'Ensure municipal business license fees are classified under Production Taxes, not Product Taxes.',
          },
        ],
        regulatoryReferences: [
          'UN System of National Accounts 2008 (SNA 2008, Chapters 6 and 14)',
          'Advisory Committee on National Accounts (ACNA) Recommendations 2015',
          'Fiscal Responsibility and Budget Management (FRBM) Macroeconomic Reports',
        ],
        officialCaseStudy: {
          title: 'Divergence Analysis: GVA Growth vs GDP Growth during FY 2021-22',
          context: 'In FY 2021-22, real GVA grew at 8.1% while real GDP surged by 8.7%.',
          challenge: 'Parliamentary queries arose regarding the 0.6 percentage point discrepancy.',
          solution: 'NAD demonstrated that net product taxes surged dramatically due to high GST collections and low fertilizer subsidy outlays, creating the positive wedge between GVA and GDP.',
          statStandard: 'MoSPI National Accounts Statistics: Sources and Methods (2015)',
        },
        knowledgeCheck: {
          question: 'In India’s National Accounts (Base 2011-12), how is GDP at Market Prices calculated from GVA at Basic Prices?',
          options: [
            'GDP at Market Prices = GVA at Basic Prices - Net Factor Income from Abroad',
            'GDP at Market Prices = GVA at Basic Prices + Net Product Taxes (Product Taxes - Product Subsidies)',
            'GDP at Market Prices = GVA at Basic Prices / Total Population',
            'GDP at Market Prices = GVA at Basic Prices + Consumption of Fixed Capital',
          ],
          correctIndex: 1,
          explanation: 'GDP at Market Prices = GVA at Basic Prices + (Product Taxes - Product Subsidies). This formulation is the core SNA 2008 accounting identity.',
        },
      },
      {
        id: 'mod-03-2',
        moduleNumber: 2,
        title: 'MCA-21 Database Integration & Corporate Sector Estimation',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Analyze corporate financial statements from the Ministry of Corporate Affairs MCA-21 database, blowing-up factors, and enterprise vs establishment approaches.',
        learningObjectives: [
          'Examine how electronic filings (Form AOC-4 and MGT-7) feed the National Accounts compiling pipeline.',
          'Calculate corporate blowing-up factors for non-reporting private limited companies based on Paid-Up Capital (PUC).',
          'Differentiate the Enterprise approach (used in MCA-21) vs Establishment approach (used in ASI).',
        ],
        keySections: [
          {
            heading: '1. The MCA-21 Revolution in India’s Corporate National Accounting',
            content: 'Prior to 2015, the private corporate manufacturing sector was estimated using a small sample of roughly 2,500 listed companies tracked by the Reserve Bank of India (RBI). In the 2011-12 series revision, MoSPI integrated the comprehensive MCA-21 database of the Ministry of Corporate Affairs, encompassing annual balance sheets and profit & loss statements of over 500,000 active enterprises.',
            subContent: 'This transformed Indian national accounting from a sample-based extrapolation to near-census corporate financial tracking. Financial statements submitted in XBRL or digital formats are parsed to extract Compensation of Employees (wages, PF, gratuity), Operating Surplus (profits before tax, interest paid, depreciation), and Consumption of Fixed Capital (CFC).',
            bulletPoints: [
              'E-Filing Coverage: Encompasses both private limited and public limited companies registered under the Companies Act.',
              'XBRL Precision: Detailed accounting heads mapped to SNA production boundaries.',
              'Active Company Roster: Filtered against ROC records to eliminate shell and defunct entities.',
            ],
          },
          {
            heading: '2. The Paid-Up Capital (PUC) Blowing-Up Methodology',
            content: 'Because some private companies file their annual accounts late or face auditing delays, the MCA-21 database on any compilation date does not contain 100% of all registered companies. To account for non-reporting active companies, NAD calculates a "Blowing-Up Factor" based on Paid-Up Capital (PUC).',
            technicalFormula: 'Blowing-Up Factor (BUF) = Total PUC of all Active Companies in Sector / PUC of Reporting Companies in Sector\nEstimated Sector GVA = GVA of Reporting Companies * BUF',
            guidelineNote: 'MoSPI conducts annual reconciliation of PUC files with the Registrar of Companies to ensure inactive or struck-off companies are excluded from the denominator.',
          },
        ],
        workedExample: {
          title: 'Calculating Corporate GVA and Blowing-Up Factor for Information Technology Sector',
          scenario: 'In NIC Sector 62 (Computer Programming & Software Services), total active registered companies have a Total Paid-Up Capital (PUC) of Rs. 80,000 crore. On the compilation date, 4,200 companies representing Rs. 64,000 crore of PUC have filed annual accounts. The reported GVA of these 4,200 companies is Rs. 192,000 crore.',
          steps: [
            {
              step: 'Step 1: Compute the Paid-Up Capital Coverage Ratio',
              computation: 'Coverage Ratio = Reporting PUC / Total Active PUC = 64,000 / 80,000 = 0.80 (80%)',
              rationale: 'Measures the proportion of sector equity represented by reporting companies.',
            },
            {
              step: 'Step 2: Calculate the Blowing-Up Factor (BUF)',
              computation: 'BUF = Total PUC / Reporting PUC = 80,000 / 64,000 = 1.25',
              rationale: 'Multiplier to extrapolate reporting company results to the entire active corporate universe.',
            },
            {
              step: 'Step 3: Estimate Total Corporate Sector GVA',
              computation: 'Estimated GVA = Reported GVA * BUF = 192,000 * 1.25 = Rs. 240,000 crore',
              rationale: 'Unbiased national accounts estimate of total corporate value addition in IT services.',
            },
          ],
          outcome: 'Total corporate GVA for Sector 62 is estimated at Rs. 240,000 crore, capturing the non-reporting 20% of corporate activity.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'ROC Status Verification',
            mandatoryRequirement: 'Filter MCA-21 database using ROC "Active" status flags; eliminate companies in liquidation, dormant, or under strike-off.',
            scrutinyCheck: 'Cross-check sample of high-PUC entities with MCA master company registry.',
          },
          {
            stepNo: 2,
            activity: 'Extreme Outlier Audit',
            mandatoryRequirement: 'Investigate companies reporting GVA-to-turnover ratio > 90% or negative net worth > Rs. 5,000 crore.',
            scrutinyCheck: 'Verify against audited annual reports to eliminate scanning or data-entry errors.',
          },
        ],
        regulatoryReferences: [
          'MCA-21 Technical Manual on Financial Data Integration (MoSPI & MCA)',
          'Ravindra Dholakia Committee Report on Sub-National Accounts',
        ],
        officialCaseStudy: {
          title: 'MCA-21 Data Scrubbing and De-duplication',
          context: 'During compilation of Annual Estimates 2018-19, several hundred holding companies reported intra-group dividend transfers as operating revenue.',
          challenge: 'Double counting of value added across subsidiaries.',
          solution: 'NAD applied consolidated corporate group scrubbing rules, stripping pure holding income from production GVA.',
          statStandard: 'MoSPI National Accounts Methodology Manual 2020',
        },
        knowledgeCheck: {
          question: 'What financial variable is officially used by MoSPI as the scaling proxy (blowing-up factor) to extrapolate GVA for non-reporting companies in the MCA-21 database?',
          options: [
            'Total Employee Headcount',
            'Paid-Up Capital (PUC)',
            'Corporate Income Tax Paid',
            'Factory Floor Area in square meters',
          ],
          correctIndex: 1,
          explanation: 'MoSPI uses Paid-Up Capital (PUC) as the statutory scaling variable because it is legally recorded for all registered companies in the Ministry of Corporate Affairs repository.',
        },
      },
      {
        id: 'mod-03-3',
        moduleNumber: 3,
        title: 'Supply and Use Tables (SUT) & Real GVA Deflation Protocols',
        durationMinutes: 35,
        wordCountEstimate: 1200,
        summary: 'Reconcile economy-wide supply and demand through balanced Supply-Use Tables and master Single vs Double Deflation methodologies.',
        learningObjectives: [
          'Construct Supply and Use Tables (SUT) reconciling domestic output, imports, intermediate consumption, and final uses.',
          'Execute Double Deflation (deflating gross output by output price indices and inputs by input price indices).',
          'Evaluate why Single Indicator Deflation can distort real manufacturing growth during global commodity price swings.',
        ],
        keySections: [
          {
            heading: '1. The Accounting Architecture of Supply and Use Tables (SUT)',
            content: 'Supply and Use Tables (SUT) represent the central diagnostic and reconciling framework of the System of National Accounts. SUT is a set of two balanced product-by-industry matrices. The Supply Table details where products come from (domestic industries + imports + trade/transport margins + net product taxes). The Use Table details where products go (intermediate consumption by industries + household final consumption + government final consumption + gross capital formation + exports).',
            subContent: 'SUT enforces two fundamental macroeconomic identities: (1) For every product, Total Supply at Purchasers’ Prices must equal Total Use at Purchasers’ Prices; (2) For every industry, Total Output must equal Intermediate Consumption plus Gross Value Added.',
            technicalFormula: 'Product Balance: Domestic Output + Imports + Margins + Net Taxes = Intermediate Use + Final Consumption + GCF + Exports\nIndustry Balance: Gross Output_j - Intermediate Consumption_j = GVA_j',
          },
          {
            heading: '2. Real GVA: Single Deflation vs Double Deflation',
            content: 'To compute Real GVA (GVA at constant base prices), statistical agencies must remove the effect of inflation. Under Single Deflation, Nominal GVA is simply divided by a single output price index (e.g., WPI Manufacturing). However, this assumes that input prices move in identical lockstep with output prices.',
            subContent: 'Under Double Deflation (the gold standard mandated by SNA 2008), Gross Output at current prices is deflated using output price indices, Intermediate Consumption at current prices is deflated using input-specific price indices, and Real GVA is derived as the difference.',
            technicalFormula: 'Real GVA = [ Nominal Gross Output / P_output ] - [ Nominal Intermediate Input / P_input ]',
            guidelineNote: 'When international crude oil or steel prices collapse, input prices fall much faster than domestic output prices. Under single deflation, real value added is severely underestimated.',
          },
        ],
        workedExample: {
          title: 'Comparing Single Deflation vs Double Deflation in the Chemical Industry',
          scenario: 'In Year t, a chemical manufacturing sector produces Nominal Output = Rs. 1,000 crore using Imported Chemical Feedstock Inputs = Rs. 600 crore. Nominal GVA = 1,000 - 600 = Rs. 400 crore. Due to a global petrochemical slump, output prices rose by 10% (P_output = 1.10) while feedstock input prices fell by 20% (P_input = 0.80).',
          steps: [
            {
              step: 'Step 1: Calculate Real GVA under Single Deflation',
              computation: 'Real GVA (Single) = Nominal GVA / P_output = 400 / 1.10 = Rs. 363.6 crore',
              rationale: 'Assumes input costs changed at the same rate as output prices (+10%), failing to capture input cost savings.',
            },
            {
              step: 'Step 2: Calculate Deflated Gross Output under Double Deflation',
              computation: 'Real Output = 1,000 / 1.10 = Rs. 909.1 crore',
              rationale: 'Volume of output evaluated at base year prices.',
            },
            {
              step: 'Step 3: Calculate Deflated Intermediate Consumption under Double Deflation',
              computation: 'Real Inputs = 600 / 0.80 = Rs. 750.0 crore',
              rationale: 'Physical volume of imported input raw materials evaluated at base prices.',
            },
            {
              step: 'Step 4: Compute True Real GVA under Double Deflation',
              computation: 'Real GVA (Double) = Real Output - Real Inputs = 909.1 - 750.0 = Rs. 159.1 crore',
              rationale: 'Accurately captures that real input volume was higher relative to output, revealing actual real value added.',
            },
          ],
          outcome: 'Single Deflation produced Rs. 363.6 crore while Double Deflation produced Rs. 159.1 crore—demonstrating how single deflation can overstate or distort real growth during raw material price swings.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Commodity Balance Matrix Reconciliation',
            mandatoryRequirement: 'Ensure that discrepancies between total supply and total use in any 2-digit CPC commodity code do not exceed 2.0% of total supply.',
            scrutinyCheck: 'Unbalanced residuals must be investigated for unrecorded inventory changes before balancing algorithms are run.',
          },
          {
            stepNo: 2,
            activity: 'Deflator Alignment',
            mandatoryRequirement: 'Map WPI 8-digit commodity indices and Service Trade Deflators strictly to SUT intermediate use rows.',
            scrutinyCheck: 'Confirm that imported commodities are deflated using Import Price Indices, not domestic WPI.',
          },
        ],
        regulatoryReferences: [
          'UN-SNA 2008: Chapter 14 (Supply and Use Tables and Goods and Services Account)',
          'Eurostat Manual of Supply, Use and Input-Output Tables (2008 Edition)',
        ],
        officialCaseStudy: {
          title: 'Double Deflation Calibration in Petrochemical Sector',
          context: 'During 2014-16, global crude oil prices crashed from $110/barrel to $35/barrel.',
          challenge: 'Single deflation suggested stagnant real manufacturing growth despite surging corporate profit margins.',
          solution: 'NAD piloted sector-specific double deflation using import parity deflators, correctly capturing the real expansion in domestic refining value addition.',
          statStandard: 'MoSPI Advisory Committee on National Accounts Technical Note 2018',
        },
        knowledgeCheck: {
          question: 'What is the primary operational role of Supply and Use Tables (SUT) in official national accounting?',
          options: [
            'To calculate income tax liability of individual citizens',
            'To systematically balance total economic supply with total economic demand/use at detailed commodity levels',
            'To forecast next year’s agricultural monsoon rainfall',
            'To audit physical bank currency vaults',
          ],
          correctIndex: 1,
          explanation: 'SUT provides the comprehensive accounting framework to reconcile and balance total supply (domestic output + imports) with total intermediate and final uses across all commodities.',
        },
      },
    ],
  },

  'nssta-crs-004': {
    courseId: 'nssta-crs-004',
    courseCode: 'NSSTA-STAT-04',
    courseTitle: 'Periodic Labour Force Survey (PLFS): Activity Status & CAPI Execution Protocols',
    mappedCompetency: 'Labour & Employment Statistics',
    totalModules: 3,
    overview: 'Official operational manual on the Periodic Labour Force Survey (PLFS), covering activity status classification (Usual Status ps+ss, Current Weekly Status CWS), key labour market metrics (LFPR, WPR, UR), and CAPI tablet execution standards.',
    prerequisites: 'Foundational concepts of economic activity, ILO labour force standards, and household demographic surveys.',
    learningOutcome: 'Apply the major time criterion for Usual Principal Status, classify informal and subsidiary work, apply CWS priority rules, compute unemployment rates, and resolve CAPI validation errors.',
    modules: [
      {
        id: 'mod-04-1',
        moduleNumber: 1,
        title: 'Activity Status Classification: Usual Status (ps+ss) vs Current Weekly Status (CWS)',
        durationMinutes: 35,
        wordCountEstimate: 1250,
        summary: 'Master the exact sequential decision-tree for classifying household members into workforce, unemployed, and out of labour force.',
        learningObjectives: [
          'Apply the major time criterion for Usual Principal Activity Status (ps) over the 365-day reference period.',
          'Identify Subsidiary Economic Activity Status (ss) for secondary workers.',
          'Execute the 1-Hour Priority Rule under Current Weekly Status (CWS) for the last 7 days.',
          'Classify nuanced informal activities: unpaid family helpers, subsistence farming, and gig workers.',
        ],
        keySections: [
          {
            heading: '1. The 3-Tier Classification Hierarchy of Economic Activity',
            content: 'The Periodic Labour Force Survey (PLFS), launched by MoSPI in 2017 to provide high-frequency labour data, categorizes every household member into one of three broad activity statuses: (1) Working or Employed; (2) Seeking or Available for Work (Unemployed); (3) Neither Working nor Available for Work (Out of the Labour Force).',
            subContent: 'To determine these categories, MoSPI employs two distinct temporal frameworks: Usual Status (reference period of 365 days) and Current Weekly Status (reference period of last 7 days). Because economic behavior in developing economies is highly seasonal and informal, a single question cannot capture labor dynamics. Investigators must systematically follow a structured decision tree.',
            bulletPoints: [
              'Code 11-51: In the Labour Force - Employed (11: Self-employed own account, 12: Self-employed employer, 21: Unpaid family helper in household enterprise, 31: Regular wage/salaried employee, 51: Casual wage labour).',
              'Code 81: In the Labour Force - Unemployed (seeking or available for work).',
              'Code 91-97: Out of Labour Force (91: Attending educational institution, 92: Attending domestic duties only, 93: Attending domestic duties and engaged in free collection of goods, 94: Rentiers/pensioners, 95: Persons unable to work due to disability, 97: Others including beggars).',
            ],
            guidelineNote: 'Major Time Criterion Rule: A person is first classified as In the Labour Force or Out of the Labour Force based on where they spent relatively more time during the 365 days. If in the labour force, whether they were employed or unemployed is determined by comparing days employed vs days seeking work.',
            statutoryReference: 'PLFS Instructions to Field Staff (Vol. 1, Chapter 3: Concepts and Definitions)',
          },
          {
            heading: '2. Current Weekly Status (CWS) and the ILO Priority Rule',
            content: 'While Usual Status captures long-term structural activity, Current Weekly Status (CWS) captures current labour market conditions over the 7 days preceding the date of survey. Under CWS, the internationally recognized Priority Rule is enforced: Employed takes priority over Unemployed, and Unemployed takes priority over Out of Labour Force.',
            technicalFormula: 'Priority Order: Code 11-51 (Employed) > Code 81 (Unemployed) > Code 91-97 (Out of Labour Force)\n1-Hour Rule: A person who performed economic work for at least 1 hour on ANY single day in the last 7 days is classified as Employed.',
          },
        ],
        workedExample: {
          title: 'Classifying a Complex Rural Female Informant under Usual Status (ps+ss) and CWS',
          scenario: 'During survey visit on 15 October, the investigator interviews Sunita (age 24). During the preceding 365 days, Sunita spent 7 months (210 days) attending to household cooking, cleaning, and child care (domestic duties). However, during the kharif harvest, she worked for 45 days weeding and picking cotton on her family farm without separate wages. In the last 7 days, she worked 4 hours on Tuesday on the family farm.',
          steps: [
            {
              step: 'Step 1: Determine Usual Principal Activity Status (ps)',
              computation: 'Major Time Criterion: Domestic duties = 210 days (> 182 days out of 365) => Out of Labour Force (Code 92).',
              rationale: 'Since she spent the relatively longest duration in domestic duties, her principal status is Code 92.',
            },
            {
              step: 'Step 2: Determine Subsidiary Economic Activity Status (ss)',
              computation: 'Subsidiary criterion: Worked on family farm for 45 days (>= 30 days threshold) => Code 21 (Unpaid family helper).',
              rationale: 'Any economic activity pursued for 30 days or more by a principal non-worker qualifies as subsidiary economic status.',
            },
            {
              step: 'Step 3: Combine into Usual Status (ps+ss)',
              computation: 'Usual Status (ps+ss) = Employed (Workforce).',
              rationale: 'She is counted in the broad workforce under Usual Status (ps+ss).',
            },
            {
              step: 'Step 4: Determine Current Weekly Status (CWS)',
              computation: 'CWS: Worked 4 hours on Tuesday (>= 1 hour in the 7 days) => Code 21 (Employed under CWS).',
              rationale: 'Priority rule assigns employment over out-of-labour-force even if work was for just 1 day.',
            },
          ],
          outcome: 'Sunita is officially classified as: Principal Status = 92, Subsidiary Status = 21, Usual Status (ps+ss) = Employed, CWS = Employed.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Probing for Hidden Economic Work',
            mandatoryRequirement: 'Probe specifically for unpaid contributions to family agriculture, animal tending, or home-based tailoring for female informants recorded initially under Code 92.',
            scrutinyCheck: 'Supervisors must verify that women assisting in family shops are not reflexively marked solely as domestic workers.',
          },
          {
            stepNo: 2,
            activity: 'Reference Period Calendar Anchoring',
            mandatoryRequirement: 'Anchor the 365-day and 7-day recall windows to well-known local festivals, harvest dates, or national holidays.',
            scrutinyCheck: 'Confirm that CWS reference week begins exactly 7 days prior to interview date.',
          },
        ],
        regulatoryReferences: [
          'ILO 19th International Conference of Labour Statisticians (ICLS) Resolution on Work Statistics',
          'MoSPI Periodic Labour Force Survey Annual Report 2022-23 (Technical Notes)',
        ],
        officialCaseStudy: {
          title: 'Classification Query: Rural Female Farming and Domestic Work',
          context: 'A woman in rural Haryana spent 7 months primarily managing household cooking and childcare, but spent 45 days harvesting wheat on family land.',
          challenge: 'Should she be recorded as outside labour force or employed?',
          solution: 'Her Usual Principal Status (ps) is 92 (Out of labour force - domestic duties), but her Subsidiary Status (ss) is recorded as 21 (unpaid family helper), placing her in the broad Usual Status (ps+ss) workforce.',
          statStandard: 'MoSPI PLFS Operational Manual (Section 2.3.2)',
        },
        knowledgeCheck: {
          question: 'How is Usual Principal Activity Status (ps) determined for a survey respondent in the Periodic Labour Force Survey?',
          options: [
            'Based on the activity pursued on the exact morning of the survey visit',
            'Based on the major time criterion (activity pursued for relatively longest duration) during the 365 days preceding the survey',
            'Based solely on whether the respondent possesses a formal written contract',
            'Based on the highest educational degree held by the respondent',
          ],
          correctIndex: 1,
          explanation: 'Usual Principal Status (ps) is determined strictly by the major time criterion over the 365-day reference period.',
        },
      },
      {
        id: 'mod-04-2',
        moduleNumber: 2,
        title: 'Computation of Labour Force Metrics: LFPR, WPR, and Unemployment Rate',
        durationMinutes: 30,
        wordCountEstimate: 1150,
        summary: 'Formulas and demographic disaggregations for primary labour market indicators reported quarterly in urban areas and annually nationwide.',
        learningObjectives: [
          'Calculate Labour Force Participation Rate (LFPR).',
          'Calculate Worker Population Ratio (WPR).',
          'Calculate Unemployment Rate (UR) and avoid common denominator errors.',
          'Analyze age-disaggregated youth indicators (15-29 years) and female participation.',
        ],
        keySections: [
          {
            heading: '1. Standard Labour Market Formulations and Common Errors',
            content: 'MoSPI compiles and releases three foundational labour indicators: Labour Force Participation Rate (LFPR), Worker Population Ratio (WPR), and Unemployment Rate (UR). While LFPR and WPR use the Total Population as the denominator, the Unemployment Rate uses strictly the Labour Force as the denominator.',
            subContent: 'A frequent error in public debates and amateur analyses is dividing unemployed persons by the total population. This severely distorts the measure because full-time students, retired senior citizens, children, and homemakers are Out of the Labour Force and cannot be classified as unemployed.',
            technicalFormula: 'LFPR (%) = [ (Employed + Unemployed) / Total Population ] * 100\nWPR (%) = [ Employed / Total Population ] * 100\nUnemployment Rate (UR %) = [ Unemployed / (Employed + Unemployed) ] * 100 = [ Unemployed / Labour Force ] * 100',
            bulletPoints: [
              'Labour Force = Employed (Workforce) + Unemployed (Seeking or available for work).',
              'Persons aged 15 years and above: MoSPI publishes primary analytical tables restricted to working-age population (15+ years).',
              'Youth Category: Persons aged 15-29 years, tracked closely for educational transitions.',
            ],
            guidelineNote: 'Notice that UR = (LFPR - WPR) / LFPR * 100. If LFPR is 40% and WPR is 36%, UR is (40 - 36) / 40 * 100 = 10.0%.',
          },
          {
            heading: '2. High-Frequency Quarterly Bulletins vs Annual Reports',
            content: 'In urban areas, PLFS operates as a rolling rotational panel: each selected household is visited 4 times (once every quarter). This produces high-frequency quarterly urban unemployment bulletins. In rural areas, each household is visited once, producing the comprehensive Annual Report.',
          },
        ],
        workedExample: {
          title: 'Computing Official Labour Indicators for an Urban District',
          scenario: 'In an urban district of 500,000 residents, PLFS sample estimates reveal: Children aged 0-14 = 100,000; Working-age population (15+) = 400,000. Among working-age: Employed = 210,000; Unemployed (actively seeking work) = 14,000; Full-time students = 60,000; Homemakers = 90,000; Disabled/Retired = 26,000.',
          steps: [
            {
              step: 'Step 1: Calculate Total Labour Force (Aged 15+)',
              computation: 'Labour Force = Employed + Unemployed = 210,000 + 14,000 = 224,000 persons',
              rationale: 'Students, homemakers, and retirees (176,000 persons) are Out of Labour Force.',
            },
            {
              step: 'Step 2: Calculate Labour Force Participation Rate (LFPR for 15+)',
              computation: 'LFPR = (224,000 / 400,000) * 100 = 56.0%',
              rationale: '56% of working-age citizens are actively participating in the labour market.',
            },
            {
              step: 'Step 3: Calculate Worker Population Ratio (WPR for 15+)',
              computation: 'WPR = (210,000 / 400,000) * 100 = 52.5%',
              rationale: '52.5% of working-age population is gainfully employed.',
            },
            {
              step: 'Step 4: Calculate the Official Unemployment Rate (UR)',
              computation: 'UR = [ Unemployed / Labour Force ] * 100 = [ 14,000 / 224,000 ] * 100 = 6.25%',
              rationale: 'The denominator is strictly 224,000 (Labour Force), NOT 400,000 or 500,000.',
            },
          ],
          outcome: 'The district labour profile: LFPR = 56.0%, WPR = 52.5%, Unemployment Rate = 6.25%.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Age Verification against School/Aadhaar Records',
            mandatoryRequirement: 'Cross-verify reported age of youth aged 14 to 16 against birth certificate or school identity card.',
            scrutinyCheck: 'Prevents misclassification across the critical 15-year statistical working-age boundary.',
          },
          {
            stepNo: 2,
            activity: 'Availability Confirmation for Unemployed',
            mandatoryRequirement: 'If an informant is recorded as Code 81 (Unemployed), verify they took active steps to seek work (applied for jobs, registered with employment exchange, attended interviews).',
            scrutinyCheck: 'Passive job wishers who are not actively available cannot be coded as 81.',
          },
        ],
        regulatoryReferences: [
          'MoSPI PLFS Quarterly Bulletin Specifications 2023',
          'OECD Employment Outlook: Standardised Unemployment Rate Definitions',
        ],
        officialCaseStudy: {
          title: 'Media Clarification on Urban Unemployment Rates',
          context: 'A news report claimed unemployment in a state was 25% by dividing unemployed persons by total adult population including students and homemakers.',
          challenge: 'Public confusion over official 6.8% PLFS rate.',
          solution: 'MoSPI issued a technical brief explaining that students and homemakers are Outside the Labour Force and cannot be included in the denominator of the Unemployment Rate.',
          statStandard: 'NSSTA Official Statistics Communication Guidelines',
        },
        knowledgeCheck: {
          question: 'What is the correct denominator when calculating the official Unemployment Rate (UR)?',
          options: [
            'Total population of the country',
            'Total adult population aged 15 years and above',
            'Total Labour Force (Employed persons + Unemployed persons seeking work)',
            'Total government registered taxpayers',
          ],
          correctIndex: 2,
          explanation: 'Unemployment Rate (UR) = [Unemployed / (Employed + Unemployed)] * 100. The denominator is strictly the active Labour Force.',
        },
      },
      {
        id: 'mod-04-3',
        moduleNumber: 3,
        title: 'CAPI Application Navigation & Schedule Validation Rules',
        durationMinutes: 30,
        wordCountEstimate: 1100,
        summary: 'Hands-on training in MoSPI Computer Assisted Personal Interviewing (CAPI) tablets, interactive error auditing, and daily synchronization.',
        learningObjectives: [
          'Operate the CAPI Schedule 10.4 electronic data entry interface.',
          'Resolve automated logical consistency checks (age vs education, occupation vs industry).',
          'Manage rotational panel visit scheduling in urban FSUs.',
          'Execute end-of-day encrypted cryptographic sync with MoSPI Central Servers.',
        ],
        keySections: [
          {
            heading: '1. In-Built Logical Validations in MoSPI CAPI Application',
            content: 'In 2017, MoSPI phased out traditional paper-and-pencil interviewing (PAPI) in PLFS, deploying rugged Android tablets equipped with custom CAPI software developed in collaboration with DQAD and NIC. The CAPI application contains hundreds of in-built validation rules that execute instantaneously upon data entry.',
            subContent: 'These checks prevent investigators from recording physically or logically impossible combinations. For example, if an investigator enters a child of age 7 with marital status "Currently Married" or occupation "Secondary School Teacher", the software triggers an unskippable hard error blocking further navigation.',
            bulletPoints: [
              'Hard Validation Errors: Unresolvable contradictions that completely block the tablet from moving to the next block until rectified.',
              'Soft Warnings: Plausible but unusual values (e.g., casual labourer earning Rs. 5,000 per day) that require investigator confirmation and written justification.',
              'Skip Patterns: Dynamic screen routing based on responses (e.g., skipping earnings questions for full-time students).',
            ],
          },
          {
            heading: '2. Cryptographic Data Security and End-of-Day Sync',
            content: 'At the end of every survey day, field investigators must connect their tablet to a secure network. The application packages completed schedules, signs them with the investigator’s unique biometric/digital certificate, encrypts them using AES-256, and uploads them to the MoSPI cloud server in New Delhi.',
          },
        ],
        workedExample: {
          title: 'Resolving a CAPI Red-Flagged Industry-Occupation Contradiction',
          scenario: 'In an urban household, the investigator records Respondent Ramesh (age 32) with National Industrial Classification (NIC) Code 01111 (Growing of wheat) and National Classification of Occupations (NCO) Code 2411 (Chartered Accountant). CAPI triggers Error Code E-402: "Industry-Occupation Mismatch".',
          steps: [
            {
              step: 'Step 1: Understand the Error Flag',
              computation: 'NIC 01111 indicates agricultural farming; NCO 2411 indicates professional accountancy.',
              rationale: 'CAPI audit table flags high discordance between primary farming and corporate accounting.',
            },
            {
              step: 'Step 2: Probe the Respondent',
              computation: 'Investigation reveals Ramesh is employed full-time at an agricultural corporate firm preparing balance sheets, not farming wheat.',
              rationale: 'The primary enterprise activity was miscoded as subsistence agriculture rather than corporate head-office management.',
            },
            {
              step: 'Step 3: Update NIC Code',
              computation: 'Change NIC Code to 70100 (Activities of head offices).',
              rationale: 'Validates NCO 2411 (Accountant) working in a corporate head office.',
            },
          ],
          outcome: 'Error E-402 clears immediately, allowing the schedule to pass local validation and sync to the server.',
        },
        fieldSopChecklist: [
          {
            stepNo: 1,
            activity: 'Daily Battery and Storage Check',
            mandatoryRequirement: 'Ensure tablet is charged to 100% and has minimum 2 GB free internal storage before departing for the sample village.',
            scrutinyCheck: 'Inspectors must carry official solar power bank kits provided by FOD.',
          },
          {
            stepNo: 2,
            activity: 'GPS Geofence Verification',
            mandatoryRequirement: 'Initiate interview only after GPS fix reaches < 10m precision indicator inside the selected household compound.',
            scrutinyCheck: 'Supervisor portal flags any interview started outside the registered FSU boundary.',
          },
        ],
        regulatoryReferences: [
          'MoSPI CAPI Systems Architecture and Security Standards 2021',
          'IT Act 2000: Data Encryption Guidelines for Official Field Tablets',
        ],
        officialCaseStudy: {
          title: 'Field Audit: Inconsistent Activity Status Flagging in CAPI',
          context: 'An investigator recorded a respondent as full-time college student (Code 91) under principal status, but logged 48 weekly hours as regular salaried accountant.',
          challenge: 'Data entry discrepancy before final upload.',
          solution: 'CAPI triggered a Level-1 Red Flag; the investigator re-checked the respondent and corrected the principal status to Code 31 (regular salaried).',
          statStandard: 'MoSPI CAPI Systems Architecture Manual',
        },
        knowledgeCheck: {
          question: 'What happens in the MoSPI CAPI tablet application when an investigator enters conflicting demographic and activity responses?',
          options: [
            'The tablet immediately erases the entire village file',
            'An in-built logical consistency error flags the discrepancy and prompts the investigator to verify before proceeding',
            'The application silently ignores the error and uploads corrupted data',
            'The tablet locks for 30 days',
          ],
          correctIndex: 1,
          explanation: 'CAPI utilizes automated logical consistency validations to flag discrepancies at the point of interview, preventing corrupted data from entering the database.',
        },
      },
    ],
  },
};
