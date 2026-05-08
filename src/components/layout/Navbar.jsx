import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
const NAV_LINKS = [
  { label:'Features',     href:'#features'     },
  { label:'Disciplines',  href:'#disciplines'  },
  { label:'How It Works', href:'#how-it-works' },
  { label:'Download',     href:'#download'     },
];

const menuV = {
  hidden:  { x:'100%', opacity:0 },
  visible: { x:0, opacity:1, transition:{ duration:0.35, ease:[0.25,0.46,0.45,0.94] } },
  exit:    { x:'100%', opacity:0, transition:{ duration:0.28 } },
};
const linkV = {
  hidden:  { opacity:0, x:20 },
  visible: (i) => ({ opacity:1, x:0, transition:{ delay:i*0.07, duration:0.3 } }),
};

/* ── Sun / Moon toggle ── */
function ThemeToggleBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale:1.1 }}
      whileTap={{ scale:0.9 }}
      aria-label={theme==='dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width:'38px', height:'38px', borderRadius:'50%',
        background:'var(--clr-surface)',
        border:'1px solid var(--clr-card-border-soft)',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', color:'var(--clr-accent)',
        flexShrink:0, transition:'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 0 14px rgba(255,107,0,0.3)'; e.currentTarget.style.borderColor='var(--clr-accent)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='var(--clr-card-border-soft)'; }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={theme}
          initial={{ rotate:-90, opacity:0, scale:0.7 }}
          animate={{ rotate:0, opacity:1, scale:1 }}
          exit={{ rotate:90, opacity:0, scale:0.7 }}
          transition={{ duration:0.22 }}>
          {theme==='dark'
            ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

function Toast({ show }) {
  return (
    <AnimatePresence>
      {show && (
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
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('');
  const [toast,     setToast]     = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    const fn = () => { if(window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; }, [menuOpen]);

  const go = (href) => {
    setMenuOpen(false); setActive(href);
    if (location.pathname !== '/') {
      // Navigate to home passing the target section via state (no hash in URL)
      navigate('/', { state: { scrollTo: href } });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' });
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <>
      <nav aria-label="Main navigation" style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        transition:'all 0.35s ease',
        background: scrolled ? 'var(--clr-navbar-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--clr-card-border-soft)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.15)' : 'none',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'88px' }}>

          {/* LOGO — button, no <a>, no page reload */}
          <button
            aria-label="SkateKarnataka home"
            onClick={() => { if(location.pathname !== '/') { navigate('/'); } else { go('#home'); } }}
            style={{ display:'flex', alignItems:'center', gap:'10px', background:'none', border:'none', cursor:'pointer', flexShrink:0, padding:0 }}
          >
            <div style={{ width:'54px', height:'54px', borderRadius:'14px', overflow:'hidden', flexShrink:0,
              border:'2px solid rgba(255,107,0,0.45)', boxShadow:'0 0 22px rgba(255,107,0,0.3)' }}>
              <img src="/logo.png" alt="KRSA logo" width={54} height={54}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            </div>
            <span style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.18rem',
              color:'var(--clr-text)', letterSpacing:'-0.01em' }}>Skate Karnataka</span>
          </button>

          {/* DESKTOP RIGHT — all nav links + toggle + CTA on right side */}
          <div className="nav-desktop-right" style={{ display:'flex', alignItems:'center', gap:'2.2rem' }}>
            {/* Nav links */}
            {NAV_LINKS.map(link => (
              <button key={link.href}
                onClick={() => go(link.href)}
                style={{
                  position:'relative', fontFamily:'var(--font-body)', fontWeight:600,
                  fontSize:'0.88rem', letterSpacing:'0.06em', textTransform:'uppercase',
                  color: active===link.href ? 'var(--clr-accent)' : 'var(--clr-muted)',
                  background:'none', border:'none', cursor:'pointer',
                  transition:'color 0.2s', paddingBottom:'4px',
                }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--clr-accent)')}
                onMouseLeave={e=>(e.currentTarget.style.color=active===link.href?'var(--clr-accent)':'var(--clr-muted)')}
              >
                {link.label}
                {active===link.href && (
                  <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
                    width:4, height:4, borderRadius:'50%', background:'var(--clr-accent)' }}/>
                )}
              </button>
            ))}

            {/* Theme toggle — equal margin both sides */}
            <div style={{ margin:'0 0.75rem' }}>
              <ThemeToggleBtn />
            </div>

            <div style={{ width:'1px', height:'22px', background:'var(--clr-navbar-sep)', flexShrink:0 }}/>

            {/* CTA — pushed to far right */}
            <button id="nav-get-app"
              onClick={showToast}
              style={{
                position:'relative', display:'inline-flex', alignItems:'center', gap:'8px',
                padding:'11px 26px', borderRadius:'12px', marginLeft:'0.5rem', marginRight:'0.75rem',
                background:'var(--grad-accent)', color:'#fff', border:'none',
                fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.84rem',
                letterSpacing:'0.04em', cursor:'pointer', overflow:'hidden',
                boxShadow:'0 4px 20px rgba(255,107,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                transition:'transform 0.22s, box-shadow 0.22s',
              }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px) scale(1.04)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(255,107,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(255,107,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
            >
              <span style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.25) 50%,transparent 60%)', animation:'shimmer-sweep 2.8s linear infinite' }}/>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24" style={{ position:'relative' }}>
                <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/><path d="M4 20h16"/>
              </svg>
              <span style={{ position:'relative' }}>Get the App</span>
            </button>
          </div>

          {/* HAMBURGER */}
          <button id="nav-hamburger" aria-label={menuOpen?'Close menu':'Open menu'}
            onClick={()=>setMenuOpen(v=>!v)}
            style={{ display:'none', flexDirection:'column', justifyContent:'center', alignItems:'center',
              gap:'5px', width:'40px', height:'40px', background:'none', border:'none', cursor:'pointer', padding:0 }}>
            {[0,1,2].map(i=>(
              <span key={i} style={{ display:'block', width:22, height:2,
                background:'var(--clr-text)', borderRadius:2, transition:'transform 0.3s, opacity 0.2s',
                transform: i===0&&menuOpen?'translateY(7px) rotate(45deg)': i===2&&menuOpen?'translateY(-7px) rotate(-45deg)':'none',
                opacity: i===1&&menuOpen?0:1 }}/>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div variants={menuV} initial="hidden" animate="visible" exit="exit"
            style={{ position:'fixed', top:0, right:0, bottom:0, width:'min(320px,90vw)',
              background:'var(--clr-navbar-mobile)', backdropFilter:'blur(24px)',
              zIndex:99, padding:'100px 2rem 2rem',
              borderLeft:'1px solid var(--clr-card-border-soft)',
              display:'flex', flexDirection:'column', gap:'2rem',
              boxShadow:'-8px 0 40px rgba(0,0,0,0.3)' }}>
            {NAV_LINKS.map((link,i) => (
              <motion.button key={link.href} custom={i}
                variants={linkV} initial="hidden" animate="visible"
                onClick={() => go(link.href)}
                style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:'1.5rem',
                  color:'var(--clr-text)', background:'none', border:'none', cursor:'pointer',
                  borderBottom:'1px solid var(--clr-card-border-soft)', paddingBottom:'1.5rem',
                  textAlign:'left', transition:'color 0.2s' }}
                onMouseEnter={e=>(e.target.style.color='var(--clr-accent)')}
                onMouseLeave={e=>(e.target.style.color='var(--clr-text)')}>{link.label}</motion.button>
            ))}
            {/* Mobile theme toggle row */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              borderBottom:'1px solid var(--clr-card-border-soft)', paddingBottom:'1.5rem' }}>
              <span style={{ color:'var(--clr-muted)', fontSize:'0.9rem' }}>Theme</span>
              <ThemeToggleBtn />
            </div>
            <button onClick={()=>{ setMenuOpen(false); showToast(); }} style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
              padding:'13px 24px', borderRadius:'12px', background:'var(--grad-accent)',
              color:'#fff', fontWeight:700, fontSize:'0.9rem', border:'none', cursor:'pointer',
              boxShadow:'0 4px 20px rgba(255,107,0,0.4)' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/><path d="M4 20h16"/></svg>
              Get the App
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }} onClick={()=>setMenuOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:98 }}/>
        )}
      </AnimatePresence>
      <Toast show={toast} />
      <style>{`
        @media(max-width:767px){
          #nav-hamburger{display:flex!important}
          .nav-desktop-right{display:none!important}
        }
      `}</style>
    </>
  );
}
