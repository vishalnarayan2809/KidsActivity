import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, Edit, Phone, Mail, MapPin, Calendar } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { router } from 'expo-router';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/utils/colors';
import NeumorphicCard from '@/components/NeumorphicCard';
import NeumorphicButton from '@/components/NeumorphicButton';

interface Child {
  id: string;
  name: string;
  age: number;
  plan: string;
  allergies: string[];
  preferences: string[];
}

interface Parent {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { currentSubscription, hasActiveSubscription, cancelSubscription } = useSubscription();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [parentInfo] = useState<Parent>({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex.johnson@email.com',
    phone: user?.phone || '+91 98765 43210',
    address: '123 Green Valley, Mumbai 400001',
    joinDate: 'January 2024'
  });

  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Sarah',
      age: 8,
      plan: '3 Sessions/Week',
      allergies: ['Peanuts'],
      preferences: ['Swimming', 'Basketball']
    },
    {
      id: '2',
      name: 'Mike',
      age: 12,
      plan: '5 Sessions/Week',
      allergies: [],
      preferences: ['Cricket', 'Football']
    }
  ]);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleEditChild = (childId: string) => {
    Alert.alert('Edit Child', `Edit child profile ${childId}`);
  };

  const handleAddChild = () => {
    Alert.alert('Add Child', 'Add new child profile');
  };

  const handleManageSubscription = () => {
    if (hasActiveSubscription) {
      Alert.alert(
        'Manage Subscription',
        'What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Update Plan', onPress: () => router.push('/subscription') },
          { 
            text: 'Cancel Subscription', 
            style: 'destructive',
            onPress: () => handleCancelSubscription()
          }
        ]
      );
    } else {
      router.push('/subscription');
    }
  };

  const handleCancelSubscription = async () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? This action cannot be undone.',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelSubscription();
              Alert.alert('Success', 'Your subscription has been cancelled.');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to cancel subscription');
            }
          }
        }
      ]
    );
  };

  const handleEmergencyContacts = () => {
    Alert.alert('Emergency Contacts', 'Manage emergency contact information');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact customer support');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'View privacy policy and terms');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <Edit size={20} color={COLORS.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Parent Profile */}
        <NeumorphicCard style={styles.section}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{parentInfo.name.split(' ').map(n => n[0]).join('')}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{parentInfo.name}</Text>
              <Text style={styles.profileMeta}>Member since {parentInfo.joinDate}</Text>
            </View>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color={COLORS.textSecondary} strokeWidth={2} />
              <Text style={styles.contactText}>{parentInfo.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={16} color={COLORS.textSecondary} strokeWidth={2} />
              <Text style={styles.contactText}>{parentInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={16} color={COLORS.textSecondary} strokeWidth={2} />
              <Text style={styles.contactText}>{parentInfo.address}</Text>
            </View>
          </View>
        </NeumorphicCard>

        {/* Subscription Status */}
        <NeumorphicCard style={styles.section}>
          <View style={styles.subscriptionHeader}>
            <Text style={styles.sectionTitle}>Subscription Status</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: hasActiveSubscription ? COLORS.success : COLORS.error }
            ]}>
              <Text style={styles.statusText}>
                {hasActiveSubscription ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
          {hasActiveSubscription && currentSubscription ? (
            <View style={styles.subscriptionDetails}>
              <Text style={styles.subscriptionPlan}>
                Current Plan: {currentSubscription.planId}
              </Text>
              <Text style={styles.subscriptionExpiry}>
                Expires: {currentSubscription.endDate.toLocaleDateString()}
              </Text>
            </View>
          ) : (
            <Text style={styles.noSubscriptionText}>
              No active subscription. Choose a plan to start booking sessions.
            </Text>
          )}
        </NeumorphicCard>

        {/* Children Profiles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Children</Text>
            <NeumorphicButton
              title="Add Child"
              onPress={handleAddChild}
              size="small"
              variant="secondary"
            />
          </View>

          {children.map((child) => (
            <NeumorphicCard key={child.id} style={styles.childCard}>
              <View style={styles.childHeader}>
                <View style={styles.childAvatar}>
                  <Text style={styles.childInitial}>{child.name[0]}</Text>
                </View>
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childAge}>Age {child.age} • {child.plan}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.editChildBtn}
                  onPress={() => handleEditChild(child.id)}
                >
                  <Edit size={16} color={COLORS.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <View style={styles.childDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Preferences:</Text>
                  <Text style={styles.detailValue}>{child.preferences.join(', ')}</Text>
                </View>
                {child.allergies.length > 0 && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Allergies:</Text>
                    <Text style={[styles.detailValue, styles.allergyText]}>{child.allergies.join(', ')}</Text>
                  </View>
                )}
              </View>
            </NeumorphicCard>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <NeumorphicCard style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={COLORS.textSecondary} strokeWidth={2} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </NeumorphicCard>

          <NeumorphicCard style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MapPin size={20} color={COLORS.textSecondary} strokeWidth={2} />
              <Text style={styles.settingText}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </NeumorphicCard>

          <TouchableOpacity onPress={handleManageSubscription}>
            <NeumorphicCard style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <CreditCard size={20} color={COLORS.textSecondary} strokeWidth={2} />
                <Text style={styles.settingText}>Subscription & Billing</Text>
              </View>
            </NeumorphicCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEmergencyContacts}>
            <NeumorphicCard style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield size={20} color={COLORS.textSecondary} strokeWidth={2} />
                <Text style={styles.settingText}>Emergency Contacts</Text>
              </View>
            </NeumorphicCard>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity onPress={handleSupport}>
            <NeumorphicCard style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <HelpCircle size={20} color={COLORS.textSecondary} strokeWidth={2} />
                <Text style={styles.settingText}>Help & Support</Text>
              </View>
            </NeumorphicCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePrivacyPolicy}>
            <NeumorphicCard style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Settings size={20} color={COLORS.textSecondary} strokeWidth={2} />
                <Text style={styles.settingText}>Privacy Policy & Terms</Text>
              </View>
            </NeumorphicCard>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <NeumorphicButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutBtn}
          icon={<LogOut size={20} color={COLORS.error} strokeWidth={2} />}
        />

        {/* App Version */}
        <Text style={styles.versionText}>KidsOutdoor v1.0.0</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  headerTitle: {
    fontSize: 24,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
  },
  editBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.headingBold,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontFamily: FONTS.headingBold,
  },
  profileMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginTop: SPACING.xs,
  },
  contactInfo: {
    gap: SPACING.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginLeft: SPACING.md,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
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
  },
  subscriptionDetails: {
    gap: SPACING.xs,
  },
  subscriptionPlan: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bodyMedium,
  },
  subscriptionExpiry: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
  },
  noSubscriptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontStyle: 'italic',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  childInitial: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.subheadingBold,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
  },
  childAge: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginTop: SPACING.xs,
  },
  editChildBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childDetails: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.subheadingBold,
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    flex: 1,
  },
  allergyText: {
    color: COLORS.error,
    fontFamily: FONTS.bodyMedium,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bodyMedium,
    marginLeft: SPACING.md,
  },
  logoutBtn: {
    marginBottom: SPACING.xl,
    borderColor: COLORS.error,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
  },
});