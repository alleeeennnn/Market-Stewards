/**
 * About page narrative content: mission, vision, values, story and team.
 * The mission and vision strings are the approved brand copy and are
 * imported elsewhere rather than duplicated.
 */

import { BRAND } from './site'

export const STORY = {
  eyebrow: 'Our story',
  title: 'Built because the honest path was the hard one.',
  paragraphs: [
    'Market Stewards began with an uncomfortable observation. The trading education available to Filipinos was loud, urgent, and mostly dishonest. It sold certainty. It showed screenshots of extraordinary returns and called the difference skill. It rarely mentioned position sizing, and almost never mentioned that most people lose money doing this well.',
    'We wanted to build the opposite: a community where the teaching is patient, the numbers are honest, and the first topic is not how to make money but how not to lose what you have. That sounds less exciting. It is also the only version of this worth building.',
    'The name is the point. A steward is someone trusted with what belongs to another. We treat members’ capital, time, and attention that way — carefully, transparently, and in a way we would want our own money handled.',
  ],
}

export const VALUES = [
  {
    key: 'integrity',
    title: 'Integrity',
    body: 'Trading should be approached responsibly and honestly.',
    detail:
      'We publish the losses alongside the wins. We do not edit a journal entry to look better. If a lesson is wrong, it gets corrected in public rather than quietly removed.',
    icon: 'shield-check',
  },
  {
    key: 'stewardship',
    title: 'Stewardship',
    body: 'Financial resources should be managed wisely and responsibly.',
    detail:
      'Resources are received, not owned. We teach allocation, generosity, and long-term thinking alongside markets — because a portfolio is one part of a financial life, not the whole of it.',
    icon: 'hand-coins',
  },
  {
    key: 'discipline',
    title: 'Discipline',
    body: 'Successful learning requires consistency and patience.',
    detail:
      'Progress here is measured in months, not sessions. The members who improve are the ones who show up on the unremarkable weeks as well as the exciting ones.',
    icon: 'compass',
  },
  {
    key: 'purpose',
    title: 'Purpose',
    body: 'Trading should serve a meaningful financial purpose rather than simply chasing profit.',
    detail:
      'Every member is encouraged to write down what the money is for before deciding how aggressively to pursue it. Purpose sets the risk budget, not the other way around.',
    icon: 'target',
  },
]

export const MILESTONES = [
  { year: '2023', title: 'A study group of nine', body: 'It began as a small weekly call for traders in Makati who wanted someone to check their position sizes.' },
  { year: '2024', title: 'The curriculum is written', body: 'Ninety lessons, reviewed by three mentors, published openly with no paywall on the fundamentals.' },
  { year: '2025', title: 'Beyond Metro Manila', body: 'Cebu and Davao circles formed. The journal became the tool members use most often.' },
  { year: '2026', title: '411 stewards', body: 'Still no paid signals, still no guaranteed-return language anywhere in our material.' },
]

/**
 * The founder. The placeholder team has been replaced with the real
 * founder — photo loads from /founder(1).jpg with an initials fallback.
 */
export const TEAM = [
  {
    id: 'founder',
    name: 'Roberto Morallos',
    role: 'Founder, Market Stewards Trading Community',
    initials: 'RM',
    photo: '/founder(1).jpg',
    bio: 'Professional Forex Trader specializing in structured, risk-managed strategies, and Financial Advisor focused on investment guidance and risk management. Relationship Manager at Dupoin, a global CFD broker, with 2 years of experience working with a global CFD brokerage firm. Experienced in copy trading systems and trader development programs, and an advocate of capital preservation, discipline, and probability-based execution.',
  },
]

/** Credential bullets shown under the founder spotlight, in his own words. */
export const FOUNDER_CREDENTIALS = [
  'Founder of Market Stewards Trading Community',
  'Professional Forex Trader specializing in structured, risk-managed strategies',
  'Financial Advisor focused on investment guidance and risk management',
  'Relationship Manager at Dupoin, a global CFD broker',
  '2 years experience working with a global CFD brokerage firm',
  'Experienced in copy trading systems and trader development programs',
  'Advocate of capital preservation, discipline, and probability-based execution',
]

export const PRINCIPLES = [
  'We never publish a profit target.',
  'We never sell a trading signal.',
  'We teach risk management before entry signals.',
  'We publish the losing trades too.',
  'We say when we do not know something.',
]

export const MISSION_STATEMENT = BRAND.mission
export const VISION_STATEMENT = BRAND.vision
