import { rails } from '@/lib/data';

export default function Payouts() {
  return (
    <section className="block" id="payouts">
      <div className="wrap pay">
        <div className="reveal">
          <div className="eyebrow">Payouts</div>
          <h2>Hire from<br />anywhere</h2>
          <p>Full-time, contract or B2B. Yura gets paid through whatever rail your finance team already uses, in fiat or crypto.</p>
          <div className="terms">
            <span className="tag fin">FULL-TIME</span><span className="tag fin">CONTRACT</span>
            <span className="tag gam">B2B INVOICE</span><span className="tag gam">ANY TIMEZONE</span>
          </div>
        </div>
        <div className="rails">
          {rails.map((r) => (
            <div className="rail reveal" key={r.name}><b>{r.name}</b><span>{r.note}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
