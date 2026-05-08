import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';

const SECTIONS = [
  { id: 1,  title: 'Acceptance of Terms',                       content: 'By accessing, registering, or using the KRSA Digital Ecosystem, all users agree to comply with these Terms & Conditions. Continued use of the platform constitutes legally binding acceptance of all policies, procedures, operational rules, and future amendments issued by KRSA.' },
  { id: 2,  title: 'Definitions',                               content: 'KRSA refers to the Karnataka Roller Skating Association. RSFI refers to the Roller Skating Federation of India. OTP means One-Time Password. RBAC means Role-Based Access Control. User includes skaters, parents, coaches, officials, district administrators, club administrators, technical committee members, and super administrators.' },
  { id: 3,  title: 'Eligibility and Registration',              content: 'Users must provide complete, accurate, and verifiable information during registration. Registration may require Aadhaar details, school certificates, RSFI details, photographs, and supporting documents. KRSA reserves the right to suspend or reject incomplete or inaccurate registrations without prior notice.' },
  { id: 4,  title: 'OTP Authentication and Account Security',   content: 'The platform uses mandatory OTP-based authentication. OTPs are time-bound, single-use, and confidential. Users are responsible for safeguarding their login credentials, device access, and session security. KRSA shall not be liable for unauthorized access caused by negligence or credential sharing.' },
  { id: 5,  title: 'Parent and Family Registration Logic',      content: 'The system may permit registration of up to two children under a single parent email address. Parents or guardians submitting registrations on behalf of minors confirm that all information provided is lawful, accurate, and submitted with valid consent.' },
  { id: 6,  title: 'Document Verification and KYC',             content: 'All uploaded documents are subject to administrative verification. Submission of forged, manipulated, expired, or fraudulent documents is strictly prohibited and may result in immediate account suspension, event disqualification, permanent blocking, and legal action.' },
  { id: 7,  title: 'Championship, Training, and Seminar Registration', content: 'Users may register for championships, trainings, seminars, and official events only after successful profile verification. KRSA reserves the right to deny participation if age category requirements, discipline eligibility, mandatory documents, payment obligations, or approval workflows are not satisfied.' },
  { id: 8,  title: 'Payments and Financial Transactions',       content: 'All online payments are processed through authorized third-party payment gateways. KRSA does not store complete card or banking credentials. Registration is confirmed only after successful payment authorization and receipt generation. Failed or interrupted transactions shall not create a valid registration until payment confirmation is completed.' },
  { id: 9,  title: 'Refunds and Cancellations',                 content: 'Refund eligibility, cancellation timelines, and processing rules shall be governed by KRSA event policies. Administrative fees, gateway charges, and processing fees may be non-refundable. KRSA reserves the right to cancel, postpone, or reschedule events due to operational, technical, legal, or safety reasons.' },
  { id: 10, title: 'Digital Certificates and Virtual IDs',      content: 'Digital certificates, KRSA IDs, rankings, and virtual identification cards are official digital assets of KRSA. Certificates shall only become downloadable after successful administrative approval. Unauthorized duplication, modification, misuse, or distribution is prohibited.' },
  { id: 11, title: 'Media, Gallery, and User Content',          content: 'Only authorized administrators may upload official gallery content. User feedback submissions may include text and images and are subject to moderation before publication. Video uploads may be restricted by duration and file format limitations.' },
  { id: 12, title: 'Role-Based Access Control',                 content: 'Access to data and administrative functions is governed by RBAC. Users shall not attempt to bypass permissions, manipulate workflows, access unauthorized records, exploit vulnerabilities, or interfere with system operations.' },
  { id: 13, title: 'Intellectual Property Rights',              content: 'All platform content, including logos, designs, software, workflows, certificates, rankings, graphics, documents, and administrative systems are owned by KRSA or its licensors. Users receive a limited, non-transferable, revocable right to access the platform for authorized purposes only.' },
  { id: 14, title: 'Data Accuracy and User Responsibility',     content: 'Users are responsible for ensuring that profile information, uploaded documents, contact details, and event submissions remain accurate and updated. KRSA shall not be responsible for losses caused by incorrect or outdated user information.' },
  { id: 15, title: 'System Availability and Technical Limitations', content: 'KRSA aims to maintain high system availability but does not guarantee uninterrupted access. Temporary downtime may occur due to maintenance, upgrades, server issues, network failures, cyber incidents, or third-party dependencies.' },
  { id: 16, title: 'Limitation of Liability',                   content: 'KRSA shall not be liable for indirect, incidental, consequential, or financial damages arising from service interruptions, payment failures, data transmission delays, third-party gateway failures, unauthorized access, or force majeure events.' },
  { id: 17, title: 'Suspension and Termination',                content: 'KRSA reserves the right to suspend, restrict, or permanently terminate any account that violates these Terms, engages in fraudulent conduct, abuses the platform, attempts unauthorized access, or disrupts system operations.' },
  { id: 18, title: 'Compliance and Legal Obligations',          content: 'Users agree to comply with all applicable Indian laws, digital regulations, and sports governance policies. KRSA may disclose information when required by legal authorities, courts, government agencies, or regulatory bodies.' },
  { id: 19, title: 'Amendments',                               content: 'KRSA may revise or update these Terms & Conditions at any time without prior notice. Continued use of the platform after modifications constitutes acceptance of the revised terms.' },
  { id: 20, title: 'Contact Information',                       content: 'For support, disputes, compliance issues, or legal communication, users may contact the Karnataka Roller Skating Association through official communication channels provided within the application or administrative portal.' },
];

const ScrollIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

function AccordionItem({ section, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        borderRadius: '14px',
        border: `1px solid ${open ? 'rgba(255,107,0,0.35)' : 'var(--clr-border-2)'}`,
        background: 'var(--clr-surface)', overflow: 'hidden',
        boxShadow: open ? '0 8px 32px rgba(255,107,0,0.10)' : 'var(--shadow-card)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
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
          <motion.div key="body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem 1.35rem 4.5rem', color: 'var(--clr-muted-2)', fontSize: '0.9rem', lineHeight: 1.85, borderTop: '1px solid var(--clr-border)' }}>
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <PageLayout title="Terms & Conditions">
      {/* Hero header */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2.5rem,6vw,5rem) 0 clamp(1.5rem,3vw,2.5rem)' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '280px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--clr-dot-grid) 1px, transparent 1px), linear-gradient(90deg, var(--clr-dot-grid) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2rem)', position: 'relative', textAlign: 'center' }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)', borderRadius: '999px', padding: '0.3rem 0.9rem', marginBottom: '1.4rem' }}>
            <span style={{ color: 'var(--clr-accent)' }}><ScrollIcon /></span>
            <span style={{ color: 'var(--clr-accent)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>KRSA Digital Ecosystem</span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--clr-text)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Terms &amp;{' '}
            <span style={{ background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Conditions</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{ color: 'var(--clr-muted-2)', fontSize: 'clamp(0.88rem,2vw,1rem)', maxWidth: '560px', margin: '0 auto 1.2rem', lineHeight: 1.75 }}>
            These Terms &amp; Conditions govern the use of the KRSA Digital Ecosystem, including the mobile application, web platform, administrative dashboard, and all related services operated by KRSA.
          </motion.p>

          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
            Last updated: May 2026
          </motion.span>
        </div>
      </div>

      {/* Divider */}
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
