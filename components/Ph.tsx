// A visible placeholder for a fact only Darshan can fill in (numbers, names, captions).
// Shown highlighted so it is easy to spot while reviewing the feedback version.
export default function Ph({ children }: { children: React.ReactNode }) {
  return (
    <mark className="ph" title="Placeholder: replace with the real detail">
      {children}
    </mark>
  );
}
