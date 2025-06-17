import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Safe Outdoor Activities',
      subtitle: 'Let your kids discover the joy of outdoor sports',
      description: 'Professional supervision, certified trainers, and safe environments for cricket, swimming, football, and basketball.',
      image: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Smart Transport System',
      subtitle: 'Door-to-door pickup and drop service',
      description: 'Real-time tracking, OTP verification, and certified drivers ensure your child\'s safety during transport.',
      image: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Progress Tracking',
      subtitle: 'Watch your child grow and develop',
      description: 'Weekly progress reports, skill development tracking, and personalized feedback from certified activity supervisors.',
      image: 'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/auth');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/auth');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentStepData.image }} style={styles.image} />
          <View style={styles.overlay} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>
          <Text style={styles.description}>{currentStepData.description}</Text>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft 
              size={24} 
              color={currentStep === 0 ? '#94A3B8' : '#64748B'} 
              strokeWidth={2} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ChevronRight size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    color: '#1E293B',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  navigation: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#FF6B35',
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  previousButton: {
    // Additional styling for previous button if needed
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 8,
  },
});