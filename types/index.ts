export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'parent' | 'cas' | 'driver' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  dateOfBirth: Date;
  photo?: string;
  allergies: string[];
  preferences: string[];
  medicalNotes?: string;
  emergencyContact: EmergencyContact;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Plan {
  id: string;
  name: string;
  sessionsPerWeek: number;
  price: number;
  duration: string; // e.g., "1 month", "3 months"
  features: string[];
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  childIds: string[];
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  includesTransport: boolean;
  paymentHistory: Payment[];
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId?: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  childIds: string[];
  casId: string;
  driverId?: string;
  location: Location;
  ageRange: { min: number; max: number };
  maxCapacity: number;
  schedule: Schedule[];
  isActive: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { latitude: number; longitude: number };
  type: 'pickup' | 'activity_center';
}

export interface Schedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string;
  activityType: string;
}

export interface Session {
  id: string;
  groupId: string;
  date: Date;
  startTime: string;
  endTime: string;
  activityType: string;
  location: Location;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  attendance: Attendance[];
  notes?: string;
}

export interface Attendance {
  childId: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: Date;
  checkOutTime?: Date;
  notes?: string;
}

export interface Transport {
  id: string;
  sessionId: string;
  driverId: string;
  vehicleId: string;
  route: TransportStop[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
}

export interface TransportStop {
  locationId: string;
  childIds: string[];
  estimatedTime: Date;
  actualTime?: Date;
  status: 'pending' | 'completed';
  otpCode?: string;
}

export interface Report {
  id: string;
  childId: string;
  casId: string;
  period: { startDate: Date; endDate: Date };
  scores: {
    physical: number;
    social: number;
    behavioral: number;
  };
  activities: string[];
  highlights: string[];
  areasForImprovement: string[];
  overallRating: number;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  childId: string;
  title: string;
  description: string;
  type: 'skill' | 'behavior' | 'participation';
  earnedAt: Date;
  badgeIcon?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'transport' | 'session' | 'report' | 'payment' | 'emergency';
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

export interface CAS {
  id: string;
  userId: string;
  certifications: string[];
  specializations: string[];
  experience: number; // years
  rating: number;
  bio?: string;
  isActive: boolean;
}

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  vehicleId: string;
  rating: number;
  isActive: boolean;
  backgroundCheckStatus: 'pending' | 'approved' | 'rejected';
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  capacity: number;
  safetyFeatures: string[];
  insuranceStatus: 'active' | 'expired';
  lastInspection: Date;
}