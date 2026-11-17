import { IconName } from '../components/Icon';
import { ImageKey } from '../images';
import articlesJson from './articles.json';
import glossaryJson from './glossary.json';
import quizzesJson from './quizzes.json';

// ---------- Budget (Figma "Budget", 4003:2443) ----------
export type BudgetLine = { label: string; amount: number };
export type BudgetGroup = { title: string; lines: BudgetLine[] };

export const paycheck = { employer: 'Boston Medical Center', amount: 1130.6 };

export const budgetGroups: BudgetGroup[] = [
  {
    title: 'Needs',
    lines: [
      { label: 'Rent Contribution', amount: 200 },
      { label: 'Groceries', amount: 150 },
      { label: 'Household Necessities', amount: 75.8 },
      { label: 'Transportation', amount: 75 },
      { label: 'Phone Bill', amount: 65 },
    ],
  },
  {
    title: 'Savings',
    lines: [
      { label: 'General Savings', amount: 125 },
      { label: 'Emergency fund', amount: 114.18 },
      { label: 'Credit card debt', amount: 100 },
    ],
  },
  {
    title: 'Wants',
    lines: [
      { label: 'Restaurants', amount: 45 },
      { label: 'Shopping', amount: 45 },
      { label: 'Ride Sharing', amount: 35 },
      { label: 'Drinks', amount: 35 },
      { label: 'Entertainment', amount: 30 },
      { label: 'Subscriptions', amount: 21.12 },
      { label: 'Gym Membership', amount: 15 },
    ],
  },
];

// ---------- Spendings (Figma "Spendings", 114:1810) ----------
export type SpendingCategory = { title: string; total: string; icon: IconName; items: { name: string; amount: string }[] };

export const spendingCategories: SpendingCategory[] = [
  {
    title: 'Entertainment',
    total: '$150',
    icon: 'celebration',
    items: [
      { name: 'Bowling', amount: '$13.50' },
      { name: 'AMC Movie Ticket', amount: '$18.50' },
      { name: 'GameStop', amount: '$27.99' },
      { name: 'Concert Ticket', amount: '$65.00' },
      { name: 'Arcade Game', amount: '$25.01' },
    ],
  },
  {
    title: 'Groceries',
    total: '$100',
    icon: 'grocery',
    items: [
      { name: 'Trader Joe’s', amount: '$42.50' },
      { name: 'Stop & Shop', amount: '$32.75' },
      { name: 'Market Basket', amount: '$24.75' },
    ],
  },
  {
    title: 'Restaurants',
    total: '$80',
    icon: 'dineIn',
    items: [
      { name: 'Chipotle', amount: '$14.50' },
      { name: 'McDonald’s', amount: '$9.25' },
      { name: 'Olive Garden', amount: '$32.75' },
      { name: 'Chick-Fil-A', amount: '$12.50' },
      { name: 'Starbucks', amount: '$11.00' },
    ],
  },
  {
    title: 'Shopping',
    total: '$60',
    icon: 'checkroom',
    items: [
      { name: 'Zara', amount: '$35.00' },
      { name: 'H&M', amount: '$25.00' },
    ],
  },
  {
    title: 'Drinks',
    total: '$60',
    icon: 'localBar',
    items: [
      { name: 'OFFSUIT Bar', amount: '$32.00' },
      { name: 'Parla Bar', amount: '$16.00' },
      { name: 'Bleacher Bar', amount: '$12.00' },
    ],
  },
  {
    title: 'Subscription Services',
    total: '$30',
    icon: 'desktop',
    items: [
      { name: 'Spotify Premium', amount: '$12.00' },
      { name: 'Apple One Individual', amount: '$19.95' },
      { name: 'ICloud+ 50 GB', amount: '$0.99' },
    ],
  },
  {
    title: 'Ride Shares',
    total: '$30',
    icon: 'taxi',
    items: [
      { name: 'Uber', amount: '$18.50' },
      { name: 'Lyft', amount: '$11.50' },
    ],
  },
  {
    title: 'Gym Membership',
    total: '$15',
    icon: 'celebration',
    items: [{ name: 'Planet Fitness', amount: '$15.00' }],
  },
];

// ---------- Advice (Figma "Advice", 143:4367) ----------
export const adviceIntro =
  'It seems you have been spending a little more than usual lately, so here’s some advice to help you manage your emotions without having to spend a single cent.';

export const adviceCards: { text: string; image: ImageKey }[] = [
  { text: 'Take a walk at your local park. It helps calm your anxiety.', image: 'advice_walk' },
  { text: 'Make a painting. Paint what’s around you. There are so many options!', image: 'advice_paint' },
  { text: 'Cook your favorite recipe. There’s no need to eat out when you can make it yourself.', image: 'advice_cook' },
  { text: 'Read a book. Transport yourself in a make believe world to help you relax and distract yourself.', image: 'advice_read' },
  { text: 'Write in a journal about how you’re feeling. Write it like it’s your own diary.', image: 'advice_journal' },
  { text: 'Take a nap. It helps you regain your energy and motivation.', image: 'advice_nap' },
];

// ---------- Learn (Figma "Article (Lets learn)", 2139:2048) ----------
export type ArticleBlock =
  | { type: 'h'; size: number; text: string }
  | { type: 'p'; segments: { t: string; b: boolean }[] };
export type Article = { id: string; title: string; author: string; image: ImageKey; quiz: number; blocks: ArticleBlock[] };

export const articles = articlesJson as unknown as Record<string, Article>;

export type ArticleCard = { articleId: string; title: string; author: string; image: ImageKey };

export const featuredArticle: ArticleCard = {
  articleId: 'beginner',
  title: 'A Beginner’s Guide To Personal Finance',
  author: 'By Rafael Faus',
  image: 'card_beginner',
};

export const articleSections: { title: string; cards: [ArticleCard, ArticleCard] }[] = [
  {
    title: 'Articles for Beginners',
    cards: [
      { articleId: 'teaching_kids', title: 'Teaching Kids\nAbout Money', author: 'By Jackie Hamann', image: 'card_teaching_kids' },
      { articleId: 'college', title: '5 Ways Students Can Save Money In College', author: 'By Kathryn Knight Randolph', image: 'card_college' },
    ],
  },
  {
    title: 'Articles about Banking',
    cards: [
      { articleId: 'teen_saving', title: 'Saving money as\na teenager', author: 'By Chase Bank', image: 'card_teen_saving' },
      { articleId: 'banking', title: 'Banking Basics For Teens', author: 'By Peshtigo National Bank', image: 'card_banking' },
    ],
  },
  {
    title: 'Articles about 401(K)’s',
    cards: [
      { articleId: 'k401', title: 'What is a 401(k) plan and how does it work?', author: 'By Hayden Adams', image: 'card_401k' },
      { articleId: 'retirement', title: 'How to Start Saving for Retirement in Your Teens and 20s', author: 'By Slavic401K', image: 'card_retirement' },
    ],
  },
];

export type GlossaryRange = { range: string; sections: { letter: string; terms: { term: string; definition: string }[] }[] };
export const glossary = glossaryJson as GlossaryRange[];

export type QuizQuestion = { question: string; options: string[]; answer: number[] };
export const quizzes = quizzesJson as QuizQuestion[][];
