import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ── Logo box: image fades in on load, ring + shimmer always show ── */
function LogoBox() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{
      width: '76px', height: '76px', borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(255,107,0,0.14), rgba(255,154,60,0.06))',
      border: '1.5px solid rgba(255,107,0,0.45)',
      boxShadow: '0 0 36px rgba(255,107,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Shimmer sweep — always visible while loading */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.11) 50%, transparent 65%)',
        animation: 'shimmer-sweep 2s linear infinite',
      }} />
      {/* Placeholder pulse ring (hidden once image loaded) */}
      {!loaded && (
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          border: '2px solid rgba(255,107,0,0.3)',
          animation: 'pulse-ring 1.2s ease-out infinite',
        }} />
      )}
      {/* Actual logo — fades in when loaded */}
      <img
        src="/logo.png"
        alt="KRSA"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          width: '56px', height: '56px',
          objectFit: 'cover', borderRadius: '12px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function Loader() {
  const [show, setShow]       = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    /* Fake progress: ramps to ~90 quickly, then finishes at 100 */
    let val = 0;
    const iv = setInterval(() => {
      val += val < 75 ? Math.random() * 8 : Math.random() * 2;
      if (val >= 100) { val = 100; clearInterval(iv); }
      setProgress(Math.min(val, 100));
    }, 80);

    const hide = setTimeout(() => setShow(false), 2400);
    return () => { clearInterval(iv); clearTimeout(hide); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--clr-bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* ── Ambient radial glow ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '640px', height: '640px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.10) 0%, rgba(255,107,0,0.03) 40%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'glow-breathe 3s ease-in-out infinite',
          }} />

          {/* ── Dot grid background ── */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, var(--clr-dot-grid) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
          }} />

          {/* ── Orbiting ring 1 ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '220px', height: '220px',
            marginTop: '-110px', marginLeft: '-110px',
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: 'rgba(255,107,0,0.6)',
            borderRightColor: 'rgba(255,107,0,0.15)',
            animation: 'spin-cw 1.8s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* ── Orbiting ring 2 ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '160px', height: '160px',
            marginTop: '-80px', marginLeft: '-80px',
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: 'rgba(255,154,60,0.5)',
            borderLeftColor: 'rgba(255,154,60,0.15)',
            animation: 'spin-ccw 2.4s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* ── Orbiting ring 3 (outer) ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '290px', height: '290px',
            marginTop: '-145px', marginLeft: '-145px',
            borderRadius: '50%',
            border: '1px dashed rgba(255,107,0,0.12)',
            animation: 'spin-cw 8s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* ── Centre content ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', zIndex: 2,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '14px',
            }}
          >
            {/* Logo container */}
            <LogoBox />

            {/* Brand name */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF9A3C 50%, #FFCC00 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '4px',
              }}>
                Skate Karnataka
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,107,0,0.55)',
              }}>
                Karnataka Roller Skating Association
              </div>
            </div>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{
              position: 'absolute', bottom: '48px',
              width: 'clamp(180px, 30vw, 240px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '8px',
            }}
          >
            {/* Track */}
            <div style={{
              width: '100%', height: '3px', borderRadius: '999px',
              background: 'rgba(255,107,0,0.12)',
              overflow: 'hidden',
            }}>
              {/* Fill */}
              <motion.div
                style={{
                  height: '100%', borderRadius: '999px',
                  background: 'linear-gradient(90deg, #FF6B00, #FFCC00)',
                  boxShadow: '0 0 10px rgba(255,107,0,0.6)',
                  width: `${progress}%`,
                }}
                transition={{ ease: 'linear', duration: 0.08 }}
              />
            </div>
            {/* Percent */}
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.7rem', fontWeight: 700,
              color: 'rgba(255,107,0,0.5)',
              letterSpacing: '0.05em',
            }}>
              {Math.round(progress)}%
            </span>
          </motion.div>

          {/* ── Keyframe styles ── */}
          <style>{`
            @keyframes spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
            @keyframes spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
