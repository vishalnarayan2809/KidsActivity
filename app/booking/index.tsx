import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Users, ArrowLeft, CreditCard, Zap, Settings } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/utils/colors';
import NeumorphicCard from '@/components/NeumorphicCard';
import NeumorphicButton from '@/components/NeumorphicButton';

interface BookingMode {
  id: 'automated' | 'custom';
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Activity {
  id: string;
  name: string;
  location: string;
  ageGroup: string;
  image: string;
}

export default function BookingScreen() {
  const [selectedMode, setSelectedMode] = useState<'automated' | 'custom' | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const { hasActiveSubscription } = useSubscription();

  const bookingModes: BookingMode[] = [
    {
      id: 'automated',
      title: 'Smart Scheduling',
      description: 'Let our AI automatically schedule optimal sessions based on your plan and preferences',
      icon: <Zap size={24} color={COLORS.primary} strokeWidth={2} />
    },
    {
      id: 'custom',
      title: 'Custom Booking',
      description: 'Manually select specific dates, times, and activities for personalized sessions',
      icon: <Settings size={24} color={COLORS.primary} strokeWidth={2} />
    }
  ];

  const activities: Activity[] = [
    { 
      id: 'swimming', 
      name: 'Swimming', 
      location: 'AquaCenter Sports Complex', 
      ageGroup: '6-16 years',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'cricket', 
      name: 'Cricket', 
      location: 'Green Field Academy', 
      ageGroup: '8-16 years',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'football', 
      name: 'Football', 
      location: 'Sports Arena', 
      ageGroup: '6-16 years',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'basketball', 
      name: 'Basketball', 
      location: 'Indoor Sports Center', 
      ageGroup: '10-16 years',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const timeSlots: TimeSlot[] = [
    { id: 'morning-1', time: '8:00 AM - 9:30 AM', available: true },
    { id: 'morning-2', time: '10:00 AM - 11:30 AM', available: true },
    { id: 'afternoon-1', time: '4:00 PM - 5:30 PM', available: true },
    { id: 'afternoon-2', time: '6:00 PM - 7:30 PM', available: false },
  ];

  const handleBooking = () => {
    if (!hasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You need an active subscription to book sessions. Would you like to choose a plan?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Choose Plan', onPress: () => router.push('/subscription') }
        ]
      );
      return;
    }

    if (selectedMode === 'automated') {
      Alert.alert(
        'Smart Scheduling Activated',
        'Your sessions have been automatically scheduled based on your plan and preferences. You will receive a confirmation shortly.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } else if (selectedMode === 'custom') {
      if (!selectedActivity || !selectedTimeSlot) {
        Alert.alert('Error', 'Please select an activity and time slot');
        return;
      }
      Alert.alert(
        'Session Booked Successfully',
        'Your custom session has been booked! Check your schedule for details.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };

  const handlePaymentRequired = () => {
    router.push('/subscription');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <Animated.View entering={FadeInUp.delay(200)} style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Your Adventure</Text>
          <Text style={styles.headerSubtitle}>
            Choose how you'd like to schedule your outdoor activities
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!hasActiveSubscription && (
          <Animated.View entering={FadeInDown.delay(300)}>
            <NeumorphicCard style={styles.subscriptionAlert}>
              <View style={styles.alertContent}>
                <CreditCard size={24} color={COLORS.secondary} strokeWidth={2} />
                <View style={styles.alertText}>
                  <Text style={styles.alertTitle}>Subscription Required</Text>
                  <Text style={styles.alertDescription}>
                    You need an active subscription to book sessions
                  </Text>
                </View>
                <NeumorphicButton
                  title="Choose Plan"
                  onPress={handlePaymentRequired}
                  size="small"
                  variant="secondary"
                />
              </View>
            </NeumorphicCard>
          </Animated.View>
        )}

        <Animated.View entering={FadeInDown.delay(400)} style={styles.modesContainer}>
          <Text style={styles.sectionTitle}>Booking Mode</Text>
          {bookingModes.map((mode, index) => (
            <Animated.View
              key={mode.id}
              entering={FadeInDown.delay(500 + index * 100)}
            >
              <NeumorphicCard
                style={[
                  styles.modeCard,
                  selectedMode === mode.id && styles.modeCardSelected,
                  !hasActiveSubscription && styles.modeCardDisabled
                ]}
                elevated={selectedMode === mode.id}
              >
                <TouchableOpacity
                  style={styles.modeContent}
                  onPress={() => hasActiveSubscription && setSelectedMode(mode.id)}
                  disabled={!hasActiveSubscription}
                  activeOpacity={0.7}
                >
                  <View style={styles.modeIcon}>
                    {mode.icon}
                  </View>
                  <View style={styles.modeInfo}>
                    <Text style={[
                      styles.modeTitle,
                      !hasActiveSubscription && styles.disabledText
                    ]}>
                      {mode.title}
                    </Text>
                    <Text style={[
                      styles.modeDescription,
                      !hasActiveSubscription && styles.disabledText
                    ]}>
                      {mode.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.modeSelector,
                    selectedMode === mode.id && styles.modeSelectorSelected
                  ]} />
                </TouchableOpacity>
              </NeumorphicCard>
            </Animated.View>
          ))}
        </Animated.View>

        {selectedMode === 'custom' && hasActiveSubscription && (
          <>
            <Animated.View entering={FadeInDown.delay(700)} style={styles.customBookingContainer}>
              <Text style={styles.sectionTitle}>Select Activity</Text>
              {activities.map((activity, index) => (
                <Animated.View
                  key={activity.id}
                  entering={FadeInDown.delay(800 + index * 50)}
                >
                  <NeumorphicCard
                    style={[
                      styles.activityCard,
                      selectedActivity === activity.id && styles.activityCardSelected
                    ]}
                    elevated={selectedActivity === activity.id}
                  >
                    <TouchableOpacity
                      style={styles.activityContent}
                      onPress={() => setSelectedActivity(activity.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.activityInfo}>
                        <Text style={styles.activityName}>{activity.name}</Text>
                        <View style={styles.activityDetails}>
                          <View style={styles.activityDetailRow}>
                            <MapPin size={14} color={COLORS.textSecondary} strokeWidth={2} />
                            <Text style={styles.activityDetailText}>{activity.location}</Text>
                          </View>
                          <View style={styles.activityDetailRow}>
                            <Users size={14} color={COLORS.textSecondary} strokeWidth={2} />
                            <Text style={styles.activityDetailText}>{activity.ageGroup}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={[
                        styles.activitySelector,
                        selectedActivity === activity.id && styles.activitySelectorSelected
                      ]} />
                    </TouchableOpacity>
                  </NeumorphicCard>
                </Animated.View>
              ))}
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(1000)} style={styles.timeSlotContainer}>
              <Text style={styles.sectionTitle}>Available Time Slots</Text>
              {timeSlots.map((slot, index) => (
                <Animated.View
                  key={slot.id}
                  entering={FadeInDown.delay(1100 + index * 50)}
                >
                  <NeumorphicCard
                    style={[
                      styles.timeSlotCard,
                      selectedTimeSlot === slot.id && styles.timeSlotCardSelected,
                      !slot.available && styles.timeSlotCardDisabled
                    ]}
                    elevated={selectedTimeSlot === slot.id}
                  >
                    <TouchableOpacity
                      style={styles.timeSlotContent}
                      onPress={() => slot.available && setSelectedTimeSlot(slot.id)}
                      disabled={!slot.available}
                      activeOpacity={0.7}
                    >
                      <Clock size={20} color={slot.available ? COLORS.primary : COLORS.textSecondary} strokeWidth={2} />
                      <Text style={[
                        styles.timeSlotText,
                        !slot.available && styles.disabledText
                      ]}>
                        {slot.time}
                      </Text>
                      {!slot.available && (
                        <Text style={styles.unavailableText}>Full</Text>
                      )}
                    </TouchableOpacity>
                  </NeumorphicCard>
                </Animated.View>
              ))}
            </Animated.View>
          </>
        )}

        <Animated.View entering={FadeInDown.delay(1200)} style={styles.actionContainer}>
          <NeumorphicButton
            title={hasActiveSubscription ? 'Book Sessions' : 'Choose Plan First'}
            onPress={handleBooking}
            disabled={!selectedMode || !hasActiveSubscription}
            style={styles.bookButton}
          />
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
  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  headerContent: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: COLORS.white,
    fontFamily: FONTS.headingBold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: FONTS.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  subscriptionAlert: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.xs,
  },
  alertDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
  },
  modesContainer: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
    marginBottom: SPACING.lg,
  },
  modeCard: {
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeCardSelected: {
    borderColor: COLORS.primary,
  },
  modeCardDisabled: {
    opacity: 0.5,
  },
  modeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.xs,
  },
  modeDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    lineHeight: 20,
  },
  modeSelector: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.border,
  },
  modeSelectorSelected: {
    backgroundColor: COLORS.primary,
  },
  disabledText: {
    color: COLORS.textSecondary,
    opacity: 0.6,
  },
  customBookingContainer: {
    marginTop: SPACING.xxxl,
  },
  activityCard: {
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activityCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.sm,
  },
  activityDetails: {
    gap: SPACING.xs,
  },
  activityDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDetailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginLeft: SPACING.xs,
  },
  activitySelector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.border,
  },
  activitySelectorSelected: {
    backgroundColor: COLORS.primary,
  },
  timeSlotContainer: {
    marginTop: SPACING.xxxl,
  },
  timeSlotCard: {
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  timeSlotCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  timeSlotCardDisabled: {
    opacity: 0.5,
  },
  timeSlotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  timeSlotText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bodyMedium,
    flex: 1,
  },
  unavailableText: {
    fontSize: 12,
    color: COLORS.error,
    fontFamily: FONTS.button,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  actionContainer: {
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.huge,
  },
  bookButton: {
    width: '100%',
  },
});