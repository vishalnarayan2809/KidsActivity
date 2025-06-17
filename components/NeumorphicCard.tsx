import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/utils/colors';

interface NeumorphicCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING;
  borderRadius?: keyof typeof BORDER_RADIUS;
  elevated?: boolean;
}

export default function NeumorphicCard({
  children,
  style,
  padding = 'lg',
  borderRadius = 'lg',
  elevated = false,
}: NeumorphicCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          padding: SPACING[padding],
          borderRadius: BORDER_RADIUS[borderRadius],
        },
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  elevated: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});