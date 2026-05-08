import {
  ShieldCheck,
  BadgeCheck,
  Trophy,
  CreditCard,
  CalendarDays,
  BarChart3,
} from 'lucide-react';

// Features section data — 6 feature cards
// Icon: Lucide component reference (rendered as <f.Icon size={22} strokeWidth={1.8} />)
export const features = [
  {
    id: 1,
    Icon: ShieldCheck,
    title: 'Fortified Auth',
    description:
      'Time-bound OTP authentication with role-based access across skater, club, district and admin tiers.',
  },
  {
    id: 2,
    Icon: BadgeCheck,
    title: 'Digital Identity',
    description:
      'Auto-generated KRSA Unique ID with a virtual card built from your photograph — always in your pocket.',
  },
  {
    id: 3,
    Icon: Trophy,
    title: 'Championship Hub',
    description:
      'Browse events, validate eligibility by age group, auto-calculate entry fees, and pay in a single flow.',
  },
  {
    id: 4,
    Icon: CreditCard,
    title: 'Seamless Payments',
    description:
      'Integrated payment gateway for all registrations. Instant digital receipts. Zero manual handling.',
  },
  {
    id: 5,
    Icon: CalendarDays,
    title: 'Live Event Calendar',
    description:
      'Championships, training camps, seminars — filterable by date, discipline, district. Register in one tap.',
  },
  {
    id: 6,
    Icon: BarChart3,
    title: 'Rankings Engine',
    description:
      'Season-wise, age-group leaderboards computed from verified results. Published under Super Admin approval.',
  },
];
