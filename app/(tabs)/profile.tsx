import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Phone, Mail, MapPin, Calendar } from 'lucide-react-native';

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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [parentInfo] = useState<Parent>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+91 98765 43210',
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
    Alert.alert('Subscription', 'Manage subscription and billing');
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
        { text: 'Logout', style: 'destructive' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <Edit size={20} color="#64748B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Parent Profile */}
        <View style={styles.section}>
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
              <Mail size={16} color="#64748B" strokeWidth={2} />
              <Text style={styles.contactText}>{parentInfo.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={16} color="#64748B" strokeWidth={2} />
              <Text style={styles.contactText}>{parentInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={16} color="#64748B" strokeWidth={2} />
              <Text style={styles.contactText}>{parentInfo.address}</Text>
            </View>
          </View>
        </View>

        {/* Children Profiles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Children</Text>
            <TouchableOpacity style={styles.addChildBtn} onPress={handleAddChild}>
              <Text style={styles.addChildText}>Add Child</Text>
            </TouchableOpacity>
          </View>

          {children.map((child) => (
            <View key={child.id} style={styles.childCard}>
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
                  <Edit size={16} color="#64748B" strokeWidth={2} />
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
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#F1F5F9', true: '#FF6B35' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MapPin size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.settingText}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#F1F5F9', true: '#FF6B35' }}
              thumbColor={locationEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleManageSubscription}>
            <View style={styles.settingInfo}>
              <CreditCard size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.settingText}>Subscription & Billing</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleEmergencyContacts}>
            <View style={styles.settingInfo}>
              <Shield size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.settingText}>Emergency Contacts</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
            <View style={styles.settingInfo}>
              <HelpCircle size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyPolicy}>
            <View style={styles.settingInfo}>
              <Settings size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.settingText}>Privacy Policy & Terms</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" strokeWidth={2} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>KidsOutdoor v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1E293B',
    fontWeight: '700',
  },
  editBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '700',
  },
  addChildBtn: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addChildText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '700',
  },
  profileMeta: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  contactInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 12,
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  childInitial: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  childAge: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  editChildBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  allergyText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
  },
});