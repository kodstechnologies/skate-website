import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/variants';

const TAG_STYLES = {
  orange: {
    bg: 'rgba(255,107,0,0.08)', border: 'rgba(255,107,0,0.2)',
    color: 'var(--clr-accent)', dot: 'var(--clr-accent)',
  },
  cyan: {
    bg: 'rgba(0,153,204,0.08)', border: 'rgba(0,153,204,0.22)',
    color: '#0099CC', dot: '#0099CC',
  },
  white: {
    bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.1)',
    color: 'var(--clr-muted)', dot: 'var(--clr-muted)',
  },
};

export default function SectionHeader({ tag, tagColor = 'orange', title, highlight, description, center = true, inView }) {
  const ts = TAG_STYLES[tagColor] || TAG_STYLES.orange;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        marginBottom: '3.5rem',
        textAlign: center ? 'center' : 'left',
        display: 'flex', flexDirection: 'column',
        alignItems: center ? 'center' : 'flex-start',
      }}
    >
      {/* Eyebrow tag */}
      {tag && (
        <motion.div variants={fadeUp} style={{ marginBottom: '1.25rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: ts.bg, border: `1px solid ${ts.border}`,
            fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: ts.color,
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: ts.dot, flexShrink: 0,
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            {tag}
          </span>
        </motion.div>
      )}

      {/* Title — supports optional highlighted word */}
      {title && (
        <motion.h2 variants={fadeUp} style={{
          fontFamily: 'var(--font-head)', fontWeight: 900,
          fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
          lineHeight: 1.08, letterSpacing: '-0.02em',
          color: 'var(--clr-text)', marginBottom: '1.1rem',
          maxWidth: center ? '700px' : 'none',
        }}>
          {highlight
            ? title.split(highlight).map((part, i) => (
                <Fragment key={i}>
                  {part}
                  {i < title.split(highlight).length - 1 && (
                    <span style={{
                      background: 'var(--grad-text-hero)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {highlight}
                    </span>
                  )}
                </Fragment>
              ))
            : title}
        </motion.h2>
      )}

      {/* Description */}
      {description && (
        <motion.p variants={fadeUp} style={{
          color: 'var(--clr-muted)',
          fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
          lineHeight: 1.8,
          maxWidth: center ? '560px' : '480px',
          margin: center ? '0 auto' : '0',
        }}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
