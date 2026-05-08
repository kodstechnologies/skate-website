import {
  Zap,
  Sparkles,
  Swords,
  Wind,
  Flame,
  Shuffle,
  Target,
  Navigation2,
  Mountain,
  Heart,
} from 'lucide-react';

// Disciplines section data — 10 disciplines
// Icon: Lucide component reference (rendered as <d.Icon size={22} color={d.color} />)
export const disciplines = [
  { id: 1,  name: 'Speed Skating',    Icon: Zap,         color: '#FF6B00', image: '/images/disciplines/speed_skating.png' },
  { id: 2,  name: 'Artistic Skating', Icon: Sparkles,    color: '#A855F7', image: '/images/disciplines/artistic_skating.png' },
  { id: 3,  name: 'Roller Hockey',    Icon: Swords,      color: '#00C8FF', image: '/images/disciplines/roller_hockey.png' },
  { id: 4,  name: 'Inline Freestyle', Icon: Wind,        color: '#22C55E', image: '/images/disciplines/inline_freestyle.png' },
  { id: 5,  name: 'Skateboarding',    Icon: Flame,       color: '#F59E0B', image: '/images/disciplines/skateboarding.png' },
  { id: 6,  name: 'Roller Derby',     Icon: Shuffle,     color: '#EF4444', image: '/images/disciplines/roller_derby.png' },
  { id: 7,  name: 'Inline Hockey',    Icon: Target,      color: '#06B6D4', image: '/images/disciplines/inline_hockey.png' },
  { id: 8,  name: 'Freestyle Slalom', Icon: Navigation2, color: '#EC4899', image: '/images/disciplines/freestyle_slalom.png' },
  { id: 9,  name: 'Downhill Skating', Icon: Mountain,    color: '#84CC16', image: '/images/disciplines/downhill_skating.png' },
  { id: 10, name: 'Recreational',     Icon: Heart,       color: '#F97316', image: '/images/disciplines/recreational_skating.png' },
];
