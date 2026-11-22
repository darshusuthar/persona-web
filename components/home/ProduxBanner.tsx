// The Produx website's hero, rebuilt in code (was a screenshot) so the headline can change.
// Everything is sized in container units, so it scales like an image at any width.
// Decorative only: the buttons and menu are part of the picture, not links.

export default function ProduxBanner() {
  return (
    <div className="pxb" role="img" aria-label="Produx Design Studio website: Mid-Stage Product Design Partner">
      <div className="pxb-top" aria-hidden="true">
        <div className="pxb-logo">
          <svg className="pxb-star" viewBox="0 0 24 24">
            <path d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5Z" />
          </svg>
          <span className="pxb-wm">
            <b>PRODUX</b>
            <span>Design Studio</span>
          </span>
        </div>
        <nav className="pxb-nav">
          <span className="on">Home</span>
          <span>Services</span>
          <span>Work</span>
          <span>Thoughts</span>
          <span>About Us</span>
          <span>Lets Connect</span>
        </nav>
      </div>
      <div className="pxb-hero" aria-hidden="true">
        <div className="pxb-l1">Mid-Stage Product</div>
        <div className="pxb-l2">Design Partner</div>
        <div className="pxb-cta">
          <span className="pxb-btn pri">Our Work</span>
          <span className="pxb-btn">
            Quick Call
            <svg viewBox="0 0 24 24" className="pxb-meet">
              <rect x="2" y="6" width="13" height="12" rx="2" fill="#4285f4" />
              <rect x="2" y="6" width="6.5" height="6" rx="1.5" fill="#ea4335" />
              <rect x="8.5" y="12" width="6.5" height="6" rx="1.5" fill="#34a853" />
              <rect x="8.5" y="6" width="6.5" height="6" rx="1.5" fill="#fbbc04" />
              <path d="M15 10.5 21 7v10l-6-3.5Z" fill="#34a853" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
