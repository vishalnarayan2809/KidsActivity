export const COLORS = {
  primary: '#FF6B35',
  secondary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#06B6D4',
  
  // Grays
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
  
  // Whites
  white: '#FFFFFF',
  black: '#000000',
};

export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const ACTIVITY_TYPES = [
  'Swimming',
  'Cricket',
  'Football',
  'Basketball',
  'Tennis',
  'Badminton',
  'Athletics',
  'Gymnastics',
];

export const PLAN_TYPES = [
  {
    id: '3-sessions',
    name: '3 Sessions/Week',
    price: 2999,
    sessions: 3,
    duration: '1 month',
  },
  {
    id: '5-sessions',
    name: '5 Sessions/Week',
    price: 4999,
    sessions: 5,
    duration: '1 month',
  },
  {
    id: 'weekend-only',
    name: 'Weekend Only',
    price: 1999,
    sessions: 2,
    duration: '1 month',
  },
];

export const AGE_GROUPS = [
  { min: 6, max: 8, label: '6-8 years' },
  { min: 9, max: 12, label: '9-12 years' },
  { min: 13, max: 16, label: '13-16 years' },
];

export const NOTIFICATION_TYPES = {
  TRANSPORT_APPROACHING: 'transport_approaching',
  TRANSPORT_ARRIVED: 'transport_arrived',
  CHILD_BOARDED: 'child_boarded',
  SESSION_STARTED: 'session_started',
  SESSION_COMPLETED: 'session_completed',
  REPORT_READY: 'report_ready',
  PAYMENT_DUE: 'payment_due',
  EMERGENCY_ALERT: 'emergency_alert',
} as const;

export const STATUS_COLORS = {
  active: '#10B981',
  inactive: '#94A3B8',
  pending: '#F59E0B',
  completed: '#10B981',
  cancelled: '#EF4444',
  scheduled: '#3B82F6',
} as const;