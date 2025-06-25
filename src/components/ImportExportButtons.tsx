
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';

interface ImportExportButtonsProps {
  onImportPress: () => void;
  onExportPress: () => void;
  theme: AppTheme;
  importLabel?: string;
  exportLabel?: string;
}

const ImportExportButtons: React.FC<ImportExportButtonsProps> = ({ 
    onImportPress, 
    onExportPress, 
    theme,
    importLabel = "Importar CSV",
    exportLabel = "Exportar CSV"
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]} 
        onPress={onImportPress}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>{importLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.secondaryText }]} 
        onPress={onExportPress}
      >
        <Text style={[styles.buttonText, { color: theme.colors.altButtonText }]}>{exportLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ImportExportButtons;
