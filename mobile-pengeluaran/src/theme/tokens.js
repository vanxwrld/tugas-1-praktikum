// src/theme/tokens.js
// Design tokens untuk PengeluaranKu — expense tracker mobile
// Dihasilkan dari ui-ux-pro-max skill (PengeluaranKu expense tracker mobile finance)

export const colors = {
  // Brand / Action
  primary: '#0F766E',       // teal-700 — aksi utama, CTA
  primaryHover: '#115E59',  // teal-800 — hover/pressed
  primaryLight: '#CCFBF1',  // teal-50 — selected background
  onPrimary: '#FFFFFF',

  // Accent (profit/green)
  accent: '#059669',        // emerald-600 — profit, income
  accentLight: '#D1FAE5',   // emerald-50
  onAccent: '#FFFFFF',

  // Background / Surface
  background: '#F8FAFC',    // slate-50 — page background
  surface: '#FFFFFF',       // white — card, input, modal
  surfaceElevated: '#FFFFFF',
  onSurface: '#0F172A',     // slate-900 — primary text
  onSurfaceVariant: '#475569', // slate-600 — secondary text

  // Border / Divider
  border: '#CBD5E1',        // slate-300
  borderFocus: '#0F766E',   // primary focus ring
  divider: '#E2E8F0',       // slate-200

  // Status / Semantic
  success: '#059669',       // emerald-600
  successLight: '#D1FAE5',
  warning: '#D97706',       // amber-600
  warningLight: '#FEF3C7',
  error: '#DC2626',         // red-600
  errorLight: '#FEE2E2',
  onError: '#FFFFFF',

  // Muted / Disabled
  muted: '#F1F5F9',         // slate-100
  mutedForeground: '#94A3B8', // slate-400
  disabled: '#E2E8F0',      // slate-200
  disabledForeground: '#94A3B8',

  // Overlay / Modal
  overlay: 'rgba(15, 23, 42, 0.5)', // slate-900/50
  scrim: 'rgba(15, 23, 42, 0.32)',

  // Dark mode (optional future)
  dark: {
    background: '#0F172A',
    surface: '#192134',
    surfaceElevated: '#1E293B',
    onSurface: '#F8FAFC',
    onSurfaceVariant: '#94A3B8',
    border: 'rgba(255,255,255,0.08)',
    borderFocus: '#34D399',
    muted: '#1E293B',
    mutedForeground: '#64748B',
    disabled: 'rgba(255,255,255,0.08)',
    overlay: 'rgba(0,0,0,0.6)',
  }
};

export const spacing = {
  // 4px base scale
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
};

export const transitions = {
  fast: 150,
  normal: 250,
  slow: 350,
};

export const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
};

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
};

// Helper untuk formatting rupiah (sudah ada di helpers.js, tapi simpan di sini juga)
export const currency = {
  locale: 'id-ID',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

export default {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  currency,
};