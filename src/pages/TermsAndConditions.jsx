import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';

const ScrollIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
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

export default function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <PageLayout title="Terms & Conditions">
      <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2.5rem,6vw,5rem) 0 clamp(1.5rem,3vw,2.5rem)' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '280px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--clr-dot-grid) 1px, transparent 1px), linear-gradient(90deg, var(--clr-dot-grid) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2rem)', position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)', borderRadius: '999px', padding: '0.3rem 0.9rem', marginBottom: '1.4rem' }}>
            <span style={{ color: 'var(--clr-accent)' }}><ScrollIcon /></span>
            <span style={{ color: 'var(--clr-accent)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Skate Karnataka</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--clr-text)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Terms &amp;{' '}
            <span style={{ background: 'var(--grad-text-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Conditions</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
              Last updated: July 14, 2026
            </span>
            <span style={{ display: 'inline-block', background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
              Operating Entity: Karnataka Roller Skating Association (KRSA)
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
            TERMS AND CONDITIONS FOR SKATE KARNATAKA
          </h2>

          <p style={p}>
            Welcome to the Skate Karnataka mobile application (the &quot;App&quot;). By downloading, installing, registering on, or using this App, you agree to be bound by these Terms and Conditions (the &quot;Terms&quot;). If you do not agree with any part of these Terms, please do not install or use the application.
          </p>

          <h3 style={h3}>1. Registration, Roles, and Eligibility</h3>
          <p style={p}>The App operates on a multi-tiered role structure. You must select your appropriate role upon registration:</p>
          <ul style={ul}>
            <li><span style={strong}>Skaters &amp; Parents:</span> Parents can register and add a maximum of 2 child profiles. Skaters and Parents get immediate dashboard access upon registration.</li>
            <li><span style={strong}>Passive Registrations (School, Academy, Officials, Guests):</span> These roles are registered for administrative and association data collection only. They have no active dashboard access on the mobile app or web panel.</li>
            <li><span style={strong}>Club, District, and State Administrators:</span> Accounts for these administrative roles are added and managed by the District or State Web Admins.</li>
          </ul>
          <p style={p}>You agree to provide true, accurate, and current registration details. KRSA reserves the right to suspend any account found using falsified or misleading information.</p>

          <h3 style={h3}>2. Operational Workflows and Approvals</h3>
          <p style={p}>By using this App, you agree to comply with the standard administrative and approval flows built into the system:</p>
          <ul style={ul}>
            <li><span style={strong}>RFSI ID Verification:</span> Any modifications to a skater&apos;s registered RFSI ID must be verified and approved by their respective Club Admin before it is finalized on their profile.</li>
            <li><span style={strong}>Club Affiliations:</span> Requests raised by skaters to &quot;Join&quot; or &quot;Leave&quot; a club must be approved by the Club Administrator.</li>
            <li><span style={strong}>Club Affiliation with Districts:</span> A club&apos;s request to remove or apply for affiliation with a new district requires approval from the District Admin.</li>
            <li><span style={strong}>Media Approvals:</span> Any images or videos posted by Clubs, Districts, or State members are sent to the Web Admin or State Admin for approval before they go live on the public gallery.</li>
            <li><span style={strong}>Certificate Issuance:</span> Certificates requested via the App must clear a sequential approval chain: Club → District → State. The certificate is generated only after all three levels approve.</li>
          </ul>

          <h3 style={h3}>3. Competitions, Event Registrations, and Payments</h3>
          <ul style={ul}>
            <li><span style={strong}>Event Entries:</span> Skaters can view upcoming competitions created by Clubs, Districts, or State Admins. To register, users must complete the application process and complete payments.</li>
            <li><span style={strong}>Refund Policy:</span> Payments for competition entries are final. No refunds will be provided unless an event is canceled by the organizing authorities prior to its start date.</li>
            <li><span style={strong}>Event Deletion:</span> Admin and Event Creators reserve the right to delete an event/competition, but only if no skaters have registered or paid fees for it.</li>
          </ul>

          <h3 style={h3}>4. Dispute and Complaint Escalation Flow</h3>
          <p style={p}>The App features an escalation flow for unresolved issues raised by skaters or parents:</p>
          <ul style={ul}>
            <li><span style={strong}>Club Level:</span> The skater&apos;s local Club has 15 days to resolve a raised complaint.</li>
            <li><span style={strong}>District Level:</span> If the issue remains unresolved by the Club after 15 days, it automatically escalates to the District Admin, who has a further 15 days to resolve it.</li>
            <li><span style={strong}>State Level:</span> If still unresolved by the District Admin after their 15-day window, the complaint escalates to the State Admin and Web Admin Panel for a final and binding decision.</li>
          </ul>

          <h3 style={h3}>5. Prohibited Use</h3>
          <p style={p}>You agree not to use the App for any unlawful purpose. Prohibited activities include, but are not limited to:</p>
          <ul style={ul}>
            <li>Uploading inappropriate, offensive, or copyrighted media to the gallery.</li>
            <li>Tampering with, hacking, or attempting to breach the security of the App, Web Admin Panel, or servers.</li>
            <li>Impersonating other skaters, parents, or association officials.</li>
            <li>Bypassing OTP or login verification measures.</li>
          </ul>

          <h3 style={h3}>6. Limitation of Liability</h3>
          <p style={p}>The Karnataka Roller Skating Association (KRSA), along with its technology and development partners, shall not be liable for:</p>
          <ul style={ul}>
            <li>Any indirect, incidental, or consequential damages resulting from your use of, or inability to use, the App.</li>
            <li>Physical injuries, accidents, or health risks associated with preparing for or participating in any skating competition or event registered through the App.</li>
            <li>Delays in administrative approvals for club join requests, RFSI ID corrections, or certificates.</li>
          </ul>

          <h3 style={h3}>7. Governing Law and Jurisdiction</h3>
          <p style={{ ...p, marginBottom: 0 }}>
            These Terms and Conditions are governed by and construed in accordance with the laws of India and the State of Karnataka. Any disputes or claims arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
          </p>
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
