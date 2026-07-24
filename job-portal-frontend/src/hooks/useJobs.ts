import { useState, useEffect, useCallback, useMemo } from "react";
import { getJobs } from "@/services/job.service";
import { Job } from "@/types/job";

// Helper functions to dynamically map experience and jobType from job attributes since they are not in the DB schema
export function getJobType(job: Job): string {
  const loc = job.location.toLowerCase();
  if (loc.includes("remote")) return "Remote";
  // Deterministic assignments
  if (job.id % 3 === 0) return "Hybrid";
  if (job.id % 3 === 1) return "Full-time";
  return "Part-time";
}

export function getJobExperience(job: Job): string {
  const title = job.title.toLowerCase();
  if (title.includes("senior") || title.includes("sr")) return "5+ years";
  if (title.includes("lead") || title.includes("principal")) return "8+ years";
  if (title.includes("junior") || title.includes("jr")) return "1-2 years";
  if (title.includes("intern")) return "Internship";
  
  const expYears = (job.id % 5) + 1;
  return `${expYears}-${expYears + 2} years`;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  // Search & Filter states
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  
  const [location, setLocation] = useState<string>("");
  const [debouncedLocation, setDebouncedLocation] = useState<string>("");
  
  const [minSalary, setMinSalary] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");

  // Debounce search state
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search change
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Debounce location filter state
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocation(location);
      setPage(1); // Reset page on location change
    }, 400);

    return () => clearTimeout(handler);
  }, [location]);

  // Reset page when client-side filters change to avoid loading empty page
  useEffect(() => {
    setPage(1);
  }, [minSalary, experience, jobType]);

  const fetchJobs = useCallback(async (activeSignal: { active: boolean }) => {
    setLoading(true);
    setError(null);

    // Standardize casing for PostgreSQL exact match search (e.g. pune -> Pune, san francisco -> San Francisco)
    const formattedLocation = debouncedLocation
      ? debouncedLocation.trim().toLowerCase().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      : undefined;

    try {
      const data = await getJobs({
        page,
        limit,
        location: formattedLocation,
        minSalary: minSalary ? Number(minSalary) : undefined,
        search: debouncedSearch || undefined,
      });
      if (activeSignal.active) {
        setJobs(data);
      }
    } catch (err: unknown) {
      if (activeSignal.active) {
        const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
        const errMsg = errorObj.response?.data?.message || errorObj.message || "Failed to load jobs";
        setError(errMsg);
      }
    } finally {
      if (activeSignal.active) {
        setLoading(false);
      }
    }
  }, [page, limit, debouncedLocation, minSalary, debouncedSearch]);

  useEffect(() => {
    const activeSignal = { active: true };
    fetchJobs(activeSignal);
    return () => {
      activeSignal.active = false;
    };
  }, [fetchJobs]);

  // Apply client-side filtering for non-db fields (experience, jobType) and fallback search
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Filter by location client-side fallback (case-insensitive substring check)
    if (debouncedLocation) {
      const locQuery = debouncedLocation.trim().toLowerCase();
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locQuery)
      );
    }

    // Filter by Job Type client-side
    if (jobType) {
      result = result.filter((job) => {
        const type = getJobType(job).toLowerCase();
        return type.includes(jobType.toLowerCase());
      });
    }

    // Filter by Experience client-side
    if (experience) {
      result = result.filter((job) => {
        const exp = getJobExperience(job).toLowerCase();
        // Standardize filters matching:
        // "entry" (0-2 years), "mid" (3-5 years), "senior" (5+ years / 8+ years)
        const expLower = experience.toLowerCase();
        if (expLower === "entry") {
          return exp.includes("1-2") || exp.includes("internship");
        } else if (expLower === "mid") {
          return exp.includes("3-5") || exp.includes("2-4") || exp.includes("4-6");
        } else if (expLower === "senior") {
          return exp.includes("5+") || exp.includes("8+") || exp.includes("6-8");
        }
        return exp.includes(expLower);
      });
    }

    // Fallback client-side search in case backend search is completely disabled
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((job) => {
        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.company?.companyName?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [jobs, debouncedLocation, jobType, experience, debouncedSearch]);

  return {
    jobs: filteredJobs,
    loading,
    error,
    refetch: () => fetchJobs({ active: true }),
    // Pagination
    page,
    setPage,
    limit,
    setLimit,
    // Search
    search,
    setSearch,
    // Filters
    location,
    setLocation,
    minSalary,
    setMinSalary,
    experience,
    setExperience,
    jobType,
    setJobType,
  };
}
