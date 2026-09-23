export const insuranceOffers = [
  {
    id: "ins_hdfc_ergo",
    providerName: "HDFC ERGO",
    insuranceType: "Health Insurance",
    monthlyPremiumFactor: 0.0013, // ~₹650/mo for 5L
    policyTerm: "1 Year (Renewable)",
    keyBenefit: "Cashless treatment at 10,000+ network hospitals with zero copay",
    tag: "Highest claim settlement ratio (98.6%)",
    coverageDetails: [
      "In-patient hospitalization expenses fully covered up to Sum Insured",
      "Pre-hospitalization (60 days) & Post-hospitalization (180 days)",
      "Daycare procedures covered (500+ treatment procedures)",
      "Emergency ambulance cover up to ₹3,000 per hospitalization"
    ],
    exclusions: [
      "Pre-existing illnesses during initial 36-month waiting period",
      "Cosmetic, aesthetic, or weight-loss surgical treatments",
      "Injuries sustained from hazardous sports or illegal activities"
    ],
    eligibility: {
      minAge: "18 years (Adult), 91 days (Child dependent) [Demo criteria]",
      maxAge: "65 years (Entry age limit) [Demo criteria]",
      medicalCheckup: "No pre-policy medical test required up to age 45 (Demo criteria)"
    },
    claimInfo: {
      claimSettlementRatio: "98.6% (Demo metric)",
      cashlessHospitals: "10,000+ pan-India network hospitals",
      claimProcess: "Express cashless authorization within 2 hours at network hospitals"
    }
  },
  {
    id: "ins_icici_lombard",
    providerName: "ICICI Lombard",
    insuranceType: "Health Insurance",
    monthlyPremiumFactor: 0.00144, // ~₹720/mo for 5L
    policyTerm: "1 Year (Renewable)",
    keyBenefit: "Instant claim setup within 30 mins & free annual health checkup",
    tag: "Fastest digital claims processing",
    coverageDetails: [
      "Room rent cover with no sub-limits on single private AC rooms",
      "Annual health checkup voucher for all insured members",
      "Ayush / Alternative treatment (Ayurveda, Yoga, Unani) covered",
      "Organ donor medical expense coverage included"
    ],
    exclusions: [
      "Initial 30-day waiting period for standard illnesses (except accidents)",
      "Dental treatment unless requiring hospitalization due to trauma",
      "Non-medical items such as gloves, masks, and administrative fees"
    ],
    eligibility: {
      minAge: "18 years (Adult entry) [Demo criteria]",
      maxAge: "65 years (Entry age limit) [Demo criteria]",
      medicalCheckup: "Tele-underwriting available for healthy applicants (Demo criteria)"
    },
    claimInfo: {
      claimSettlementRatio: "97.8% (Demo metric)",
      cashlessHospitals: "7,500+ network hospitals",
      claimProcess: "InstaSpect digital claim filing via app"
    }
  },
  {
    id: "ins_star_health",
    providerName: "Star Health Insurance",
    insuranceType: "Health Insurance",
    monthlyPremiumFactor: 0.00118, // ~₹590/mo for 5L
    policyTerm: "1 Year (Renewable)",
    keyBenefit: "No pre-policy medical checkup required up to age 50",
    tag: "Most budget-friendly premium plan",
    coverageDetails: [
      "Comprehensive hospitalization coverage at competitive premiums",
      "Cumulative bonus up to 50% for every claim-free year",
      "Cataract treatment cover up to specified sub-limits",
      "Domiciliary hospitalization expenses covered"
    ],
    exclusions: [
      "Specified pre-existing diseases waiting period (24-36 months)",
      "Intentional self-harm or alcohol-related medical issues",
      "Experimental or unproven medical therapies"
    ],
    eligibility: {
      minAge: "18 years (Adult entry) [Demo criteria]",
      maxAge: "65 years (Entry age limit) [Demo criteria]",
      medicalCheckup: "No health checkup required up to 50 years (Demo criteria)"
    },
    claimInfo: {
      claimSettlementRatio: "99.1% (Demo metric)",
      cashlessHospitals: "14,000+ network hospitals",
      claimProcess: "In-house claim processing team without third-party TPA"
    }
  },
  {
    id: "ins_care_health",
    providerName: "Care Health Insurance",
    insuranceType: "Health Insurance",
    monthlyPremiumFactor: 0.00136, // ~₹680/mo for 5L
    policyTerm: "1 Year (Renewable)",
    keyBenefit: "Unlimited automatic restoration of sum insured",
    tag: "100% reload of coverage on exhaustion",
    coverageDetails: [
      "100% Automatic restoration of sum insured upon exhaustion",
      "No claim bonus super option to double coverage in 2 years",
      "Air ambulance coverage up to ₹50,000 per policy year",
      "Global coverage options for emergency hospitalization"
    ],
    exclusions: [
      "36-month waiting period for pre-existing medical conditions",
      "Outpatient consultations (OPD) unless rider selected",
      "General debility or congenital external anomalies"
    ],
    eligibility: {
      minAge: "18 years (Adult entry) [Demo criteria]",
      maxAge: "Lifelong renewability guaranteed [Demo criteria]",
      medicalCheckup: "No pre-policy medical checkup up to 50 years (Demo criteria)"
    },
    claimInfo: {
      claimSettlementRatio: "95.2% (Demo metric)",
      cashlessHospitals: "11,000+ network hospital network",
      claimProcess: "Self-service online portal with claim status tracking"
    }
  }
];
