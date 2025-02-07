export type CondaApiPackage = {
  name: string;
  latestVersion: string;
  url: string;
  owner: string;
};

async function fetchCondaPackages(query: string): Promise<CondaApiPackage[]> {
  const searchUrl = `https://api.anaconda.org/search?name=${encodeURIComponent(query)}&channel=conda-forge`;

  try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default async function searchCondaForgePackages(
  query: string,
): Promise<CondaApiPackage[]> {
  const condaResults = await fetchCondaPackages(query);

  const uniquePackages = new Map<string, CondaApiPackage>();

  for (const pkg of condaResults) {
    if (!uniquePackages.has(pkg.name)) {
      uniquePackages.set(pkg.name, {
        ...pkg,
        name: `conda-forge/${pkg.name}`,
      });
    }
  }

  return Array.from(uniquePackages.values()).slice(0, 10);
}
