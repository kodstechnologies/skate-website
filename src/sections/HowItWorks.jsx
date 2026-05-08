import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeUp, staggerContainer } from '../lib/variants';
import { steps } from '../data/steps';

/* Per-step accent + image */
const STEP_META = [
  { color:'#FF6B00', img:'/images/step1_in.png', glow:'rgba(255,107,0,0.25)' },
  { color:'#8B5CF6', img:'/images/step2_in.png', glow:'rgba(139,92,246,0.25)' },
  { color:'#00CFFF', img:'/images/step3_in.png', glow:'rgba(0,207,255,0.25)'  },
  { color:'#FF2D7A', img:'/images/step4_in.png', glow:'rgba(255,45,122,0.25)' },
];

/* 3D tilt for image card */
function ImgTilt({ children }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rX = useSpring(useTransform(y,[-0.5,0.5],[8,-8]),{stiffness:160,damping:26});
  const rY = useSpring(useTransform(x,[-0.5,0.5],[-8,8]),{stiffness:160,damping:26});
  const sc = useSpring(1,{stiffness:180,damping:28});
  const onMove  = e => { const r=e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left)/r.width-.5); y.set((e.clientY-r.top)/r.height-.5); };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div style={{ rotateX:rX, rotateY:rY, scale:sc, transformStyle:'preserve-3d' }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onHoverStart={()=>sc.set(1.04)} onHoverEnd={()=>sc.set(1)}>
      {children}
    </motion.div>
  );
}

function StepRow({ step, index }) {
  // Using useScroll for smooth scroll parallax
  const { ref, inView } = useScrollReveal({ threshold:0.12 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax transform: from y: 40px when entering, to y: -40px when leaving
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const smoothY = useSpring(parallaxY, { stiffness: 60, damping: 20 });

  const meta = STEP_META[index];
  const isRight = index % 2 === 1; /* even = image right, odd = image left */

  const contentAnim = {
    hidden:  { opacity:0, x: isRight ? 40 : -40 },
    visible: { opacity:1, x:0, transition:{ duration:0.65, ease:[0.22,1,0.36,1] } },
  };
  const imgAnim = {
    hidden:  { opacity:0, x: isRight ? -40 : 40, scale:0.92 },
    visible: { opacity:1, x:0, scale:1, transition:{ duration:0.7, delay:0.1, ease:[0.22,1,0.36,1] } },
  };

  const Content = (
    <motion.div ref={ref} variants={contentAnim} initial="hidden" animate={inView?'visible':'hidden'}
      className="step-txt-wrap"
      style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
      {/* Step badge */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1.5rem' }}>
        <div style={{
          width:'52px', height:'52px', borderRadius:'50%',
          background:`${meta.color}18`, border:`2px solid ${meta.color}`,
          boxShadow:`0 0 0 6px ${meta.color}18, 0 0 24px ${meta.color}30`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'var(--font-head)', fontWeight:900, fontSize:'0.85rem', color:meta.color,
          flexShrink:0,
        }}>{step.id}</div>
        <div style={{ height:'1px', flex:1, background:`linear-gradient(90deg,${meta.color}50,transparent)` }}/>
      </div>

      {/* Card */}
      <div style={{
        background:'var(--clr-surface-2)', border:`1.5px solid ${meta.color}30`,
        borderRadius:'20px', padding:'2rem 2rem',
        boxShadow:`0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${meta.color}10`,
        position:'relative', overflow:'hidden',
        transition:'border-color 0.3s, box-shadow 0.3s',
        maxWidth:'460px',
      }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${meta.color}60`; e.currentTarget.style.boxShadow=`0 16px 56px rgba(0,0,0,0.5), 0 0 48px ${meta.glow}`; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${meta.color}30`; e.currentTarget.style.boxShadow='0 8px 40px rgba(0,0,0,0.4)'; }}
      >
        {/* Top accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
          background:`linear-gradient(90deg, ${meta.color}, transparent)` }}/>

        <h3 style={{ fontFamily:'var(--font-head)', fontWeight:900, fontSize:'1.4rem',
          color:'var(--clr-text)', marginBottom:'0.75rem' }}>{step.title}</h3>
        <p style={{ color:'var(--clr-muted)', fontSize:'0.95rem', lineHeight:1.8 }}>{step.description}</p>

        {/* Corner number watermark */}
        <div style={{ position:'absolute', bottom:'1rem', right:'1.5rem',
          fontFamily:'var(--font-head)', fontWeight:900, fontSize:'3.5rem',
          color:`${meta.color}12`, lineHeight:1, userSelect:'none' }}>{step.id}</div>
      </div>
    </motion.div>
  );

  const Image = (
    <motion.div variants={imgAnim} initial="hidden" animate={inView?'visible':'hidden'}
      className="step-img-wrap"
      style={{ perspective:'800px', display:'flex', alignItems:'center', justifyContent:'center', y: smoothY }}>
      <ImgTilt>
        <div style={{ position:'relative', borderRadius:'24px', overflow:'hidden',
          border:`1.5px solid ${meta.color}40`,
          boxShadow:`0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px ${meta.color}20, 0 0 60px ${meta.glow}` }}>
          {/* Image */}
          <img src={meta.img} alt={step.title} loading="lazy"
            style={{ width:'100%', height:'340px', objectFit:'cover', display:'block',
              filter:'brightness(0.9) contrast(1.1)' }}/>
          {/* Bottom overlay */}
          <div style={{ position:'absolute', inset:0,
            background:`linear-gradient(180deg, transparent 50%, var(--clr-image-overlay) 100%)` }}/>
          {/* Corner shine */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'1.5px',
            background:`linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}/>
          {/* Step label */}
          <div style={{
            position:'absolute', bottom:'16px', left:'16px',
            background:`${meta.color}22`, backdropFilter:'blur(10px)',
            border:`1px solid ${meta.color}50`, borderRadius:'999px',
            padding:'5px 14px', fontSize:'0.68rem', fontWeight:700,
            letterSpacing:'0.12em', textTransform:'uppercase', color:meta.color,
          }}>{step.title}</div>
        </div>
      </ImgTilt>
    </motion.div>
  );

  return (
    <div className="step-row" style={{
      display:'grid', gap:'4rem', alignItems:'center',
      marginBottom:'5rem',
    }}>
      {isRight ? <>{Content}{Image}</> : <>{Image}{Content}</>}
    </div>
  );
}

export default function HowItWorks() {
  const { ref, inView } = useScrollReveal({ threshold:0.05 });
  return (
    <section id="how-it-works" className="section-py" style={{
      background:'var(--clr-bg)', position:'relative', overflow:'hidden',
    }}>
      {/* Background watermark */}
      <div aria-hidden style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        fontFamily:'var(--font-head)', fontWeight:900, fontSize:'clamp(5rem,17vw,16rem)',
        color:'var(--clr-krsa-watermark)', letterSpacing:'-0.04em',
        userSelect:'none', pointerEvents:'none', whiteSpace:'nowrap' }}>KRSA</div>

      {/* Ambient orbs */}
      <div aria-hidden style={{ position:'absolute', top:'20%', right:'-100px', width:'400px', height:'400px',
        borderRadius:'50%', background:'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)', pointerEvents:'none' }}/>
      <div aria-hidden style={{ position:'absolute', bottom:'20%', left:'-80px', width:'350px', height:'350px',
        borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents:'none' }}/>

      <div className="container" style={{ position:'relative', zIndex:1 }}>

        {/* Header */}
        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={inView?'visible':'hidden'}
          style={{ textAlign:'center', marginBottom:'5rem', display:'flex', flexDirection:'column', alignItems:'center' }}>
          <motion.div variants={fadeUp} style={{ marginBottom:'1.25rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px',
              borderRadius:'999px', background:'rgba(0,207,255,0.08)', border:'1px solid rgba(0,207,255,0.25)',
              fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--clr-cyan)' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--clr-cyan)', animation:'pulse-dot 2s ease-in-out infinite' }}/>
              Process
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontFamily:'var(--font-head)', fontWeight:900,
            fontSize:'clamp(2.2rem,4.5vw,3.5rem)', lineHeight:1.08, letterSpacing:'-0.02em',
            color:'var(--clr-text)', marginBottom:'1rem' }}>
            Four Steps to Your{' '}
            <span style={{ background:'var(--grad-text-hero)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              First Race
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color:'var(--clr-muted)', fontSize:'clamp(0.9rem,1.3vw,1rem)',
            lineHeight:1.8, maxWidth:'480px' }}>
            Getting started is simple. Four steps from download to your first championship.
          </motion.p>
        </motion.div>

        {/* Steps */}
        {steps.map((step, i) => <StepRow key={step.id} step={step} index={i}/>)}
      </div>

      <style>{`
        .step-row { grid-template-columns: 1fr 1fr; }
        @media(max-width:900px) {
          .step-row { 
            grid-template-columns: 1fr !important; 
            gap: 2.5rem !important; 
            text-align: center;
          }
          .step-row .step-txt-wrap { order: 2; align-items: center; }
          .step-row .step-img-wrap { order: 1; }
        }
      `}</style>
    </section>
  );
}
