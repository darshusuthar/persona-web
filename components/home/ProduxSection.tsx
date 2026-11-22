import ProduxBanner from './ProduxBanner';

// Feedback: Produx was undersold. How we worked, the team, how it grew,
// shown as three columns split by hairlines.

const POINTS = [
  {
    t: 'Worked as an embedded design team',
    d: 'Weekly reviews with founders and shared sprints with their engineers, so design never sat in a separate queue.',
  },
  {
    t: 'Hired and grew 8 designers',
    d: 'I hired and grew the team, and ran their reviews and growth plans.',
  },
  {
    t: 'Grew to 17 clients',
    d: 'Across 6 sectors in about 5 years.',
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
