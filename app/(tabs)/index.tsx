import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, MapPin, Clock, Users, Star, Calendar, Plus, CreditCard, Zap, Shield } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/utils/colors';
import NeumorphicCard from '@/components/NeumorphicCard';
import NeumorphicButton from '@/components/NeumorphicButton';

interface Child {
  id: string;
  name: string;
  age: number;
  plan: string;
  nextSession: string;
  status: 'active' | 'scheduled' | 'completed';
}

interface Activity {
  id: string;
  name: string;
  location: string;
  time: string;
  participants: number;
  rating: number;
  image: string;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { hasActiveSubscription, currentSubscription } = useSubscription();

  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Sarah',
      age: 8,
      plan: 'Basic Explorer',
      nextSession: 'Tomorrow 4:00 PM',
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'Mike',
      age: 12,
      plan: 'Premium Adventurer',
      nextSession: 'Today 5:30 PM',
      status: 'active'
    }
  ]);

  const [upcomingActivities] = useState<Activity[]>([
    {
      id: '1',
      name: 'Swimming Session',
      location: 'AquaCenter Sports Complex',
      time: '4:00 PM - 5:30 PM',
      participants: 6,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Cricket Practice',
      location: 'Green Field Academy',
      time: '5:30 PM - 7:00 PM',
      participants: 8,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return COLORS.success;
      case 'scheduled': return COLORS.secondary;
      case 'completed': return COLORS.textSecondary;
      default: return COLORS.textSecondary;
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === 'Book Session') {
      router.push('/booking');
    } else if (action === 'Live Track') {
      router.push('/(tabs)/tracking');
    } else {
      Alert.alert('Quick Action', `${action} feature coming soon!`);
    }
  };

  const handleSubscriptionPrompt = () => {
    router.push('/subscription');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.headerGradient}
        >
          <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good afternoon,</Text>
              <Text style={styles.userName}>{user?.name || 'Parent'}!</Text>
            </View>
            <TouchableOpacity 
              style={styles.notificationBtn}
              onPress={() => handleQuickAction('Notifications')}
            >
              <Bell size={24} color={COLORS.white} strokeWidth={2} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>

        {/* Subscription Status */}
        {!hasActiveSubscription && (
          <Animated.View entering={FadeInDown.delay(300)}>
            <NeumorphicCard style={styles.subscriptionPrompt}>
              <View style={styles.promptContent}>
                <CreditCard size={24} color={COLORS.secondary} strokeWidth={2} />
                <View style={styles.promptText}>
                  <Text style={styles.promptTitle}>No Active Subscription</Text>
                  <Text style={styles.promptDescription}>Choose a plan to start booking sessions</Text>
                </View>
                <NeumorphicButton
                  title="Choose Plan"
                  onPress={handleSubscriptionPrompt}
                  size="small"
                  variant="secondary"
                />
              </View>
            </NeumorphicCard>
          </Animated.View>
        )}

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionBtn}
            onPress={() => handleQuickAction('Book Session')}
          >
            <NeumorphicCard style={styles.quickActionCard} padding="lg">
              <Calendar size={24} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.quickActionText}>Book Session</Text>
            </NeumorphicCard>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionBtn}
            onPress={() => handleQuickAction('Live Track')}
          >
            <NeumorphicCard style={styles.quickActionCard} padding="lg">
              <MapPin size={24} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.quickActionText}>Live Track</Text>
            </NeumorphicCard>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionBtn}
            onPress={() => handleQuickAction('Emergency')}
          >
            <NeumorphicCard style={[styles.quickActionCard, styles.emergencyCard]} padding="lg">
              <Shield size={24} color={COLORS.error} strokeWidth={2} />
              <Text style={styles.quickActionText}>SOS</Text>
            </NeumorphicCard>
          </TouchableOpacity>
        </Animated.View>

        {/* Children Overview */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Children</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={COLORS.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          {children.map((child, index) => (
            <Animated.View 
              key={child.id} 
              entering={FadeInDown.delay(600 + index * 100)}
            >
              <NeumorphicCard style={styles.childCard}>
                <View style={styles.childHeader}>
                  <View style={styles.childAvatar}>
                    <Text style={styles.childInitial}>{child.name[0]}</Text>
                  </View>
                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.childAge}>Age {child.age} • {child.plan}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(child.status) }]}>
                    <Text style={styles.statusText}>{child.status}</Text>
                  </View>
                </View>
                <View style={styles.nextSession}>
                  <Clock size={16} color={COLORS.textSecondary} strokeWidth={2} />
                  <Text style={styles.nextSessionText}>Next: {child.nextSession}</Text>
                </View>
              </NeumorphicCard>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Upcoming Activities */}
        <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Adventures</Text>
          {upcomingActivities.map((activity, index) => (
            <Animated.View 
              key={activity.id} 
              entering={FadeInDown.delay(800 + index * 100)}
            >
              <NeumorphicCard style={styles.activityCard} elevated>
                <Image source={{ uri: activity.image }} style={styles.activityImage} />
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={16} color={COLORS.highlight} fill={COLORS.highlight} strokeWidth={1} />
                      <Text style={styles.ratingText}>{activity.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.activityDetails}>
                    <View style={styles.activityDetailRow}>
                      <MapPin size={16} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.activityDetailText}>{activity.location}</Text>
                    </View>
                    <View style={styles.activityDetailRow}>
                      <Clock size={16} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.activityDetailText}>{activity.time}</Text>
                    </View>
                    <View style={styles.activityDetailRow}>
                      <Users size={16} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.activityDetailText}>{activity.participants} kids joined</Text>
                    </View>
                  </View>
                </View>
              </NeumorphicCard>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Safety Reminder */}
        <Animated.View entering={FadeInDown.delay(900)}>
          <NeumorphicCard style={styles.safetyCard}>
            <Text style={styles.safetyTitle}>🛡️ Safety First</Text>
            <Text style={styles.safetyText}>
              All activities are supervised by certified professionals. Emergency contacts are always available.
            </Text>
          </NeumorphicCard>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    borderBottomLeftRadius: BORDER_RADIUS.xxxl,
    borderBottomRightRadius: BORDER_RADIUS.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxxl,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: FONTS.body,
  },
  userName: {
    fontSize: 28,
    color: COLORS.white,
    fontFamily: FONTS.headingBold,
    marginTop: SPACING.xs,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.error,
  },
  subscriptionPrompt: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  promptContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  promptText: {
    flex: 1,
  },
  promptTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.xs,
  },
  promptDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xxxl,
    marginBottom: SPACING.xxxl,
    justifyContent: 'space-between',
  },
  quickActionBtn: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  quickActionCard: {
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
  },
  quickActionText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: FONTS.button,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 24,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childCard: {
    marginBottom: SPACING.md,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  childInitial: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.headingBold,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
  },
  childAge: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginTop: SPACING.xs,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.xl,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.button,
    textTransform: 'capitalize',
  },
  nextSession: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextSessionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.bodyMedium,
    marginLeft: SPACING.sm,
  },
  activityCard: {
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  activityContent: {
    padding: SPACING.xl,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  activityName: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.bodyMedium,
    marginLeft: SPACING.xs,
  },
  activityDetails: {
    gap: SPACING.sm,
  },
  activityDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDetailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginLeft: SPACING.sm,
  },
  safetyCard: {
    backgroundColor: '#F0FDF4',
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xxxl,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  safetyTitle: {
    fontSize: 18,
    color: '#065F46',
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.sm,
  },
  safetyText: {
    fontSize: 14,
    color: '#065F46',
    fontFamily: FONTS.body,
    lineHeight: 20,
  },
});