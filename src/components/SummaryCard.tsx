
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';
import { formatCurrency } from '../utils/helpers';

interface SummaryCardProps {
  title: string;
  value: number;
  color: string; // Color for the value text
  theme: AppTheme;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, color, theme }) => {
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <Text style={[styles.title, { color: theme.colors.secondaryText }]}>{title}</Text>
      <Text style={[styles.value, { color: color }]}>{formatCurrency(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // For two cards per row with a small gap
    marginBottom: 10,
    elevation: 1, // Basic shadow for Android
     // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SummaryCard;
