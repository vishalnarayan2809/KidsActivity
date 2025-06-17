import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Star, ArrowRight, X, Truck } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/utils/colors';
import NeumorphicCard from '@/components/NeumorphicCard';
import NeumorphicButton from '@/components/NeumorphicButton';

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [includesTransport, setIncludesTransport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { availablePlans, subscribeToPlan } = useSubscription();

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan');
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, we'll use a mock child ID
      await subscribeToPlan(selectedPlan, ['mock-child-id'], includesTransport);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const getTransportPrice = (basePrice: number) => {
    return Math.round(basePrice * 0.3); // 30% of base price for transport
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <Animated.View entering={FadeInUp.delay(200)} style={styles.headerContent}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <X size={24} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Your Adventure</Text>
          <Text style={styles.headerSubtitle}>
            Select the perfect plan for your child's outdoor journey
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(400)} style={styles.plansContainer}>
          {availablePlans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const isPopular = plan.id === 'premium-5';
            const totalPrice = plan.price + (includesTransport ? getTransportPrice(plan.price) : 0);

            return (
              <Animated.View
                key={plan.id}
                entering={FadeInDown.delay(600 + index * 100)}
              >
                <NeumorphicCard
                  style={[
                    styles.planCard,
                    isSelected && styles.planCardSelected,
                    isPopular && styles.planCardPopular,
                  ]}
                  elevated={isSelected}
                >
                  {isPopular && (
                    <View style={styles.popularBadge}>
                      <Star size={16} color={COLORS.white} fill={COLORS.white} strokeWidth={1} />
                      <Text style={styles.popularText}>Most Popular</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.planContent}
                    onPress={() => setSelectedPlan(plan.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.planPrice}>₹{totalPrice.toLocaleString()}</Text>
                        <Text style={styles.planDuration}>/{plan.duration}</Text>
                      </View>
                    </View>

                    <View style={styles.featuresContainer}>
                      {plan.features.map((feature, featureIndex) => (
                        <View key={featureIndex} style={styles.featureItem}>
                          <Check size={16} color={COLORS.success} strokeWidth={2} />
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                      {includesTransport && (
                        <View style={styles.featureItem}>
                          <Check size={16} color={COLORS.success} strokeWidth={2} />
                          <Text style={styles.featureText}>
                            Safe door-to-door transport (+₹{getTransportPrice(plan.price).toLocaleString()})
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.planFooter}>
                      <Text style={styles.sessionsText}>
                        {plan.sessionsPerWeek} sessions per week
                      </Text>
                      <View style={[
                        styles.selectButton,
                        isSelected && styles.selectButtonSelected
                      ]}>
                        {isSelected && <Check size={20} color={COLORS.white} strokeWidth={2} />}
                      </View>
                    </View>
                  </TouchableOpacity>
                </NeumorphicCard>
              </Animated.View>
            );
          })}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000)} style={styles.transportSection}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          <NeumorphicCard>
            <TouchableOpacity
              style={[
                styles.transportCard,
                includesTransport && styles.transportCardSelected
              ]}
              onPress={() => setIncludesTransport(!includesTransport)}
              activeOpacity={0.7}
            >
              <View style={styles.transportContent}>
                <View style={styles.transportIcon}>
                  <Truck size={24} color={includesTransport ? COLORS.white : COLORS.primary} strokeWidth={2} />
                </View>
                <View style={styles.transportInfo}>
                  <Text style={styles.transportTitle}>Safe Transport Service</Text>
                  <Text style={styles.transportDescription}>
                    Door-to-door pickup and drop with live tracking, OTP verification, and certified drivers
                  </Text>
                </View>
                <View style={[
                  styles.transportToggle,
                  includesTransport && styles.transportToggleSelected
                ]}>
                  {includesTransport && <Check size={20} color={COLORS.white} strokeWidth={2} />}
                </View>
              </View>
            </TouchableOpacity>
          </NeumorphicCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1200)} style={styles.actionContainer}>
          <NeumorphicButton
            title={isLoading ? 'Processing...' : 'Subscribe Now'}
            onPress={handleSubscribe}
            disabled={!selectedPlan || isLoading}
            loading={isLoading}
            style={styles.subscribeButton}
            icon={!isLoading && <ArrowRight size={20} color={COLORS.white} strokeWidth={2} />}
          />

          <TouchableOpacity style={styles.skipTextButton} onPress={handleSkip}>
            <Text style={styles.skipTextButtonText}>Skip for now</Text>
          </TouchableOpacity>
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
  skipButton: {
    position: 'absolute',
    right: 0,
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
  plansContainer: {
    paddingTop: SPACING.xl,
  },
  planCard: {
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  planCardSelected: {
    borderColor: COLORS.primary,
  },
  planCardPopular: {
    borderColor: COLORS.highlight,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.highlight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: BORDER_RADIUS.md,
  },
  popularText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontFamily: FONTS.button,
    marginLeft: SPACING.xs,
  },
  planContent: {
    padding: SPACING.xxl,
  },
  planHeader: {
    marginBottom: SPACING.xl,
  },
  planName: {
    fontSize: 24,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
    marginBottom: SPACING.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 32,
    color: COLORS.primary,
    fontFamily: FONTS.headingBold,
  },
  planDuration: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginLeft: SPACING.xs,
  },
  featuresContainer: {
    marginBottom: SPACING.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    marginLeft: SPACING.md,
    flex: 1,
    lineHeight: 20,
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionsText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.bodyMedium,
  },
  selectButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  transportSection: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
    marginBottom: SPACING.lg,
  },
  transportCard: {
    padding: SPACING.xl,
  },
  transportCardSelected: {
    backgroundColor: COLORS.primary,
  },
  transportContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  transportInfo: {
    flex: 1,
  },
  transportTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.xs,
  },
  transportDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    lineHeight: 20,
  },
  transportToggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportToggleSelected: {
    backgroundColor: COLORS.white,
  },
  actionContainer: {
    paddingBottom: SPACING.huge,
  },
  subscribeButton: {
    marginBottom: SPACING.lg,
  },
  skipTextButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  skipTextButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.bodyMedium,
  },
});