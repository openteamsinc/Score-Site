import React from "react";
import search_packages, { PackageResult } from "@/utils/search_packages";
import { debounce } from "lodash";

const debouncedFetchPackages = debounce(
  async (query, setPackages, setLoading) => {
    if (query.trim().length >= 3) {
      const results = await search_packages(query);
      setPackages(results);
    } else {
      setPackages([]);
    }
    setLoading(false);
  },
  150, // Reduced debounce delay from 300ms to 150ms for more responsiveness
);

const cache = new Map();

export default function useSearchPackages(query: string) {
  const [packages, setPackages] = React.useState<PackageResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cache.has(query)) {
      // If query is cached, use the cached result
      setPackages(cache.get(query));
      setLoading(false);
      return;
    }

    setLoading(true);
    debouncedFetchPackages(
      query,
      (result: PackageResult[]) => {
        // Explicitly type result as PackageResult[]
        setPackages(result);
        cache.set(query, result); // Cache the result for future queries
      },
      setLoading,
    );

    return () => {
      debouncedFetchPackages.cancel();
    };
  }, [query]);

  return { packages, loading };
}
