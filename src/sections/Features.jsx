import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { features } from '../data/features';

gsap.registerPlugin(ScrollTrigger);

const PAL = ['#FF6B00','#8B5CF6','#00CFFF','#FF2D7A','#10B981','#F59E0B'];

/* ── CSS UI Mockups ── */
const Mockup0 = ({ a }) => ( /* Auth: Mobile OTP + 6 roles */
  <div style={{ marginTop: 'auto' }}>
    <div style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${a}35`, borderRadius: 14, padding: '0.9rem 1rem', backdropFilter: 'blur(8px)' }}>
      {/* Mobile OTP header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${a}25`, border: `1px solid ${a}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>📱</div>
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--clr-text)', fontFamily: 'var(--font-head)' }}>Mobile OTP Login</div>
          <div style={{ fontSize: '0.56rem', color: 'var(--clr-muted)' }}>+91 •••• •••• 42</div>
        </div>
      </div>
      {/* OTP boxes */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 10, justifyContent: 'center' }}>
        {[1,2,3,4,5,6].map((_,i) => <div key={i} style={{ width: 28, height: 30, borderRadius: 7, border: `1.5px solid ${i===3?a:`${a}35`}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: i<3?a:`${a}30`, background: i===3?`${a}18`:'transparent', fontWeight: 800 }}>{i<3?'●':''}</div>)}
      </div>
      <div style={{ background: a, borderRadius: 8, padding: '5px 0', textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', marginBottom: 10 }}>Verify & Continue</div>
      {/* Role selector */}
      <div style={{ fontSize: '0.55rem', color: 'var(--clr-muted)', marginBottom: 5, fontWeight: 600 }}>Register as</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
        {['Parent','School','Academy','Official','Guest','Skater'].map((r,i) => <div key={i} style={{ padding: '4px 2px', background: `${a}${i===5?'30':'10'}`, border: `1px solid ${a}${i===5?'55':'20'}`, borderRadius: 6, textAlign: 'center', fontSize: '0.5rem', fontWeight: 700, color: i===5?a:`${a}80` }}>{r}</div>)}
      </div>
    </div>
  </div>
);

const Mockup1 = ({ a }) => ( /* Digital ID card */
  <div style={{ marginTop: 'auto', animation: 'icon-float 3s ease-in-out infinite' }}>
    <div style={{ background: `linear-gradient(135deg,${a}25,${a}08)`, border: `1px solid ${a}50`, borderRadius: 14, padding: '0.9rem 1rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: `${a}20` }} />
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${a}30`, border: `1.5px solid ${a}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--clr-text)', fontFamily: 'var(--font-head)' }}>KRSA-KA-2026</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--clr-muted)' }}>Digital Identity Card</div>
        </div>
      </div>
      <div style={{ height: 1, background: `${a}30`, margin: '6px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {['Under-18','Speed','Karnataka'].map((t,i)=> <div key={i} style={{ fontSize: '0.55rem', padding: '2px 6px', borderRadius: 99, background: `${a}20`, color: a, border: `1px solid ${a}40`, fontWeight: 700 }}>{t}</div>)}
      </div>
    </div>
  </div>
);

const Mockup2 = ({ a }) => ( /* Championship events */
  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[['State Championship','May 18','Eligible'],['District Speed Cup','Jun 02','Register'],['Training Camp','Jun 15','Open']].map(([name,date,tag],i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: `rgba(255,255,255,${i===0?'0.07':'0.03'})`, border: `1px solid ${a}${i===0?'40':'20'}`, borderRadius: 10, padding: '7px 10px' }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: a, flexShrink: 0 }} />
        <div style={{ flex: 1, fontSize: '0.65rem', fontWeight: 700, color: 'var(--clr-text)', fontFamily: 'var(--font-head)' }}>{name}</div>
        <div style={{ fontSize: '0.55rem', color: 'var(--clr-muted)' }}>{date}</div>
        <div style={{ fontSize: '0.55rem', padding: '2px 7px', borderRadius: 99, background: `${a}25`, color: a, fontWeight: 700, border: `1px solid ${a}40` }}>{tag}</div>
      </div>
    ))}
  </div>
);

const Mockup3 = ({ a }) => ( /* Payment receipt */
  <div style={{ marginTop: 'auto', background: `rgba(255,255,255,0.05)`, border: `1px solid ${a}30`, borderRadius: 12, padding: '0.75rem', animation: 'icon-float 3.5s ease-in-out infinite' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--clr-text)', fontFamily: 'var(--font-head)' }}>Payment Confirmed</span>
      <span style={{ fontSize: '0.7rem' }}>✅</span>
    </div>
    {[['Registration Fee','₹ 500'],['Processing','₹ 18'],['Total','₹ 518']].map(([l,v],i) => (
      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderTop: i===2?`1px solid ${a}30`:'none', paddingTop: i===2?6:0, marginTop: i===2?4:0 }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--clr-muted)' }}>{l}</span>
        <span style={{ fontSize: '0.6rem', fontWeight: i===2?800:600, color: i===2?a:'var(--clr-text)' }}>{v}</span>
      </div>
    ))}
  </div>
);

const Mockup4 = ({ a }) => ( /* Calendar */
  <div style={{ marginTop: 'auto', background: `rgba(255,255,255,0.04)`, border: `1px solid ${a}30`, borderRadius: 12, overflow: 'hidden' }}>
    <div style={{ background: `${a}22`, padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 700, color: a, fontFamily: 'var(--font-head)' }}>MAY 2026</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {['◀','▶'].map((c,i)=> <span key={i} style={{ fontSize: '0.6rem', color: `${a}80`, cursor: 'default' }}>{c}</span>)}
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, padding: 6 }}>
      {['S','M','T','W','T','F','S'].map((d,i)=> <div key={i} style={{ textAlign: 'center', fontSize: '0.5rem', color: 'var(--clr-muted)', fontWeight: 700, paddingBottom: 2 }}>{d}</div>)}
      {[...Array(4)].map((_,i)=> <div key={i} style={{ height: 16 }} />)}
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(d=> (
        <div key={d} style={{ height: 16, borderRadius: 4, background: d===8?a:d===12||d===18?`${a}30`:'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.5rem', color: d===8?'#fff':d===12||d===18?a:'var(--clr-muted)', fontWeight: d===8?800:500 }}>{d}</span>
        </div>
      ))}
    </div>
  </div>
);

const Mockup5 = ({ a }) => ( /* Rankings */
  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
    {[['🥇','Arjun K.','1,240 pts'],['🥈','Priya M.','1,185 pts'],['🥉','Rohit S.','1,102 pts']].map(([m,n,p],i)=> (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: `rgba(255,255,255,${i===0?'0.07':'0.03'})`, border: `1px solid ${a}${i===0?'40':'20'}`, borderRadius: 10, padding: '6px 10px' }}>
        <span style={{ fontSize: 14 }}>{m}</span>
        <span style={{ flex: 1, fontSize: '0.65rem', fontWeight: 700, color: 'var(--clr-text)', fontFamily: 'var(--font-head)' }}>{n}</span>
        <span style={{ fontSize: '0.58rem', color: a, fontWeight: 700 }}>{p}</span>
      </div>
    ))}
  </div>
);

const MOCKUPS = [Mockup0, Mockup1, Mockup2, Mockup3, Mockup4, Mockup5];

function BentoCard({ feature, index, isHero }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafId   = useRef(null);
  const a = PAL[index % PAL.length];
  const M = MOCKUPS[index];

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || isHero) return;
    const xTo = gsap.quickTo(card, 'rotateY', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(card, 'rotateX', { duration: 0.45, ease: 'power3.out' });
    const onMove = (e) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 10);
        yTo(-((e.clientY - r.top) / r.height - 0.5) * 10);
        if (glow) { glow.style.setProperty('--gx', `${e.clientX - r.left}px`); glow.style.setProperty('--gy', `${e.clientY - r.top}px`); glow.style.opacity = '1'; }
        rafId.current = null;
      });
    };
    const onLeave = () => { xTo(0); yTo(0); if (glow) glow.style.opacity = '0'; cancelAnimationFrame(rafId.current); rafId.current = null; };
    card.addEventListener('mousemove', onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave, { passive: true });
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(rafId.current); };
  }, [isHero]);

  return (
    <div ref={cardRef} className={`bc ${isHero ? 'bc-hero' : ''}`}
      style={{ borderRadius: 20, position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d', willChange: 'transform', display: 'flex', flexDirection: 'column', height: '100%', minHeight: isHero ? 380 : 260, padding: '1.6rem' }}>
      {/* Cursor glow */}
      {!isHero && <div ref={glowRef} aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none', zIndex: 0, opacity: 0, transition: 'opacity 0.3s', background: `radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),${a}20,transparent 70%)` }} />}
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${a},${a}00)` }} />
      {/* Grid texture */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      {/* Ambient glow orb */}
      <div aria-hidden style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle,${a}20,transparent 70%)`, pointerEvents: 'none' }} />
      {/* Index */}
      <span style={{ position: 'absolute', top: '1.1rem', right: '1.2rem', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.58rem', color: `${a}70`, letterSpacing: '0.1em', zIndex: 1 }}>{String(index + 1).padStart(2,'0')}</span>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Title + desc */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: isHero ? '1.6rem' : '1.05rem', color: 'var(--clr-text)', lineHeight: 1.2, marginBottom: '0.5rem' }}>{feature.title}</h3>
          <p style={{ color: 'var(--clr-muted)', fontSize: isHero ? '0.9rem' : '0.8rem', lineHeight: 1.7 }}>{feature.description}</p>
        </div>
        {/* Mockup fills remaining height */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <M a={a} />
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cardsRef.current.filter(Boolean), {
        onEnter: (els) => gsap.fromTo(els,
          { opacity: 0, y: 60, scale: 0.91 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.11, ease: 'power4.out',
            onComplete() { els.forEach(el => el && (el.style.willChange = 'auto')); } }
        ),
        once: true, start: 'top 88%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="section-py" style={{ background: 'var(--clr-bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient light (like ref image) */}
      <div aria-hidden style={{ position: 'absolute', top: -200, left: -150, width: 700, height: 700, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle,rgba(60,100,255,0.08) 0%,transparent 65%)' }} />
      <div aria-hidden style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle,rgba(255,107,0,0.055) 0%,transparent 65%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, marginBottom: '1.25rem', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.28)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--clr-accent)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clr-accent)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            Platform Capabilities
          </span>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2.4rem,5vw,3.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--clr-text)', marginBottom: '1rem' }}>
            Built for{' '}<span style={{ background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Champions</span>
          </h2>
          <p style={{ color: 'var(--clr-muted)', fontSize: 'clamp(0.9rem,1.3vw,1rem)', lineHeight: 1.8, maxWidth: 520 }}>
            Every feature engineered for Karnataka's skating ecosystem — from grassroots registration to state championship management.
          </p>
        </motion.div>

        <div className="feat-bento">
          {/* Hero card */}
          <div ref={el => (cardsRef.current[0] = el)} className="feat-hero-cell" style={{ opacity: 0 }}>
            <div className="bc-wrap" style={{ '--ba': PAL[0] }}>
              <BentoCard feature={features[0]} index={0} isHero />
            </div>
          </div>
          {/* Rest */}
          {features.slice(1).map((f, i) => (
            <div key={f.id} ref={el => (cardsRef.current[i+1] = el)} style={{ opacity: 0, perspective: 900 }}>
              <div className="bc-wrap" style={{ '--ba': PAL[(i+1) % PAL.length] }}>
                <BentoCard feature={f} index={i+1} isHero={false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes icon-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

        /* Animated border — @property for conic-gradient spin */
        @property --ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes border-spin { to { --ang: 360deg; } }

        .bc-wrap {
          border-radius: 21px;
          padding: 1.5px;
          background: conic-gradient(from var(--ang), transparent 25%, var(--ba) 50%, transparent 75%);
          animation: border-spin 4s linear infinite;
          height: 100%;
        }
        .bc-wrap:hover { animation-duration: 1.5s; }

        /* Grid — all 6 cards equal: 3 cols × 2 rows */
        .feat-bento { display:grid; gap:1.25rem; grid-template-columns:1fr; }
        @media(min-width:640px) { .feat-bento { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1080px) {
          .feat-bento {
            grid-template-columns: repeat(3,1fr);
            grid-auto-rows: minmax(300px, 1fr);
          }
          /* Hero no longer spans — all equal */
          .feat-hero-cell { grid-column: span 1; grid-row: span 1; }
        }

        /* Card shell */
        .bc {
          background: var(--clr-surface);
          border: none;
          box-shadow: 0 4px 28px rgba(0,0,0,0.3);
          transition: box-shadow 0.35s ease;
          cursor: default;
          border-radius: 20px;
          height: 100%;
        }
        .bc:hover { box-shadow: 0 20px 56px rgba(0,0,0,0.5); }
        .bc-hero { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .bc-hero:hover { transform: translateY(-4px); }

        /* Light mode */
        [data-theme="light"] .bc { background:#fff; box-shadow:0 2px 18px rgba(0,0,0,0.07); }
        [data-theme="light"] .bc:hover { box-shadow:0 16px 44px rgba(0,0,0,0.12); }
        [data-theme="light"] .bc-wrap {
          background: conic-gradient(from var(--ang), transparent 25%, var(--ba) 50%, transparent 75%);
        }
      `}</style>
    </section>
  );
}
