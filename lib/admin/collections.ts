export type FieldType =
  | 'text'
  | 'textarea'
  | 'markdown'
  | 'number'
  | 'image'
  | 'select'
  | 'datetime'
  | 'url';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  group?: 'main' | 'seo';
}

export interface Collection {
  key: string; // url segment, e.g. "thoughts"
  table: string;
  label: string; // plural label
  singular: string;
  pk: string; // primary key column
  listColumns: string[];
  titleField: string;
  fields: Field[];
}

const STATUS: Field = {
  name: 'status',
  label: 'Status',
  type: 'select',
  options: ['draft', 'published'],
};

const SEO: Field[] = [
  { name: 'seo_title', label: 'SEO title', type: 'text', group: 'seo' },
  { name: 'seo_description', label: 'SEO description', type: 'textarea', group: 'seo' },
  { name: 'seo_og_image', label: 'Social share image', type: 'image', group: 'seo' },
  { name: 'canonical_url', label: 'Canonical URL', type: 'url', group: 'seo' },
];

export const COLLECTIONS: Collection[] = [
  {
    key: 'thoughts',
    table: 'thoughts',
    label: 'Thoughts',
    singular: 'Thought',
    pk: 'id',
    titleField: 'title',
    listColumns: ['title', 'category', 'status', 'sort_order'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (url)', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Body (markdown)', type: 'markdown' },
      { name: 'cover_url', label: 'Cover image', type: 'image' },
      { name: 'read_minutes', label: 'Read minutes', type: 'number' },
      STATUS,
      { name: 'sort_order', label: 'Sort order', type: 'number' },
      { name: 'published_at', label: 'Published at', type: 'datetime' },
      ...SEO,
    ],
  },
  {
    key: 'case-studies',
    table: 'case_studies',
    label: 'Case studies',
    singular: 'Case study',
    pk: 'id',
    titleField: 'title',
    listColumns: ['title', 'status', 'sort_order'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (url)', type: 'text' },
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'lead', label: 'Lead / intro', type: 'textarea' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'year', label: 'Year', type: 'text' },
      { name: 'tools', label: 'Tools', type: 'text' },
      { name: 'cover_url', label: 'Cover image', type: 'image' },
      { name: 'body', label: 'Body (markdown)', type: 'markdown' },
      STATUS,
      { name: 'sort_order', label: 'Sort order', type: 'number' },
      { name: 'published_at', label: 'Published at', type: 'datetime' },
      ...SEO,
    ],
  },
  {
    key: 'podcast',
    table: 'podcast_episodes',
    label: 'Podcast episodes',
    singular: 'Episode',
    pk: 'id',
    titleField: 'headline',
    listColumns: ['guest_name', 'company', 'status', 'sort_order'],
    fields: [
      { name: 'guest_name', label: 'Guest name', type: 'text' },
      { name: 'guest_title', label: 'Guest title', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'headline', label: 'Card headline / quote', type: 'text' },
      { name: 'thumb_url', label: 'Thumbnail', type: 'image' },
      { name: 'youtube_url', label: 'YouTube URL', type: 'url' },
      { name: 'spotify_url', label: 'Spotify URL', type: 'url' },
      { name: 'apple_url', label: 'Apple URL', type: 'url' },
      { name: 'slug', label: 'Slug (optional)', type: 'text' },
      STATUS,
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  {
    key: 'hero-stats',
    table: 'hero_stats',
    label: 'Hero stats',
    singular: 'Stat',
    pk: 'id',
    titleField: 'label',
    listColumns: ['value', 'label', 'sort_order'],
    fields: [
      { name: 'value', label: 'Value (e.g. 1,000)', type: 'text' },
      { name: 'suffix', label: 'Suffix (e.g. +)', type: 'text' },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  {
    key: 'about-chapters',
    table: 'about_chapters',
    label: 'About chapters',
    singular: 'Chapter',
    pk: 'id',
    titleField: 'title',
    listColumns: ['idx', 'era', 'sort_order'],
    fields: [
      { name: 'idx', label: 'Number (e.g. 01)', type: 'text' },
      { name: 'era', label: 'Era label', type: 'text' },
      { name: 'title', label: 'Chapter title', type: 'text' },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  {
    key: 'testimonials',
    table: 'testimonials',
    label: 'Testimonials',
    singular: 'Testimonial',
    pk: 'id',
    titleField: 'person_name',
    listColumns: ['person_name', 'company', 'sort_order'],
    fields: [
      { name: 'person_name', label: 'Person name', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'avatar_url', label: 'Avatar image', type: 'image' },
      { name: 'video_url', label: 'Video URL', type: 'url' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  {
    key: 'pages',
    table: 'pages',
    label: 'Pages',
    singular: 'Page',
    pk: 'id',
    titleField: 'title',
    listColumns: ['title', 'template', 'status', 'sort_order'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (url)', type: 'text' },
      {
        name: 'template',
        label: 'Template',
        type: 'select',
        options: ['standard', 'landing', 'fullwidth'],
      },
      { name: 'hero_image_url', label: 'Hero image', type: 'image' },
      { name: 'body', label: 'Body (markdown)', type: 'markdown' },
      STATUS,
      { name: 'sort_order', label: 'Sort order', type: 'number' },
      { name: 'published_at', label: 'Published at', type: 'datetime' },
      ...SEO,
    ],
  },
  {
    key: 'settings',
    table: 'site_settings',
    label: 'Site settings',
    singular: 'Setting',
    pk: 'key',
    titleField: 'key',
    listColumns: ['key', 'value'],
    fields: [
      { name: 'key', label: 'Key', type: 'text' },
      { name: 'value', label: 'Value', type: 'textarea' },
    ],
  },
];

export function getCollection(key: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}
