import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, ArrowRight, Shield, Eye, EyeOff, User, Phone } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/utils/colors';
import NeumorphicCard from '@/components/NeumorphicCard';
import NeumorphicButton from '@/components/NeumorphicButton';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!isLogin && (!name || !phone)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        router.replace('/(tabs)');
      } else {
        await signUp(email, password, { name, phone });
        router.push('/subscription');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push('/subscription');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
            <View style={styles.logoContainer}>
              <Shield size={48} color={COLORS.white} strokeWidth={2} />
            </View>
            <Text style={styles.title}>
              {isLogin ? 'Welcome Back!' : 'Join PlaySafe'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin 
                ? 'Sign in to continue your outdoor adventure'
                : 'Create an account to get started with safe outdoor activities'
              }
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.formContainer}>
            <NeumorphicCard style={styles.formCard} padding="xxl">
              {!isLogin && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <View style={styles.inputContainer}>
                      <User size={20} color={COLORS.textSecondary} strokeWidth={2} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={COLORS.textSecondary}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <View style={styles.inputContainer}>
                      <Phone size={20} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.countryCode}>+91</Text>
                      <TextInput
                        style={[styles.input, styles.phoneInput]}
                        placeholder="Enter phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        maxLength={10}
                        placeholderTextColor={COLORS.textSecondary}
                      />
                    </View>
                  </View>
                </>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Mail size={20} color={COLORS.textSecondary} strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color={COLORS.textSecondary} strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={COLORS.textSecondary} strokeWidth={2} />
                    ) : (
                      <Eye size={20} color={COLORS.textSecondary} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={styles.inputContainer}>
                    <Lock size={20} color={COLORS.textSecondary} strokeWidth={2} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor={COLORS.textSecondary}
                    />
                  </View>
                </View>
              )}

              <NeumorphicButton
                title={isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                onPress={handleEmailAuth}
                disabled={isLoading}
                loading={isLoading}
                style={styles.primaryButton}
                icon={!isLoading && <ArrowRight size={20} color={COLORS.white} strokeWidth={2} />}
              />

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <NeumorphicButton
                title="Continue with Google"
                onPress={handleGoogleSignIn}
                disabled={isLoading}
                variant="outline"
                style={styles.googleButton}
              />

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsLogin(!isLogin)}
              >
                <Text style={styles.switchButtonText}>
                  {isLogin 
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"
                  }
                </Text>
              </TouchableOpacity>
            </NeumorphicCard>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: SPACING.huge,
    paddingBottom: SPACING.huge,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
    fontFamily: FONTS.headingBold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: FONTS.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  formCard: {
    marginBottom: SPACING.huge,
  },
  inputGroup: {
    marginBottom: SPACING.xxl,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: FONTS.subheadingBold,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    marginLeft: SPACING.md,
  },
  phoneInput: {
    marginLeft: SPACING.sm,
  },
  countryCode: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bodyMedium,
    marginLeft: SPACING.sm,
  },
  primaryButton: {
    marginBottom: SPACING.xxl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    marginHorizontal: SPACING.lg,
  },
  googleButton: {
    marginBottom: SPACING.xxl,
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  switchButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: FONTS.subheadingBold,
  },
});