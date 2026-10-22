import { jobs, type Domain } from '@/lib/data';

const TAG: Record<Domain, { label: string; className: string }> = {
  fin: { label: 'FINTECH', className: 'tag fin' },
  gam: { label: 'iGAMING', className: 'tag gam' },
  com: { label: 'E-COMMERCE', className: 'tag com' },
};

export default function Experience() {
  return (
    <section className="block" id="work">
      <div className="wrap">
        <div className="head reveal">
          <div><div className="eyebrow">Experience · 2020 to 2026</div><h2>Where money<br />moves fast</h2></div>
          <p>Four companies across payments, personal finance, sports betting and e-commerce. Remote and hybrid, US and EU teams.</p>
        </div>
        <div className="jobs">
          {jobs.map((j) => (
            <article className="job reveal" key={j.company}>
              <div className="when"><b>{j.when}</b>{j.meta}</div>
              <div>
                <h3>{j.company}<small>{j.role}</small></h3>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <span className={TAG[j.domain].className}>{TAG[j.domain].label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
