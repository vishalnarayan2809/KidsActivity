import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Users, Plus, Filter } from 'lucide-react-native';

interface ScheduleItem {
  id: string;
  date: string;
  time: string;
  activity: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  children: string[];
  duration: string;
}

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState('Today');
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: '1',
      date: 'Today',
      time: '4:00 PM',
      activity: 'Swimming Session',
      location: 'AquaCenter Sports Complex',
      status: 'upcoming',
      children: ['Sarah'],
      duration: '1.5 hours'
    },
    {
      id: '2',
      date: 'Today',
      time: '5:30 PM',
      activity: 'Cricket Practice',
      location: 'Green Field Academy', 
      status: 'upcoming',
      children: ['Mike'],
      duration: '1.5 hours'
    },
    {
      id: '3',
      date: 'Tomorrow',
      time: '4:00 PM',
      activity: 'Football Training',
      location: 'Sports Arena',
      status: 'upcoming',
      children: ['Sarah', 'Mike'],
      duration: '2 hours'
    },
    {
      id: '4',
      date: 'Yesterday',
      time: '4:00 PM',
      activity: 'Basketball Skills',
      location: 'Indoor Sports Center',
      status: 'completed',
      children: ['Sarah'],
      duration: '1.5 hours'
    }
  ]);

  const dateFilters = ['Yesterday', 'Today', 'Tomorrow', 'This Week'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const filteredSchedule = scheduleItems.filter(item => {
    if (selectedDate === 'This Week') return true;
    return item.date === selectedDate;
  });

  const handleBookNewSession = () => {
    Alert.alert('Book New Session', 'Redirecting to booking flow...');
  };

  const handleReschedule = (itemId: string) => {
    Alert.alert('Reschedule', `Reschedule session ${itemId}?`);
  };

  const handleCancel = (itemId: string) => {
    Alert.alert(
      'Cancel Session',
      'Are you sure you want to cancel this session?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: () => {
          setScheduleItems(prev => 
            prev.map(item => 
              item.id === itemId ? { ...item, status: 'cancelled' as const } : item
            )
          );
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleBookNewSession}>
          <Plus size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Date Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {dateFilters.map((date) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.filterBtn,
              selectedDate === date && styles.filterBtnActive
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text
              style={[
                styles.filterText,
                selectedDate === date && styles.filterTextActive
              ]}
            >
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Schedule List */}
      <ScrollView style={styles.scheduleList} showsVerticalScrollIndicator={false}>
        {filteredSchedule.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#94A3B8" strokeWidth={2} />
            <Text style={styles.emptyStateText}>No sessions scheduled</Text>
            <Text style={styles.emptyStateSubtext}>Book a new session to get started</Text>
            <TouchableOpacity style={styles.bookBtn} onPress={handleBookNewSession}>
              <Text style={styles.bookBtnText}>Book Session</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredSchedule.map((item) => (
            <View key={item.id} style={styles.scheduleCard}>
              <View style={styles.scheduleHeader}>
                <View style={styles.scheduleTime}>
                  <Clock size={18} color="#FF6B35" strokeWidth={2} />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                </View>
              </View>

              <Text style={styles.activityName}>{item.activity}</Text>
              
              <View style={styles.scheduleDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#64748B" strokeWidth={2} />
                  <Text style={styles.detailText}>{item.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Users size={16} color="#64748B" strokeWidth={2} />
                  <Text style={styles.detailText}>
                    {item.children.join(', ')} ({item.duration})
                  </Text>
                </View>
              </View>

              {item.status === 'upcoming' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.rescheduleBtn}
                    onPress={() => handleReschedule(item.id)}
                  >
                    <Text style={styles.rescheduleBtnText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => handleCancel(item.id)}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionBtn} onPress={handleBookNewSession}>
          <Plus size={20} color="#FF6B35" strokeWidth={2} />
          <Text style={styles.quickActionText}>Book Session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionBtn} onPress={() => Alert.alert('Filter', 'Filter options coming soon!')}>
          <Filter size={20} color="#FF6B35" strokeWidth={2} />
          <Text style={styles.quickActionText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionBtn} onPress={() => Alert.alert('Calendar', 'Calendar view coming soon!')}>
          <Calendar size={20} color="#FF6B35" strokeWidth={2} />
          <Text style={styles.quickActionText}>Calendar</Text>
        </TouchableOpacity>
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
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterBtnActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scheduleList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
    marginBottom: 24,
  },
  bookBtn: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scheduleCard: {
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
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activityName: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '700',
    marginBottom: 12,
  },
  scheduleDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rescheduleBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rescheduleBtnText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  quickActionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 4,
  },
});