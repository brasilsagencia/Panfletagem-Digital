import React from 'react';

interface BrasilsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrasilsLogo: React.FC<BrasilsLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Brasils Rocket-B Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-2xl bg-gradient-to-tr from-[#0057FF] via-[#0080FF] to-[#FF6B00] p-[1.5px] shadow-[0_0_20px_rgba(0,87,255,0.4)] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transition-all duration-300`}>
        <div className="w-full h-full bg-[#060A14] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0057FF]/20 via-transparent to-[#FF6B00]/20 pointer-events-none" />
          
          {/* Rocket-B Vector Emblem matching user official shirt branding */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 relative z-10 drop-shadow-[0_2px_8px_rgba(255,107,0,0.6)]"
          >
            {/* Outer Letter B Silhouette */}
            <path
              d="M7 6H19C24 6 27.5 9 27.5 13.5C27.5 16.8 25.5 19 22.5 20C26.5 21.2 29 24 29 28C29 33 24.5 35 19 35H7V6Z"
              fill="#FFFFFF"
              fillOpacity="0.1"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Ascending Rocket fuselage forming center */}
            <path
              d="M17 7L24 14C23 18 20 20 16 22L13 16L17 7Z"
              fill="url(#rocketGrad)"
            />
            {/* Rocket Thruster Flame (Orange/Amber) */}
            <path
              d="M13 16L9 26L16 22L13 16Z"
              fill="url(#flameGrad)"
            />
            {/* Speed trail */}
            <circle cx="10" cy="30" r="2" fill="#FFA800" />
            
            <defs>
              <linearGradient id="rocketGrad" x1="13" y1="7" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFA800" />
                <stop offset="1" stopColor="#FF6B00" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="9" y1="16" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B00" />
                <stop offset="1" stopColor="#FF0055" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-black tracking-tight text-white uppercase ${textSizes[size]}`}>
            BRASILS
          </span>
          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black tracking-wider shadow-sm">
            AGÊNCIA
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
            Panfletagem Digital RJ
          </span>
        )}
      </div>
    </div>
  );
};
