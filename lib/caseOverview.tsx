import Ph from '@/components/Ph';

// Feedback version: the fixed facts shown up front on every case study, in the same
// order, plus what the home-page card says. Kept in code for the side-by-side review;
// once approved these move into the CMS (one SQL update).
// <Ph> marks details only Darshan can fill in.

export type Overview = {
  brand: string; // key in BRANDS
  sector: string;
  company: string;
  when: React.ReactNode; // month and year the project shipped
  shot?: { fit: 'contain'; bg?: string; pad: string; multiply?: boolean }; // how the card image is framed (multiply: blend a white background into the grey)
  cover?: string; // card image, when it differs from the case study banner
  card: string; // impact-story title for the home card
  cardImpact: React.ReactNode;
  role: string; // my role: shown on the home card, the case study header and the My role box
  team: React.ReactNode;
  challenge: React.ReactNode;
  impact: React.ReactNode;
  different: React.ReactNode;
  source: React.ReactNode;
  links: { label: string; href?: string }[];
  site: { label: string; href: string }; // the company's public website, linked in the case study header
};

const LINKS = [{ label: 'Figma file' }, { label: 'Prototype' }, { label: 'Deck' }];

export const OVERVIEW: Record<string, Overview> = {
  'gold-sip': {
    brand: 'aspora',
    sector: 'Fintech · Wealth',
    company: 'Aspora',
    when: 'Oct 2026',
    cover: '/images/case-studies/aspora-card.webp',
    shot: { fit: 'contain', bg: '#ffffff', pad: '0' },
    card: 'How one setting turned a one-time gold buy into a habit',
    cardImpact: 'Target: SIP conversion from ~3% to 7%, and 6% of monthly transacting users on a SIP within 3 months',
    role: 'Lead Designer',
    team: 'The wealth pod PM, front-end engineers and the support manager',
    challenge: 'More than half of our gold buyers in the UAE bought exactly once, and almost no one came back.',
    impact:
      'Targets from the PRD: SIP funnel conversion from ~3% to 7%, M+3 retention from 17% to 60%, and 6% of monthly transacting users on a SIP within the first 3 months.',
    different:
      'Instead of copying competitor SIP flows, I designed SIP as an option on the buy page users already knew, modelled on the money transfer they make every month.',
    source: (
      <>
        Data. 54% of our UAE gold buyers bought exactly once, and money started leaving faster than it came in.
      </>
    ),
    site: { label: 'aspora.com', href: 'https://www.aspora.com/' },
    links: LINKS,
  },
  impactcraft: {
    brand: 'impactcraft',
    sector: 'B2B SaaS · Generative AI',
    company: 'ImpactCraft',
    when: 'Apr 2025',
    card: 'Turning AI signals into a priority feed customer success teams act on',
    cardImpact: '74% of critical risks and opportunities now acted on within 24 hours, up from 18%',
    role: 'Lead Designer',
    team: 'Founder, product manager and developers',
    challenge:
      'One dashboard served every role, so customer success managers couldn’t tell which accounts needed them first.',
    impact:
      '74% of critical risk and opportunity signals are now acted on within 24 hours, up from 18%. Measured from real follow-up in each account’s email, Slack, accounting and CRM.',
    different: 'Instead of a better dashboard, I designed a role-relevant priority feed: what to act on today, and why.',
    source:
      'Research and client conversations. It came from the logistics team we supported, who use the product every day: their different levels of users each needed something different from the same screen.',
    site: { label: 'impactcraft.ai', href: 'https://impactcraft.ai/' },
    links: LINKS,
  },
  checkout: {
    brand: 'meesho',
    sector: 'E-commerce',
    company: 'Meesho',
    when: 'Mar 2022',
    shot: { fit: 'contain', bg: '#fddfef', pad: '0' },
    card: 'One cart for many suppliers: how ordering got simpler',
    cardImpact: '11% growth in orders placed per day, 3 months after launch',
    role: 'Product Designer',
    team: 'A cross-functional team and my reporting manager',
    challenge: 'Users could only order from one supplier at a time, so a basket of products meant several separate orders.',
    impact: '11% growth in orders placed per day, 3 months after launch.',
    different:
      'Rethought the cart for many suppliers, designed for every edge case from partly serviceable addresses to returns, and made price differences between Buy Now and Add to Cart clear.',
    source: 'Our user research, and the business goal of growing the number of orders.',
    site: { label: 'meesho.com', href: 'https://www.meesho.com/' },
    links: LINKS,
  },
  builder: {
    brand: 'sensibull',
    sector: 'Fintech · Trading',
    company: 'Sensibull',
    when: 'Mar 2020',
    card: 'Redesigning the one screen every options trader lives in',
    cardImpact: '350% growth in paid users, 6 months after launch',
    role: 'Founding Designer',
    team: 'The founder, the PM and the engineering team',
    challenge: 'The strategy builder is the most important feature of options trading, and it was the hardest to use.',
    impact: '350% growth in paid users, 6 months after launch (along with a few smaller feature revamps).',
    different:
      'Instead of making traders assemble a strategy leg by leg, I turned the mental model they already use, the everyday trading language of bullish, bearish and neutral, into ready-made strategies to pick from. That became the new starting point of the whole builder.',
    source: 'Support tickets. The problem first surfaced in what traders raised with support.',
    site: { label: 'sensibull.com', href: 'https://sensibull.com/' },
    links: LINKS,
  },
};

// Order of the cards on the home page.
export const CARD_ORDER = ['gold-sip', 'impactcraft', 'checkout', 'builder'];

// Copy simplifications applied to the CMS text in this version only.
export const COPY_FIXES: [string, string][] = [
  [
    'Today a repeat purchase needs intent, a session and a decision. After SIP it needs a working card.',
    'Before SIP, every purchase was a fresh decision. With SIP, gold gets bought automatically.',
  ],
];
