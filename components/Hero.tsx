'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { stack } from '@/lib/data';

const pips: Record<string, number[]> = {
  front: [4], right: [0, 8], back: [0, 2, 3, 5, 6, 8], left: [0, 2, 6, 8], top: [0, 4, 8], bottom: [0, 2, 4, 6, 8],
};
const faces: { key: string; t: string }[] = [
  { key: 'front', t: 'translateZ(38px)' },
  { key: 'right', t: 'rotateY(90deg) translateZ(38px)' },
  { key: 'back', t: 'rotateY(180deg) translateZ(38px)' },
  { key: 'left', t: 'rotateY(-90deg) translateZ(38px)' },
  { key: 'top', t: 'rotateX(90deg) translateZ(38px)' },
  { key: 'bottom', t: 'rotateX(-90deg) translateZ(38px)' },
];

export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      if (!scene.current || !rig.current) return;
      const r = scene.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      rig.current.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 16}deg)`;
    };
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!hero.current || !scene.current || !text.current) return;
      const yy = Math.max(0, window.scrollY - hero.current.offsetTop);
      const p = Math.min(yy / 700, 1);
      scene.current.style.transform = `translateY(${yy * 0.25}px) scale(${1 - p * 0.18}) rotateX(${p * 18}deg)`;
      scene.current.style.opacity = String(1 - p * 0.7);
      text.current.style.transform = `translateY(${yy * 0.12}px)`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={hero}>
      <div className="bgL" /><div className="bgR" />
      <div className="floor l" /><div className="floor r" />
      <div className="wrap">
        <div ref={text}>
          <span className="badge"><span className="dot" />OPEN TO NEW ROLES</span>
          <h1 className="name"><span className="y">Yura</span><span className="s">Svituha</span></h1>
          <div className="role">Full Stack AI Engineer <span className="tag fin">FINTECH</span><span className="tag gam">iGAMING</span></div>
          <p className="lede">Six years building the systems where money moves in real time: payments at Klarna, budgeting at YNAB, live sports betting at DraftKings and checkout at Instacart.</p>
          <div className="cta">
            <a className="btn primary" href="#drop">Open a free drop</a>
            <a className="btn" href="#projects">See projects</a>
          </div>
          <div className="chips" aria-label="Core stack">
            {stack.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>

        <div className="scene" ref={scene} aria-hidden="true">
          <div className="rig" ref={rig}>
            <div className="float" style={{ left: '2%', top: '6%', animationDelay: '-1s' }}>
              <div className="ccard" style={{ transform: 'translateZ(-60px) rotateY(24deg) rotateZ(-10deg)' }}>
                <span className="brand">AI·PAY</span><span className="chip" /><span className="num">•••• •••• 2026</span>
              </div>
            </div>
            <div className="float" style={{ right: '4%', top: '2%', animationDelay: '-3s' }}>
              <div className="reel" style={{ transform: 'translateZ(-30px) rotateY(-22deg)' }}><span>7</span><span>7</span><span>7</span></div>
            </div>
            <div className="float" style={{ left: '6%', bottom: '12%', animationDelay: '-2s' }}>
              <div className="coin" style={{ transform: 'translateZ(80px) rotateX(40deg)' }}>$</div>
            </div>
            <div className="float" style={{ left: '22%', bottom: '2%', animationDelay: '-4s' }}>
              <div className="coin" style={{ transform: 'translateZ(30px) rotateX(55deg) scale(.7)' }}>$</div>
            </div>
            <div className="float" style={{ right: '2%', bottom: '26%', animationDelay: '-1.5s' }}>
              <div className="pchip" style={{ transform: 'translateZ(90px) rotateX(55deg) rotateZ(-18deg)' }} />
            </div>
            <div className="float" style={{ right: '12%', bottom: '4%', animationDelay: '-2.5s', transform: 'translateZ(60px)' }}>
              <div className="cube">
                {faces.map((f) => (
                  <i key={f.key} style={{ transform: f.t }}>
                    {Array.from({ length: 9 }, (_, n) => <b key={n} className={pips[f.key].includes(n) ? undefined : 'o'} />)}
                  </i>
                ))}
              </div>
            </div>
            <div className="pcard">
              <div className="pcard-in">
                <Image src="/yura.jpg" alt="Yura Svituha" width={400} height={400} priority />
                <span className="rarity">★ LEGENDARY DEV</span>
                <div className="holo" />
                <div className="meta">
                  <b>Yura Svituha</b>
                  <div className="stats">
                    <div><strong>6</strong><span>YEARS</span></div>
                    <div><strong>4</strong><span>COMPANIES</span></div>
                    <div><strong>8</strong><span>PRODUCTS</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
