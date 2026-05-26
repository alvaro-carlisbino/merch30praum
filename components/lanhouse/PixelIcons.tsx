/**
 * Coleção de ícones pixel-art em SVG inline.
 * Estilo Win95/98/XP. Cores fixas, sem variação por tema.
 */

interface IconProps {
  size?: number;
  className?: string;
}

const ICON_BASE: React.SVGProps<SVGSVGElement> = {
  shapeRendering: "crispEdges",
  xmlns: "http://www.w3.org/2000/svg",
};

export function FolderIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path d="M1 4 L1 13 L15 13 L15 5 L7 5 L6 4 Z" fill="#fbd24a" stroke="#000" strokeWidth="0.5" />
      <path d="M1 4 L6 4 L7 5 L15 5" fill="#fbd24a" stroke="#000" strokeWidth="0.5" />
      <rect x="2" y="5" width="13" height="1" fill="#ffe788" />
    </svg>
  );
}

export function FolderOpenIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path d="M1 5 L1 13 L13 13 L15 7 L3 7 Z" fill="#fde07e" stroke="#000" strokeWidth="0.5" />
      <path d="M1 5 L1 13 L3 7 L15 7 L15 6 L7 6 L6 5 Z" fill="#fbd24a" stroke="#000" strokeWidth="0.5" />
    </svg>
  );
}

export function ExeIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="1" width="9" height="14" fill="#fff" stroke="#000" strokeWidth="0.5" />
      <path d="M11 1 L13 3 L13 15 L11 15 Z" fill="#d4d4d4" stroke="#000" strokeWidth="0.5" />
      <path d="M11 1 L13 3 L11 3 Z" fill="#888" />
      <rect x="4" y="9" width="6" height="1" fill="#0a246a" />
      <rect x="4" y="11" width="4" height="1" fill="#0a246a" />
      <text x="4" y="6.5" fontFamily="monospace" fontSize="3" fill="#0a246a" fontWeight="bold">EXE</text>
    </svg>
  );
}

export function ImageIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="1" width="11" height="14" fill="#fff" stroke="#000" strokeWidth="0.5" />
      <rect x="3" y="2" width="9" height="7" fill="#5599ff" />
      <circle cx="6" cy="4" r="1" fill="#ffeb3b" />
      <path d="M3 9 L5 6 L7 8 L9 5 L12 9 Z" fill="#2e7d32" />
      <rect x="3" y="10" width="9" height="1" fill="#ccc" />
      <rect x="3" y="12" width="6" height="1" fill="#ccc" />
    </svg>
  );
}

export function MediaIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="1" y="2" width="14" height="11" fill="#000" stroke="#444" strokeWidth="0.5" />
      <rect x="2" y="3" width="12" height="7" fill="#0a246a" />
      <path d="M6 5 L10 6.5 L6 8 Z" fill="#fff" />
      <rect x="2" y="11" width="12" height="1" fill="#888" />
      <circle cx="3" cy="13.5" r="0.6" fill="#5be37d" />
    </svg>
  );
}

export function PeopleIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <circle cx="6" cy="5" r="2" fill="#ffd1a3" stroke="#000" strokeWidth="0.5" />
      <path d="M2 13 C2 10, 4 9, 6 9 C8 9, 10 10, 10 13 Z" fill="#1f6bff" stroke="#000" strokeWidth="0.5" />
      <circle cx="11" cy="6" r="1.6" fill="#ffd1a3" stroke="#000" strokeWidth="0.5" />
      <path d="M8 13 C8 11, 10 10, 11 10 C13 10, 14 11, 14 13 Z" fill="#ff4b1a" stroke="#000" strokeWidth="0.5" />
    </svg>
  );
}

export function CartIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path d="M2 3 L3 3 L4 11 L13 11 L14 5 L4 5" fill="none" stroke="#000" strokeWidth="0.7" />
      <rect x="4" y="5" width="9" height="6" fill="#ff4b1a" stroke="#000" strokeWidth="0.5" />
      <circle cx="6" cy="13" r="1" fill="#000" />
      <circle cx="11" cy="13" r="1" fill="#000" />
    </svg>
  );
}

export function CalendarIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="3" width="12" height="11" fill="#fff" stroke="#000" strokeWidth="0.5" />
      <rect x="2" y="3" width="12" height="3" fill="#c70000" />
      <rect x="4" y="2" width="1" height="3" fill="#000" />
      <rect x="11" y="2" width="1" height="3" fill="#000" />
      <text x="3.5" y="11.5" fontFamily="monospace" fontSize="4" fill="#000" fontWeight="bold">25</text>
    </svg>
  );
}

export function MyComputerIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="1" y="2" width="14" height="9" fill="#c8c8c8" stroke="#000" strokeWidth="0.5" />
      <rect x="2" y="3" width="12" height="7" fill="#3a6ea5" />
      <rect x="5" y="11" width="6" height="2" fill="#c8c8c8" stroke="#000" strokeWidth="0.5" />
      <rect x="3" y="13" width="10" height="2" fill="#c8c8c8" stroke="#000" strokeWidth="0.5" />
      <circle cx="13" cy="9" r="0.5" fill="#5be37d" />
    </svg>
  );
}

export function CassetteIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="1" y="3" width="14" height="10" fill="#1a1a1a" stroke="#000" strokeWidth="0.5" />
      <rect x="3" y="5" width="10" height="3" fill="#c2b280" />
      <circle cx="5" cy="11" r="1.2" fill="#444" stroke="#888" strokeWidth="0.5" />
      <circle cx="11" cy="11" r="1.2" fill="#444" stroke="#888" strokeWidth="0.5" />
      <circle cx="5" cy="11" r="0.3" fill="#888" />
      <circle cx="11" cy="11" r="0.3" fill="#888" />
    </svg>
  );
}

export function StartFlagIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...ICON_BASE} width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="2" width="6" height="6" fill="#e74c3c" />
      <rect x="8" y="2" width="6" height="6" fill="#2ecc71" />
      <rect x="2" y="8" width="6" height="6" fill="#3498db" />
      <rect x="8" y="8" width="6" height="6" fill="#f1c40f" />
    </svg>
  );
}
