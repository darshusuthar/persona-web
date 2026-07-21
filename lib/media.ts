// Base URL for the public Supabase Storage "media" bucket.
export const MEDIA_BASE =
  'https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/';

// Build a full Storage URL from a path inside the bucket, e.g. img('media/hero-1.jpg')
export const img = (path: string) => MEDIA_BASE + path;
