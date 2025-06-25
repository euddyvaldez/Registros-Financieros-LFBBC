
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { AppTheme } from '../constants/theme';
// Consider adding an X icon for closing modal
// import { XIcon } from '../constants/icons'; 

interface PickerItem {
  label: string;
  value: any;
}

interface CustomPickerProps {
  label: string;
  items: PickerItem[];
  selectedValue: any;
  onValueChange: (value: any) => void;
  theme: AppTheme;
  placeholder?: string;
}

const CustomPicker: React.FC<CustomPickerProps> = ({ label, items, selectedValue, onValueChange, theme, placeholder = "Seleccionar..." }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = items.find(item => item.value === selectedValue)?.label || placeholder;

  const renderItem = ({ item }: { item: PickerItem }) => (
    <TouchableOpacity
      style={[styles.item, { borderBottomColor: theme.colors.border }]}
      onPress={() => {
        onValueChange(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={[styles.itemText, { color: item.value === selectedValue ? theme.colors.primary : theme.colors.text }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>}
      <TouchableOpacity
        style={[styles.pickerButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.pickerButtonText, { color: selectedValue !== null ? theme.colors.text : theme.colors.inputPlaceholder }]}>
          {selectedLabel}
        </Text>
        <Text style={{color: theme.colors.text}}>▼</Text> 
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, {color: theme.colors.text}]}>{label || "Seleccionar Opción"}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    {/* <XIcon color={theme.colors.text} size={24} /> alternatively */}
                    <Text style={{color: theme.colors.primary, fontSize: 16}}>Cerrar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.value)}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerButton: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: screenHeight * 0.6, // Max 60% of screen height
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee' // theme.colors.border
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomPicker;
