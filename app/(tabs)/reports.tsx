import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, TrendingUp, Star, Award, Calendar, Download, Share } from 'lucide-react-native';

interface Report {
  id: string;
  childName: string;
  week: string;
  physicalScore: number;
  socialScore: number;
  behaviorScore: number;
  activities: string[];
  highlights: string[];
  improvements: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  childName: string;
  type: 'skill' | 'behavior' | 'participation';
}

export default function ReportsScreen() {
  const [selectedChild, setSelectedChild] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');

  const [reports] = useState<Report[]>([
    {
      id: '1',
      childName: 'Sarah',
      week: 'Week of Jan 15-21',
      physicalScore: 85,
      socialScore: 92,
      behaviorScore: 88,
      activities: ['Swimming', 'Basketball', 'Football'],
      highlights: [
        'Showed excellent teamwork during football',
        'Improved swimming stroke technique',
        'Helped new teammate learn basketball basics'
      ],
      improvements: [
        'Focus on defensive positioning in basketball',
        'Continue building endurance in swimming'
      ]
    },
    {
      id: '2',
      childName: 'Mike',
      week: 'Week of Jan 15-21',
      physicalScore: 78,
      socialScore: 85,
      behaviorScore: 90,
      activities: ['Cricket', 'Football', 'Swimming'],
      highlights: [
        'Excellent sportsmanship during cricket match',
        'Showed leadership in group activities',
        'Consistent attendance and punctuality'
      ],
      improvements: [
        'Work on cricket batting stance',
        'Encourage more participation in group discussions'
      ]
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Team Player',
      description: 'Consistently helps teammates and shows great sportsmanship',
      date: '2 days ago',
      childName: 'Sarah',
      type: 'behavior'
    },
    {
      id: '2',
      title: 'Swimming Stroke Master',
      description: 'Mastered the freestyle swimming technique',
      date: '1 week ago',
      childName: 'Sarah',
      type: 'skill'
    },
    {
      id: '3',
      title: 'Perfect Attendance',
      description: 'Attended all sessions this month',
      date: '3 days ago',
      childName: 'Mike',
      type: 'participation'
    }
  ]);

  const children = ['All', 'Sarah', 'Mike'];
  const periods = ['This Week', 'Last Week', 'This Month', 'Last Month'];

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#F59E0B';
    if (score >= 70) return '#FF6B35';
    return '#EF4444';
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'skill': return Star;
      case 'behavior': return Award;
      case 'participation': return TrendingUp;
      default: return Star;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'skill': return '#3B82F6';
      case 'behavior': return '#10B981';
      case 'participation': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const filteredReports = reports.filter(report => 
    selectedChild === 'All' ? true : report.childName === selectedChild
  );

  const filteredAchievements = achievements.filter(achievement =>
    selectedChild === 'All' ? true : achievement.childName === selectedChild
  );

  const handleDownloadReport = (reportId: string) => {
    Alert.alert('Download Report', `Downloading report ${reportId} as PDF...`);
  };

  const handleShareReport = (reportId: string) => {
    Alert.alert('Share Report', `Share report ${reportId} with family or coach?`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress Reports</Text>
        <TouchableOpacity style={styles.shareBtn} onPress={() => Alert.alert('Share', 'Share all reports')}>
          <Share size={20} color="#64748B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          <Text style={styles.filterLabel}>Child:</Text>
          {children.map((child) => (
            <TouchableOpacity
              key={child}
              style={[
                styles.filterBtn,
                selectedChild === child && styles.filterBtnActive
              ]}
              onPress={() => setSelectedChild(child)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedChild === child && styles.filterTextActive
                ]}
              >
                {child}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          <Text style={styles.filterLabel}>Period:</Text>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.filterBtn,
                selectedPeriod === period && styles.filterBtnActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedPeriod === period && styles.filterTextActive
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Recent Achievements</Text>
          {filteredAchievements.map((achievement) => {
            const IconComponent = getAchievementIcon(achievement.type);
            return (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: getAchievementColor(achievement.type) }]}>
                  <IconComponent size={20} color="#FFFFFF" strokeWidth={2} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  <Text style={styles.achievementMeta}>
                    {achievement.childName} • {achievement.date}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Weekly Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Weekly Progress Reports</Text>
          {filteredReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View>
                  <Text style={styles.reportChildName}>{report.childName}</Text>
                  <Text style={styles.reportPeriod}>{report.week}</Text>
                </View>
                <View style={styles.reportActions}>
                  <TouchableOpacity 
                    style={styles.actionBtn}
                    onPress={() => handleDownloadReport(report.id)}
                  >
                    <Download size={16} color="#64748B" strokeWidth={2} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionBtn}
                    onPress={() => handleShareReport(report.id)}
                  >
                    <Share size={16} color="#64748B" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Scores */}
              <View style={styles.scoresContainer}>
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>Physical</Text>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreBarFill, 
                        { 
                          width: `${report.physicalScore}%`,
                          backgroundColor: getScoreColor(report.physicalScore)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.scoreValue, { color: getScoreColor(report.physicalScore) }]}>
                    {report.physicalScore}%
                  </Text>
                </View>

                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>Social</Text>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreBarFill, 
                        { 
                          width: `${report.socialScore}%`,
                          backgroundColor: getScoreColor(report.socialScore)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.scoreValue, { color: getScoreColor(report.socialScore) }]}>
                    {report.socialScore}%
                  </Text>
                </View>

                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>Behavior</Text>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreBarFill, 
                        { 
                          width: `${report.behaviorScore}%`,
                          backgroundColor: getScoreColor(report.behaviorScore)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.scoreValue, { color: getScoreColor(report.behaviorScore) }]}>
                    {report.behaviorScore}%
                  </Text>
                </View>
              </View>

              {/* Activities */}
              <View style={styles.activitiesContainer}>
                <Text style={styles.activitiesTitle}>Activities This Week:</Text>
                <View style={styles.activitiesList}>
                  {report.activities.map((activity, index) => (
                    <View key={index} style={styles.activityTag}>
                      <Text style={styles.activityTagText}>{activity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Highlights */}
              <View style={styles.highlightsContainer}>
                <Text style={styles.highlightsTitle}>✨ Highlights:</Text>
                {report.highlights.map((highlight, index) => (
                  <Text key={index} style={styles.highlightItem}>• {highlight}</Text>
                ))}
              </View>

              {/* Areas for Improvement */}
              <View style={styles.improvementsContainer}>
                <Text style={styles.improvementsTitle}>🎯 Areas for Improvement:</Text>
                {report.improvements.map((improvement, index) => (
                  <Text key={index} style={styles.improvementItem}>• {improvement}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
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
  shareBtn: {
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    marginRight: 16,
    alignSelf: 'center',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '700',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  achievementMeta: {
    fontSize: 12,
    color: '#94A3B8',
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reportChildName: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '700',
  },
  reportPeriod: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  reportActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoresContainer: {
    marginBottom: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    width: 70,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '700',
    width: 40,
    textAlign: 'right',
  },
  activitiesContainer: {
    marginBottom: 20,
  },
  activitiesTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 8,
  },
  activitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activityTagText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  highlightsContainer: {
    marginBottom: 20,
  },
  highlightsTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 8,
  },
  highlightItem: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 4,
    lineHeight: 20,
  },
  improvementsContainer: {
    marginBottom: 0,
  },
  improvementsTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 8,
  },
  improvementItem: {
    fontSize: 14,
    color: '#DC2626',
    marginBottom: 4,
    lineHeight: 20,
  },
});