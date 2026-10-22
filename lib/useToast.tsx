'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const show = useCallback((m: string) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const node = msg ? <div className="toast" role="status">{msg}</div> : null;
  return { show, node };
}

export async function copyText(text: string, el: HTMLElement | null, show: (m: string) => void, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    show(`${label} copied`);
  } catch {
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    show('Selected. Press Ctrl+C to copy');
  }
}
