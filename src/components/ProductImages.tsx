import React from 'react';

interface ImageProps {
  name: string;
  variantId?: string;
  className?: string;
  size?: number | string;
}

export const ProductImage: React.FC<ImageProps> = ({ name, variantId = 'white', className = '', size }) => {
  const isDarkVariant = variantId === 'black';

  const style: React.CSSProperties = size ? { width: size, height: size } : {};

  switch (name) {
    case 'wyze-cam-v4':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Base */}
          <rect x="35" y="82" width="30" height="6" rx="3" fill="#D1D5DB" />
          <path d="M45 82 L45 70 L55 70 L55 82 Z" fill="#9CA3AF" />
          {/* Body */}
          <rect
            x="20"
            y="20"
            width="60"
            height="52"
            rx="12"
            fill={isDarkVariant ? '#262626' : '#FFFFFF'}
            stroke="#E5E7EB"
            strokeWidth="1.5"
          />
          {/* Camera Lens Housing */}
          <circle cx="50" cy="46" r="21" fill="#000000" />
          <circle cx="50" cy="46" r="13" fill="#111827" stroke="#374151" strokeWidth="1" />
          <circle cx="50" cy="46" r="7" fill="#1F2937" />
          {/* Lens Glass Reflection */}
          <circle cx="47" cy="43" r="3" fill="#60A5FA" opacity="0.8" />
          <circle cx="53" cy="49" r="1.5" fill="#FFFFFF" opacity="0.6" />
          {/* Status LED */}
          <circle cx="50" cy="26" r="1.5" fill="#3B82F6" />
        </svg>
      );

    case 'wyze-cam-pan-v3':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Swivel Base */}
          <ellipse cx="50" cy="85" rx="22" ry="7" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
          <rect x="36" y="65" width="28" height="20" rx="4" fill={isDarkVariant ? '#374151' : '#F3F4F6'} />
          {/* Top Rotating Head */}
          <rect
            x="24"
            y="18"
            width="52"
            height="46"
            rx="10"
            fill={isDarkVariant ? '#1F2937' : '#FFFFFF'}
            stroke="#E5E7EB"
            strokeWidth="1.5"
          />
          {/* Lens Assembly */}
          <rect x="32" y="24" width="36" height="34" rx="8" fill="#000000" />
          <circle cx="50" cy="41" r="11" fill="#111827" stroke="#374151" strokeWidth="1" />
          <circle cx="48" cy="39" r="3" fill="#60A5FA" opacity="0.9" />
          {/* Pan/Tilt arrows accent */}
          <path d="M 18 45 A 32 32 0 0 1 82 45" fill="none" stroke="#4E2FD2" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );

    case 'wyze-cam-floodlight-v2':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Left Lamp */}
          <g transform="translate(8, 15) rotate(-15)">
            <ellipse cx="25" cy="25" rx="18" ry="14" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
            <ellipse cx="25" cy="25" rx="14" ry="10" fill="#FEF08A" opacity="0.9" />
          </g>
          {/* Right Lamp */}
          <g transform="translate(42, 15) rotate(15)">
            <ellipse cx="25" cy="25" rx="18" ry="14" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
            <ellipse cx="25" cy="25" rx="14" ry="10" fill="#FEF08A" opacity="0.9" />
          </g>
          {/* Center Mount */}
          <rect x="42" y="55" width="16" height="30" fill="#9CA3AF" />
          {/* Center Camera */}
          <rect
            x="33"
            y="42"
            width="34"
            height="34"
            rx="8"
            fill={isDarkVariant ? '#1F2937' : '#FFFFFF'}
            stroke="#D1D5DB"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="59" r="10" fill="#000000" />
          <circle cx="48" cy="57" r="2.5" fill="#60A5FA" />
        </svg>
      );

    case 'wyze-duo-cam-doorbell':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Doorbell Body */}
          <rect x="34" y="10" width="32" height="80" rx="12" fill="#111827" stroke="#374151" strokeWidth="1.5" />
          {/* Top Lens */}
          <circle cx="50" cy="28" r="9" fill="#000000" stroke="#4E2FD2" strokeWidth="1" />
          <circle cx="48" cy="26" r="2.5" fill="#60A5FA" />
          {/* Bottom Lens */}
          <circle cx="50" cy="52" r="7" fill="#000000" />
          <circle cx="49" cy="50" r="2" fill="#60A5FA" />
          {/* Illuminated Bell Ring Button */}
          <circle cx="50" cy="74" r="9" fill="#1F2937" stroke="#0046C7" strokeWidth="2" />
          <circle cx="50" cy="74" r="4" fill="#3B82F6" />
        </svg>
      );

    case 'wyze-battery-cam-pro':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Angled Wall Arm */}
          <path d="M 68 65 L 85 75 L 85 85 L 68 75 Z" fill="#9CA3AF" />
          {/* Camera Housing */}
          <rect
            x="20"
            y="25"
            width="52"
            height="50"
            rx="12"
            fill={isDarkVariant ? '#1F2937' : '#FFFFFF'}
            stroke="#D1D5DB"
            strokeWidth="1.5"
          />
          {/* Black Faceplate */}
          <rect x="24" y="29" width="44" height="42" rx="8" fill="#000000" />
          <circle cx="46" cy="50" r="11" fill="#111827" />
          <circle cx="44" cy="48" r="3" fill="#60A5FA" />
          {/* Spotlight LED */}
          <rect x="42" y="33" width="8" height="4" rx="2" fill="#FEF08A" />
        </svg>
      );

    case 'cam-unlimited':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#E7EFFD" />
          {/* Shield Outer */}
          <path d="M 50 15 L 80 25 V 50 C 80 68 50 85 50 85 C 50 85 20 68 20 50 V 25 Z" fill="#0046C7" />
          {/* Shield Inner Light Accent */}
          <path d="M 50 20 L 74 29 V 49 C 74 64 50 78 50 78 C 50 78 26 64 26 49 V 29 Z" fill="#2563EB" />
          {/* Play/Cam Icon inside Shield */}
          <circle cx="50" cy="46" r="12" fill="#FFFFFF" />
          <polygon points="46,40 58,46 46,52" fill="#0046C7" />
        </svg>
      );

    case 'wyze-sense-motion':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          <rect x="25" y="25" width="50" height="50" rx="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          {/* PIR Fresnel Lens Dome */}
          <circle cx="50" cy="50" r="16" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
          <circle cx="50" cy="50" r="10" fill="#E5E7EB" />
          <circle cx="50" cy="50" r="4" fill="#9CA3AF" />
        </svg>
      );

    case 'wyze-sense-hub':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Hub Body */}
          <rect x="18" y="30" width="64" height="44" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
          {/* Top Inset Ring */}
          <rect x="24" y="36" width="52" height="32" rx="4" fill="#F9FAFB" stroke="#F3F4F6" strokeWidth="1" />
          {/* Status LEDs */}
          <circle cx="36" cy="52" r="3" fill="#10B981" />
          <circle cx="50" cy="52" r="3" fill="#3B82F6" />
          <circle cx="64" cy="52" r="3" fill="#6B7280" />
        </svg>
      );

    case 'wyze-microsd-card':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* MicroSD Body */}
          <path d="M 28 20 L 64 20 L 72 28 L 72 80 L 28 80 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
          {/* Wyze Text & Details */}
          <text x="50" y="42" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            WYZE
          </text>
          <text x="50" y="55" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            256 GB
          </text>
          <rect x="36" y="64" width="28" height="6" fill="#F59E0B" rx="1" />
        </svg>
      );

    case 'wyze-sense-keypad':
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F8FAFC" />
          {/* Keypad Vertical Body */}
          <rect x="28" y="15" width="44" height="70" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
          {/* Keypad Buttons grid */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={38 + col * 12}
                cy={35 + row * 12}
                r="3.5"
                fill="#F3F4F6"
                stroke="#D1D5DB"
                strokeWidth="0.5"
              />
            ))
          )}
          {/* Arming buttons bottom */}
          <rect x="34" y="70" width="12" height="6" rx="2" fill="#EF4444" />
          <rect x="54" y="70" width="12" height="6" rx="2" fill="#10B981" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={`w-full h-full object-contain ${className}`} style={style}>
          <rect x="0" y="0" width="100" height="100" rx="10" fill="#F3F4F6" />
          <circle cx="50" cy="50" r="20" fill="#D1D5DB" />
        </svg>
      );
  }
};

export const SatisfactionBadge: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-[#4E2FD2] text-white p-2 text-center shadow-md ${className}`}>
    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 animate-spin-slow"></div>
    <div className="flex flex-col items-center justify-center leading-none">
      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">100%</span>
      <span className="text-[11px] font-black tracking-tight leading-tight">WYZE</span>
      <span className="text-[8px] font-medium opacity-90">satisfaction</span>
      <span className="text-[7px] font-light opacity-80">guarantee</span>
    </div>
  </div>
);
