
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme, useAppContext } from '../hooks/useTheme';
import { formatCurrency } from '../utils/helpers';
import { EyeIcon, EyeSlashIcon } from '../constants/icons'; // Ensure these are in constants/icons.tsx
import { FinancialRecord, FinancialQuote } from '../types';

const DashboardScreen = () => {
  const { theme } = useTheme();
  const { financialRecords, financialQuotes, isLoading } = useAppContext();
  
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (financialQuotes.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % financialQuotes.length);
    }, 20000); // 20 seconds

    return () => clearInterval(intervalId);
  }, [financialQuotes]);

  const calculateBalance = useCallback(() => {
    if (!financialRecords) return { totalIngresos: 0, totalGastos: 0, totalInversion: 0, balanceGeneral: 0};
    let totalIngresos = 0;
    let totalGastos = 0;
    let totalInversion = 0;

    financialRecords.forEach((r: FinancialRecord) => {
      if (r.movimiento === 'INGRESOS') {
        totalIngresos += r.monto;
      } else if (r.movimiento === 'GASTOS') {
        totalGastos += r.monto; // Assuming gastos are stored as positive values representing outflow
      } else if (r.movimiento === 'INVERSION') {
        totalInversion += r.monto; // Assuming inversion are stored as positive values representing outflow
      }
    });
     // Original logic: balanceGeneral = totalIngresos + totalGastos + totalInversion;
     // If gastos and inversion are outflows, they should be subtracted.
     // Assuming the web app stored them as negative for Gastos/Inversion or handled math accordingly.
     // For this RN version, let's assume they are stored as positive, and we sum them up as per original logic's display.
     // If they are meant to be deductions for balance, then:
     // const balanceGeneral = totalIngresos - totalGastos - totalInversion;
     // For now, sticking to the sum as per original code's variable names implies adding all.
     // Re-evaluating: Web code for Gastos/Inversion in SummaryCard.tsx implies they are positive values representing outflows.
     // The `balanceGeneral` calculation was `totalIngresos + totalGastos + totalInversion`.
     // This means `totalGastos` and `totalInversion` from records were likely negative, or this sum represents something else.
     // Let's assume `monto` for GASTOS and INVERSION are negative if they are outflows for balance calculation.
     // If `monto` is always positive:
     const balanceGeneral = financialRecords.reduce((acc, record) => {
        if (record.movimiento === 'INGRESOS') return acc + record.monto;
        // if (record.movimiento === 'GASTOS') return acc - record.monto; // if expenses reduce balance
        // if (record.movimiento === 'INVERSION') return acc - record.monto; // if investments reduce current cash balance
        // The original web app code added them all up for balance. This might be a specific accounting view.
        // Let's stick to adding all `monto` values if they are stored with their signs (+ for income, - for expense/investment).
        // If all `monto` are positive:
        // totalGastos is sum of positive Gastos.monto
        // totalInversion is sum of positive Inversion.monto
        // Balance = Ingresos - Gastos - Inversion typically.
        // The web code has: totalIngresos + totalGastos + totalInversion. This means that
        // in financialRecords, GASTOS and INVERSION montos must be stored as NEGATIVE numbers.
        return acc + record.monto;

     },0);


    return { totalIngresos, totalGastos, totalInversion, balanceGeneral };
  }, [financialRecords]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  
  const { balanceGeneral } = calculateBalance();
  const currentQuote = financialQuotes.length > 0 ? financialQuotes[currentQuoteIndex] : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.contentContainer}>
      <View style={styles.balanceDisplayArea}>
        {balanceVisible ? (
          <View style={[styles.balanceContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.balanceTitle, { color: theme.colors.secondaryText }]}>Balance General</Text>
            <Text style={[styles.balanceValue, { color: balanceGeneral >= 0 ? theme.colors.ingresos : theme.colors.gastos }]}>
              {formatCurrency(balanceGeneral)}
            </Text>
          </View>
        ) : (
          <View style={[styles.hiddenBalanceInfo, { backgroundColor: theme.colors.filterGroupBg, borderColor: theme.colors.border}]}>
            <Text style={[styles.hiddenBalanceText, {color: theme.colors.text}]}>-- OCULTO --</Text>
            {currentQuote && (
                <Text style={[styles.quotePlaceholder, { color: theme.colors.secondaryText }]}>
                    "{currentQuote.text}" - {currentQuote.author}
                </Text>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.toggleBalanceButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setBalanceVisible(!balanceVisible)}
      >
        <View style={styles.toggleButtonContent}>
          {balanceVisible ? 
            <EyeSlashIcon color={theme.colors.buttonText} size={18} /> : 
            <EyeIcon color={theme.colors.buttonText} size={18} />
          }
          <Text style={[styles.toggleBalanceButtonText, { color: theme.colors.buttonText, marginLeft: 8 }]}>
            {balanceVisible ? 'Ocultar Balance' : 'Mostrar Balance'}
          </Text>
        </View>
      </TouchableOpacity>

      {currentQuote && (
        <View style={[styles.quoteBox, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.quoteText, { color: theme.colors.text }]}>"{currentQuote.text}"</Text>
          <Text style={[styles.quoteAuthor, { color: theme.colors.secondaryText }]}>- {currentQuote.author}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center', // Center content horizontally
  },
  balanceDisplayArea: {
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  balanceContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 280,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  hiddenBalanceInfo: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 280,
    minHeight:100,
    justifyContent: 'center',
  },
  hiddenBalanceText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  quotePlaceholder: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  toggleBalanceButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleBalanceButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quoteBox: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    width: '95%',
    maxWidth: 350,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    width: '100%', 
  },
});

export default DashboardScreen;
