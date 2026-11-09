/**
 * Pure helper and calculation logic for portfolio filtering, focus lens,
 * and system architecture mapping.
 */

export interface ProjectData {
  id: string;
  name: string;
  title: string;
  categories: string[];
  stack: string[];
  featured?: boolean;
}

/**
 * Filter projects by category chip
 */
export function filterProjectsByCategory<T extends { categories: string[] }>(
  projects: T[],
  selectedCategory: string
): T[] {
  if (selectedCategory === 'all') return projects;
  return projects.filter((p) => p.categories.includes(selectedCategory));
}

/**
 * Focus lens matching: determines if a project matches a focus area ID
 */
export function projectMatchesFocusArea(
  projectTags: string[],
  areaId: number,
  tagToAreaMap: Record<string, number[]>
): boolean {
  if (areaId < 0) return true; // all active
  for (const tag of projectTags) {
    const areas = tagToAreaMap[tag];
    if (areas && areas.includes(areaId)) {
      return true;
    }
  }
  return false;
}

/**
 * Calculate scroll progress ratio clamped between 0 and 1
 */
export function calculateScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) return 0;
  return Math.min(Math.max(scrollTop / scrollable, 0), 1);
}

/**
 * Format counter animation numbers
 */
export function interpolateCount(
  progress: number,
  target: number
): number {
  // Cubic ease-out
  const p = Math.min(Math.max(progress, 0), 1);
  const eased = 1 - Math.pow(1 - p, 3);
  return Math.round(target * eased);
}
