
import { FinancialRecord } from "../types";

export function normalizeStringForComparison(str: string | undefined | null): string {
  if (str === null || str === undefined) return '';
  return String(str).trim().toUpperCase()
    .replace(/Á/g, 'A')
    .replace(/É/g, 'E')
    .replace(/Í/g, 'I')
    .replace(/Ó/g, 'O')
    .replace(/Ú/g, 'U')
    .replace(/Ñ/g, 'N');
}

export function parseFlexibleDate(dateString: string): string | null {
    dateString = dateString.trim();

    const ymdMatchStrict = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymdMatchStrict) {
        const year = parseInt(ymdMatchStrict[1], 10);
        const month = parseInt(ymdMatchStrict[2], 10);
        const day = parseInt(ymdMatchStrict[3], 10);
        if (year > 1000 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            const dateObj = new Date(year, month - 1, day);
            if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                return dateString;
            }
        }
    }

    const dmyMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmyMatch) {
        const day = parseInt(dmyMatch[1], 10);
        const month = parseInt(dmyMatch[2], 10);
        const year = parseInt(dmyMatch[3], 10);
        if (year > 1000 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            const dateObj = new Date(year, month - 1, day);
            if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            }
        }
    }
    
    if (dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const day = parseInt(parts[2], 10);
             if (!isNaN(year) && year > 1000 && !isNaN(month) && month >= 1 && month <= 12 && !isNaN(day) && day >=1 && day <=31) {
                const dateObj = new Date(year, month - 1, day);
                if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                     return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                }
            }
        }
    }
    return null;
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatCurrency(value: number, locale = 'es-DO', currency = 'DOP'): string {
    // In RN, Intl might not be fully available on older Android. Consider a library or simpler formatting if issues arise.
    // For 'DOP', symbols might not be standard. Using 'RD$' prefix manually.
    return `RD$${value.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


export const MONTH_NAMES_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function getAvailableYearsForFilter(records: FinancialRecord[]): (number | 'all_available')[] {
    if (records.length === 0) return ['all_available', new Date().getFullYear()];
    const years = new Set(records.map(r => new Date(r.fecha).getFullYear()));
    return ['all_available', ...Array.from(years).sort((a,b) => b - a)];
}
