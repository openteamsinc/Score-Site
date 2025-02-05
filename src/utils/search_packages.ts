"use server";

import { fetchAll } from "./database";
import { HealthRiskValue, MaturityValue } from "./score";

export type PackageResult = {
  ecosystem: string;
  name: string;
  health_risk: HealthRiskValue;
  maturity: MaturityValue;
};

export default async function search_packages(query: string) {
  const sqlQuery = `
  SELECT
    packages.ecosystem,
    packages.name,
    scores.health_risk.value AS health_risk,
    scores.maturity.value AS maturity,
    damerau_levenshtein(name, lower(?::VARCHAR))::int AS name_distance
  FROM packages
  LEFT JOIN scores ON packages.source_url = scores.source_url
  ORDER BY
      name_distance
  LIMIT 10`;

  try {
    const results = await fetchAll<PackageResult>(sqlQuery, query);
    console.log("results", results);
    return results.map((result) => ({
      ecosystem: result.ecosystem, // Send only the fields needed for search suggestions
      name: result.name,
    }));
  } catch (error) {
    console.error("Error querying packages:", error);
    return [];
  }
}
