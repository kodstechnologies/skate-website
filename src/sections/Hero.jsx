import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const wordV = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: '0%',   opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

function StatPill({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <span style={{
        fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.6rem',
        background: 'var(--grad-text-hero)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', lineHeight: 1,
      }}>{value}</span>
      <span style={{
        fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.13em',
        textTransform: 'uppercase', color: 'var(--clr-muted)', marginTop: '4px',
      }}>{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { theme } = useTheme();
  const heroSrc = theme === 'light' ? '/images/hero_light.png' : '/images/hero_dark_girl.png';

  return (
    <section id="home" style={{
      minHeight: '100svh', position: 'relative',
      background: 'var(--clr-bg)', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* ── Background skater image ── */}
      <motion.div
        className="hero-img-container"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={imgLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <img
          src={heroSrc}
          alt="Skate Karnataka skater"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '62%', height: '100%',
            objectFit: 'cover',
            objectPosition: theme === 'light' ? 'center right' : 'center top',
            display: 'block', flexShrink: 0,
          }}
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'var(--hero-left-grad)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'var(--hero-vignette)' }} />

      {/* ── Orange glow aura (behind skater) ── */}
      <div aria-hidden style={{
        position: 'absolute', right: '18%', top: '50%', transform: 'translateY(-50%)',
        width: '500px', height: '500px', borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 65%)',
        animation: 'glow-breathe 4s ease-in-out infinite',
      }} />

      {/* ── Dot grid ── */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'radial-gradient(circle, var(--clr-dot-grid) 1px, transparent 1px)',
        backgroundSize:'38px 38px' }} />

      {/* ── Floating accent particles ── */}
      {[
        { left: '6%',  top: '22%', size: 6, color: 'rgba(255,107,0,0.8)',  dur: '4s'  },
        { left: '12%', top: '70%', size: 4, color: 'rgba(255,154,60,0.6)', dur: '5s'  },
        { left: '48%', top: '15%', size: 5, color: 'rgba(0,207,255,0.5)',  dur: '3.5s'},
        { left: '40%', top: '80%', size: 3, color: 'rgba(255,45,122,0.5)', dur: '6s'  },
      ].map((p, i) => (
        <div key={i} aria-hidden style={{
          position: 'absolute', left: p.left, top: p.top,
          width: p.size, height: p.size, borderRadius: '50%',
          background: p.color, pointerEvents: 'none',
          animation: `particle-drift ${p.dur} ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`,
        }} />
      ))}

      {/* ── Main content (left column) ── */}
      <div className="hero-content-wrap" style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingTop: 'calc(72px + clamp(2.5rem, 4vw, 4.5rem))',
        paddingLeft: 'clamp(2.5rem, 6vw, 7rem)',
        paddingBottom: 'clamp(1.5rem, 4vw, 3rem)',
      }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '999px',
            background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.35)',
            fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--clr-accent)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--clr-accent)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            Karnataka Roller Skating Association
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ marginBottom: '1.75rem' }}>
          {['SKATE', 'KARNATAKA'].map((word, wi) => (
            <div key={word} style={{ overflow: 'hidden', width: 'max-content' }}>
              <motion.div variants={wordV} style={{
                fontFamily: 'var(--font-head)', fontWeight: 900,
                fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                lineHeight: 0.92, letterSpacing: '-0.03em',
                ...(wi === 1
                  ? { background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
                  : { color: 'var(--clr-text)' }),
                paddingRight: '0.1em', // Prevent minor clipping of gradient text
              }}>
                {word}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.82 }}
          style={{
            color: 'var(--clr-muted-2)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
            lineHeight: 1.8, maxWidth: '400px', marginBottom: '2.5rem',
          }}
        >
          Karnataka's official digital platform for roller skating — register, compete,
          rise through the ranks. One ecosystem for every skater, coach, and club.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}
        >
          <button id="hero-download" onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })} style={{
            position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '9px',
            padding: '14px 28px', borderRadius: '14px', border: 'none', cursor: 'pointer',
            background: 'var(--grad-accent)', color: '#fff',
            fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(255,107,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'transform 0.25s, box-shadow 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,107,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
          >
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.25) 50%,transparent 60%)', animation: 'shimmer-sweep 2.6s linear infinite' }} />
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24" style={{ position: 'relative' }}>
              <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" /><path d="M4 20h16" />
            </svg>
            <span style={{ position: 'relative' }}>Download App</span>
          </button>

          <button id="hero-explore" onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '14px', cursor: 'pointer',
            border: '1.5px solid rgba(255,107,0,0.4)', color: 'var(--clr-accent)',
            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            backdropFilter: 'blur(8px)', background: 'rgba(255,107,0,0.06)',
            transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--clr-accent)'; e.currentTarget.style.background = 'rgba(255,107,0,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'; e.currentTarget.style.background = 'rgba(255,107,0,0.06)'; e.currentTarget.style.transform = ''; }}
          >
            Explore Platform
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          style={{
            display: 'flex', gap: '2rem', flexWrap: 'wrap',
            paddingTop: '2rem',
            borderTop: '1px solid var(--clr-stats-divider)',
          }}
        >
          <StatPill value="5000+" label="Skaters"     delay={1.2} />
          <StatPill value="30+"   label="Districts"   delay={1.3} />
          <StatPill value="10"    label="Disciplines" delay={1.4} />
        </motion.div>
      </div>



      {/* CSS adjustments */}
      <style>{`
        .hero-content-wrap { padding-right: 55%; }
        @media (max-width: 900px) {
          .hero-img-container { opacity: 0.1 !important; }
          .hero-content-wrap { padding-right: clamp(2.5rem, 6vw, 7rem); }
        }
        @media (max-width: 768px) {
          .hero-img-container { display: none !important; }
          .hero-content-wrap { max-width: 100% !important; padding-right: clamp(1.5rem, 5vw, 2.5rem); padding-left: clamp(1.5rem, 5vw, 2.5rem); }
        }
      `}</style>
    </section>
  );
}
