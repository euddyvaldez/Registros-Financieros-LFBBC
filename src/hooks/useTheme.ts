
import { useContext } from 'react';
import { AppContext } from '../store/AppContext';
import { AppTheme } from '../constants/theme';

export const useTheme = (): { theme: AppTheme; toggleTheme: () => void } => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { theme: context.theme, toggleTheme: context.toggleTheme };
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
