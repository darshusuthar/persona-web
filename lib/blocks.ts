// Content blocks shared by the admin BlockEditor and the public renderers.
// Thoughts use the basic four (text, image, video, embed). Case studies can
// also use the richer layout blocks below.

export type Tone = '' | 'dropped' | 'partly' | 'kept';

export type GalleryItem = { url: string; caption: string };
export type StatItem = { value: string; label: string; bad: boolean };
export type CardItem = { title: string; body: string };

export type TextBlock = {
  id: string;
  type: 'text';
  markdown: string;
  // Case-study extras (all optional)
  style?: '' | 'intro'; // intro = larger paragraph text
  tag?: string; // small pill above the text, e.g. "Wave 1 · Dropped"
  tone?: Tone; // pill colour
  anchor?: string; // section id, e.g. "problem"
  nav?: string; // label in the floating section nav
  navHideMobile?: boolean;
};
export type ImageBlock = {
  id: string;
  type: 'image';
  url: string;
  caption: string;
  style?: '' | 'board'; // board = wide dark frame (benchmark boards)
};
export type VideoBlock = { id: string; type: 'video'; url: string };
export type EmbedBlock = { id: string; type: 'embed'; url: string; html: string };
export type GalleryBlock = {
  id: string;
  type: 'gallery';
  // tray = wide grey tray, plain = inside the text column, banner = hero banner
  layout: 'tray' | 'plain' | 'banner';
  columns: number; // 1–5
  items: GalleryItem[];
};
export type StatsBlock = { id: string; type: 'stats'; items: StatItem[]; source: string };
export type QuoteBlock = { id: string; type: 'quote'; text: string; note: string };
export type CardsBlock = { id: string; type: 'cards'; items: CardItem[] };
export type DecisionBlock = {
  id: string;
  type: 'decision';
  kicker: string;
  title: string;
  aLabel: string;
  aBody: string;
  bLabel: string;
  bBody: string;
  call: string; // markdown, e.g. "**The call:** Option B."
  markdown: string; // body text under the call
  columns: number; // screens: 1 = single phone, 2+ = wide tray
  items: GalleryItem[];
};

// A user-research callout: what users told us, and what it changed.
export type InsightBlock = {
  id: string;
  type: 'insight';
  label: string; // e.g. "Wave 1 · Reward picker"
  heard: string; // markdown (inline)
  quote: string; // optional, users' own words
  changed: string; // markdown (inline)
};

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | EmbedBlock
  | GalleryBlock
  | StatsBlock
  | QuoteBlock
  | CardsBlock
  | DecisionBlock
  | InsightBlock;

export type BlockType = Block['type'];

export const BASIC_BLOCKS: BlockType[] = ['text', 'image', 'video', 'embed'];
export const CASE_STUDY_BLOCKS: BlockType[] = [
  'text',
  'image',
  'gallery',
  'stats',
  'quote',
  'cards',
  'decision',
  'insight',
  'video',
  'embed',
];
