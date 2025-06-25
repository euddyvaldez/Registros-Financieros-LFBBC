
export interface Razon {
  id: number;
  descripcion: string; // Stored as uppercase
}

export interface Integrante {
  id: number;
  nombre: string; // Stored as uppercase
}

export interface FinancialRecord {
  id: number;
  fecha: string; // YYYY-MM-DD
  integranteId: number;
  movimiento: 'INGRESOS' | 'GASTOS' | 'INVERSION';
  razonId: number;
  descripcion: string;
  monto: number;
}

export interface FinancialQuote {
  text: string;
  author: string;
}

export type RecordSortOrder = 'id_asc' | 'id_desc' | 'alpha_asc' | 'alpha_desc';

export type RecordFilterField = 'fecha' | 'integrante' | 'movimiento' | 'razon' | 'descripcion';

export type DashboardViewType = 'annual_summary' | 'monthly_trend' | 'daily_trend';
export type FinancialPanelChartType = 'line' | 'bar' | 'pie';

export interface ProcessedChartDataPoint {
    label: string;
    ingresos: number;
    gastos: number;
    inversion: number;
}
export interface PieChartSegment {
    name: string;
    value: number;
    color: string;
}

