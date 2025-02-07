import { stringSimilarity } from "string-similarity-js";

export type PyPIPackageResult = {
  name: string;
  package_manager_url: string;
};

async function fetchPyPIProjects(): Promise<PyPIPackageResult[]> {
  try {
    const response = await fetch("https://pypi.org/simple/", {
      headers: { Accept: "application/vnd.pypi.simple.v1+json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.projects ?? [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default async function searchPyPIPackages(
  query: string,
): Promise<PyPIPackageResult[]> {
  const projects = await fetchPyPIProjects();
  if (projects.length === 0) return [];

  const queryLower = query.toLowerCase();

  return projects
    .filter((pkg) => pkg.name.toLowerCase().includes(queryLower))
    .sort((a, b) => {
      const scoreA = stringSimilarity(queryLower, a.name.toLowerCase());
      const scoreB = stringSimilarity(queryLower, b.name.toLowerCase());
      return scoreB - scoreA || a.name.localeCompare(b.name);
    })
    .slice(0, 10);
}
