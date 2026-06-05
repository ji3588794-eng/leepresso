'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/$/, '');
const VISITOR_KEY = 'leepresso_visitor_id';
const SESSION_KEY = 'leepresso_session_id';

const createId = () => {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getVisitorId = () => {
  if (typeof window === 'undefined') return '';

  const saved = window.localStorage.getItem(VISITOR_KEY);
  if (saved) return saved;

  const nextId = createId();
  window.localStorage.setItem(VISITOR_KEY, nextId);
  return nextId;
};

const getSessionId = () => {
  if (typeof window === 'undefined') return '';

  const saved = window.sessionStorage.getItem(SESSION_KEY);
  if (saved) return saved;

  const nextId = createId();
  window.sessionStorage.setItem(SESSION_KEY, nextId);
  return nextId;
};

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [blockedReason, setBlockedReason] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const query = searchParams.toString();
    const currentPath = query ? `${pathname}?${query}` : pathname;

    fetch(`${API_BASE}/api/user/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        path: currentPath,
        referrer: document.referrer || null,
        language: navigator.language || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
        screen_width: window.screen?.width || null,
        screen_height: window.screen?.height || null,
      }),
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));

        if (res.status === 403 && json.blocked) {
          setBlockedReason(json.reason || '관리자에 의해 접근이 제한되었습니다.');
          return;
        }

        if (res.ok) {
          setBlockedReason('');
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Visitor tracking failed:', error);
        }
      });

    return () => controller.abort();
  }, [pathname, searchParams]);

  if (!blockedReason) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111',
        color: '#fff',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800 }}>
          접근이 제한되었습니다.
        </h1>
        <p style={{ margin: 0, color: '#ddd', lineHeight: 1.6 }}>{blockedReason}</p>
      </div>
    </div>
  );
}
