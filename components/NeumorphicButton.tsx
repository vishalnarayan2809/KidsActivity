import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/utils/colors';

interface NeumorphicButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function NeumorphicButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: NeumorphicButtonProps) {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle = [styles.button, styles[size]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineText);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryText);
    } else {
      baseStyle.push(styles.primaryText);
    }
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    gap: SPACING.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    backgroundColor: COLORS.textSecondary,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Sizes
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
  },
  
  // Text styles
  text: {
    fontFamily: FONTS.button,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});