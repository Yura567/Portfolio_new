'use client';

import type { PointerEvent } from 'react';
import { projects } from '@/lib/data';

function tilt(e: PointerEvent<HTMLAnchorElement>) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = e.currentTarget, r = c.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  c.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
}

export default function Projects() {
  return (
    <section className="block" id="projects">
      <div className="wrap">
        <div className="head reveal">
          <div><div className="eyebrow">Selected projects</div><h2>Shipped to<br />real players</h2></div>
          <p>Banking, finance apps, casinos and the marketing engines behind them. Tap a card to open the live product.</p>
        </div>
        <div className="grid">
          {projects.map((p) => (
            <a key={p.name} className={`proj ${p.domain} reveal`} href={p.href} target="_blank" rel="noopener noreferrer"
              onPointerMove={tilt} onPointerLeave={(e) => { e.currentTarget.style.transform = ''; }}>
              <span className="k">{p.kind}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <span className="go">{p.link}<span>↗</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
