import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { disciplines } from '../data/disciplines';

/* Duplicate each row for seamless loop */
const row1 = [...disciplines.slice(0, 5), ...disciplines.slice(0, 5)];
const row2 = [...disciplines.slice(5),    ...disciplines.slice(5)];

/* ── Sport illustration backgrounds per discipline ── */
const SPORT_BG = [
  'linear-gradient(135deg,#FF6B0040 0%,#FF9A3C20 100%)',
  'linear-gradient(135deg,#A855F740 0%,#EC489920 100%)',
  'linear-gradient(135deg,#00C8FF40 0%,#0284C720 100%)',
  'linear-gradient(135deg,#22C55E40 0%,#16A34A20 100%)',
  'linear-gradient(135deg,#F59E0B40 0%,#EF444420 100%)',
  'linear-gradient(135deg,#EF444440 0%,#F9731620 100%)',
  'linear-gradient(135deg,#06B6D440 0%,#818CF820 100%)',
  'linear-gradient(135deg,#EC489940 0%,#A855F720 100%)',
  'linear-gradient(135deg,#84CC1640 0%,#22C55E20 100%)',
  'linear-gradient(135deg,#F9731640 0%,#FB923C20 100%)',
];

function DCard({ d }) {
  const bg = SPORT_BG[d.id - 1] || SPORT_BG[0];
  return (
    <div className="dcard" style={{
      flexShrink: 0, width: 220, borderRadius: 20, marginRight: '1.1rem',
      background: 'var(--clr-surface)',
      border: '1px solid var(--clr-card-border-soft)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      overflow: 'hidden', cursor: 'default', position: 'relative',
    }}>
      {/* Visual illustration area */}
      <div style={{
        height: 130, background: bg, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* The new image background */}
        {d.image && (
          <img src={d.image} alt={d.name} loading="lazy" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.75, mixBlendMode: 'luminosity', transition: 'transform 0.4s ease, opacity 0.4s ease'
          }} className="dcard-img" />
        )}
        
        {/* Subtle overlay to tint it to the brand color */}
        {d.image && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${d.color}80 0%, transparent 100%)`,
            zIndex: 1, pointerEvents: 'none', mixBlendMode: 'color'
          }} />
        )}

        {/* Animated ring */}
        <div className="dring" style={{
          position: 'absolute', width: 110, height: 110, borderRadius: '50%',
          border: `1.5px solid ${d.color}60`, zIndex: 2,
          animation: 'ring-spin 8s linear infinite',
        }} />
        <div className="dring2" style={{
          position: 'absolute', width: 80, height: 80, borderRadius: '50%',
          border: `1px dashed ${d.color}40`, zIndex: 2,
          animation: 'ring-spin 5s linear infinite reverse',
        }} />
        {/* Center glow */}
        <div style={{
          position: 'absolute', width: 60, height: 60, borderRadius: '50%',
          background: `radial-gradient(circle,${d.color}50,transparent 70%)`, zIndex: 2,
        }} />
        
        {/* Floating icon (Commented out per user request)
        <div className="dicon-wrap" style={{
          width: 58, height: 58, borderRadius: 16, zIndex: 2, position: 'relative',
          background: `${d.color}22`, border: `1.5px solid ${d.color}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: d.color, boxShadow: `0 0 28px ${d.color}40`,
          animation: 'icon-float 3s ease-in-out infinite',
          animationDelay: `${(d.id * 0.3) % 2}s`,
        }}>
          <d.Icon size={26} strokeWidth={1.6} />
        </div>
        */}

        {/* Corner particles */}
        <div style={{ position: 'absolute', top: 12, left: 12, width: 5, height: 5, borderRadius: '50%', background: d.color, opacity: 0.8, zIndex: 2, animation: `particle-drift ${2 + (d.id % 3)}s ease-in-out infinite` }} />
        <div style={{ position: 'absolute', bottom: 16, right: 18, width: 4, height: 4, borderRadius: '50%', background: d.color, opacity: 0.6, zIndex: 2, animation: `particle-drift ${3 + (d.id % 2)}s ease-in-out infinite reverse` }} />
        <div style={{ position: 'absolute', top: 20, right: 24, width: 3, height: 3, borderRadius: '50%', background: d.color, opacity: 0.7, zIndex: 2, animation: `particle-drift ${2.5 + (d.id % 2)}s ease-in-out infinite` }} />
      </div>

      {/* Card bottom */}
      <div style={{ padding: '1rem 1.1rem 1.1rem', position: 'relative' }}>
        <div style={{ height: 2, background: `linear-gradient(90deg,${d.color},${d.color}00)`, borderRadius: 2, marginBottom: '0.75rem' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--clr-text)', lineHeight: 1.2 }}>{d.name}</h3>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.55rem', color: `${d.color}80`, letterSpacing: '0.08em' }}>
            {String(d.id).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, dir = 1, speed = 30 }) {
  const trackRef  = useRef(null);
  const wrapRef   = useRef(null);
  const tlRef     = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfW = track.scrollWidth / 2;
    const fromX = dir === 1 ? 0 : -halfW;
    const toX   = dir === 1 ? -halfW : 0;
    gsap.set(track, { x: fromX });
    tlRef.current = gsap.to(track, { x: toX, duration: speed, ease: 'none', repeat: -1 });

    /* Pause on hover */
    const wrap = wrapRef.current;
    const pause  = () => tlRef.current?.pause();
    const resume = () => tlRef.current?.resume();
    wrap?.addEventListener('mouseenter', pause,  { passive: true });
    wrap?.addEventListener('mouseleave', resume, { passive: true });
    return () => {
      tlRef.current?.kill();
      wrap?.removeEventListener('mouseenter', pause);
      wrap?.removeEventListener('mouseleave', resume);
    };
  }, [dir, speed]);

  return (
    <div ref={wrapRef} style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '0.5rem 0' }}>
      <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(90deg,var(--clr-surface),transparent)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(270deg,var(--clr-surface),transparent)', pointerEvents: 'none' }} />
      <div ref={trackRef} style={{ display: 'flex', willChange: 'transform' }}>
        {items.map((d, i) => <DCard key={`${d.id}-${i}`} d={d} />)}
      </div>
    </div>
  );
}

export default function Disciplines() {
  const sectionRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={sectionRef} id="disciplines" className="section-py" style={{ background: 'var(--clr-surface)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0,    left: 0, right: 0, height: 1, background: 'var(--grad-divider)' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--grad-divider)' }} />
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(5rem,16vw,14rem)',
        color: 'var(--clr-krsa-watermark)', letterSpacing: '-0.05em',
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>KRSA</div>

      <div className="container" style={{ position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, marginBottom: '1.25rem', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.28)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--clr-accent)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clr-accent)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            Competitive Categories
          </span>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--clr-text)', marginBottom: '1rem' }}>
            Master{' '}<span style={{ background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Every Discipline</span>
          </h2>
          <p style={{ color: 'var(--clr-muted)', fontSize: 'clamp(0.9rem,1.3vw,1rem)', lineHeight: 1.8, maxWidth: 540 }}>
            Explore Karnataka's official roller skating disciplines — speed, artistic, freestyle, hockey, and more.
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
        <MarqueeRow items={row1} dir={1}  speed={30} />
        <MarqueeRow items={row2} dir={-1} speed={36} />
      </div>

      <style>{`
        @keyframes ring-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes icon-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .dcard { transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; }
        .dcard:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.4) !important; border-color: var(--clr-card-border-med) !important; transform: translateY(-5px); }
        .dcard:hover .dcard-img { transform: scale(1.1); opacity: 1; mix-blend-mode: normal; }

        [data-theme="light"] .dcard { box-shadow: 0 2px 14px rgba(0,0,0,0.07) !important; background: #fff !important; }
        [data-theme="light"] .dcard:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.13) !important; }
      `}</style>
    </section>
  );
}
