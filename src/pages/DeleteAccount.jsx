import { useState, useEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Trash2, ShieldAlert, IdCard, Phone, Sparkles } from 'lucide-react';


/* ─── Floating particle ───────────────────────────────────────── */
function Particle({ style }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--clr-accent)',
        opacity: 0.18,
        ...style,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.18, 0.45, 0.18],
        scale: [1, 1.4, 1],
      }}
      transition={{ duration: style.duration ?? 4, repeat: Infinity, ease: 'easeInOut', delay: style.delay ?? 0 }}
    />
  );
}

/* ─── Styled input ────────────────────────────────────────────── */
function StyledInput({ icon: Icon, label, value, onChange, placeholder, type = 'text', accent, maxLength, style: extraStyle = {} }) {
  const [focused, setFocused] = useState(false);
  const inputStyle = {
    width: '100%',
    padding: '14px 16px 14px 48px',
    borderRadius: 10,
    border: `1.5px solid ${focused ? (accent || 'var(--clr-accent)') : 'var(--clr-border)'}`,
    background: 'var(--clr-bg)',
    color: 'var(--clr-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow: focused ? `0 0 0 3px ${accent ? accent + '22' : 'rgba(255,107,0,0.14)'}` : 'none',
    ...extraStyle,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ color: 'var(--clr-muted-2)', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused ? (accent || 'var(--clr-accent)') : 'var(--clr-muted)', transition: 'color 0.25s', display: 'flex', alignItems: 'center' }}>
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      </div>
    </div>
  );
}

/* ─── Step indicator ──────────────────────────────────────────── */
function StepDots({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
      {[1, 2].map(n => (
        <Fragment key={n}>
          <motion.div
            animate={{ width: current === n ? 28 : 10, background: current === n ? 'var(--clr-accent)' : 'var(--clr-border)' }}
            transition={{ duration: 0.4 }}
            style={{ height: 10, borderRadius: 999 }}
          />
          {n === 1 && <div style={{ width: 24, height: 1, background: 'var(--clr-border)' }} />}
        </Fragment>
      ))}
    </div>
  );
}

/* ─── Quote card ──────────────────────────────────────────────── */
function QuoteCard({ english, kannada, accentColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      style={{
        background: 'var(--clr-surface-2)',
        border: '1px solid var(--clr-border)',
        borderRadius: 12,
        padding: '20px 20px 20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Colored left accent */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: accentColor, borderRadius: '4px 0 0 4px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ color: 'var(--clr-muted-2)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
          &ldquo;{english}&rdquo;
        </p>
        <p style={{ color: accentColor, fontFamily: 'var(--font-head)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0, opacity: 0.9 }}>
          {kannada}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function DeleteAccount() {
  const [step, setStep] = useState(1);
  const [krsaId, setKrsaId] = useState('');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Animate ambient orbs
    gsap.to(orbRef1.current, { x: 40, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orbRef2.current, { x: -40, y: 30, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    // Card entrance
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!krsaId.trim() || !contact.trim()) { setMessage('Please fill in both KRSA ID and Email/Phone.'); return; }
    setMessage('');
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setStep(2); }, 1400);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp.trim()) { setMessage('Please enter the OTP.'); return; }
    setMessage('');
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); navigate('/'); }, 1500);
  };

  /* shared styles */
  const pageStyle = {
    flex: 1,
    background: 'var(--clr-bg)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  };
  const centerStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 24px 64px',
  };
  const cardStyle = {
    width: '100%',
    maxWidth: 520,
    background: 'var(--clr-surface)',
    border: '1px solid var(--clr-border)',
    borderRadius: 24,
    padding: '48px 40px 40px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-hover)',
  };
  const btnBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 24px',
    borderRadius: 12,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.25s',
  };

  const particles = [
    { top: '15%', left: '8%', duration: 5, delay: 0 },
    { top: '65%', left: '5%', duration: 6, delay: 1.2 },
    { top: '30%', right: '7%', duration: 4.5, delay: 0.5 },
    { top: '75%', right: '12%', duration: 7, delay: 2 },
    { top: '50%', left: '50%', duration: 5.5, delay: 0.8 },
  ];

  const stepGlow = step === 1 ? 'rgba(255,107,0,0.22)' : 'rgba(255,45,122,0.22)';




  return (
    <>
      <div style={pageStyle}>
     
        <div ref={orbRef1} style={{ position: 'absolute', top: '10%', left: '5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div ref={orbRef2} style={{ position: 'absolute', bottom: '8%', right: '5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,45,122,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {particles.map((p, i) => <Particle key={i} style={p} />)}

        <div style={centerStyle}>
          <div ref={cardRef} style={cardStyle}>
            {/* Top accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: step === 1 ? 'var(--grad-accent)' : 'var(--clr-pink)', borderRadius: '24px 24px 0 0' }} />
            {/* Corner glow */}
            <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 220, height: 120, background: `radial-gradient(ellipse, ${stepGlow} 0%, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Step dots */}
            <StepDots current={step} />

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
                >
                  {/* Icon + heading */}
                  <div style={{ textAlign: 'center' }}>
                    <motion.div
                      animate={{ rotate: [0, -6, 6, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,107,0,0.1)', border: '1.5px solid rgba(255,107,0,0.25)', color: 'var(--clr-accent)', marginBottom: 16, boxShadow: '0 0 32px rgba(255,107,0,0.15)' }}
                    >
                      <Trash2 size={30} strokeWidth={1.5} />
                    </motion.div>
                    <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 800, color: 'var(--clr-text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                      Delete Account
                    </h1>
                    <p style={{ color: 'var(--clr-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                      This action will permanently erase all your KRSA data.
                    </p>
                  </div>

                  {/* Quote */}
                  <QuoteCard
                    accentColor="var(--clr-accent)"
                    english="We are sad to see you go... Remember, skating has immense health benefits and keeps you fit for life."
                    kannada="ನಾವು ನೀವು ಹೋಗುವುದನ್ನು ನೋಡಲು ದುಃಖಿತರಾಗಿದ್ದೇವೆ... ಸ್ಕೇಟಿಂಗ್ ಅಪಾರ ಆರೋಗ್ಯ ಪ್ರಯೋಜನಗಳನ್ನು ಹೊಂದಿದೆ ಮತ್ತು ನಿಮ್ಮನ್ನು ಸದೃಢವಾಗಿರಿಸುತ್ತದೆ."
                  />

                  {/* Form */}
                  <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <AnimatePresence>
                      {message && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,45,122,0.08)', border: '1px solid rgba(255,45,122,0.25)', color: 'var(--clr-pink)', fontSize: '0.875rem' }}>
                          <AlertCircle size={16} /> {message}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <StyledInput icon={IdCard} label="KRSA ID" value={krsaId} onChange={e => setKrsaId(e.target.value)} placeholder="e.g. KRSA-2026-1024" />
                    <StyledInput icon={Phone} label="Email or Phone Number" value={contact} onChange={e => setContact(e.target.value)} placeholder="Registered email or phone" />

                    <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 20, borderTop: '1px solid var(--clr-border)' }}>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => navigate(-1)}
                        style={{ ...btnBaseStyle, flex: 1, background: 'var(--clr-surface-2)', color: 'var(--clr-text)', border: '1px solid var(--clr-border)' }}>
                        <ArrowLeft size={17} /> Go Back
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02, boxShadow: 'var(--glow-accent)' }} whileTap={{ scale: 0.97 }} type="submit" disabled={isSubmitting}
                        style={{ ...btnBaseStyle, flex: 1, background: 'var(--grad-accent)', color: '#fff', opacity: isSubmitting ? 0.65 : 1 }}>
                        {isSubmitting ? <><Sparkles size={16} className="spin" /> Sending…</> : <><Send size={16} /> Send OTP</>}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
                >
                  {/* Icon + heading */}
                  <div style={{ textAlign: 'center' }}>
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,45,122,0.1)', border: '1.5px solid rgba(255,45,122,0.25)', color: 'var(--clr-pink)', marginBottom: 16, boxShadow: '0 0 32px rgba(255,45,122,0.2)' }}
                    >
                      <ShieldAlert size={30} strokeWidth={1.5} />
                    </motion.div>
                    <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 800, color: 'var(--clr-text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                      Verify Deletion
                    </h1>
                    <p style={{ color: 'var(--clr-muted)', fontSize: '0.9rem', margin: 0 }}>
                      Code sent to <span style={{ color: 'var(--clr-text)', fontWeight: 600 }}>{contact}</span>
                    </p>
                  </div>

                  {/* Quote */}
                  <QuoteCard
                    accentColor="var(--clr-pink)"
                    english="You can still change your mind. Skating is wonderful for your physical and mental health — don't give up!"
                    kannada="ನಿಮ್ಮ ಮನಸ್ಸು ಬದಲಾಯಿಸಲು ಇನ್ನೂ ಸಮಯವಿದೆ. ಸ್ಕೇಟಿಂಗ್ ನಿಮ್ಮ ದೈಹಿಕ ಮತ್ತು ಮಾನಸಿಕ ಆರೋಗ್ಯಕ್ಕೆ ಅದ್ಭುತವಾಗಿದೆ!"
                  />

                  {/* OTP Form */}
                  <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <AnimatePresence>
                      {message && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,45,122,0.08)', border: '1px solid rgba(255,45,122,0.25)', color: 'var(--clr-pink)', fontSize: '0.875rem' }}>
                          <AlertCircle size={16} /> {message}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ color: 'var(--clr-muted-2)', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>Enter 6-digit OTP</label>
                      <OtpInput value={otp} onChange={setOtp} />
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 20, borderTop: '1px solid var(--clr-border)' }}>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setStep(1)}
                        style={{ ...btnBaseStyle, flex: 1, background: 'var(--clr-surface-2)', color: 'var(--clr-text)', border: '1px solid var(--clr-border)' }}>
                        <ArrowLeft size={17} /> Go Back
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(220,38,38,0.45)' }} whileTap={{ scale: 0.97 }} type="submit" disabled={isSubmitting}
                        style={{ ...btnBaseStyle, flex: 1, background: '#DC2626', color: '#fff', opacity: isSubmitting ? 0.65 : 1 }}>
                        {isSubmitting ? 'Verifying…' : <><CheckCircle size={16} /> Confirm Delete</>}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>



        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .spin { animation: spin 1.2s linear infinite; }
          ::placeholder { color: var(--clr-muted) !important; opacity: 1; }
        `}</style>
      </div>
    </>
  );
}

/* ─── Individual OTP boxes ────────────────────────────────────── */
function OtpInput({ value, onChange }) {
  const refs = useRef([]);
  const digits = value.padEnd(6, '').split('').slice(0, 6);

  const handleKey = (e, idx) => {
    if (e.key === 'Backspace') {
      const next = value.slice(0, idx === 0 ? 0 : idx);
      onChange(next);
      if (idx > 0) refs.current[idx - 1]?.focus();
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = (value.slice(0, idx) + e.key + value.slice(idx + 1)).slice(0, 6);
    onChange(next);
    if (idx < 5) refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(text);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <motion.input
          key={i}
          ref={el => refs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] === ' ' ? '' : digits[i]}
          onKeyDown={e => handleKey(e, i)}
          onPaste={handlePaste}
          onChange={() => {}}
          whileFocus={{ scale: 1.08, borderColor: 'var(--clr-pink)' }}
          style={{
            width: 52,
            height: 58,
            borderRadius: 12,
            border: `2px solid ${digits[i] && digits[i] !== ' ' ? 'var(--clr-pink)' : 'var(--clr-border)'}`,
            background: 'var(--clr-bg)',
            color: 'var(--clr-text)',
            fontSize: '1.5rem',
            fontFamily: 'var(--font-head)',
            fontWeight: 700,
            textAlign: 'center',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: digits[i] && digits[i] !== ' ' ? '0 0 0 3px rgba(255,45,122,0.15)' : 'none',
          }}
        />
      ))}
    </div>
  );
}
