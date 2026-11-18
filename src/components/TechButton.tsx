import { ReactNode } from 'react';
import { motion } from 'motion/react';

type TechButtonVariant = 'primary' | 'secondary' | 'outline';

interface TechButtonProps {
  children: ReactNode;
  variant?: TechButtonVariant;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Cosmic-tech agile button inspired by sleek framed outline & cyan-violet highlights:
 * - Hover triggers smooth color transition + geometric radius morphing + directional sheen
 */
export function TechButton({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  className = '',
  ariaLabel,
}: TechButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-medium whitespace-nowrap shrink-0 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070E] transition-[border-radius,background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]';

  const variantClasses =
    variant === 'primary'
      ? 'bg-[#0C1222]/90 text-[#F8FAFC] border border-[#7DD3FC]/45 rounded-[10px] hover:rounded-[22px] hover:bg-gradient-to-r hover:from-[#7DD3FC] hover:to-[#A78BFA] hover:text-[#05070E] hover:border-[#7DD3FC] hover:shadow-[0_0_24px_rgba(125,211,252,0.28)]'
      : variant === 'secondary'
      ? 'bg-[#0C1222]/70 text-[#CBD5E1] border border-[#24304D] rounded-[10px] hover:rounded-tl-[4px] hover:rounded-br-[4px] hover:rounded-tr-[20px] hover:rounded-bl-[20px] hover:bg-[#131C35] hover:border-[#A78BFA]/70 hover:text-[#F8FAFC]'
      : 'bg-transparent text-[#CBD5E1] border border-[#24304D] rounded-[10px] hover:rounded-[22px] hover:bg-[#7DD3FC]/12 hover:border-[#7DD3FC] hover:text-[#F8FAFC]';

  const content = (
    <>
      {/* Directional luminous sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 460, damping: 28 }}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 460, damping: 28 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {content}
    </motion.button>
  );
}
