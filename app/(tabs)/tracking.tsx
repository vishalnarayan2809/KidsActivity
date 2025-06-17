import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Clock, Phone, Shield, CircleCheck as CheckCircle } from 'lucide-react-native';

interface TrackingData {
  driverName: string;
  vehicleNumber: string;
  currentLocation: string;
  estimatedTime: string;
  status: 'approaching' | 'arrived' | 'boarded' | 'in-transit' | 'completed';
  children: string[];
  contactNumber: string;
  otpCode?: string;
}

export default function TrackingScreen() {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    driverName: 'Rajesh Kumar',
    vehicleNumber: 'MH 01 AB 1234',
    currentLocation: '2 km away from pickup point',
    estimatedTime: '8 minutes',
    status: 'approaching',
    children: ['Sarah', 'Mike'],
    contactNumber: '+91 98765 43210',
  });

  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrackingData(prev => {
        const updates = {
          approaching: {
            currentLocation: '1 km away from pickup point',
            estimatedTime: '5 minutes',
            status: 'approaching' as const
          },
          arrived: {
            currentLocation: 'Arrived at pickup point',
            estimatedTime: 'Now',
            status: 'arrived' as const,
            otpCode: '1234'
          }
        };

        if (prev.status === 'approaching') {
          setShowOTP(true);
          return { ...prev, ...updates.arrived };
        }
        return prev;
      });
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approaching': return '#F59E0B';
      case 'arrived': return '#10B981';
      case 'boarded': return '#3B82F6';
      case 'in-transit': return '#8B5CF6';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approaching': return 'Van Approaching';
      case 'arrived': return 'Van Arrived';
      case 'boarded': return 'Children Boarded';
      case 'in-transit': return 'On the Way';
      case 'completed': return 'Activity Completed';
      default: return 'Unknown Status';
    }
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      `Call ${trackingData.contactNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', style: 'default' }
      ]
    );
  };

  const handleOTPVerification = () => {
    Alert.alert(
      'OTP Verification',
      'Please provide the OTP shown on driver\'s device to confirm pickup.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Verify', style: 'default', onPress: () => {
          setTrackingData(prev => ({ ...prev, status: 'boarded' }));
          setShowOTP(false);
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Tracking</Text>
        <TouchableOpacity style={styles.emergencyBtn} onPress={handleEmergencyCall}>
          <Phone size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trackingData.status) }]}>
            <Text style={styles.statusText}>{getStatusText(trackingData.status)}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#64748B" strokeWidth={2} />
            <Text style={styles.timeText}>ETA: {trackingData.estimatedTime}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={20} color="#FF6B35" strokeWidth={2} />
          <Text style={styles.locationText}>{trackingData.currentLocation}</Text>
        </View>
      </View>

      {/* Driver Info */}
      <View style={styles.driverCard}>
        <View style={styles.driverHeader}>
          <Text style={styles.driverTitle}>Driver Information</Text>
          <TouchableOpacity style={styles.callBtn} onPress={handleEmergencyCall}>
            <Phone size={16} color="#FF6B35" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{trackingData.driverName}</Text>
          <Text style={styles.vehicleNumber}>Vehicle: {trackingData.vehicleNumber}</Text>
          <Text style={styles.contactNumber}>Contact: {trackingData.contactNumber}</Text>
        </View>
      </View>

      {/* Children List */}
      <View style={styles.childrenCard}>
        <Text style={styles.childrenTitle}>Children in This Trip</Text>
        {trackingData.children.map((child, index) => (
          <View key={index} style={styles.childItem}>
            <View style={styles.childAvatar}>
              <Text style={styles.childInitial}>{child[0]}</Text>
            </View>
            <Text style={styles.childName}>{child}</Text>
            <CheckCircle size={20} color="#10B981" strokeWidth={2} />
          </View>
        ))}
      </View>

      {/* OTP Verification */}
      {showOTP && trackingData.otpCode && (
        <View style={styles.otpCard}>
          <View style={styles.otpHeader}>
            <Shield size={24} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.otpTitle}>Pickup Verification</Text>
          </View>
          <Text style={styles.otpDescription}>
            Driver will show you this OTP code: <Text style={styles.otpCode}>{trackingData.otpCode}</Text>
          </Text>
          <TouchableOpacity style={styles.verifyBtn} onPress={handleOTPVerification}>
            <Text style={styles.verifyBtnText}>Confirm Pickup</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Navigation size={48} color="#64748B" strokeWidth={2} />
          <Text style={styles.mapPlaceholderText}>Live Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>Real-time location tracking</Text>
        </View>
      </View>

      {/* Safety Features */}
      <View style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>🛡️ Safety Features Active</Text>
        <View style={styles.safetyFeatures}>
          <Text style={styles.safetyFeature}>• GPS tracking enabled</Text>
          <Text style={styles.safetyFeature}>• Emergency contact available</Text>
          <Text style={styles.safetyFeature}>• OTP verification required</Text>
          <Text style={styles.safetyFeature}>• Certified driver assigned</Text>
        </View>
      </View>
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
  emergencyBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverTitle: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '600',
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInfo: {
    gap: 4,
  },
  driverName: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  vehicleNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  contactNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  childrenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  childrenTitle: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 12,
  },
  childItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  childAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  childInitial: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  childName: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  otpCard: {
    backgroundColor: '#EBF8FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  otpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  otpTitle: {
    fontSize: 18,
    color: '#1E40AF',
    fontWeight: '700',
    marginLeft: 12,
  },
  otpDescription: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 16,
    lineHeight: 20,
  },
  otpCode: {
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifyBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  verifyBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapPlaceholderText: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 12,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  safetyCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  safetyTitle: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '700',
    marginBottom: 12,
  },
  safetyFeatures: {
    gap: 6,
  },
  safetyFeature: {
    fontSize: 14,
    color: '#065F46',
  },
});