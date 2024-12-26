type License = {
  license: string;
  kind: string;
  similarity: number;
  best_match: string;
  modified: boolean;
};

export type Package = {
  name: string;
  version: string;
  source_url: string;
  release_date: string;
  status: null;
};

type Source = {
  source_url: string;
  recent_authors_count: number;
  max_monthly_authors_count: number;
  first_commit: string;
  latest_commit: string;
  license: License;
  py_package: null;
};

type EcosystemDestination = {
  pypi: null;
  npm: null;
  conda: null;
};

export const UNKNOWN = "Unknown";
export const PLACEHOLDER = "Placeholder";

// ---

export const MATURE = "Mature";
export const LEGACY = "Legacy";
export const EXPERIMENTAL = "Experimental";

export type MaturityValue =
  | typeof MATURE
  | typeof LEGACY
  | typeof EXPERIMENTAL
  | typeof UNKNOWN
  | typeof PLACEHOLDER;

export const HEALTHY = "Healthy";
export const CAUTION_NEEDED = "Caution Needed";
export const MODERATE_RISK = "Moderate Risk";
export const HIGH_RISK = "High Risk";

export type HealthRiskValue =
  | typeof HEALTHY
  | typeof CAUTION_NEEDED
  | typeof MODERATE_RISK
  | typeof HIGH_RISK
  | typeof UNKNOWN
  | typeof PLACEHOLDER;

export type Score = {
  source_url: string;
  ecosystem_destination: EcosystemDestination;
  maturity: {
    value: MaturityValue;
    notes: string[];
  };
  health_risk: {
    value: HealthRiskValue;
    notes: string[];
  };
  last_updated: string;
  license: string;
  license_kind: string;
  license_modified: boolean;
};

export type PackageScore =
  | {
      ecosystem: string;
      package_name: string;
      status: "not_found";
      package: Package;
      source: null;
      score: null;
    }
  | {
      ecosystem: string;
      package_name: string;
      status: "ok";
      package: Package;
      source: Source;
      score: Score;
    };