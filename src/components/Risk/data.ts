type FactorType = {
  cost: number;
  description: string;
  diligence_impact: string;
};
export const riskFactors: { [key: string]: FactorType } = {
  UNSAFE_GIT_PROTOCOL: {
    description:
      "Repository uses an insecure Git protocol that could allow attackers to intercept or modify code during transfer",
    diligence_impact:
      "Risk of supply chain attacks and code tampering could lead to malicious code entering production systems",
    cost: 1200,
  },
  REPO_NOT_FOUND: {
    description: "Source code repository is inaccessible or has been deleted",
    diligence_impact:
      "Unable to audit code or verify security practices. Critical risk as source of deployed code is unknown",
    cost: 2000,
  },
  REPO_EMPTY: {
    description: "Repository exists but contains no source code",
    diligence_impact:
      "Cannot verify code quality or security. Risk of dependency on abandoned or moved project",
    cost: 1500,
  },
  GIT_TIMEOUT: {
    description:
      "Repository is too large or has issues preventing timely code access",
    diligence_impact:
      "May indicate poor repository management and potential issues with code deployment and maintenance",
    cost: 1000,
  },
  NO_LICENSE: {
    description: "No software license is specified in the repository",
    diligence_impact:
      "Legal exposure risk - no clear terms for code usage or redistribution. Could face copyright claims or legal action",
    cost: 2500,
  },
  LESS_PERMISSIVE_LICENSE: {
    description: "License contains restrictions on code usage or modification",
    diligence_impact:
      "May prevent certain business use cases or require costly compliance measures. Risk of license violations",
    cost: 3000,
  },
  NO_AUTHORS_THIS_YEAR: {
    description: "Repository has had no contributions in the last year",
    diligence_impact:
      "High risk of unmaintained code. Security vulnerabilities likely unpatched. Dependencies may be outdated",
    cost: 4000,
  },
  ONE_AUTHORS_THIS_YEAR: {
    description: "Only one developer has contributed in the past year",
    diligence_impact:
      "Bus factor of 1 - critical project knowledge concentrated in single person. Risk of future maintenance issues",
    cost: 2500,
  },
  LAST_COMMIT_5_YEARS: {
    description: "No development activity in over 5 years",
    diligence_impact:
      "Extremely high risk of compatibility issues, security vulnerabilities, and technical debt. Likely requires complete replacement",
    cost: 5000,
  },
  PACKAGE_NAME_MISMATCH: {
    description: "Published package name differs from source code name",
    diligence_impact:
      "Risk of typosquatting or malicious package substitution. Supply chain security cannot be verified",
    cost: 1500,
  },
  PACKGE_SKEW_NOT_UPDATED: {
    description: "Published package version lags behind source code",
    diligence_impact:
      "Risk of running outdated code with known bugs or vulnerabilities. Indicates poor release management",
    cost: 2000,
  },
  PACKGE_SKEW_NOT_RELEASED: {
    description: "Published package version is ahead of source code",
    diligence_impact:
      "Cannot verify production code matches audited source. Risk of unauthorized or malicious code in package",
    cost: 2200,
  },
  INSECURE_CONNECTION: {
    description: "Code is served over unencrypted HTTP connection",
    diligence_impact:
      "Risk of code tampering during transfer. Cannot verify integrity of downloaded dependencies",
    cost: 800,
  },
  LOCALHOST_URL: {
    description: "Package source points to a local development URL",
    diligence_impact:
      "Cannot access actual source code. High risk as production code origin is unknown",
    cost: 500,
  },
  INVALID_URL: {
    description: "Source code URL is malformed or invalid",
    diligence_impact:
      "Cannot verify code source or conduct security audit. Risk of supply chain attacks",
    cost: 800,
  },
};
