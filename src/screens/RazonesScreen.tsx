
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useTheme, useAppContext } from '../hooks/useTheme';
import { EditIcon, DeleteIcon } from '../constants/icons';
import { normalizeStringForComparison } from '../utils/helpers';
import { Razon, RecordSortOrder } from '../types';
import CustomPicker from '../components/CustomPicker';
import ImportExportButtons from '../components/ImportExportButtons';
import SortControls from '../components/SortControls';
import { handleImportRazonesCSVFile, handleExportRazonesCSV } from '../services/csvHandler'; // Assume these are adapted
import AsyncStorage from '@react-native-async-storage/async-storage';


const RazonesScreen = () => {
  const { theme } = useTheme();
  const { 
    razones, setRazones, nextReasonId, setNextReasonId,
    financialRecords, isLoading: appContextIsLoading 
  } = useAppContext();

  const [newReasonInputText, setNewReasonInputText] = useState('');
  const [editingReason, setEditingReason] = useState<Razon | null>(null);
  const [editReasonInputText, setEditReasonInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<RecordSortOrder>('alpha_asc');
  
  const [showImportOptions, setShowImportOptions] = useState(false);
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);

  const handleAddReason = async () => {
    const trimmedText = newReasonInputText.trim().toUpperCase();
    if (!trimmedText) {
      Alert.alert('Error', 'La descripción no puede estar vacía.');
      return;
    }
    if (razones.some(r => normalizeStringForComparison(r.descripcion) === normalizeStringForComparison(trimmedText))) {
      Alert.alert('Error', 'Esta razón ya existe.');
      return;
    }
    const newRazon: Razon = { id: nextReasonId, descripcion: trimmedText };
    const updatedRazones = [...razones, newRazon];
    setRazones(updatedRazones);
    setNextReasonId(prevId => prevId + 1);
    await AsyncStorage.setItem('razonesData', JSON.stringify(updatedRazones));
    await AsyncStorage.setItem('nextReasonId', String(nextReasonId + 1));


    setNewReasonInputText('');
  };

  const handleSaveEdit = async () => {
    if (!editingReason) return;
    const trimmedEditText = editReasonInputText.trim().toUpperCase();
    if (!trimmedEditText) {
      Alert.alert('Error', 'La descripción no puede estar vacía.');
      return;
    }
    if (razones.some(r => normalizeStringForComparison(r.descripcion) === normalizeStringForComparison(trimmedEditText) && r.id !== editingReason.id)) {
      Alert.alert('Error', 'Ya existe otra razón con esta descripción.');
      return;
    }
    
    const updatedRazones = razones.map(r => r.id === editingReason.id ? { ...r, descripcion: trimmedEditText } : r);
    setRazones(updatedRazones);
    await AsyncStorage.setItem('razonesData', JSON.stringify(updatedRazones));

    setEditingReason(null);
    setEditReasonInputText('');
  };

  const handleDeleteReason = async (id: number, descripcion: string) => {
    if (financialRecords.some(fr => fr.razonId === id)) {
      Alert.alert('Error', `No se puede eliminar la razón "${descripcion}" porque está siendo utilizada en registros financieros.`);
      return;
    }
    Alert.alert(
      'Confirmar Eliminación',
      `¿Está seguro de que desea eliminar la razón "${descripcion}" (ID: ${id})?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: async () => {
            const updatedRazones = razones.filter(r => r.id !== id);
            setRazones(updatedRazones);
            await AsyncStorage.setItem('razonesData', JSON.stringify(updatedRazones));
            if (editingReason?.id === id) {
              setEditingReason(null);
              setEditReasonInputText('');
            }
          }
        }
      ]
    );
  };

  const startEdit = (razon: Razon) => {
    setEditingReason(razon);
    setEditReasonInputText(razon.descripcion);
  };
  
  const onImport = async (mode: 'replace' | 'append') => {
    setIsProcessingCsv(true);
    setShowImportOptions(false);
    await handleImportRazonesCSVFile(
        mode, 
        razones, // current data for append/check logic
        (newRazones, newNextId) => { // onSuccess callback
            setRazones(newRazones);
            setNextReasonId(newNextId);
        },
        () => setIsProcessingCsv(false) // onFinally callback
    );
  };

  const onExport = async () => {
    setIsProcessingCsv(true);
    await handleExportRazonesCSV(razones, () => setIsProcessingCsv(false));
  };


  const filteredAndSortedRazones = useMemo(() => {
    return razones
      .filter(razon => normalizeStringForComparison(razon.descripcion).includes(normalizeStringForComparison(searchTerm)))
      .sort((a, b) => {
        switch (sortOrder) {
          case 'id_asc': return a.id - b.id;
          case 'id_desc': return b.id - a.id;
          case 'alpha_desc': return b.descripcion.localeCompare(a.descripcion);
          case 'alpha_asc':
          default: return a.descripcion.localeCompare(b.descripcion);
        }
      });
  }, [razones, searchTerm, sortOrder]);

  if (appContextIsLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} style={{flex: 1, justifyContent: 'center'}}/>;
  }

  const renderItem = ({ item }: { item: Razon }) => {
    if (editingReason?.id === item.id) {
      return (
        <View style={[styles.itemContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <TextInput
            style={[styles.input, styles.editInput, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
            value={editReasonInputText}
            onChangeText={setEditReasonInputText}
            autoFocus
          />
          <TouchableOpacity style={[styles.buttonInline, {backgroundColor: theme.colors.success}]} onPress={handleSaveEdit}>
            <Text style={{color: theme.colors.buttonText}}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonInline, {backgroundColor: theme.colors.secondaryText, marginLeft: 5}]} onPress={() => setEditingReason(null)}>
             <Text style={{color: theme.colors.buttonText}}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[styles.itemContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.itemText, { color: theme.colors.text }]}>{item.id}. {item.descripcion}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => startEdit(item)} style={styles.iconButton}>
            <EditIcon color={theme.colors.primary} size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteReason(item.id, item.descripcion)} style={styles.iconButton}>
            <DeleteIcon color={theme.colors.destructive} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={[styles.header, { color: theme.colors.text }]}>Gestión de Razones</Text>
            {isProcessingCsv && <ActivityIndicator size="large" color={theme.colors.primary} style={{marginVertical: 10}} />}
            <ImportExportButtons onImportPress={() => setShowImportOptions(true)} onExportPress={onExport} theme={theme} />
            {showImportOptions && (
                <View style={styles.importOptionsContainer}>
                    <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.primary}]} onPress={() => onImport('append')}>
                        <Text style={[styles.importOptionText, {color: theme.colors.primary}]}>Agregar razones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.destructive}]} onPress={() => onImport('replace')}>
                        <Text style={[styles.importOptionText, {color: theme.colors.destructive}]}>Reemplazar razones</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.secondaryText, marginTop:5}]} onPress={() => setShowImportOptions(false)}>
                        <Text style={[styles.importOptionText, {color: theme.colors.secondaryText}]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <TextInput
                style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.border }]}
                placeholder="Descripción de la nueva razón"
                placeholderTextColor={theme.colors.inputPlaceholder}
                value={newReasonInputText}
                onChangeText={setNewReasonInputText}
              />
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleAddReason}>
                <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Agregar</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              placeholder="Buscar razón..."
              placeholderTextColor={theme.colors.inputPlaceholder}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <SortControls currentSortOrder={sortOrder} onSortOrderChange={setSortOrder} theme={theme} />
          </>
        }
        data={filteredAndSortedRazones}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{color: theme.colors.secondaryText, textAlign: 'center', marginTop: 20}}>No hay razones.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 15,
    padding:15,
    borderRadius: 8,
    borderWidth:1,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  editInput: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonInline: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  importOptionsContainer: {
    padding:10,
    marginVertical: 10,
    backgroundColor: 'transparent', // Handled by parent or specific styles
  },
  importOptionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  importOptionText: {
    fontSize: 16,
    fontWeight: '500',
  }
});

export default RazonesScreen;
