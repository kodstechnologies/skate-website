import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { districts } from '../data/districts';

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ['#FF6B00', '#00CFFF', '#10B981', '#F59E0B', '#FF2D7A', '#8B5CF6'];

function initials(short) {
  const parts = short.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function DistrictCard({ district, index }) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <article
      className="district-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: 168,
        padding: '1.35rem 1.3rem 1.4rem',
        borderRadius: 18,
        background: 'var(--clr-surface)',
        border: `1px solid ${accent}22`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -36,
          right: -28,
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}18, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -8,
          right: 10,
          fontFamily: 'var(--font-head)',
          fontWeight: 900,
          fontSize: '3.2rem',
          lineHeight: 1,
          color: `${accent}10`,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(district.id).padStart(2, '0')}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${accent}16`,
            border: `1.5px solid ${accent}45`,
            boxShadow: `0 0 0 4px ${accent}10`,
            fontFamily: 'var(--font-head)',
            fontWeight: 900,
            fontSize: '0.82rem',
            letterSpacing: '0.04em',
            color: accent,
          }}
        >
          {initials(district.short)}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 800,
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: `${accent}90`,
          }}
        >
          {String(district.id).padStart(2, '0')}
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 900,
            fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
            color: 'var(--clr-text)',
            lineHeight: 1.2,
            marginBottom: '0.45rem',
          }}
        >
          {district.short}
        </h3>
        <p
          style={{
            color: 'var(--clr-muted)',
            fontSize: '0.78rem',
            lineHeight: 1.55,
            marginTop: 'auto',
          }}
        >
          {district.name}
        </p>
      </div>
    </article>
  );
}

export default function Districts() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cardsRef.current.filter(Boolean), {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.05,
              ease: 'power3.out',
              onComplete() {
                els.forEach((el) => el && (el.style.willChange = 'auto'));
              },
            }
          ),
        once: true,
        start: 'top 92%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="districts"
      className="section-py"
      style={{ background: 'var(--clr-bg)', position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-head)',
          fontWeight: 900,
          fontSize: 'clamp(5rem,17vw,16rem)',
          color: 'var(--clr-krsa-watermark)',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        KRSA
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '15%',
          right: '-100px',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-80px',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,207,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            marginBottom: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              marginBottom: '1.25rem',
              background: 'rgba(0,207,255,0.08)',
              border: '1px solid rgba(0,207,255,0.25)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--clr-cyan)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--clr-cyan)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            Across Karnataka
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem,4.5vw,3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: 'var(--clr-text)',
              marginBottom: '1rem',
            }}
          >
            District{' '}
            <span
              style={{
                background: 'var(--grad-text-hero)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Associations
            </span>
          </h2>
          <p
            style={{
              color: 'var(--clr-muted)',
              fontSize: 'clamp(0.9rem,1.3vw,1rem)',
              lineHeight: 1.8,
              maxWidth: 520,
            }}
          >
            Affiliated district roller skating associations working with KRSA across the state.
          </p>
        </motion.div>

        <div className="district-grid">
          {districts.map((district, i) => (
            <div
              key={district.id}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ opacity: 0, height: '100%' }}
            >
              <DistrictCard district={district} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .district-grid {
          display: grid;
          gap: 1.1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 560px) {
          .district-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .district-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1200px) {
          .district-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .district-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,107,0,0.45) !important;
          box-shadow: 0 16px 44px rgba(0,0,0,0.45), 0 0 28px rgba(255,107,0,0.12);
        }
        [data-theme="light"] .district-card {
          background: #fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        [data-theme="light"] .district-card:hover {
          box-shadow: 0 14px 36px rgba(0,0,0,0.1), 0 0 20px rgba(255,107,0,0.08);
        }
      `}</style>
    </section>
  );
}
