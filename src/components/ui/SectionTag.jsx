export default function SectionTag({ children, color = 'orange' }) {
  const map = {
    orange: 'text-[#FF9A3C] border-[rgba(255,107,0,0.28)] bg-[rgba(255,107,0,0.07)]',
    cyan:   'text-[#00C8FF] border-[rgba(0,200,255,0.28)] bg-[rgba(0,200,255,0.06)]',
    white:  'text-[#8892A4] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)]',
  };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.15em] uppercase border ${map[color]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
