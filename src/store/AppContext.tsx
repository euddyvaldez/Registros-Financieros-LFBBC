
import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, AppTheme } from '../constants/theme';
import { initialRazonesData, initialIntegrantesData, financialQuotes as initialFinancialQuotes } from './initialData'; // Assuming these are moved here
import { Razon, Integrante, FinancialRecord, FinancialQuote } from '../types'; // Define these types

interface AppContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  isLoading: boolean;
  razones: Razon[];
  setRazones: React.Dispatch<React.SetStateAction<Razon[]>>;
  nextReasonId: number;
  setNextReasonId: React.Dispatch<React.SetStateAction<number>>;
  integrantes: Integrante[];
  setIntegrantes: React.Dispatch<React.SetStateAction<Integrante[]>>;
  nextIntegranteId: number;
  setNextIntegranteId: React.Dispatch<React.SetStateAction<number>>;
  financialRecords: FinancialRecord[];
  setFinancialRecords: React.Dispatch<React.SetStateAction<FinancialRecord[]>>;
  nextRecordId: number;
  setNextRecordId: React.Dispatch<React.SetStateAction<number>>;
  financialQuotes: FinancialQuote[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentThemeMode, setCurrentThemeMode] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [razones, setRazones] = useState<Razon[]>([]);
  const [nextReasonId, setNextReasonId] = useState(1);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [nextIntegranteId, setNextIntegranteId] = useState(1);
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [nextRecordId, setNextRecordId] = useState(1);
  const [financialQuotes, setFinancialQuotes] = useState<FinancialQuote[]>(initialFinancialQuotes);


  useEffect(() => {
    const loadAppData = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        if (storedTheme) {
          setCurrentThemeMode(storedTheme as 'light' | 'dark');
        }

        // Load Razones
        let storedRazones = await AsyncStorage.getItem('razonesData');
        if (storedRazones) {
          const parsedRazones: Razon[] = JSON.parse(storedRazones);
          setRazones(parsedRazones);
          setNextReasonId(parsedRazones.length > 0 ? Math.max(0, ...parsedRazones.map(r => r.id)) + 1 : 1);
        } else {
          setRazones(initialRazonesData.map(r => ({ ...r, descripcion: r.descripcion.toUpperCase() })));
          setNextReasonId(initialRazonesData.length > 0 ? Math.max(0, ...initialRazonesData.map(r => r.id)) + 1 : 1);
          await AsyncStorage.setItem('razonesData', JSON.stringify(initialRazonesData.map(r => ({ ...r, descripcion: r.descripcion.toUpperCase() }))));
        }

        // Load Integrantes
        let storedIntegrantes = await AsyncStorage.getItem('integrantesData');
        if (storedIntegrantes) {
          const parsedIntegrantes: Integrante[] = JSON.parse(storedIntegrantes);
          setIntegrantes(parsedIntegrantes);
          setNextIntegranteId(parsedIntegrantes.length > 0 ? Math.max(0, ...parsedIntegrantes.map(i => i.id)) + 1 : 1);
        } else {
          setIntegrantes(initialIntegrantesData.map(i => ({ ...i, nombre: i.nombre.toUpperCase() })));
          setNextIntegranteId(initialIntegrantesData.length > 0 ? Math.max(0, ...initialIntegrantesData.map(i => i.id)) + 1 : 1);
          await AsyncStorage.setItem('integrantesData', JSON.stringify(initialIntegrantesData.map(i => ({ ...i, nombre: i.nombre.toUpperCase() }))));
        }
        
        // Load Financial Records
        let storedRecords = await AsyncStorage.getItem('financialRecords');
        if (storedRecords) {
            const parsedRecords: FinancialRecord[] = JSON.parse(storedRecords);
            setFinancialRecords(parsedRecords);
            setNextRecordId(parsedRecords.length > 0 ? Math.max(0, ...parsedRecords.map(r => r.id)) + 1 : 1);
        } else {
            setFinancialRecords([]);
            setNextRecordId(1);
        }

      } catch (e) {
        console.error("Failed to load app data from storage", e);
        // Fallback to initial if error
        setRazones(initialRazonesData.map(r => ({ ...r, descripcion: r.descripcion.toUpperCase() })));
        setNextReasonId(initialRazonesData.length > 0 ? Math.max(0, ...initialRazonesData.map(r => r.id)) + 1 : 1);
        setIntegrantes(initialIntegrantesData.map(i => ({ ...i, nombre: i.nombre.toUpperCase() })));
        setNextIntegranteId(initialIntegrantesData.length > 0 ? Math.max(0, ...initialIntegrantesData.map(i => i.id)) + 1 : 1);
        setFinancialRecords([]);
        setNextRecordId(1);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppData();
  }, []);

  const toggleTheme = async () => {
    const newThemeMode = currentThemeMode === 'light' ? 'dark' : 'light';
    setCurrentThemeMode(newThemeMode);
    await AsyncStorage.setItem('appTheme', newThemeMode);
  };

  const theme = useMemo(() => (currentThemeMode === 'light' ? lightTheme : darkTheme), [currentThemeMode]);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isLoading,
    razones, setRazones, nextReasonId, setNextReasonId,
    integrantes, setIntegrantes, nextIntegranteId, setNextIntegranteId,
    financialRecords, setFinancialRecords, nextRecordId, setNextRecordId,
    financialQuotes
  }), [
      theme, toggleTheme, isLoading, 
      razones, setRazones, nextReasonId, setNextReasonId,
      integrantes, setIntegrantes, nextIntegranteId, setNextIntegranteId,
      financialRecords, setFinancialRecords, nextRecordId, setNextRecordId,
      financialQuotes
    ]);


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
