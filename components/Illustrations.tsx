import React from 'react';
import { Heart, ShieldCheck, BookOpen, Star, Sun } from 'lucide-react';
import { brandColors } from '../constants';

interface AvatarProps {
  type: 'female' | 'neutral' | 'male' | null;
  selected: boolean;
}

export const AvatarIllustration: React.FC<AvatarProps> = ({ type, selected }) => {
  const scale = selected ? "scale-110" : "scale-100";
  if (type === 'female') {
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 transition-transform ${scale}`}>
        <circle cx="50" cy="50" r="48" fill="#FFEDF2" stroke={selected ? "#F472B6" : "none"} strokeWidth="3"/>
        <path d="M42 65 L42 80 L58 80 L58 65" fill="#FFE4E1" />
        <path d="M25 80 Q50 70 75 80 L75 100 L25 100 Z" fill="#D98A9D"/>
        <circle cx="50" cy="45" r="22" fill="#FFE4E1"/>
        <path d="M28 45c0-15 10-25 22-25s22 10 22 25c0 5-5 5-5 0 0-10-8-15-17-15s-17 5-17 15c0 5-5 5-5 0z" fill="#4A3728"/>
        <circle cx="42" cy="45" r="2" fill="#4A3728"/><circle cx="58" cy="45" r="2" fill="#4A3728"/>
        <path d="M45 53s2 3 5 3 5-3 5-3" stroke="#F472B6" fill="none" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'neutral') {
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 transition-transform ${scale}`}>
        <circle cx="50" cy="50" r="48" fill="#E0F2FE" stroke={selected ? "#38BDF8" : "none"} strokeWidth="3"/>
        <path d="M42 65 L42 80 L58 80 L58 65" fill="#FFD8B1" />
        <path d="M25 80 Q50 70 75 80 L75 100 L25 100 Z" fill="#7BBED9"/>
        <circle cx="50" cy="45" r="22" fill="#FFD8B1"/>
        <path d="M28 40c0-10 10-20 22-20s22 10 22 20-5 5-5 0c0-10-8-12-17-12s-17 2-17 12c0 5-5 5-5 0z" fill="#2D3748"/>
        <circle cx="42" cy="45" r="2.5" fill="#2D3748"/><circle cx="58" cy="45" r="2.5" fill="#2D3748"/>
        <path d="M43 55q7 5 14 0" stroke="#38BDF8" fill="none" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className={`w-20 h-20 transition-transform ${scale}`}>
      <circle cx="50" cy="50" r="48" fill="#ECFDF5" stroke={selected ? "#10B981" : "none"} strokeWidth="3"/>
      <path d="M42 65 L42 80 L58 80 L58 65" fill="#FDE68A" />
      <path d="M25 80 Q50 70 75 80 L75 100 L25 100 Z" fill="#88B091"/>
      <circle cx="50" cy="45" r="22" fill="#FDE68A"/>
      <path d="M30 35c0-8 8-15 20-15s20 7 20 15c0 5-20 5-40 0z" fill="#1F2937"/>
      <circle cx="40" cy="46" r="2" fill="#1F2937"/><circle cx="60" cy="46" r="2" fill="#1F2937"/>
      <path d="M45 55c2 1 8 1 10 0" stroke="#059669" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
};

interface SceneProps {
  type: 'current' | 'future';
  index: number | null;
  active: boolean;
}

export const SceneIllustration: React.FC<SceneProps> = ({ type, index, active }) => {
  if (index === null) return null;
  if (type === 'current') {
    const currentScenes = [
      <g key="c1">
        <rect width="100" height="100" fill="#f1f5f9"/>
        <rect x="10" y="65" width="80" height="5" fill="#cbd5e1"/>
        <path d="M30 65 L30 45 Q50 35 70 45 L70 65" fill="#94a3b8" opacity="0.4"/>
        <path d="M40 65 Q45 40 55 40 Q65 40 70 65" fill="#475569" />
        <circle cx="55" cy="35" r="10" fill="#475569"/>
        <path d="M45 45 Q35 55 25 60" stroke="#475569" strokeWidth="4" strokeLinecap="round"/>
        <path d="M60 45 Q75 55 85 60" stroke="#475569" strokeWidth="4" strokeLinecap="round"/>
      </g>,
      <g key="c2">
        <rect width="100" height="100" fill="#e2e8f0"/>
        <rect x="25" y="20" width="50" height="60" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2"/>
        <path d="M50 20 V80 M25 50 H75" stroke="#94a3b8" strokeWidth="1" opacity="0.5"/>
        <path d="M40 85 Q50 70 60 85" fill="#334155" />
        <circle cx="50" cy="68" r="8" fill="#334155"/>
      </g>,
      <g key="c3">
        <rect width="100" height="100" fill="#f8fafc"/>
        <circle cx="50" cy="55" r="12" fill="#64748b"/>
        <circle cx="25" cy="30" r="10" fill="#cbd5e1" opacity="0.6"/>
        <circle cx="75" cy="35" r="12" fill="#cbd5e1" opacity="0.8"/>
        <circle cx="30" cy="75" r="8" fill="#cbd5e1" opacity="0.5"/>
        <circle cx="70" cy="75" r="14" fill="#cbd5e1" opacity="0.7"/>
        <path d="M45 48 L55 48" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </g>,
      <g key="c4">
        <rect width="100" height="100" fill="#cbd5e1" opacity="0.3"/>
        <path d="M35 85 Q50 60 65 85" fill="#1e293b" />
        <circle cx="50" cy="55" r="12" fill="#1e293b"/>
        <path d="M35 50 Q45 45 50 55" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M65 50 Q55 45 50 55" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </g>,
      <g key="c5">
        <rect width="100" height="100" fill="#0f172a"/>
        <circle cx="50" cy="50" r="30" fill="#1e293b"/>
        <path d="M45 65 Q50 55 55 65" fill="#94a3b8" />
        <circle cx="50" cy="52" r="6" fill="#94a3b8"/>
      </g>
    ];
    return <svg viewBox="0 0 100 100" className={`w-full h-full rounded-xl overflow-hidden transition-all ${active ? 'ring-4 ring-pink-400' : 'opacity-100'}`}>{currentScenes[index]}</svg>;
  } else {
    const futureScenes = [
      <g key="f1">
        <rect width="100" height="100" fill="#f0fdf4"/>
        <circle cx="50" cy="30" r="10" fill={brandColors.success}/>
        <path d="M35 80 Q50 50 65 80" fill={brandColors.success} />
        <path d="M35 60 L20 45" stroke={brandColors.success} strokeWidth="4" strokeLinecap="round"/>
        <path d="M65 60 L80 45" stroke={brandColors.success} strokeWidth="4" strokeLinecap="round"/>
        <circle cx="80" cy="40" r="5" fill="#fbbf24"/>
      </g>,
      <g key="f2">
        <rect width="100" height="100" fill="#f0f9ff"/>
        <circle cx="50" cy="50" r="12" fill={brandColors.secondary}/>
        <circle cx="20" cy="25" r="8" fill={brandColors.success} opacity="0.6"/>
        <circle cx="80" cy="25" r="8" fill={brandColors.primary} opacity="0.6"/>
        <circle cx="50" cy="85" r="8" fill="#fbbf24" opacity="0.6"/>
        <path d="M50 50 L20 25 M50 50 L80 25 M50 50 L50 85" stroke={brandColors.secondary} strokeWidth="2" strokeDasharray="4"/>
      </g>,
      <g key="f3">
        <rect width="100" height="100" fill="#ecfdf5"/>
        <path d="M0 80 Q50 70 100 80 L100 100 L0 100 Z" fill={brandColors.success} opacity="0.4"/>
        <path d="M30 75 Q50 65 70 75" fill={brandColors.primary} />
        <circle cx="65" cy="65" r="8" fill={brandColors.primary}/>
        <Sun className="text-yellow-400" x="70" y="15" size={20} />
      </g>,
      <g key="f4">
        <rect width="100" height="100" fill="#fdf2f8"/>
        <circle cx="35" cy="45" r="8" fill={brandColors.primary}/>
        <circle cx="65" cy="45" r="8" fill={brandColors.secondary}/>
        <path d="M25 75 Q35 60 45 75" fill={brandColors.primary}/>
        <path d="M55 75 Q65 60 75 75" fill={brandColors.secondary}/>
        <path d="M45 40 Q50 35 55 40" stroke={brandColors.deepPink} strokeWidth="2" fill="none"/>
      </g>,
      <g key="f5">
        <rect width="100" height="100" fill="#fffef3"/>
        <circle cx="50" cy="40" r="10" fill="#475569"/>
        <path d="M35 80 Q50 60 65 80" fill="#475569" />
        <path d="M20 55 H80" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="20" cy="55" r="6" fill={brandColors.primary}/>
        <circle cx="80" cy="55" r="6" fill={brandColors.success}/>
      </g>
    ];
    return <svg viewBox="0 0 100 100" className={`w-full h-full rounded-xl overflow-hidden transition-all ${active ? 'ring-4 ring-green-400' : 'opacity-100'}`}>{futureScenes[index]}</svg>;
  }
};

export const IntroIllustration = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto rounded-2xl">
    <defs>
      <linearGradient id="introGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf2f4" />
        <stop offset="100%" stopColor="#fce7f3" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#introGrad)" rx="20"/>
    
    <circle cx="280" cy="100" r="60" fill="#a7d4e0" opacity="0.2"/>
    <circle cx="100" cy="220" r="40" fill="#9bcba6" opacity="0.2"/>

    <circle cx="200" cy="140" r="75" fill="white" stroke="#ecacbc" strokeWidth="4" />
    <circle cx="200" cy="140" r="65" fill="none" stroke="#f4d0da" strokeWidth="1" strokeDasharray="4,4" />
    
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line 
        key={angle} 
        x1="200" y1="75" x2="200" y2="85" 
        stroke="#d98a9d" strokeWidth="2" 
        transform={`rotate(${angle}, 200, 140)`} 
      />
    ))}

    <path d="M200 80 L215 140 L200 155 L185 140 Z" fill="#ecacbc" />
    <path d="M200 155 L215 140 L200 200 L185 140 Z" fill="#a7d4e0" />
    <circle cx="200" cy="140" r="6" fill="#d98a9d" stroke="white" strokeWidth="2" />

    <g transform="translate(240, 180) rotate(-15)">
      <rect x="35" y="60" width="12" height="40" rx="6" fill="#4b5563" />
      <circle cx="41" cy="40" r="35" fill="white" stroke="#4b5563" strokeWidth="4" />
      <circle cx="41" cy="40" r="30" fill="#d2e8f1" opacity="0.4" />
      <path d="M25 25 Q35 15 55 25" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <Heart className="text-pink-400" x="28" y="28" size={25} fill="#f472b6" opacity="0.8" />
    </g>

    <Star className="text-yellow-400" x="80" y="60" size={20} fill="#fef08a" />
    <ShieldCheck className="text-green-400" x="320" y="220" size={24} opacity="0.6" />
    <BookOpen className="text-blue-400" x="60" y="160" size={22} opacity="0.6" />
  </svg>
);

export const WarmVideoIllustration = () => (
  <div className="w-full mt-6 mb-2">
    <svg viewBox="0 0 400 150" className="w-full h-auto rounded-2xl shadow-sm" style={{ backgroundColor: '#fff9fa' }}>
      <rect width="400" height="150" fill="#fff9fa" />
      <circle cx="350" cy="40" r="20" fill="#fef9c3" opacity="0.6" />
      <path d="M0 120 Q100 100 200 120 T400 120 L400 150 L0 150 Z" fill={brandColors.softPink} opacity="0.3" />
      <g transform="translate(80, 80)">
        <circle cx="0" cy="-25" r="10" fill="#4b5563" />
        <path d="M-15 -10 Q0 -15 15 -10 L12 25 L-12 25 Z" fill="#d98a9d" />
        <rect x="5" y="-5" width="25" height="18" rx="2" fill="#374151" transform="rotate(-10)" />
        <rect x="7" y="-3" width="21" height="14" rx="1" fill="#fff" transform="rotate(-10)" opacity="0.9" />
        <circle cx="25" cy="5" r="3" fill={brandColors.secondary} opacity="0.8" />
      </g>
      <path d="M115 75 Q200 60 270 75" stroke={brandColors.secondary} strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.6" />
      <g transform="translate(300, 80)">
          <circle cx="0" cy="0" r="40" fill={brandColors.softBlue} opacity="0.4" />
          <circle cx="0" cy="-20" r="10" fill="#374151" />
          <path d="M-15 -5 Q0 -10 15 -5 L12 30 L-12 30 Z" fill={brandColors.secondary} />
          <path d="M-30 -35 L-20 -35 L-20 -25 Z" fill={brandColors.primary} opacity="0.6" />
      </g>
      <path d="M195 50 Q195 45 190 45 Q185 45 185 50 Q185 55 195 60 Q205 55 205 50 Q205 45 200 45 Q195 45 195 50" fill="#ecacbc" />
      <path d="M215 40 Q215 37 212 37 Q209 37 209 40 Q209 43 215 47 Q221 43 221 40 Q221 37 218 37 Q215 37 215 40" fill="#f4d0da" opacity="0.7" />
    </svg>
  </div>
);