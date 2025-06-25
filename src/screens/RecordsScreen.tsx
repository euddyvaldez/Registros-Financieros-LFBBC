
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, FlatList, ActivityIndicator, Platform } from 'react-native';
import { useTheme, useAppContext } from '../hooks/useTheme';
import { getTodayDateString, normalizeStringForComparison, formatCurrency } from '../utils/helpers';
import { RecordFilterField, Razon, Integrante, FinancialRecord } from '../types';
import CustomPicker from '../components/CustomPicker'; // Assuming this component is created
import ImportExportButtons from '../components/ImportExportButtons';
import { handleImportFinancialRecordsCSVFile, handleExportFinancialRecordsCSV } from '../services/csvHandler'; // Assume these are adapted
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePickerModal from "react-native-modal-datetime-picker"; // Optional: for better date picking

const RecordsScreen = () => {
  const { theme } = useTheme();
  const { 
    financialRecords, setFinancialRecords, nextRecordId, setNextRecordId,
    integrantes, razones,
    isLoading: appContextIsLoading
  } = useAppContext();

  // Form states
  const [newRecordFecha, setNewRecordFecha] = useState(getTodayDateString());
  const [newRecordIntegranteId, setNewRecordIntegranteId] = useState<number | null>(null);
  const [newRecordMovimiento, setNewRecordMovimiento] = useState<'INGRESOS' | 'GASTOS' | 'INVERSION'>('INGRESOS');
  const [newRecordRazonId, setNewRecordRazonId] = useState<number | null>(null);
  const [newRecordDescripcion, setNewRecordDescripcion] = useState('');
  const [newRecordMonto, setNewRecordMonto] = useState('');

  // Filter states
  const [recordFilterText, setRecordFilterText] = useState('');
  const [recordFilterField, setRecordFilterField] = useState<RecordFilterField>('descripcion');
  
  // UI States
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showImportOptions, setShowImportOptions] = useState(false);
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);


  const handleAddRecord = async () => {
    if (!newRecordFecha || newRecordIntegranteId === null || newRecordRazonId === null || newRecordMonto === '') {
      Alert.alert('Error', 'Complete todos los campos obligatorios (Fecha, Integrante, Razón, Monto).');
      return;
    }
    const montoValue = parseFloat(newRecordMonto);
    if (isNaN(montoValue)) {
      Alert.alert('Error', 'El monto debe ser un número válido.');
      return;
    }

    // Determine the sign of the monto based on movimiento type
    // Assuming GASTOS and INVERSION are outflows and should be stored as negative for balance calculations.
    // If they are always stored positive, this logic would change.
    let finalMonto = montoValue;
    if (newRecordMovimiento === 'GASTOS' || newRecordMovimiento === 'INVERSION') {
        if (finalMonto > 0) finalMonto = -finalMonto; // Make it negative
    } else { // INGRESOS
        if (finalMonto < 0) finalMonto = -finalMonto; // Make it positive
    }


    const newRecord: FinancialRecord = {
      id: nextRecordId,
      fecha: newRecordFecha,
      integranteId: newRecordIntegranteId,
      movimiento: newRecordMovimiento,
      razonId: newRecordRazonId,
      descripcion: newRecordDescripcion.trim(),
      monto: finalMonto 
    };

    const updatedRecords = [...financialRecords, newRecord];
    setFinancialRecords(updatedRecords);
    setNextRecordId(prevId => prevId + 1);
    await AsyncStorage.setItem('financialRecords', JSON.stringify(updatedRecords));
    await AsyncStorage.setItem('nextRecordId', String(nextRecordId + 1));


    // Reset form
    setNewRecordFecha(getTodayDateString());
    setNewRecordIntegranteId(null);
    setNewRecordMovimiento('INGRESOS');
    setNewRecordRazonId(null);
    setNewRecordDescripcion('');
    setNewRecordMonto('');
    Alert.alert('Éxito', 'Registro agregado correctamente.');
  };

  const filteredRecords = useMemo(() => {
    let displayRecords = [...financialRecords];
    const normalizedFilter = normalizeStringForComparison(recordFilterText);

    if (normalizedFilter) {
      displayRecords = displayRecords.filter(record => {
        let fieldValue = '';
        const integrante = integrantes.find(i => i.id === record.integranteId);
        const razon = razones.find(r => r.id === record.razonId);

        switch (recordFilterField) {
          case 'fecha': fieldValue = record.fecha; break;
          case 'integrante': fieldValue = integrante ? integrante.nombre : ''; break;
          case 'movimiento': fieldValue = record.movimiento; break;
          case 'razon': fieldValue = razon ? razon.descripcion : ''; break;
          case 'descripcion': fieldValue = record.descripcion; break;
        }
        return normalizeStringForComparison(fieldValue).includes(normalizedFilter);
      });
    }
    return displayRecords.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime() || b.id - a.id);
  }, [financialRecords, recordFilterText, recordFilterField, integrantes, razones]);

  const onImport = async (mode: 'replace' | 'append') => {
    setIsProcessingCsv(true);
    setShowImportOptions(false);
    await handleImportFinancialRecordsCSVFile(
        mode, 
        (newRecords, newNextId) => { // onSuccess callback
            setFinancialRecords(newRecords);
            setNextRecordId(newNextId);
            // Potentially update integrantes/razones if auto-created in csvHandler
        },
        () => setIsProcessingCsv(false) // onFinally callback
    );
  };

  const onExport = async () => {
    setIsProcessingCsv(true);
    await handleExportFinancialRecordsCSV(financialRecords, integrantes, razones, () => setIsProcessingCsv(false));
  };


  if (appContextIsLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} style={{flex: 1, justifyContent: 'center'}}/>;
  }

  const movimientoOptions = [
    { label: 'Ingresos', value: 'INGRESOS' },
    { label: 'Gastos', value: 'GASTOS' },
    { label: 'Inversión', value: 'INVERSION' },
  ];

  const filterFieldOptions = [
    { label: 'Descripción', value: 'descripcion' },
    { label: 'Fecha', value: 'fecha' },
    { label: 'Integrante', value: 'integrante' },
    { label: 'Movimiento', value: 'movimiento' },
    { label: 'Razón', value: 'razon' },
  ];
  
  const renderRecordItem = ({ item }: { item: FinancialRecord }) => {
    const integrante = integrantes.find(i => i.id === item.integranteId);
    const razon = razones.find(r => r.id === item.razonId);
    return (
      <View style={[styles.recordItem, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <Text style={{ color: theme.colors.text }}><Text style={styles.bold}>Fecha:</Text> {item.fecha}</Text>
        <Text style={{ color: theme.colors.text }}><Text style={styles.bold}>Integrante:</Text> {integrante ? integrante.nombre : 'N/A'}</Text>
        <Text style={{ color: theme.colors.text }}><Text style={styles.bold}>Movimiento:</Text> {item.movimiento}</Text>
        <Text style={{ color: theme.colors.text }}><Text style={styles.bold}>Razón:</Text> {razon ? razon.descripcion : 'N/A'}</Text>
        {item.descripcion ? <Text style={{ color: theme.colors.text }}><Text style={styles.bold}>Descripción:</Text> {item.descripcion}</Text> : null }
        <Text style={[styles.montoText, { color: item.monto >= 0 ? theme.colors.ingresos : theme.colors.gastos }]}>
            {formatCurrency(item.monto)}
        </Text>
      </View>
    );
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Gestión de Registros</Text>

      {isProcessingCsv && <ActivityIndicator size="large" color={theme.colors.primary} style={{marginVertical: 20}} />}

      <ImportExportButtons
        onImportPress={() => setShowImportOptions(true)}
        onExportPress={onExport}
        theme={theme}
      />
      {showImportOptions && (
        <View style={styles.importOptionsContainer}>
            <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.primary}]} onPress={() => onImport('append')}>
                <Text style={[styles.importOptionText, {color: theme.colors.primary}]}>Agregar registros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.destructive}]} onPress={() => onImport('replace')}>
                <Text style={[styles.importOptionText, {color: theme.colors.destructive}]}>Reemplazar registros</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.importOptionButton, {borderColor: theme.colors.secondaryText, marginTop:5}]} onPress={() => setShowImportOptions(false)}>
                <Text style={[styles.importOptionText, {color: theme.colors.secondaryText}]}>Cancelar</Text>
            </TouchableOpacity>
        </View>
      )}

      {/* Add Record Form */}
      <View style={[styles.formContainer, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Fecha: {newRecordFecha}</Text>
        </TouchableOpacity>
        {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => { setNewRecordFecha(date.toISOString().split('T')[0]); setDatePickerVisibility(false); }}
            onCancel={() => setDatePickerVisibility(false)}
            locale="es_ES" // If available
        /> */}
         {Platform.OS === 'android' && ( // Basic Android date input, recommend library for better UX
            <TextInput 
              style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
              value={newRecordFecha}
              placeholder="YYYY-MM-DD"
              onChangeText={setNewRecordFecha}
            />
         )}


        <CustomPicker
          label="Integrante:"
          items={integrantes.map(i => ({ label: i.nombre, value: i.id }))}
          selectedValue={newRecordIntegranteId}
          onValueChange={(value) => setNewRecordIntegranteId(value)}
          theme={theme}
        />
        <CustomPicker
          label="Movimiento:"
          items={movimientoOptions}
          selectedValue={newRecordMovimiento}
          onValueChange={(value) => setNewRecordMovimiento(value as any)}
          theme={theme}
        />
        <CustomPicker
          label="Razón:"
          items={razones.map(r => ({ label: r.descripcion, value: r.id }))}
          selectedValue={newRecordRazonId}
          onValueChange={(value) => setNewRecordRazonId(value)}
          theme={theme}
        />
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
          placeholder="Descripción (opcional)"
          placeholderTextColor={theme.colors.inputPlaceholder}
          value={newRecordDescripcion}
          onChangeText={setNewRecordDescripcion}
          multiline
        />
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
          placeholder="Monto (ej: 100.00)"
          placeholderTextColor={theme.colors.inputPlaceholder}
          value={newRecordMonto}
          onChangeText={setNewRecordMonto}
          keyboardType="numeric"
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleAddRecord}>
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Agregar Registro</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
       <View style={[styles.formContainer, { backgroundColor: theme.colors.card, marginTop: 20 }]}>
        <Text style={[styles.label, { color: theme.colors.text, fontWeight:'bold' }]}>Filtrar Registros</Text>
         <CustomPicker
            label="Filtrar por:"
            items={filterFieldOptions}
            selectedValue={recordFilterField}
            onValueChange={(value) => setRecordFilterField(value as RecordFilterField)}
            theme={theme}
          />
        <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.inputBackground }]}
            placeholder="Texto a buscar..."
            placeholderTextColor={theme.colors.inputPlaceholder}
            value={recordFilterText}
            onChangeText={setRecordFilterText}
        />
       </View>

      {/* Records List */}
      <FlatList
        data={filteredRecords}
        renderItem={renderRecordItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{color: theme.colors.secondaryText, textAlign: 'center', marginTop: 20}}>No hay registros.</Text>}
        style={{marginTop: 20}}
        scrollEnabled={false} // If ScrollView is the parent
      />
    </ScrollView>
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
  formContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordItem: {
    padding: 15,
    borderBottomWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  },
  bold: { fontWeight: 'bold'},
  montoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'right',
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

export default RecordsScreen;
