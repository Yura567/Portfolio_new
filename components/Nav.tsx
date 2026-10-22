'use client';

import { useEffect, useRef } from 'react';

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="nav" aria-label="Main">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Yura Svituha, home"><span>Y</span><span>S</span></a>
        <ul>
          <li><a href="#drop">Free drop</a></li>
          <li><a href="#work">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#payouts">Payouts</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="btn primary" href="#contact">Hire Yura</a>
      </div>
      <div className="progress" ref={bar} />
    </nav>
  );
}
