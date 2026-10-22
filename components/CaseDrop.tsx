'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { EMAIL, prizes, type Prize, type PrizeIcon } from '@/lib/data';
import { copyText, useToast } from '@/lib/useToast';

const STEP = 158, COUNT = 64, WIN = 56;
const total = prizes.reduce((s, p) => s + p.w, 0);
const rv = (c: string) => ({ ['--r']: c }) as CSSProperties;

const svg = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const ICONS: Record<PrizeIcon, ReactNode> = {
  chat: svg(<><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></>),
  code: svg(<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />),
  calc: svg(<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" /></>),
  arch: svg(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="8.5" y="14" width="7" height="7" rx="1" /><path d="M6.5 10v2h11v-2M12 12v2" /></>),
  bolt: svg(<path d="M13 2L4 14h7l-1 8 9-12h-7z" />),
  gift: svg(<><rect x="3" y="8" width="18" height="13" rx="1" /><path d="M3 12h18M12 8v13M12 8S10 3 7.5 4 9 8 12 8zm0 0s2-5 4.5-4S15 8 12 8z" /></>),
};

function pick(): Prize {
  let n = Math.random() * total;
  for (const p of prizes) { n -= p.w; if (n < 0) return p; }
  return prizes[0];
}
const hex = (n: number) => Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
const newSeed = () => `Provably fair · server seed ${hex(8)}…${hex(6)} · nonce ${Math.floor(Math.random() * 9000 + 1000)}`;

export default function CaseDrop() {
  const [items, setItems] = useState<Prize[]>([]);
  const [seed, setSeed] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [opened, setOpened] = useState(false);
  const [result, setResult] = useState<{ prize: Prize; code: string } | null>(null);
  const [token, setToken] = useState(0);
  const pending = useRef<Prize | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const codeEl = useRef<HTMLSpanElement>(null);
  const { show, node } = useToast();

  const odds = useMemo(() => prizes.map((p) => ({ ...p, pct: ((p.w / total) * 100).toFixed(0) })), []);

  useEffect(() => {
    setItems(Array.from({ length: COUNT }, pick));
    setSeed(newSeed());
  }, []);

  useEffect(() => {
    if (!token || !strip.current || !pending.current) return;
    const el = strip.current, winner = pending.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.style.transition = 'none';
    el.style.transform = 'translateX(0)';
    void el.offsetWidth;
    const track = el.parentElement!.getBoundingClientRect().width;
    const jitter = (Math.random() - 0.5) * 110;
    const x = -(8 + WIN * STEP + 75 - track / 2 + jitter);
    const dur = reduce ? 0 : 6.2;
    el.style.transition = `transform ${dur}s cubic-bezier(.06,.62,.1,1)`;
    el.style.transform = `translateX(${x}px)`;
    const t = setTimeout(() => {
      setResult({ prize: winner, code: `YS-${hex(4).toUpperCase()}` });
      setSpinning(false);
      setOpened(true);
      setSeed(newSeed());
    }, dur * 1000 + 150);
    return () => clearTimeout(t);
  }, [token]);

  function spin() {
    const winner = pick();
    pending.current = winner;
    setResult(null);
    setSpinning(true);
    setItems(Array.from({ length: COUNT }, (_, i) => (i === WIN ? winner : pick())));
    setToken((n) => n + 1);
  }

  return (
    <section className="block" id="drop">
      <div className="wrap">
        <div className="drop reveal">
          <div className="case">
            <div className="box" aria-hidden="true"><div className="f" /><div className="band" /></div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="eyebrow">Free drop · every visitor gets one</div>
              <h2 style={{ fontSize: 'clamp(34px,5vw,56px)' }}>Open the dev case</h2>
            </div>
            <button className="btn primary" type="button" onClick={spin} disabled={spinning}>
              {spinning ? 'Opening…' : opened ? 'Open again' : 'Open case'}
            </button>
          </div>
          <div className="track">
            <div className="marker" />
            <div className="strip" ref={strip}>
              {items.map((p, i) => (
                <div className="item" key={`${token}-${i}`} style={rv(p.r)}>{ICONS[p.icon]}<span>{p.name}</span></div>
              ))}
            </div>
          </div>
          <div className="odds">
            {odds.map((p) => (
              <div key={p.name} style={rv(p.r)}><b>{p.name}</b><span>{p.tier} · {p.pct}%</span></div>
            ))}
          </div>
          <p className="seed">{seed}</p>
          {result && (
            <div className="win" style={rv(result.prize.r)}>
              <div>
                <div className="eyebrow">You unboxed · {result.prize.tier}</div>
                <h3>{result.prize.name}</h3>
                <p>Email your code to {EMAIL} to claim it.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <span className="code" ref={codeEl}>{result.code}</span>
                <button className="btn" type="button" onClick={() => copyText(result.code, codeEl.current, show, 'Code')}>Copy code</button>
              </div>
            </div>
          )}
          <p aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            {result ? `You unboxed ${result.prize.name}` : ''}
          </p>
        </div>
      </div>
      {node}
    </section>
  );
}
