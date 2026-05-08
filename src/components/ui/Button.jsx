import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'filled', href, onClick, className = '', id, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold text-sm tracking-wide cursor-pointer select-none transition-all duration-300';

  const styles = {
    filled: `
      px-6 py-3 rounded-full
      bg-gradient-to-r from-[#FF6B00] to-[#FF9A3C] text-white
      shadow-[0_0_0px_rgba(255,107,0,0)]
      hover:shadow-[0_0_32px_rgba(255,107,0,0.45)] hover:scale-[1.04]
      active:scale-[0.97]
    `,
    ghost: `
      px-6 py-3 rounded-full
      border border-[rgba(255,255,255,0.14)] text-[#F0F0FA]
      hover:border-[rgba(255,107,0,0.5)] hover:text-[#FF9A3C] hover:scale-[1.04]
      active:scale-[0.97]
    `,
    icon: `
      w-9 h-9 rounded-[6px] text-xs font-semibold tracking-wider
      border border-[rgba(255,255,255,0.10)] text-[#8892A4]
      hover:border-[rgba(0,200,255,0.4)] hover:text-[#00C8FF]
      hover:bg-[rgba(0,200,255,0.06)]
    `,
  };

  const cls = `${base} ${styles[variant] ?? styles.filled} ${className}`;

  if (href) {
    if (href.startsWith('http')) {
      return <a href={href} id={id} className={cls} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    }
    return <Link to={href} id={id} className={cls} {...props}>{children}</Link>;
  }
  return <button id={id} onClick={onClick} className={cls} {...props}>{children}</button>;
}
