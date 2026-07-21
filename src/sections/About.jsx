import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: 'Govern',
    description:
      'Official state body for roller sports — setting standards, affiliations, and fair competition across Karnataka.',
    accent: '#FF6B00',
  },
  {
    title: 'Develop',
    description:
      'From school rinks to high-performance camps — building skaters at every level through clubs and districts.',
    accent: '#00CFFF',
  },
  {
    title: 'Compete',
    description:
      'District meets to national podiums — speed, artistic, freestyle, and hockey under one association.',
    accent: '#10B981',
  },
];

const FACTS = [
  { label: 'Established', value: '1976' },
  { label: 'Disciplines', value: '8+' },
  { label: 'Reach', value: 'Statewide' },
];

export default function About() {
  const sectionRef = useRef(null);
  const pillarsRef = useRef([]);
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(pillarsRef.current.filter(Boolean), {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power4.out',
              onComplete() {
                els.forEach((el) => el && (el.style.willChange = 'auto'));
              },
            }
          ),
        once: true,
        start: 'top 90%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-py"
      style={{ background: 'var(--clr-bg)', position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -200,
          left: -150,
          width: 700,
          height: 700,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle,rgba(60,100,255,0.08) 0%,transparent 65%)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle,rgba(255,107,0,0.055) 0%,transparent 65%)',
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
              padding: '6px 18px',
              borderRadius: 999,
              marginBottom: '1.25rem',
              background: 'rgba(255,107,0,0.1)',
              border: '1px solid rgba(255,107,0,0.28)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--clr-accent)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--clr-accent)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            The Association
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem,5vw,3.75rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: 'var(--clr-text)',
              marginBottom: '1rem',
            }}
          >
            About{' '}
            <span
              style={{
                background: 'var(--grad-text-hero)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              KRSA
            </span>
          </h2>
          <p
            style={{
              color: 'var(--clr-muted)',
              fontSize: 'clamp(0.9rem,1.3vw,1rem)',
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            Karnataka Roller Skating Association, the official governing body for roller sports in the state.
          </p>
        </motion.div>

        {/* Story + facts */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="about-story"
          style={{
            display: 'grid',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          <div>
            <p
              style={{
                color: 'var(--clr-text)',
                fontSize: 'clamp(1.05rem,1.6vw,1.2rem)',
                lineHeight: 1.75,
                fontFamily: 'var(--font-head)',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              Since 1976, KRSA has grown roller skating from a city pastime into a statewide competitive sport.
            </p>
            <p
              style={{
                color: 'var(--clr-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.85,
                marginBottom: '1rem',
              }}
            >
              Recognised under the national roller sports framework, the association organises championships,
              supports clubs and district units, and prepares Karnataka skaters for national and international stages.
            </p>
            <p style={{ color: 'var(--clr-muted)', fontSize: '0.95rem', lineHeight: 1.85 }}>
              Skate Karnataka is KRSA&apos;s official digital platform — bringing registration, identity, events,
              and results into one place for skaters, clubs, and officials across the state.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              borderLeft: '2px solid rgba(255,107,0,0.35)',
              paddingLeft: '1.75rem',
            }}
          >
            {FACTS.map((fact, i) => (
              <div
                key={fact.label}
                style={{
                  padding: '1.15rem 0',
                  borderBottom: i < FACTS.length - 1 ? '1px solid var(--clr-card-border-soft)' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--clr-muted)',
                    marginBottom: 6,
                  }}
                >
                  {fact.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 900,
                    fontSize: '1.75rem',
                    background: 'var(--grad-text-hero)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                  }}
                >
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pillars */}
        <div
          className="about-pillars"
          style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: '1fr' }}
        >
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              ref={(el) => (pillarsRef.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <div
                style={{
                  height: '100%',
                  padding: '1.75rem 1.6rem',
                  borderRadius: 20,
                  background: 'var(--clr-surface)',
                  border: `1px solid ${pillar.accent}28`,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 28px rgba(0,0,0,0.25)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg,${pillar.accent},${pillar.accent}00)`,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle,${pillar.accent}18,transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 800,
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: pillar.accent,
                    marginBottom: '0.85rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 900,
                    fontSize: '1.35rem',
                    color: 'var(--clr-text)',
                    marginBottom: '0.65rem',
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ color: 'var(--clr-muted)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-story { grid-template-columns: 1fr; }
        @media (min-width: 900px) {
          .about-story { grid-template-columns: 1.4fr 0.7fr; gap: 4rem; }
        }
        .about-pillars { grid-template-columns: 1fr; }
        @media (min-width: 640px) {
          .about-pillars { grid-template-columns: repeat(3, 1fr); }
        }
        [data-theme="light"] .about-pillars > div > div {
          background: #fff;
          box-shadow: 0 2px 18px rgba(0,0,0,0.07);
        }
      `}</style>
    </section>
  );
}
