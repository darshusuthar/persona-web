import ProduxBanner from './ProduxBanner';

// Feedback: Produx was undersold. How we worked, and the team and what it took on,
// shown as two balanced columns split by a hairline.

const POINTS = [
  {
    t: 'An embedded team, not an agency',
    d: 'Weekly reviews with founders and shared sprints with their engineers, so design never waited in a separate queue and stayed a step ahead of the build.',
  },
  {
    t: '8 designers, 17 clients, 6 sectors',
    d: 'I hired the team and grew each designer through reviews and growth plans. Together we took on 17 clients in about five years, and many kept coming back.',
  },
];

export default function ProduxSection({ testimonials }: { testimonials?: React.ReactNode }) {
  return (
    <section className="px" id="produx" data-nav="light">
      <div className="wrap">
        <h2 className="px-h2 px-title">Ran a design studio for 5 years.</h2>
        <p className="px-sub">
          Founded Produx for mid-stage startups, grew a team of 8 designers and owned every client relationship,
          keeping design a step ahead of engineering and clients coming back.
        </p>

        <figure className="px-photo">
          <ProduxBanner />
        </figure>

        <div className="px-points">
          {POINTS.map((p, i) => (
            <div className="px-pt" key={i}>
              <b className="px-t">{p.t}</b>
              <p>{p.d}</p>
            </div>
          ))}
        </div>

        {testimonials}

      </div>
    </section>
  );
}
