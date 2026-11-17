import { ImageKey } from '../images';

export type Transaction = {
  merchant: string;
  date: string;
  amount: number; // negative = money out
  logo?: ImageKey; // omitted → "$" icon (direct deposit)
};

export type Persona = {
  id: 'sofia' | 'ethan';
  name: string;
  memberSince: string;
  email: string;
  dob: string;
  gender: string;
  country: string;
  totalBalance: string;
  checking: string;
  savings: string;
  goal: { title: string; amount: string; original: string; progressLabel: string; remainingLabel: string; progress: number };
  employer: string;
  paydays: [string, string];
  upcomingPayments?: { name: string; amount: string; when: string; logo: ImageKey }[];
  creditScore?: { range: string; label: string };
  recentTransactions: Transaction[];
  /** Full list on the Transactions screen, grouped under date headers. */
  transactionGroups: { title: string; items: Transaction[] }[];
};

const sofiaRecent: Transaction[] = [
  { merchant: 'Burger King', date: 'October 11, 2026', amount: -15.5, logo: 'logo_burgerking' },
  { merchant: 'Kung Fu Tea', date: 'October 5, 2026', amount: -6.24, logo: 'logo_kungfutea' },
  { merchant: 'McDonald’s', date: 'October 3, 2026', amount: -10.24, logo: 'logo_mcdonalds' },
];

const ethanRecent: Transaction[] = [
  { merchant: 'Amazon', date: 'October 11, 2026', amount: -34.5, logo: 'logo_amazon' },
  { merchant: 'Target', date: 'October 5, 2026', amount: -24.1, logo: 'logo_target' },
  { merchant: 'McDonald’s', date: 'October 3, 2026', amount: -15.2, logo: 'logo_mcdonalds' },
];

/** Sofia (teen flow, top row in Figma) and Ethan (young-adult flow, bottom row). */
export const personas: Record<Persona['id'], Persona> = {
  sofia: {
    id: 'sofia',
    name: 'Sofia',
    memberSince: 'Oct 2026',
    email: 'Sofiarios23@gmail.com',
    dob: 'March 23, 2009',
    gender: 'Female',
    country: 'United States',
    totalBalance: '$193.67',
    checking: '$857.17',
    savings: '$2,290.82',
    goal: {
      title: 'Save up for a car',
      amount: '$2,619.25',
      original: 'Original Balance: $3,134.25',
      progressLabel: '$515 paid off',
      remainingLabel: '83.57% Remaining',
      progress: 76 / 356,
    },
    employer: 'Fred’s Froyo',
    paydays: ['Next Payday is on October 15th, 2026', 'Next Payday is on October 22nd, 2026'],
    recentTransactions: sofiaRecent,
    transactionGroups: [
      { title: 'Recent Transactions', items: sofiaRecent },
      {
        title: 'September 29 2026',
        items: [{ merchant: 'DIRECT DEPOSIT', date: 'September 29, 2026', amount: 230.61 }],
      },
    ],
  },
  ethan: {
    id: 'ethan',
    name: 'Ethan',
    memberSince: 'Jan 2026',
    email: 'Ethanpine1000@gmail.com',
    dob: 'August 17, 2002',
    gender: 'Male',
    country: 'United States',
    totalBalance: '$3,163.99',
    checking: '$857.17',
    savings: '$2,290.82',
    goal: {
      title: 'Pay credit card debt',
      amount: '$2,619.25',
      original: 'Original Balance: $3,134.25',
      progressLabel: '$515 paid off',
      remainingLabel: '83.57% Remaining',
      progress: 76 / 356,
    },
    employer: 'Boston Medical',
    paydays: ['Next Payday is on October 21st, 2026', 'Next Payday is on November 4th, 2026'],
    upcomingPayments: [
      { name: 'Spotify Premium', amount: '$12.00', when: 'TODAY', logo: 'logo_spotify' },
      { name: 'Planet Fitness', amount: '$15.00', when: 'IN 5 DAYS', logo: 'logo_planetfitness' },
      { name: 'Apple ICloud', amount: '$0.99', when: 'IN 8 DAYS', logo: 'logo_apple' },
    ],
    creditScore: { range: '300-579', label: 'Poor' },
    recentTransactions: ethanRecent,
    transactionGroups: [
      { title: 'Recent Transactions', items: ethanRecent },
      {
        title: 'October 1 2026',
        items: [
          { merchant: 'Best Buy', date: 'October 1, 2026', amount: -24.5, logo: 'logo_bestbuy' },
          { merchant: 'Master Wok', date: 'October 1, 2026', amount: -17.1, logo: 'logo_masterwok' },
        ],
      },
      {
        title: 'September 29 2026',
        items: [
          { merchant: 'H&M', date: 'September 29, 2026', amount: -34.5, logo: 'logo_hm' },
          { merchant: 'Target', date: 'September 29, 2026', amount: -15.1, logo: 'logo_target' },
          { merchant: 'Chick-fil-A', date: 'September 29, 2026', amount: -10.13, logo: 'logo_chickfila' },
        ],
      },
    ],
  },
};

export function formatAmount(n: number) {
  const sign = n < 0 ? '-' : '+';
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}
