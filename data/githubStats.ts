// ─────────────────────────────────────────────────────────────────────────────
// GitHub stats — fully static and hand-maintained. Edit the values below and
// the GitHub section updates; no component changes needed.
//
//   counters   headline numbers. `value` animates from 0 on scroll-into-view;
//              `suffix` renders after it ("+" reads as "and counting", "" for
//              an exact figure).
//   languages  the "Languages" bars. Keep `percent`s summing to 100.
//              `accent` is "purple" | "indigo" | "cyan".
//   heatmapSeed / weeks
//              the contribution grid is decorative and labelled
//              "(illustrative)" in the UI — change `heatmapSeed` to reshuffle
//              its pattern, `weeks` to widen/narrow it.
// ─────────────────────────────────────────────────────────────────────────────
import type { GithubStats } from '@/types';

export const githubStats: GithubStats = {
  username: 'isudhir',
  profileUrl: 'https://github.com/isudhir',
  counters: [
    { label: 'Public Repos', value: 24, suffix: '+' },
    { label: 'Total Stars', value: 60, suffix: '+' },
    { label: 'Contributions / yr', value: 900, suffix: '+' },
    { label: 'Pull Requests', value: 150, suffix: '+' },
  ],
  languages: [
    { name: 'TypeScript', percent: 46, accent: 'purple' },
    { name: 'JavaScript', percent: 27, accent: 'indigo' },
    { name: 'HTML/CSS', percent: 15, accent: 'cyan' },
    { name: 'Other', percent: 12, accent: 'indigo' },
  ],
  heatmapSeed: 20260704,
  weeks: 26,
};
