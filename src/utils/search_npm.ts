export type NpmPackageResult = {
  name: string;
  version: string;
  apiUrl: string;
};

type NpmApiResponse = {
  objects: Array<{ package: { name: string; version: string } }>;
};

export default async function searchNpmPackages(
  query: string,
): Promise<NpmApiResponse> {
  const searchUrl = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
