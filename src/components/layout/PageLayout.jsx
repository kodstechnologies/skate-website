import { useEffect } from 'react';

export default function PageLayout({ children, title }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) document.title = `${title} — Skate Karnataka`;
  }, [title]);

  return (
    <div style={{ background: 'var(--clr-bg)', fontFamily: 'var(--font-body)', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Push content below fixed global navbar */}
      <div style={{ paddingTop: '88px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
