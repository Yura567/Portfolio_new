'use client';

import { useEffect, type CSSProperties } from 'react';
import { wheelLabels } from '@/lib/data';

const cssVar = (name: string, value: string) => ({ [name]: value }) as CSSProperties;

export default function Intro() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
    const intro = $('intro'), stage = $('stage'), wheel = $('wheel'), wheelwrap = $('wheelwrap');
    const rays = $('rays'), ball = $('ball'), bigtext = $('bigtext'), jack = $('jack'), hint = $('hint'), flash = $('flash');
    const flyers = Array.from(document.querySelectorAll<HTMLElement>('.fly'));
    let dead = false;

    // burst (confetti + coins over the whole screen)
    const cv = $<HTMLCanvasElement>('burst');
    const ctx = cv.getContext('2d')!;
    const COLORS = ['#2DD4BF', '#F43F9E', '#FBBF24', '#FEF3C7', '#A78BFA'];
    type Part = { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; c: string; coin: boolean; life: number };
    let parts: Part[] = [];
    let running = false, fired = false;

    function explode() {
      flash.classList.remove('go');
      void flash.offsetWidth;
      flash.classList.add('go');
      if (reduce) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth, h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = [];
      for (let i = 0; i < 220; i++) {
        const a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 14;
        parts.push({ x: w / 2, y: h / 2, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, r: 3 + Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: COLORS[i % COLORS.length], coin: i % 9 === 0, life: 1 });
      }
      if (!running) { running = true; requestAnimationFrame(tick); }
    }
    function tick() {
      if (dead) return;
      const w = cv.clientWidth, h = cv.clientHeight;
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of parts) {
        if (p.life <= 0) continue;
        alive++;
        p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.28; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.009;
        ctx.save(); ctx.globalAlpha = Math.max(p.life, 0); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        if (p.coin) {
          ctx.fillStyle = '#FBBF24'; ctx.beginPath(); ctx.arc(0, 0, p.r * 1.8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#92400E'; ctx.font = `700 ${p.r * 2.2}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', 0, 1);
        } else {
          ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        }
        ctx.restore();
      }
      if (alive) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, w, h); }
    }

    // warp tunnel behind the wheel, speeds up with the spin
    const wc = $<HTMLCanvasElement>('warp');
    const wx = wc.getContext('2d')!;
    const WCOL = ['#2DD4BF', '#F43F9E', '#FBBF24', '#A78BFA', '#FFFFFF'];
    const stars = Array.from({ length: 320 }, (_, s) => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(), c: WCOL[s % WCOL.length] }));
    let lastRot = 0, spinBoost = 0, warpRun = false;
    function sizeWarp() {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      wc.width = wc.clientWidth * d; wc.height = wc.clientHeight * d; wx.setTransform(d, 0, 0, d, 0, 0);
    }
    function warpTick() {
      if (dead) return;
      const r = intro.getBoundingClientRect();
      if (r.bottom <= 0 || stage.style.visibility === 'hidden') { warpRun = false; return; }
      const w = wc.clientWidth, h = wc.clientHeight, cx = w / 2, cy = h / 2, k = Math.max(w, h) * 0.5;
      const speed = 0.003 + Math.min(spinBoost * 0.00035, 0.045);
      spinBoost *= 0.9;
      wx.fillStyle = 'rgba(7,7,13,.35)'; wx.fillRect(0, 0, w, h);
      wx.lineCap = 'round';
      for (const p of stars) {
        const pz = p.z;
        p.z -= speed;
        if (p.z <= 0.02) { p.z = 1; p.x = Math.random() * 2 - 1; p.y = Math.random() * 2 - 1; continue; }
        wx.strokeStyle = p.c; wx.globalAlpha = Math.min(1, (1 - p.z) * 1.4); wx.lineWidth = (1 - p.z) * 2.6;
        wx.beginPath();
        wx.moveTo(cx + (p.x / pz) * k * 0.5, cy + (p.y / pz) * k * 0.5);
        wx.lineTo(cx + (p.x / p.z) * k * 0.5, cy + (p.y / p.z) * k * 0.5);
        wx.stroke();
      }
      wx.globalAlpha = 1;
      requestAnimationFrame(warpTick);
    }

    function onScroll() {
      const ir = intro.getBoundingClientRect();
      const ip = Math.min(Math.max(-ir.top / (ir.height - window.innerHeight), 0), 1);
      const t = Math.min(ip / 0.8, 1), e = 1 - Math.pow(1 - t, 3);
      const boom = Math.max(0, (ip - 0.8) / 0.16);
      const rot = 1470 * e; // lands with the JACKPOT slot under the pointer
      spinBoost += Math.abs(rot - lastRot); lastRot = rot;
      wheel.style.transform = `rotate(${rot}deg) scale(${1 + boom * 1.4})`;
      rays.style.transform = `rotate(${-rot * 0.35}deg) scale(${1 + boom * 0.6})`;
      const W = wheelwrap.offsetWidth, drop = Math.max(0, (t - 0.82) / 0.18);
      ball.style.transform = `rotate(${-1260 * (1 - e)}deg) translateY(${-W * (0.455 - 0.085 * drop)}px)`;
      ball.style.opacity = String(1 - boom);
      bigtext.style.transform = `translateX(${(0.15 - ip * 0.9) * window.innerWidth}px)`;
      for (const f of flyers) {
        const dx = Number(f.dataset.x), dy = Number(f.dataset.y);
        f.style.transform = `translate(${dx * ip * window.innerWidth * 0.1}px,${dy * ip * window.innerHeight * 0.1}px) scale(${1 + ip * 0.5 + boom * 1.6})`;
        f.style.opacity = String(1 - boom);
      }
      hint.style.opacity = String(Math.max(0, 1 - ip * 4));
      jack.style.opacity = String(ip < 0.8 ? 0 : Math.min(1, (ip - 0.8) / 0.05));
      jack.style.transform = `translate(-50%,-50%) scale(${0.5 + Math.min(1, boom) * 0.9})`;
      const so = 1 - Math.min(1, Math.max(0, (ip - 0.86) / 0.1));
      stage.style.opacity = String(so);
      stage.style.visibility = so <= 0.01 ? 'hidden' : 'visible';
      if (ip >= 0.8 && !fired) { fired = true; explode(); }
      if (ip < 0.6) fired = false;
      if (!warpRun && !reduce && ir.bottom > 0 && so > 0.01) { warpRun = true; requestAnimationFrame(warpTick); }
    }

    let ticking = false;
    const handler = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } };
    const onResize = () => { sizeWarp(); onScroll(); };
    sizeWarp();
    onScroll();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      dead = true;
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <section className="intro" id="intro" aria-label="Intro">
        <div className="stage" id="stage">
          <canvas className="warp" id="warp" aria-hidden="true" />
          <div className="rays" id="rays" aria-hidden="true" />
          <div className="bigtext" aria-hidden="true"><span id="bigtext">Place your bets · Place your bets</span></div>
          <div className="floor l" /><div className="floor r" />
          <div className="flyers" aria-hidden="true">
            <div className="fly" data-x="-1" data-y="-1" style={{ left: '6%', top: '14%' }}>
              <div className="ccard" style={{ transform: 'perspective(600px) rotateY(24deg) rotateZ(-12deg)' }}>
                <span className="brand">AI·PAY</span><span className="chip" /><span className="num">•••• •••• 2026</span>
              </div>
            </div>
            <div className="fly" data-x="1" data-y="-1" style={{ right: '7%', top: '13%' }}>
              <div className="reel" style={{ transform: 'perspective(600px) rotateY(-22deg)' }}><span>7</span><span>7</span><span>7</span></div>
            </div>
            <div className="fly" data-x="-1" data-y="1" style={{ left: '11%', bottom: '14%' }}>
              <div className="pchip" style={{ transform: 'perspective(400px) rotateX(55deg)' }} />
            </div>
            <div className="fly" data-x="1" data-y="1" style={{ right: '12%', bottom: '15%' }}>
              <div className="coin" style={{ transform: 'perspective(300px) rotateX(40deg)' }}>$</div>
            </div>
            <div className="fly" data-x="-1.5" data-y="0" style={{ left: '3%', top: '50%' }}>
              <div className="coin" style={{ transform: 'perspective(300px) rotateX(50deg) scale(.7)' }}>$</div>
            </div>
            <div className="fly" data-x="1.5" data-y="0" style={{ right: '4%', top: '48%' }}>
              <div className="pchip" style={{ transform: 'perspective(400px) rotateX(50deg) scale(.6)' }} />
            </div>
          </div>
          <div className="intro-top"><span className="tag fin">FINTECH</span><span className="x">×</span><span className="tag gam">iGAMING</span></div>
          <div className="wheelwrap" id="wheelwrap">
            <div className="pointer" aria-hidden="true" />
            <div className="wheel" id="wheel" aria-hidden="true">
              <div className="labels">
                {wheelLabels.map((l, i) => (
                  <span key={l} className={i === 11 ? 'gold' : undefined} style={cssVar('--a', `${i * 30}deg`)}>{l}</span>
                ))}
              </div>
              <div className="bulbs">
                {Array.from({ length: 24 }, (_, b) => <i key={b} style={cssVar('--a', `${b * 15 + 7.5}deg`)} />)}
              </div>
              <div className="hub"><span>YS</span></div>
            </div>
            <div className="ball" id="ball" aria-hidden="true" />
          </div>
          <div className="jack" id="jack" aria-hidden="true">JACKPOT</div>
          <div className="intro-hint" id="hint"><span className="eyebrow">Scroll to spin</span><span className="arrow" aria-hidden="true" /></div>
          <div className="flash" id="flash" aria-hidden="true" />
        </div>
      </section>
      <canvas className="burst" id="burst" aria-hidden="true" />
    </>
  );
}
