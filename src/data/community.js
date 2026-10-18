/**
 * Community feed sample content and the rules that govern it.
 *
 * Post ids are stable so a future API can replace this module without
 * changing any component contract.
 */

export const POST_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'discussion', label: 'Discussions' },
  { id: 'education', label: 'Education' },
  { id: 'insight', label: 'Market Insights' },
  { id: 'question', label: 'Questions' },
  { id: 'journal', label: 'Journals' },
  { id: 'announcement', label: 'Announcements' },
]

export const GUIDELINES = [
  {
    title: 'Respect',
    body: 'Treat every member as a person first. Disagree with the idea, never the person.',
  },
  {
    title: 'Integrity',
    body: 'Post your real results, including the losses. Never share a screenshot you cannot substantiate.',
  },
  {
    title: 'Responsible trading',
    body: 'Only trade capital you can afford to lose. If it is borrowed or needed, it is not trading capital.',
  },
  {
    title: 'Education over hype',
    body: 'Share the reasoning and the process. A claim without a reason is not a contribution.',
  },
  {
    title: 'No guaranteed profits',
    body: 'Promising returns, showing “easy money”, or selling a signal as certain is not allowed here.',
  },
  {
    title: 'No financial manipulation',
    body: 'No pumping, no coordinated calls, no selling DMs or paid groups in the feed.',
  },
]

export const FEED_FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'discussion', label: 'Discussions' },
  { id: 'education', label: 'Education' },
  { id: 'question', label: 'Questions' },
  { id: 'journal', label: 'Journals' },
]

const MEMBERS = {
  marco: { name: 'Marco Villanueva', handle: '@marco_v', initials: 'MV', tone: 0, role: 'Steward member' },
  grace: { name: 'Grace Lim', handle: '@gracelim', initials: 'GL', tone: 1, role: 'Steward mentor' },
  daniel: { name: 'Daniel Santiago', handle: '@dspng', initials: 'DS', tone: 2, role: 'Steward member' },
  clara: { name: 'Clara Mendoza', handle: '@claram', initials: 'CM', tone: 3, role: 'Mentor' },
  rafael: { name: 'Rafael Aquino', handle: '@rafa_aquino', initials: 'RA', tone: 1, role: 'Steward member' },
  joshua: { name: 'Joshua Dela Cruz', handle: '@jdelacruz', initials: 'JD', tone: 0, role: 'New member' },
}

export const POSTS = [
  {
    id: 'post-1',
    category: 'journal',
    author: MEMBERS.marco,
    timestamp: '2026-09-29T08:15:00+08:00',
    title: 'Week 12 journal review: I finally stopped scaling into losers',
    body: 'Three weeks of writing down my emotional state changed more than six months of charts. The pattern was obvious once I could see it: every time I added to a losing position, I had skipped my pre-trade checklist that morning. This week I took four trades, all planned, three of them losers, and I am at peace with it.',
    likes: 142,
    saves: 46,
    pinned: false,
    tags: ['Journaling', 'Discipline'],
  },
  {
    id: 'post-2',
    category: 'education',
    author: MEMBERS.clara,
    timestamp: '2026-09-29T07:02:00+08:00',
    title: 'Why “50% win rate at 2:1” still loses money after fees',
    body: 'A short lesson in expectancy. Two wins for every one loss sounds unbeatable until you account for slippage, spread widening, and the days where your stop gets skipped. Write out your expectancy with realistic costs before you decide your edge is real. I have put the worked example in the Risk/Reward lesson.',
    likes: 318,
    saves: 121,
    pinned: true,
    tags: ['Risk', 'Education'],
  },
  {
    id: 'post-3',
    category: 'question',
    author: MEMBERS.joshua,
    timestamp: '2026-09-28T22:47:00+08:00',
    title: 'How much of my capital should I actually risk per trade while learning?',
    body: 'I am about four months in, still on a demo account, and I keep seeing conflicting advice. Some say 1%, some say 2%, one post said risk everything on a high-conviction setup. What is a defensible starting point, and how do I know if I am ready to move up?',
    likes: 64,
    saves: 12,
    pinned: false,
    tags: ['Risk', 'Beginners'],
  },
  {
    id: 'post-4',
    category: 'insight',
    author: MEMBERS.grace,
    timestamp: '2026-09-28T19:30:00+08:00',
    title: 'Reading the Philippine peso rate as a driver for local equities',
    body: 'Not a trade idea — a study note. A weakening peso tends to pressure exporters and support consumer-facing names, but the effect is noisy at daily resolution. I ran it over eight years and the correlation weakens considerably after controlling for global risk appetite. Posting the method so someone can check my work.',
    likes: 205,
    saves: 88,
    pinned: false,
    tags: ['Macro', 'Philippines'],
  },
  {
    id: 'post-5',
    category: 'discussion',
    author: MEMBERS.rafael,
    timestamp: '2026-09-28T16:12:00+08:00',
    title: 'Is anyone else trading the London open, or is it mostly a Manila-hours problem?',
    body: 'Our timezone makes the session overlap awkward and I suspect I am forcing setups rather than waiting for them. Considering moving to a daily or 4-hour structure entirely. Curious what the rest of the community is actually trading and why.',
    likes: 87,
    saves: 9,
    pinned: false,
    tags: ['Timeframes', 'Discussion'],
  },
  {
    id: 'post-6',
    category: 'announcement',
    author: MEMBERS.daniel,
    timestamp: '2026-09-28T11:00:00+08:00',
    title: 'October mentorship cohort opens Monday',
    body: 'Eight seats for the next Steward mentorship cohort. The focus this round is building a written trading plan and surviving the first ninety days of live size. Applications close Sunday evening. As always, this is paid mentorship and we make no claim about results — the cohort is about process.',
    likes: 156,
    saves: 34,
    pinned: true,
    tags: ['Announcement', 'Mentorship'],
  },
  {
    id: 'post-7',
    category: 'education',
    author: MEMBERS.clara,
    timestamp: '2026-09-27T14:20:00+08:00',
    title: 'The pre-trade checklist I use before every entry',
    body: 'Eight questions. If I cannot answer all of them in writing, there is no trade. It has cut my trade count by about sixty percent and my drawdown by considerably more. Sharing the full list rather than a summary — the value is in the specificity.',
    likes: 271,
    saves: 143,
    pinned: false,
    tags: ['Process', 'Checklist'],
  },
  {
    id: 'post-8',
    category: 'journal',
    author: MEMBERS.rafael,
    timestamp: '2026-09-27T09:05:00+08:00',
    title: 'Down 6% this quarter and it is the healthiest I have felt trading',
    body: 'Context: I am risking 0.5% per trade and the drawdown is inside my planned tolerance. A year ago I would have tripled size to “make it back” inside a week. The equity curve is flatter but the account is intact and I am still here, which was the entire point of sizing down in the first place.',
    likes: 194,
    saves: 67,
    pinned: false,
    tags: ['Journal', 'Drawdown'],
  },
]

/** Filter chips for the feed, derived from POST_CATEGORIES. */
export const getPostsByCategory = (categoryId) =>
  categoryId === 'all' ? POSTS : POSTS.filter((post) => post.category === categoryId)

/** Relative timestamp label, computed against a supplied reference date. */
export function timeAgo(isoString, now = Date.now()) {
  const then = new Date(isoString).getTime()
  if (!Number.isFinite(then)) return ''
  const seconds = Math.max(0, Math.floor((now - then) / 1000))
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(isoString).toLocaleDateString('en-PH', { day: 'numeric', month: 'short' })
}

export const COMMUNITY_STATS = [
  { value: '411', label: 'Steward members', hint: 'Across the Philippines' },
  { value: '120', label: 'Lessons published', hint: 'Reviewed by mentors' },
  { value: '36', label: 'Monthly sessions', hint: 'Workshops and reviews' },
  { value: '0', label: 'Paid signals', hint: 'We do not sell them' },
]

/**
 * How a new member actually gets involved. There is no signup form — the
 * path runs through the community itself, so these steps replace one.
 */
export const JOIN_STEPS = [
  {
    id: 'join-1',
    step: '01',
    title: 'Introduce yourself',
    body: 'Post a short introduction in the feed. Say where you are, how long you have been trading, and what you are currently trying to fix. A specific question gets a better response than a general one.',
    detail: 'Most first posts get five or six replies within a day.',
  },
  {
    id: 'join-2',
    step: '02',
    title: 'Join a review circle',
    body: 'Circles meet online and in Metro Manila, Visayas, and Davao. Twelve people, three hours, each member presents one journal entry and receives structured feedback.',
    detail: 'Every circle has a mentor in the room. New members are paired with a steward who has been through it.',
  },
  {
    id: 'join-3',
    step: '03',
    title: 'Come to a session',
    body: 'Workshops and webinars run weekly and are recorded. Start with a position sizing workshop — the one most members say they should have attended first.',
    detail: 'Everything is recorded, so attending live is a choice rather than a requirement.',
  },
]

/** What the community asks of people who join. */
export const EXPECTATIONS = [
  {
    title: 'Be honest',
    body: 'Show the losing trades, not only the winning ones. A journal with no losses in it is not a journal.',
    icon: 'shield-check',
  },
  {
    title: 'Explain yourself',
    body: 'Write the reasoning before you post the conclusion. A claim without a reason is not a contribution.',
    icon: 'message-square-plus',
  },
  {
    title: 'Be patient',
    body: 'Treat a beginner’s question as a good question. Most people here were beginners within the last year.',
    icon: 'users',
  },
  {
    title: 'Admit uncertainty',
    body: 'Say when you do not know something. Confidence comes from what can be checked, not from what is claimed.',
    icon: 'info',
  },
  {
    title: 'Protect your capital',
    body: 'Risk only what you can afford to lose, and never what is needed. That is the first rule of the curriculum and the first rule here.',
    icon: 'shield-check',
  },
]

/**
 * Real member testimonials, taken from written answers members gave to a
 * five-question interview (before joining / how they found MS / experience /
 * transformation / message). Their voice is deliberate: keep the Taglish, it
 * is how they actually speak. Quotes are trimmed from the full answers.
 */
export const TESTIMONIALS = [
  {
    id: 't-kiel',
    name: 'Kiel Labarrete',
    initials: 'KL',
    tone: 0,
    role: "Joined so she'd have time for her baby",
    quote:
      'Dati basta maisipan, trade lang ng trade kasi iniisip ko may pang-deposit naman. Pero ngayon, kaya na naming maghintay. Kapag loss, stop na agad. Ang laki ng pinagbago sa discipline, hindi lang sa akin kundi sa partner ko rin.',
  },
  {
    id: 't-joshua',
    name: 'Joshua Eguiron',
    initials: 'JE',
    tone: 1,
    role: "Found MS through Miss Angela's posts",
    quote:
      'Akala ko trading is just another form of gambling. Pero sa unang masterclass, shocked ako sa magandang paraan. Emotions, psychology, discipline, patience ang tinuro, hindi deposit. Mas cared sila sa survival mo dito, hindi lang sa profits.',
  },
  {
    id: 't-kenneth',
    name: 'Kenneth Dayapyap',
    initials: 'KD',
    tone: 2,
    role: 'Came from signal-heavy groups',
    quote:
      'Dati puro numbers lang: buy sa ganito, TP sa ganyan. Dito ko na-realize ang konti pa pala ng nalalaman ko about Forex. Dito pumapasok ’yung confirmation guidelines bago mag-enter sa trade.',
  },
  {
    id: 't-alexis',
    name: 'Alexis Marcelo',
    initials: 'AM',
    tone: 3,
    role: 'Took one-on-one coaching with Coach Brix',
    quote:
      'Don’t chase the market. Kapag hindi ka comfortable sa trade, huwag. Don’t be FOMO. Mas okay pa ring gastusin sa learnings kaysa sa trading na walang kaalaman.',
  },
  {
    id: 't-angela',
    name: 'Angela Dichoso',
    initials: 'AD',
    tone: 1,
    role: 'Met the founder, Sir Robert, at a gathering',
    quote:
      'Hindi lang puro trading ang tinuturo. Self-discipline, goal-setting, at tamang mindset. Lessons na magagamit mo kahit sa labas ng market. For me, Market Stewards is more than a community. It’s a family.',
  },
]
