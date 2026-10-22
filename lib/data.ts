export type Domain = 'fin' | 'gam' | 'com';

export const EMAIL = 'svituhayura@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/yura-svituha-586b1931a';

export const wheelLabels = [
  'Create own startup',
  'Save money',
  'Risk & get rich',
  'Hire a dev team',
  'Launch your MVP',
  'Scale to millions',
  'Free consultation',
  'Build a casino',
  'Ship a fintech app',
  'Double revenue',
  'Automate with AI',
  'Jackpot',
];

export const stack = ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'WebSockets'];

export const jobs: { company: string; role: string; when: string; meta: string; domain: Domain; points: string[] }[] = [
  {
    company: 'Klarna', role: 'Full Stack Software Engineer', when: 'Aug 2025 – Sep 2026', meta: 'Full-time · Hybrid', domain: 'fin',
    points: [
      'Payment-flow and checkout features in React and TypeScript.',
      'Node.js and Python services that keep payment workflows reliable at scale.',
      'PostgreSQL, Redis and AWS across the payments stack.',
    ],
  },
  {
    company: 'YNAB', role: 'Full Stack Engineer', when: 'May 2023 – Aug 2024', meta: 'Full-time', domain: 'fin',
    points: [
      'Bank account integrations, transaction sync and expense categorisation.',
      'REST APIs for budgets, transactions and financial reports.',
      'Query tuning for large transaction volumes; secure handling of financial data.',
    ],
  },
  {
    company: 'DraftKings', role: 'Full Stack Engineer', when: 'Apr 2022 – May 2023', meta: 'Contract · Remote, US', domain: 'gam',
    points: [
      'Node.js and Python microservices on AWS for large-scale sports betting.',
      'Real-time odds updates and live betting over WebSockets and event-driven services.',
      'High-load APIs for bets and payments, tuned with Redis caching and async processing.',
    ],
  },
  {
    company: 'Instacart', role: 'Full Stack Engineer', when: 'Oct 2020 – Apr 2022', meta: 'Full-time · Remote, US', domain: 'com',
    points: [
      'Cart, checkout, payment integrations and order tracking.',
      'Node.js and Python REST services for orders, catalogue and delivery.',
      'Caching and query work to hold up under peak traffic.',
    ],
  },
];

export const projects: { name: string; kind: string; text: string; href: string; link: string; domain: Domain }[] = [
  { name: 'Banorte', kind: 'FINTECH · BANKING', text: "Retail and digital banking for one of Mexico's largest financial groups.", href: 'https://www.banorte.com/', link: 'banorte.com', domain: 'fin' },
  { name: 'Spendora', kind: 'FINTECH · APP', text: 'Expense tracking and budgeting app for Android.', href: 'https://play.google.com/store/apps/details?id=co.spendora.app', link: 'Google Play', domain: 'fin' },
  { name: 'Mikdar', kind: 'FINTECH · APP', text: 'Offline personal finance app with Zakat and inheritance tools.', href: 'https://play.google.com/store/apps/details?id=com.mikdar.app', link: 'Google Play', domain: 'fin' },
  { name: 'RoiHeads', kind: 'iGAMING · ADTECH', text: 'Performance marketing and user acquisition for gambling operators.', href: 'https://www.roiheads.com/', link: 'roiheads.com', domain: 'gam' },
  { name: 'Joo Casino', kind: 'iGAMING · CASINO', text: 'Online casino platform.', href: 'https://www.joocasino.com/welcome-page', link: 'joocasino.com', domain: 'gam' },
  { name: 'Rivo777', kind: 'iGAMING · CASINO', text: 'Online casino platform.', href: 'https://rivo777.casino/', link: 'rivo777.casino', domain: 'gam' },
  { name: 'Vivaspin', kind: 'iGAMING · CASINO', text: 'Online casino platform.', href: 'https://www.vivaspin.com/en', link: 'vivaspin.com', domain: 'gam' },
  { name: 'HotLoot', kind: 'iGAMING · PLATFORM', text: 'Online gaming platform.', href: 'https://hotloot.io/', link: 'hotloot.io', domain: 'gam' },
];

export const rails = [
  { name: 'PayPal', note: 'Instant' },
  { name: 'Payoneer', note: 'USD · EUR' },
  { name: 'Wise', note: 'Multi-currency' },
  { name: 'SWIFT', note: 'Bank wire' },
  { name: 'SEPA', note: 'EU transfer' },
  { name: 'USDT', note: 'TRC-20 · ERC-20' },
  { name: 'USDC', note: 'Stablecoin' },
  { name: 'BTC · ETH', note: 'On-chain' },
];

export type PrizeIcon = 'chat' | 'code' | 'calc' | 'arch' | 'bolt' | 'gift';
export type Prize = { name: string; tier: string; r: string; w: number; icon: PrizeIcon };

export const prizes: Prize[] = [
  { name: 'Free project estimate', tier: 'Mil-Spec', r: '#4B69FF', w: 30, icon: 'calc' },
  { name: 'Free code review', tier: 'Restricted', r: '#8847FF', w: 25, icon: 'code' },
  { name: 'Free 30-min consultation', tier: 'Classified', r: '#D32CE6', w: 22, icon: 'chat' },
  { name: 'Priority start next week', tier: 'Restricted', r: '#8847FF', w: 9, icon: 'bolt' },
  { name: '1-hour architecture audit', tier: 'Covert', r: '#EB4B4B', w: 11, icon: 'arch' },
  { name: '10% off the first month', tier: '★ Rare special', r: '#FFD700', w: 3, icon: 'gift' },
];
