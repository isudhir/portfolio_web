// TODO: update numbers by hand from https://github.com/sudhir-here (no API — static data)
import type { GithubStats } from '@/types';

export const githubStats: GithubStats = {
  username: 'sudhir-here',
  profileUrl: 'https://github.com/sudhir-here',
  counters: [
    { label: 'Public Repos', value: 24, suffix: '+' }, // TODO real number
    { label: 'Total Stars', value: 60, suffix: '+' }, // TODO real number
    { label: 'Contributions / yr', value: 900, suffix: '+' }, // TODO real number
    { label: 'Pull Requests', value: 150, suffix: '+' }, // TODO real number
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
