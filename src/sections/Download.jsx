import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeUp, staggerContainer } from '../lib/variants';

const STORES = [
  { tag:'Android',           name:'Google Play', href:'#', color:'#34D399', icon:(
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2 2 0 01-1.18-1.8V2.04A2 2 0 013.18.28l11.9 11.74-11.9 11.74zM16.54 14.06l-2.5-2.46 2.5-2.46 2.96 1.64a1.5 1.5 0 010 2.64l-2.96 1.64zM4.5 1.1l10.2 10.06-2.12 2.08L4.5 1.1zm0 21.8l8.08-8.14 2.12 2.08L4.5 22.9z"/></svg>
  )},
  { tag:'iOS / iPadOS',      name:'App Store',   href:'#', color:'var(--clr-cyan)', icon:(
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04l-.07.28zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
  )},
  { tag:'For Admins & Clubs', name:'Web Portal', href:'#', color:'var(--clr-accent)', icon:(
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 010 20M2 12h20"/></svg>
  )},
];

export default function Download() {
  const { ref, inView } = useScrollReveal({ threshold:0.1 });
  const [toast, setToast] = useState(false);
  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 3000); };

  return (
    <section id="download" className="section-py" style={{
      background:'var(--clr-surface)', position:'relative', overflow:'hidden',
    }}>
      {/* Top divider */}
      <div aria-hidden style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'var(--grad-divider)' }}/>

      {/* Background ambient */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 55% 70% at 15% 50%, rgba(255,107,0,0.07) 0%, transparent 65%)' }}/>

      <div className="container" ref={ref} style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>

          {/* ── LEFT: Content ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate={inView?'visible':'hidden'}>

            <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1.5rem' }}>
              <div style={{ width:'28px', height:'2px', background:'var(--clr-accent)', borderRadius:'2px' }}/>
              <span style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em',
                textTransform:'uppercase', color:'var(--clr-accent)' }}>Download</span>
            </motion.div>

            <motion.h2 variants={fadeUp} style={{ fontFamily:'var(--font-head)', fontWeight:900,
              fontSize:'clamp(2.6rem,6vw,4.2rem)', lineHeight:1.05, color:'var(--clr-text)', marginBottom:'1.25rem' }}>
              Your Journey<br/>
              <span style={{ background:'var(--grad-text-hero)', WebkitBackgroundClip:'text',
                WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Starts Now</span>
            </motion.h2>

            <motion.p variants={fadeUp} style={{ color:'var(--clr-muted)', fontSize:'0.95rem',
              lineHeight:1.8, maxWidth:'420px', marginBottom:'2.75rem' }}>
              Download Skate Karnataka on Android or iOS. Register, get your KRSA ID, and join
              thousands of skaters already on the platform.
            </motion.p>

            <motion.div variants={staggerContainer} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {STORES.map(({ tag, name, color, icon }) => (
                <motion.button key={name} variants={fadeUp} onClick={showToast} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  width:'100%', textAlign:'left',
                  padding:'1.1rem 1.5rem',
                  background:'var(--clr-store-card-bg)',
                  border:'1px solid var(--clr-store-card-border)',
                  borderRadius:'16px', cursor:'pointer',
                  backdropFilter:'blur(8px)',
                  transition:'all 0.25s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${color}50`; e.currentTarget.style.background=`${color}0D`; e.currentTarget.style.transform='translateX(6px)'; e.currentTarget.style.boxShadow=`0 8px 32px rgba(0,0,0,0.3)`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--clr-store-card-border)'; e.currentTarget.style.background='var(--clr-store-card-bg)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'10px',
                      background:`${color}18`, border:`1px solid ${color}35`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.14em',
                        textTransform:'uppercase', color, marginBottom:'3px' }}>{tag}</div>
                      <div style={{ fontFamily:'var(--font-head)', fontWeight:800,
                        fontSize:'1.05rem', color:'var(--clr-text)' }}>{name}</div>
                    </div>
                  </div>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%',
                    border:`1px solid ${color}35`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="14" height="14" fill="none" stroke={color} strokeWidth="2.2" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Phone Image ── */}
          <motion.div
            initial={{ opacity:0, x:60, scale:0.9 }}
            animate={inView ? { opacity:1, x:0, scale:1 } : {}}
            transition={{ duration:0.8, delay:0.3, ease:[0.22,1,0.36,1] }}
            style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            {/* Glow behind phone */}
            <div style={{ position:'absolute', width:'320px', height:'320px', borderRadius:'50%',
              background:'radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)',
              pointerEvents:'none', animation:'glow-breathe 4s ease-in-out infinite' }}/>

            {/* Phone frame */}
            <motion.div
              animate={{ y:[0,-14,0] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'relative', zIndex:1 }}
            >
              <div style={{
                width:'280px', borderRadius:'32px', overflow:'hidden',
                border:'2px solid rgba(255,107,0,0.3)',
                boxShadow:'0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,107,0,0.2)',
              }}>
                <img src="/images/download_hero.png" alt="Skate Karnataka App"
                  style={{ width:'100%', height:'auto', display:'block' }}/>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity:0, y:-60, scale:0.88 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-60, scale:0.88 }}
            transition={{ type:'spring', stiffness:280, damping:22 }}
            style={{
              position:'fixed', top:'100px',
              left:0, right:0, margin:'0 auto',
              width:'fit-content', maxWidth:'90vw',
              zIndex:9999, display:'flex', alignItems:'center', gap:'14px',
              background:'var(--clr-surface-2)', border:'1.5px solid var(--clr-accent)',
              borderRadius:'18px', padding:'16px 32px',
              boxShadow:'0 12px 60px rgba(255,107,0,0.3), 0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ fontSize:'1.6rem' }}>🚀</span>
            <div>
              <div style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.1rem', color:'var(--clr-text)', marginBottom:3 }}>Coming Soon!</div>
              <div style={{ fontSize:'0.85rem', color:'var(--clr-muted)' }}>App launching shortly — stay tuned!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:768px){#download>.container>div{grid-template-columns:1fr!important}#download>.container>div>div:last-child{display:none!important}}`}</style>
    </section>
  );
}
