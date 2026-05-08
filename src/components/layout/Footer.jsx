import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { staggerContainer, fadeUp } from '../../lib/variants';

const TwitterIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstagramIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const FacebookIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;

const SOCIAL      = [{ Icon:TwitterIcon, label:'Twitter / X', color:'#1D9BF0' },{ Icon:InstagramIcon, label:'Instagram', color:'#E1306C' },{ Icon:FacebookIcon, label:'Facebook', color:'#1877F2' }];
const PLATFORM    = [{ label:'Features',href:'#features'},{ label:'Disciplines',href:'#disciplines'},{ label:'How It Works',href:'#how-it-works'},{ label:'Download',href:'#download'}];
const ORGANISATION= [{ label:'About KRSA',href:'#about'},{ label:'Districts',href:'#districts'},{ label:'Clubs',href:'#clubs'},{ label:'News',href:'#news'}];
const SUPPORT     = [
  { label:'Delete Account',      href:'/delete-account', isRoute:  true },
  { label:'Contact',             href:'#contact',        isAnchor: true },
  { label:'Privacy Policy',      href:'/privacy-policy', isRoute:  true },
  { label:'Terms & Conditions',  href:'/terms',          isRoute:  true },
];

function FooterLink({ label, href, isRoute }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (isRoute) {
      navigate(href);
      return;
    }
    // Anchor-scroll link— if not on homepage, navigate home with scrollTo state
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'block',
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'var(--clr-muted)',
        fontSize: '0.9rem',
        textDecoration: 'none',
        lineHeight: 1.6,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'color 0.22s, transform 0.22s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--clr-accent)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--clr-muted)';  e.currentTarget.style.transform = ''; }}
    >
      {label}
    </button>
  );
}

export default function Footer() {
  const { ref, inView } = useScrollReveal({ threshold: 0.05 });
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <footer id="footer" ref={ref} style={{ background: 'var(--clr-surface)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Top gradient bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--grad-accent)' }} />
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.08) 0%, transparent 70%)' }} />

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}
          className="footer-grid"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <button
              aria-label="SkateKarnataka home"
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                } else {
                  document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.replaceState(null, '', window.location.pathname);
                }
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <div style={{ width: '54px', height: '54px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1.5px solid rgba(255,107,0,0.3)' }}>
                <img src="/logo.png" alt="KRSA logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.18rem', color: 'var(--clr-text)' }}>
                Skate Karnataka
              </span>
            </button>
            <p style={{ color: 'var(--clr-muted)', fontSize: '0.82rem', lineHeight: 1.75, maxWidth: '230px' }}>
              The official digital platform of the Karnataka Roller Skating Association,
              affiliated with the Roller Skating Federation of India.
            </p>

          </motion.div>

          {/* Link columns */}
          {[['Platform', PLATFORM], ['Organisation', ORGANISATION], ['Support', SUPPORT]].map(([title, links]) => (
            <motion.div key={title} variants={fadeUp}>
              <h4 style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 700,
                fontSize: '0.82rem',           /* ← increased from 0.65rem so headings are clearly visible */
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--clr-text)',       /* ← full text color, not muted, so it reads as a heading */
                marginBottom: '1.25rem',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {links.map(l => <FooterLink key={l.label} {...l} />)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div style={{ borderTop: '1px solid var(--clr-footer-border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>
          <p className="footer-bottom-text" style={{ color: 'var(--clr-muted)', fontSize: '0.78rem', flex: 1 }}>
            © 2026 Karnataka Roller Skating Association.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flex: 1 }}>
            {SOCIAL.map(({ Icon, label, color }) => (
              <button
                key={label}
                aria-label={label}
                title={label}
                style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  border: '1px solid var(--clr-social-btn-border)',
                  background: 'var(--clr-social-btn-bg)',
                  cursor: 'pointer', color: 'var(--clr-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; e.currentTarget.style.background = `${color}15`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--clr-social-btn-border)'; e.currentTarget.style.color = 'var(--clr-muted)'; e.currentTarget.style.background = 'var(--clr-social-btn-bg)'; e.currentTarget.style.transform = ''; }}
              >
                <Icon />
              </button>
            ))}
          </div>

          <span className="footer-bottom-text right" style={{ color: 'var(--clr-muted)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', flex: 1, textAlign: 'right' }}>
            Affiliated with RSFI
          </span>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr 1fr!important}
          .footer-bottom-text { text-align: center!important; flex: 1 1 100%!important; }
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </footer>
  );
}
