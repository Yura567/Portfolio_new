'use client';

import { useEffect, useRef } from 'react';

export default function Ticker() {
  const root = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!root.current || !a.current || !b.current) return;
      const t = root.current.getBoundingClientRect().top;
      a.current.style.transform = `translateX(${t * 0.6 - 200}px)`;
      b.current.style.transform = `translateX(${-t * 0.6 - 600}px)`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="ticker" aria-hidden="true" ref={root}>
      <div className="row" ref={a}><span>FINTECH × iGAMING × FULL STACK × PAYMENTS × LIVE BETTING × FINTECH × iGAMING × FULL STACK × PAYMENTS × LIVE BETTING ×</span></div>
      <div className="row alt" ref={b}><span>REACT · TYPESCRIPT · NODE.JS · PYTHON · POSTGRESQL · REDIS · AWS · WEBSOCKETS · REACT · TYPESCRIPT · NODE.JS · PYTHON · POSTGRESQL · REDIS · AWS ·</span></div>
    </div>
  );
}
