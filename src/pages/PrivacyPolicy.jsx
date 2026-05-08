import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';

const SECTIONS = [
  { id: 1,  title: 'Information We Collect',                content: 'KRSA may collect personal information including full name, date of birth, address, district, club affiliation, RSFI number, email address, phone number, photographs, and identification records required for athlete management and administrative operations.' },
  { id: 2,  title: 'Sensitive Documents and Verification Data', content: 'The platform may collect Aadhaar documents, school bonafide certificates, registration forms, NOCs, passport-size photographs, and other verification documents for identity validation, eligibility assessment, and digital ID generation.' },
  { id: 3,  title: 'Transaction and Payment Information',    content: 'Transaction records relating to championships, trainings, seminars, sponsorships, or donations may be collected and maintained. Payment processing is performed through authorized third-party payment providers.' },
  { id: 4,  title: 'Technical and Usage Data',              content: 'KRSA may collect device information, IP addresses, browser details, login timestamps, session activity, audit logs, and system interaction data for operational monitoring, analytics, and security enforcement.' },
  { id: 5,  title: 'Purpose of Data Usage',                 content: 'Collected information is used for registration processing, skater ID generation, championship participation, rankings, result management, event communication, training enrollment, certificate issuance, support services, audit compliance, and administrative workflows.' },
  { id: 6,  title: 'Data Mapping and Administrative Visibility', content: 'User data may be mapped according to district, club, discipline, or administrative hierarchy. District and club administrators shall only access data relevant to their authorized jurisdiction.' },
  { id: 7,  title: 'Data Security Measures',                content: 'KRSA implements encryption, access controls, secure authentication, audit trails, restricted administrative permissions, and monitoring systems to protect data against unauthorized access, disclosure, misuse, or alteration.' },
  { id: 8,  title: 'Data Retention',                       content: 'KRSA may retain user records, registrations, rankings, certificates, payment history, and administrative logs for operational, legal, audit, archival, and federation compliance purposes.' },
  { id: 9,  title: 'Third-Party Sharing',                  content: 'Information may be shared with payment processors, technical committees, district authorities, event organizers, and RSFI where necessary for legitimate operational, verification, competition, or compliance purposes.' },
  { id: 10, title: 'Children and Minor Users',              content: 'Registrations involving minors must be submitted or approved by parents or legal guardians. Guardians confirm that all submitted data is accurate and lawfully provided.' },
  { id: 11, title: 'Cookies and Analytics',                 content: 'The web platform may use cookies, analytics tools, session identifiers, and similar technologies to improve functionality, optimize performance, and enhance user experience.' },
  { id: 12, title: 'User Rights',                          content: 'Users may access their dashboard, review uploaded documents, request corrections to profile information, access approved certificates, and submit support or grievance requests through official channels.' },
  { id: 13, title: 'Restrictions and Abuse Prevention',    content: 'KRSA reserves the right to investigate suspicious activities, fraudulent registrations, unauthorized access attempts, abusive behavior, or misuse of platform services.' },
  { id: 14, title: 'International and Legal Compliance',   content: 'KRSA processes information in accordance with applicable Indian laws, sports governance requirements, and lawful regulatory obligations.' },
  { id: 15, title: 'Policy Updates',                       content: 'KRSA may update this Privacy Policy periodically to reflect operational, legal, technical, or regulatory changes. Continued use of the platform indicates acceptance of the revised policy.' },
  { id: 16, title: 'Contact and Grievance Support',        content: 'Users may contact KRSA through official communication channels for privacy concerns, data correction requests, compliance matters, or grievance resolution.' },
];

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

function AccordionItem({ section, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ borderRadius: '14px', border: `1px solid ${open ? 'rgba(255,107,0,0.35)' : 'var(--clr-border-2)'}`, background: 'var(--clr-surface)', overflow: 'hidden', boxShadow: open ? '0 8px 32px rgba(255,107,0,0.10)' : 'var(--shadow-card)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ minWidth: '36px', height: '36px', borderRadius: '10px', background: open ? 'var(--grad-accent)' : 'var(--clr-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.78rem', color: open ? '#fff' : 'var(--clr-muted-2)', transition: 'all 0.3s', flexShrink: 0 }}>
          {String(section.id).padStart(2, '0')}
        </span>
        <span style={{ flex: 1, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: open ? 'var(--clr-accent)' : 'var(--clr-text)', transition: 'color 0.25s', lineHeight: 1.3 }}>
          {section.title}
        </span>
        <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--clr-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem 1.35rem 4.5rem', color: 'var(--clr-muted-2)', fontSize: '0.9rem', lineHeight: 1.85, borderTop: '1px solid var(--clr-border)' }}>
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <PageLayout title="Privacy Policy">
      {/* Ambient glow */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2.5rem,6vw,5rem) 0 clamp(1.5rem,3vw,2.5rem)' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '280px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--clr-dot-grid) 1px, transparent 1px), linear-gradient(90deg, var(--clr-dot-grid) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2rem)', position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)', borderRadius: '999px', padding: '0.3rem 0.9rem', marginBottom: '1.4rem' }}>
            <span style={{ color: 'var(--clr-accent)' }}><ShieldIcon /></span>
            <span style={{ color: 'var(--clr-accent)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>KRSA Digital Ecosystem</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--clr-text)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Privacy{' '}
            <span style={{ background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Policy</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{ color: 'var(--clr-muted-2)', fontSize: 'clamp(0.88rem,2vw,1rem)', maxWidth: '540px', margin: '0 auto 1.2rem', lineHeight: 1.75 }}>
            This Privacy Policy explains how the Karnataka Roller Skating Association (KRSA) collects, processes, stores, protects, and uses information within the KRSA Digital Ecosystem.
          </motion.p>

          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
            style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
            Last updated: May 2026
          </motion.span>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--grad-divider)', maxWidth: '860px', margin: '0 auto' }} />

      {/* Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(2rem,5vw,3rem) clamp(1rem,4vw,2rem) clamp(3rem,6vw,5rem)' }}>



        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {SECTIONS.map((s, i) => <AccordionItem key={s.id} section={s} index={i} />)}
        </div>

        {/* Back button (moved to bottom) */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => navigate('/')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--clr-surface)', border: '1px solid var(--clr-border-2)', borderRadius: '10px', padding: '0.55rem 1.1rem', color: 'var(--clr-text)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.22s ease', boxShadow: 'var(--shadow-card)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--clr-accent)'; e.currentTarget.style.color = 'var(--clr-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--clr-border-2)'; e.currentTarget.style.color = 'var(--clr-text)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back to Home
          </button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
