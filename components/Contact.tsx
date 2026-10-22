'use client';

import { useRef } from 'react';
import { EMAIL, LINKEDIN } from '@/lib/data';
import { copyText, useToast } from '@/lib/useToast';

export default function Contact() {
  const mail = useRef<HTMLOutputElement>(null);
  const { show, node } = useToast();

  return (
    <section className="block" id="contact">
      <div className="wrap contact">
        <div className="reveal">
          <div className="eyebrow">Contact</div>
          <h2>Let&apos;s build<br />something that pays</h2>
          <div className="mail">
            <output ref={mail}>{EMAIL}</output>
            <button className="btn" type="button" onClick={() => copyText(EMAIL, mail.current, show, 'Email')}>Copy email</button>
          </div>
        </div>
        <div className="links reveal">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><span>↗</span></a>
          <a href={`mailto:${EMAIL}`}><span>Email</span><span>{EMAIL}</span></a>
          <div><span>Based in</span><span>Lviv, Ukraine</span></div>
        </div>
      </div>
      {node}
    </section>
  );
}
