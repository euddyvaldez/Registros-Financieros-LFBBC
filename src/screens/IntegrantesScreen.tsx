
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useTheme, useAppContext } from '../hooks/useTheme';
import { EditIcon, DeleteIcon } from '../constants/icons';
import { normalizeStringForComparison } from '../utils/helpers';
import { Integrante, RecordSortOrder } from '../types';
import CustomPicker from '../components/CustomPicker'; // Re-use or create specific
import ImportExportButtons from '../components/ImportExportButtons';
import SortControls from '../components/SortControls';
import { handleImportIntegrantesCSVFile, handleExportIntegrantesCSV } from '../services/csvHandler'; // Assume these are adapted
import AsyncStorage from '@react-native-async-storage/async-storage';


const IntegrantesScreen = () => {
  const { theme } = useTheme();
  const { 
    integrantes, setIntegrantes, nextIntegranteId, setNextIntegranteId,
    financialRecords, isLoading: appContextIsLoading 
  } = useAppContext();

  const [newIntegranteInputText, setNewIntegranteInputText] = useState('');
  const [editingIntegrante, setEditingIntegrante] = useState<Integrante | null>(null);
  const [editIntegranteInputText, setEditIntegranteInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<RecordSortOrder>('alpha_asc');

  const [showImportOptions, setShowImportOptions] = useState(false);
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);

  const handleAddIntegrante = async () => {
    const trimmedText = newIntegranteInputText.trim().toUpperCase();
    if (!trimmedText) {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
      return;
    }
    if (integrantes.some(i => normalizeStringForComparison(i.nombre) === normalizeStringForComparison(trimmedText))) {
      Alert.alert('Error', 'Este integrante ya existe.');
      return;
    }
    const newIntegrante: Integrante = { id: nextIntegranteId, nombre: trimmedText };
    const updatedIntegrantes = [...integrantes, newIntegrante];
    setIntegrantes(updatedIntegrantes);
    setNextIntegranteId(prevId => prevId + 1);
    await AsyncStorage.setItem('integrantesData', JSON.stringify(updatedIntegrantes));
    await AsyncStorage.setItem('nextIntegranteId', String(nextIntegranteId + 1));


    setNewIntegranteInputText('');
  };

  const handleSaveEdit = async () => {
    if (!editingIntegrante) return;
    const trimmedEditText = editIntegranteInputText.trim().toUpperCase();
    if ((editingIntegrante.id === 1 || editingIntegrante.id === 2) && trimmedEditText === "") {
        Alert.alert('Error', `El integrante "${editingIntegrante.nombre}" es un sistema y no puede tener un nombre vacío.`);
        return;
    }
    if (!trimmedEditText && !(editingIntegrante.id === 1 || editingIntegrante.id === 2)) {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
      return;
    }
    if (integrantes.some(i => normalizeStringForComparison(i.nombre) === normalizeStringForComparison(trimmedEditText) && i.id !== editingIntegrante.id)) {
      Alert.alert('Error', 'Ya existe otro integrante con este nombre.');
      return;
    }
    
    const updatedIntegrantes = integrantes.map(i => i.id === editingIntegrante.id ? { ...i, nombre: trimmedEditText } : i);
    setIntegrantes(updatedIntegrantes);
    await AsyncStorage.setItem('integrantesData', JSON.stringify(updatedIntegrantes));
    
    setEditingIntegrante(null);
    setEditIntegranteInputText('');
  };

  const handleDeleteIntegrante = async (id: number, nombre: string) => {
    if (id === 1 || id === 2) {
      Alert.alert('Error', `El integrante "${nombre}" (ID: ${id}) es un sistema y no puede ser eliminado.`);
      return;
    }
    if (financialRecords.some(fr => fr.integranteId === id)) {
      Alert.alert('Error', `No se puede eliminar al integrante "${nombre}" porque está referenciado en registros financieros.`);
      return;
    }
    Alert.alert(
      'Confirmar Eliminación',
      `¿Está seguro de que desea eliminar al integrante "${nombre}" (ID: ${id})?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: async () => {
            const updatedIntegrantes = integrantes.filter(i => i.id !== id);
            setIntegrantes(updatedIntegrantes);
            await AsyncStorage.setItem('integrantesData', JSON.stringify(updatedIntegrantes));
            if (editingIntegrante?.id === id) {
              setEditingIntegrante(null);
              setEditIntegranteInputText('');
            }
          }
        }
      ]
    );
  };

  const startEdit = (integrante: Integrante) => {
    setEditingIntegrante(integrante);
    setEditIntegranteInputText(integrante.nombre);
  };

  const onImport = async (mode: 'replace' | 'append') => {
    setIsProcessingCsv(true);
    setShowImportOptions(false);
    await handleImportIntegrantesCSVFile(
        mode,
        integrantes, 
        (newIntegrantes, newNextId) => {
            setIntegrantes(newIntegrantes);
            setNextIntegranteId(newNextId);
        },
        () => setIsProcessingCsv(false)
    );
  };

  const onExport = async () => {
    setIsProcessingCsv(true);
    await handleExportIntegrantesCSV(integrantes, () => setIsProcessingCsv(false));
  };


  const filteredAndSortedIntegrantes = useMemo(() => {
    return integrantes
      .filter(integrante => normalizeStringForComparison(integrante.nombre).includes(normalizeStringForComparison(searchTerm)))
      .sort((a, b) => {
        switch (sortOrder) {
          case 'id_asc': return a.id - b.id;
          case 'id_desc': return b.id - a.id;
          case 'alpha_desc': return b.nombre.localeCompare(a.nombre);
          case 'alpha_asc':
          default: return a.nombre.localeCompare(b.nombre);
        }
      });
  }, [integrantes, searchTerm, sortOrder]);

  if (appContextIsLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} style={{flex: 1, justifyContent: 'center'}}/>;
  }

  const renderItem = ({ item }: { item: Integrante }) => {
    if (editingIntegrante?.id === item.id) {
      return (
        <View style={[styles.itemContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <TextInput
            style={[styles.input, styles.editInput, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
            value={editIntegranteInputText}
            onChangeText={setEditIntegranteInputText}
            autoFocus
          />
          <TouchableOpacity style={[styles.buttonInline, {backgroundColor: theme.colors.success}]} onPress={handleSaveEdit}>
            <Text style={{color: theme.colors.buttonText}}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonInline, {backgroundColor: theme.colors.secondaryText, marginLeft: 5}]} onPress={() => setEditingIntegrante(null)}>
            <Text style={{color: theme.colors.buttonText}}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[styles.itemContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.itemText, { color: theme.colors.text }]}>{item.id}. {item.nombre}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => startEdit(item)} style={styles.iconButton}>
            <EditIcon color={theme.colors.primary} size={20} />
          </TouchableOpacity>
          {(item.id !== 1 && item.id !== 2) && // Prevent delete for system IDs
            <TouchableOpacity onPress={() => handleDeleteIntegrante(item.id, item.nombre)} style={styles.iconButton}>
              <DeleteIcon color={theme.colors.destructive} size={20} />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  };
  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={[styles.header, { color: theme.colors.text }]}>Gestión de Integrantes</Text>
            {isProcessingCsv && <ActivityIndicator size="large" color={theme.colors.primary} style={{marginVertical: 10}} />}
            <ImportExportButtons onImportPress={() => setShowImportOptions(true)} onExportPress={onExport} theme={theme} />
             {showImportOptions && (
                <View style={styles.importOptionsContainer}>
                    <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.primary}]} onPress={() => onImport('append')}>
                        <Text style={[styles.importOptionText, {color: theme.colors.primary}]}>Agregar integrantes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.destructive}]} onPress={() => onImport('replace')}>
                        <Text style={[styles.importOptionText, {color: theme.colors.destructive}]}>Reemplazar integrantes</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.secondaryText, marginTop:5}]} onPress={() => setShowImportOptions(false)}>
                        <Text style={[styles.importOptionText, {color: theme.colors.secondaryText}]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <TextInput
                style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.border }]}
                placeholder="Nombre del nuevo integrante"
                placeholderTextColor={theme.colors.inputPlaceholder}
                value={newIntegranteInputText}
                onChangeText={setNewIntegranteInputText}
              />
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleAddIntegrante}>
                <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Agregar</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              placeholder="Buscar integrante..."
              placeholderTextColor={theme.colors.inputPlaceholder}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
             <SortControls currentSortOrder={sortOrder} onSortOrderChange={setSortOrder} theme={theme} />
          </>
        }
        data={filteredAndSortedIntegrantes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{color: theme.colors.secondaryText, textAlign: 'center', marginTop: 20}}>No hay integrantes.</Text>}
      />
    </View>
  );
};

// Re-use styles from RazonesScreen or create specific ones if they diverge
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

export default IntegrantesScreen;
