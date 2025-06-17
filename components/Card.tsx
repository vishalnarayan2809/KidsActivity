import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'small' | 'medium' | 'large';
  shadow?: boolean;
}

export default function Card({
  children,
  style,
  padding = 'medium',
  shadow = true,
}: CardProps) {
  const cardStyle = [
    styles.card,
    styles[padding],
    shadow && styles.shadow,
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  small: {
    padding: 12,
  },
  medium: {
    padding: 20,
  },
  large: {
    padding: 24,
  },
});