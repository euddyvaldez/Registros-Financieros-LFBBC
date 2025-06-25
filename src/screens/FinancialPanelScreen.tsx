
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme, useAppContext } from '../hooks/useTheme';
import { Picker } from '@react-native-picker/picker'; // You might need to install this or use a custom one
import SummaryCard from '../components/SummaryCard';
import { LineChart, BarChart, PieChart } from '../components/ChartComponents'; // Assuming these are created
import { DashboardViewType, FinancialPanelChartType, FinancialRecord, ProcessedChartDataPoint, PieChartSegment } from '../types';
import { getAvailableYearsForFilter, MONTH_NAMES_ES } from '../utils/helpers';
import { CHART_COLORS } from '../constants/colors';

const FinancialPanelScreen = () => {
  const { theme } = useTheme();
  const { financialRecords } = useAppContext();

  const [dashboardViewType, setDashboardViewType] = useState<DashboardViewType>('monthly_trend');
  const [selectedYear, setSelectedYear] = useState<number | 'all_available'>('all_available');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [chartType, setChartType] = useState<FinancialPanelChartType>('line');

  const availableYears = useMemo(() => getAvailableYearsForFilter(financialRecords), [financialRecords]);

  const totals = useMemo(() => {
    let totalIngresos = 0;
    let totalGastos = 0;
    let totalInversion = 0;
    financialRecords.forEach(r => {
      // Assuming Gastos and Inversion are stored as negative if they reduce balance
      // or positive if they are absolute expense amounts.
      // If monto for GASTOS/INVERSION are stored as positive:
      if (r.movimiento === 'INGRESOS') totalIngresos += r.monto;
      else if (r.movimiento === 'GASTOS') totalGastos += r.monto; // Sum of positive expense amounts
      else if (r.movimiento === 'INVERSION') totalInversion += r.monto; // Sum of positive investment amounts
    });
    // Balance calculation needs clarity on how GASTOS/INVERSION montos are stored.
    // If they are stored positive:
    // const balanceGeneral = totalIngresos - totalGastos - totalInversion;
    // If they are stored with sign (GASTOS/INVERSION negative):
    const balanceGeneral = financialRecords.reduce((sum, r) => sum + r.monto, 0);

    return { totalIngresos, totalGastos, totalInversion, balanceGeneral };
  }, [financialRecords]);

  const processedChartData = useMemo((): ProcessedChartDataPoint[] => {
    let recordsToProcess = financialRecords;
    let yearToFilterNumber: number | null = typeof selectedYear === 'number' ? selectedYear : null;

    if (dashboardViewType === 'annual_summary') {
        const yearlyData: { [year: number]: ProcessedChartDataPoint } = {};
        recordsToProcess.forEach(r => {
            const year = new Date(r.fecha).getFullYear();
            if (!yearlyData[year]) yearlyData[year] = { label: String(year), ingresos: 0, gastos: 0, inversion: 0 };
            if (r.movimiento === 'INGRESOS') yearlyData[year].ingresos += r.monto;
            else if (r.movimiento === 'GASTOS') yearlyData[year].gastos += Math.abs(r.monto);
            else if (r.movimiento === 'INVERSION') yearlyData[year].inversion += Math.abs(r.monto);
        });
        return Object.values(yearlyData).sort((a,b) => parseInt(a.label) - parseInt(b.label));
    }

    if (dashboardViewType === 'monthly_trend') {
        const monthlyData: { [month: number]: ProcessedChartDataPoint } = {};
        for (let i = 0; i < 12; i++) monthlyData[i] = { label: MONTH_NAMES_ES[i], ingresos: 0, gastos: 0, inversion: 0 };
        recordsToProcess.forEach(r => {
            const recordDate = new Date(r.fecha);
            if (yearToFilterNumber === null || recordDate.getFullYear() === yearToFilterNumber) {
                const month = recordDate.getMonth();
                if (r.movimiento === 'INGRESOS') monthlyData[month].ingresos += r.monto;
                else if (r.movimiento === 'GASTOS') monthlyData[month].gastos += Math.abs(r.monto);
                else if (r.movimiento === 'INVERSION') monthlyData[month].inversion += Math.abs(r.monto);
            }
        });
        return Object.values(monthlyData);
    }

    if (dashboardViewType === 'daily_trend') {
        if (yearToFilterNumber === null) yearToFilterNumber = new Date().getFullYear();
        const daysInMonth = new Date(yearToFilterNumber, selectedMonth, 0).getDate();
        const dailyData: { [day: number]: ProcessedChartDataPoint } = {};
        for (let i = 1; i <= daysInMonth; i++) dailyData[i] = { label: String(i), ingresos: 0, gastos: 0, inversion: 0 };
        recordsToProcess.forEach(r => {
            const recordDate = new Date(r.fecha);
            if (recordDate.getFullYear() === yearToFilterNumber && (recordDate.getMonth() + 1) === selectedMonth) {
                const day = recordDate.getDate();
                if (r.movimiento === 'INGRESOS') dailyData[day].ingresos += r.monto;
                else if (r.movimiento === 'GASTOS') dailyData[day].gastos += Math.abs(r.monto);
                else if (r.movimiento === 'INVERSION') dailyData[day].inversion += Math.abs(r.monto);
            }
        });
        return Object.values(dailyData);
    }
    return [];
  }, [financialRecords, dashboardViewType, selectedYear, selectedMonth]);


  const pieChartDisplayData: PieChartSegment[] = useMemo(() => {
    if (chartType !== 'pie' || processedChartData.length === 0) return [];
    let totalPeriodIngresos = 0;
    let totalPeriodGastos = 0;
    let totalPeriodInversion = 0;
    processedChartData.forEach(dp => {
        totalPeriodIngresos += dp.ingresos;
        totalPeriodGastos += dp.gastos;
        totalPeriodInversion += dp.inversion;
    });
    return [
        { name: 'Ingresos', value: totalPeriodIngresos, color: theme.colors.ingresos },
        { name: 'Gastos', value: totalPeriodGastos, color: theme.colors.gastos },
        { name: 'Inversión', value: totalPeriodInversion, color: theme.colors.inversion }
    ].filter(segment => segment.value > 0);
  }, [chartType, processedChartData, theme.colors]);


  const renderChart = () => {
    // The problematic 'if' block that caused the error was here and has been removed.
    // The individual chart components or the switch cases below handle "no data" scenarios.

    const chartWidth = Dimensions.get('window').width - 40; // container padding

    switch (chartType) {
      case 'line':
        // LineChart component internally checks for empty data
        return <LineChart data={processedChartData} width={chartWidth} height={220} theme={theme} />;
      case 'bar':
        // BarChart component internally checks for empty data
        return <BarChart data={processedChartData} width={chartWidth} height={220} theme={theme} />;
      case 'pie':
         // PieChart component internally checks for empty data (pieChartDisplayData is already filtered)
        return <PieChart data={pieChartDisplayData} width={chartWidth} height={220} theme={theme} />;
      default:
        return null;
    }
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.summaryContainer}>
        <SummaryCard title="Ingresos Totales" value={totals.totalIngresos} color={theme.colors.ingresos} theme={theme} />
        <SummaryCard title="Gastos Totales" value={totals.totalGastos} color={theme.colors.gastos} theme={theme} />
        <SummaryCard title="Inversión Total" value={totals.totalInversion} color={theme.colors.inversion} theme={theme} />
        <SummaryCard title="Balance General" value={totals.balanceGeneral} color={totals.balanceGeneral >= 0 ? theme.colors.ingresos : theme.colors.gastos} theme={theme}/>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Tipo de Vista:</Text>
        <Picker
          selectedValue={dashboardViewType}
          onValueChange={(itemValue) => {
            setDashboardViewType(itemValue as DashboardViewType);
             if (itemValue === 'daily_trend' && selectedYear === 'all_available') {
                const specificYears = availableYears.filter(y => typeof y === 'number') as number[];
                setSelectedYear(specificYears.length > 0 ? specificYears[0] : new Date().getFullYear());
            }
          }}
          style={[styles.picker, { color: theme.colors.text, backgroundColor: theme.colors.inputBackground }]}
          dropdownIconColor={theme.colors.text}
        >
          <Picker.Item label="Resumen Anual" value="annual_summary" />
          <Picker.Item label="Tendencia Mensual" value="monthly_trend" />
          <Picker.Item label="Tendencia Diaria" value="daily_trend" />
        </Picker>

        {dashboardViewType !== 'annual_summary' && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>Año:</Text>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => {
                 const newSelectedYear = itemValue === 'all_available' ? 'all_available' : Number(itemValue);
                 if (dashboardViewType === 'daily_trend' && newSelectedYear === 'all_available') {
                    const specificYears = availableYears.filter(y => typeof y === 'number') as number[];
                    setSelectedYear(specificYears.length > 0 ? specificYears[0] : new Date().getFullYear());
                 } else {
                    setSelectedYear(newSelectedYear);
                 }
              }}
              style={[styles.picker, { color: theme.colors.text, backgroundColor: theme.colors.inputBackground }]}
              dropdownIconColor={theme.colors.text}
            >
              {availableYears.map(year => (
                <Picker.Item key={String(year)} label={year === 'all_available' ? 'Todos los Años' : String(year)} value={year} />
              ))}
            </Picker>
          </>
        )}

        {dashboardViewType === 'daily_trend' && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>Mes:</Text>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(Number(itemValue))}
              style={[styles.picker, { color: theme.colors.text, backgroundColor: theme.colors.inputBackground }]}
              dropdownIconColor={theme.colors.text}
            >
              {MONTH_NAMES_ES.map((name, index) => (
                <Picker.Item key={index} label={name} value={index + 1} />
              ))}
            </Picker>
          </>
        )}
        
        <View style={styles.chartTypeSelector}>
            {(['line', 'bar', 'pie'] as FinancialPanelChartType[]).map(type => (
                <TouchableOpacity 
                    key={type}
                    style={[
                        styles.chartTypeButton,
                        { backgroundColor: chartType === type ? theme.colors.primary : theme.colors.inputBackground,
                          borderColor: theme.colors.border
                        }
                    ]}
                    onPress={() => setChartType(type)}
                >
                    <Text style={{color: chartType === type ? theme.colors.buttonText : theme.colors.text}}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.chartContainer}>
          {renderChart()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1, // Might not be visible on all pickers, style wrapper if needed
    marginBottom: 10,
  },
  chartTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  chartTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
    minHeight: 250, // Ensure space for chart or "no data" message
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  }
});

export default FinancialPanelScreen;
