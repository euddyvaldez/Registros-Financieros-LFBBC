
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomPicker from './CustomPicker'; // Assuming CustomPicker is created
import { AppTheme } from '../constants/theme';
import { RecordSortOrder } from '../types';

interface SortControlsProps {
  currentSortOrder: RecordSortOrder;
  onSortOrderChange: (order: RecordSortOrder) => void;
  theme: AppTheme;
}

const SortControls: React.FC<SortControlsProps> = ({ currentSortOrder, onSortOrderChange, theme }) => {
  const sortOptions = [
    { label: 'Alfabético (A-Z)', value: 'alpha_asc' },
    { label: 'Alfabético (Z-A)', value: 'alpha_desc' },
    { label: 'ID (Ascendente)', value: 'id_asc' },
    { label: 'ID (Descendente)', value: 'id_desc' },
  ];

  return (
    <View style={[styles.sortContainer, {backgroundColor: theme.colors.filterGroupBg, borderColor: theme.colors.border}]}>
      <CustomPicker
        label="Ordenar por:"
        items={sortOptions}
        selectedValue={currentSortOrder}
        onValueChange={(value) => onSortOrderChange(value as RecordSortOrder)}
        theme={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
  },
});

export default SortControls;
