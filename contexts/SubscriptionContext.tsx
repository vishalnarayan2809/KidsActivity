import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Plan, Subscription } from '@/types';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

interface SubscriptionContextType {
  currentSubscription: Subscription | null;
  availablePlans: Plan[];
  loading: boolean;
  subscribeToPlan: (planId: string, childIds: string[], includesTransport: boolean) => Promise<void>;
  hasActiveSubscription: boolean;
  cancelSubscription: () => Promise<void>;
  updateSubscription: (planId: string, includesTransport: boolean) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { user } = useAuth();
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const availablePlans: Plan[] = [
    {
      id: 'basic-3',
      name: 'Basic Explorer',
      sessionsPerWeek: 3,
      price: 2999,
      duration: '1 month',
      features: [
        '3 outdoor activity sessions per week',
        'Professional supervision by certified trainers',
        'Progress tracking and skill development',
        'Weekly progress reports',
        '24/7 emergency support',
        'Basic safety equipment included'
      ],
      isActive: true,
    },
    {
      id: 'premium-5',
      name: 'Premium Adventurer',
      sessionsPerWeek: 5,
      price: 4999,
      duration: '1 month',
      features: [
        '5 outdoor activity sessions per week',
        'Professional supervision by certified trainers',
        'Advanced progress tracking and analytics',
        'Detailed weekly reports with video highlights',
        '24/7 emergency support',
        'Premium safety equipment included',
        'Priority booking and flexible rescheduling',
        'Access to exclusive activities and events'
      ],
      isActive: true,
    },
    {
      id: 'weekend-2',
      name: 'Weekend Warrior',
      sessionsPerWeek: 2,
      price: 1999,
      duration: '1 month',
      features: [
        '2 weekend sessions per week',
        'Professional supervision by certified trainers',
        'Basic progress tracking',
        'Monthly progress reports',
        '24/7 emergency support',
        'Standard safety equipment included'
      ],
      isActive: true,
    },
  ];

  useEffect(() => {
    if (user) {
      fetchCurrentSubscription();
    } else {
      setCurrentSubscription(null);
      setLoading(false);
    }
  }, [user]);

  const fetchCurrentSubscription = async () => {
    if (!user) return;

    try {
      const subscriptionsQuery = query(
        collection(db, 'subscriptions'),
        where('userId', '==', user.id),
        where('status', '==', 'active')
      );
      
      const querySnapshot = await getDocs(subscriptionsQuery);
      if (!querySnapshot.empty) {
        const subscriptionDoc = querySnapshot.docs[0];
        const subscriptionData = subscriptionDoc.data();
        setCurrentSubscription({ 
          id: subscriptionDoc.id, 
          ...subscriptionData,
          startDate: subscriptionData.startDate.toDate(),
          endDate: subscriptionData.endDate.toDate(),
        } as Subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToPlan = async (planId: string, childIds: string[], includesTransport: boolean) => {
    if (!user) throw new Error('User not authenticated');

    const plan = availablePlans.find(p => p.id === planId);
    if (!plan) throw new Error('Plan not found');

    const subscriptionId = `${user.id}_${Date.now()}`;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const subscriptionData: Omit<Subscription, 'id'> = {
      userId: user.id,
      planId,
      childIds,
      status: 'active',
      startDate,
      endDate,
      includesTransport,
      paymentHistory: [],
    };

    try {
      await setDoc(doc(db, 'subscriptions', subscriptionId), subscriptionData);
      setCurrentSubscription({ id: subscriptionId, ...subscriptionData });
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  };

  const cancelSubscription = async () => {
    if (!currentSubscription) throw new Error('No active subscription');

    try {
      await updateDoc(doc(db, 'subscriptions', currentSubscription.id), {
        status: 'cancelled',
        updatedAt: new Date(),
      });
      setCurrentSubscription({ ...currentSubscription, status: 'cancelled' });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  };

  const updateSubscription = async (planId: string, includesTransport: boolean) => {
    if (!currentSubscription) throw new Error('No active subscription');

    try {
      await updateDoc(doc(db, 'subscriptions', currentSubscription.id), {
        planId,
        includesTransport,
        updatedAt: new Date(),
      });
      setCurrentSubscription({ 
        ...currentSubscription, 
        planId, 
        includesTransport 
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  };

  const hasActiveSubscription = currentSubscription?.status === 'active';

  const value = {
    currentSubscription,
    availablePlans,
    loading,
    subscribeToPlan,
    hasActiveSubscription,
    cancelSubscription,
    updateSubscription,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}