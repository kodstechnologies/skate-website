import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const h3 = {
  fontFamily: 'var(--font-head)',
  fontWeight: 700,
  fontSize: 'clamp(1.05rem,2.2vw,1.2rem)',
  color: 'var(--clr-text)',
  margin: '2rem 0 0.75rem',
  lineHeight: 1.3,
};

const p = {
  color: 'var(--clr-muted-2)',
  fontSize: '0.95rem',
  lineHeight: 1.85,
  margin: '0 0 0.75rem',
};

const ul = {
  margin: '0 0 0.75rem',
  paddingLeft: '1.25rem',
  color: 'var(--clr-muted-2)',
  fontSize: '0.95rem',
  lineHeight: 1.85,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.45rem',
};

const strong = { color: 'var(--clr-text)', fontWeight: 600 };

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <PageLayout title="Privacy Policy">
      <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2.5rem,6vw,5rem) 0 clamp(1.5rem,3vw,2.5rem)' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '280px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--clr-dot-grid) 1px, transparent 1px), linear-gradient(90deg, var(--clr-dot-grid) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2rem)', position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)', borderRadius: '999px', padding: '0.3rem 0.9rem', marginBottom: '1.4rem' }}>
            <span style={{ color: 'var(--clr-accent)' }}><ShieldIcon /></span>
            <span style={{ color: 'var(--clr-accent)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Skate Karnataka</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--clr-text)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Privacy{' '}
            <span style={{ background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Policy</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
              Effective Date: July 14, 2026
            </span>
            <span style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
              Data Fiduciary: Karnataka Roller Skating Association (KRSA)
            </span>
            <span style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
              App Covered: Skate Karnataka Mobile Application
            </span>
          </motion.div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--grad-divider)', maxWidth: '860px', margin: '0 auto' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(2rem,5vw,3rem) clamp(1rem,4vw,2rem) clamp(3rem,6vw,5rem)' }}>
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <h2 style={{ ...h3, marginTop: 0, fontSize: 'clamp(1.15rem,2.5vw,1.35rem)', color: 'var(--clr-accent)' }}>
            PRIVACY POLICY FOR SKATE KARNATAKA
          </h2>

          <p style={p}>
            At the Karnataka Roller Skating Association (KRSA), we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and process your personal data in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 of India, when you access and use the Skate Karnataka mobile application and its associated Web Admin Panel.
          </p>
          <p style={p}>
            Please read this Privacy Policy carefully to understand our practices regarding your personal data.
          </p>

          <h3 style={h3}>1. Information We Collect</h3>
          <p style={p}>We collect personal data to authenticate your identity, manage club affiliations, process event registrations, and administer state-level sports tournaments.</p>
          <ul style={ul}>
            <li><span style={strong}>Basic Identity &amp; Contact Information:</span> Full Name, Address, selected District, Gender, Email Address, and Contact Number.</li>
            <li><span style={strong}>Association Details:</span> Role classification (e.g., Skater, Parent, School, Academy, Officials, Guest) and RFSI ID.</li>
            <li><span style={strong}>Minor&apos;s Data:</span> Because skater profiles may belong to children under the age of 18, a parent can register and add a maximum of 2 child profiles. We process children&apos;s personal data only with explicit parental consent.</li>
            <li><span style={strong}>Verification Media:</span> Profile information verification requests, and images or videos uploaded by users (Clubs, Districts, or State admins) to the app gallery.</li>
            <li><span style={strong}>Support and Feedback Information:</span> Feedback, suggestions, and complaints (issues) raised by users against a Club, District, or Skater through our in-app sidebar and dynamic support sections.</li>
            <li><span style={strong}>Financial Information:</span> Transaction records, status, and payment logs generated when completing payments to register for competitions and championships. (Note: We do not directly store your credit card or net banking details; all payments are securely processed by our third-party payment gateway integration).</li>
            <li><span style={strong}>Data Collection for Passive Roles:</span> Registration data provided by School, Academy, Official, and Guest users is collected strictly for administrative reporting and association records. These roles do not receive active dashboard access in the mobile app or web panel.</li>
          </ul>

          <h3 style={h3}>2. Legal Basis for Processing</h3>
          <p style={p}>We process your personal data based on your explicit Consent. For minor skaters, consent is provided by their verified parent or legal guardian.</p>
          <p style={p}>In certain instances, processing is necessary to perform a contract (such as managing your club enrollment or facilitating your participation in a registered competition).</p>

          <h3 style={h3}>3. Device Permissions Required</h3>
          <p style={p}>To enable full application functionality, the app may request the following permissions on your mobile device:</p>
          <ul style={ul}>
            <li><span style={strong}>Storage / Photos / Media:</span> To allow permitted roles (Clubs, Districts, State admins) to upload photos and videos to the app gallery.</li>
            <li><span style={strong}>Network &amp; Internet Access:</span> To verify credentials via Email OTP, query real-time results, manage profiles, and process registration payments.</li>
          </ul>

          <h3 style={h3}>4. Data Sharing and Transfer</h3>
          <p style={p}>We do not sell your personal data. Your data is shared strictly within the official hierarchical structure of the Karnataka Roller Skating Association to facilitate smooth operations:</p>
          <ul style={ul}>
            <li><span style={strong}>Club, District, and State Administrators:</span> For approving club join/leave requests, managing event registrations, updating results, and resolving escalated complaints.</li>
            <li><span style={strong}>Payment Processors:</span> Necessary payment details are shared with verified third-party payment gateways to process event fees.</li>
            <li><span style={strong}>Legal Authorities:</span> We may disclose your information if required by law, regulatory authorities, or court orders to protect association rights and user safety.</li>
          </ul>

          <h3 style={h3}>5. Data Retention and Security</h3>
          <ul style={ul}>
            <li><span style={strong}>Retention:</span> We retain your personal data as long as your account is active, or as long as necessary to maintain accurate historical sports achievements, certificates, and participation records.</li>
            <li><span style={strong}>Security:</span> We use industry-standard physical, technical, and administrative security measures to safeguard your personal data against unauthorized access, loss, alteration, or disclosure.</li>
          </ul>

          <h3 style={h3}>6. Your Rights (Data Principals)</h3>
          <p style={p}>Under the DPDP Act, 2023, you have the following rights:</p>
          <ul style={ul}>
            <li><span style={strong}>Right to Access &amp; Summary:</span> You can request a summary of the personal data processed by us.</li>
            <li><span style={strong}>Right to Correction &amp; Erasure:</span> You can update your profile details. (Please note: Editing sensitive fields like the RFSI ID requires verification and approval from your affiliated Club before updating). You may request deletion of your account, subject to necessary compliance and active tournament records.</li>
            <li><span style={strong}>Right to Withdraw Consent:</span> You may withdraw your consent for processing at any time, though this may restrict your ability to participate in events, join clubs, or use the app.</li>
            <li><span style={strong}>Right to Grievance Redressal:</span> You have the right to register a complaint regarding the processing of your personal data.</li>
          </ul>

          <h3 style={h3}>7. Grievance Redressal &amp; Contact Us</h3>
          <p style={p}>If you have questions about this Privacy Policy, wish to exercise your rights, or want to file a complaint, please contact our Grievance Officer:</p>
          <ul style={{ ...ul, marginBottom: 0 }}>
            <li><span style={strong}>Email:</span> skaterkarnataka@gmail.com</li>
            <li><span style={strong}>Mailing Address:</span> Karnataka Roller Skating Association (KRSA), Bengaluru, Karnataka, India</li>
          </ul>
        </motion.article>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
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
