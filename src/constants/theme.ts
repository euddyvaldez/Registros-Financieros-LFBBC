
export interface AppThemeColors {
  background: string;
  card: string;
  text: string;
  primary: string;
  secondaryText: string;
  border: string;
  inputBackground: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  buttonText: string;
  altButtonText: string; // For buttons on accent background
  accent: string;
  // Chart Colors
  ingresos: string;
  gastos: string;
  inversion: string;
  balance: string;
  defaultLine: string;
  // Icon colors
  icon: string;
  iconActive: string;
  // Specific component colors
  headerBackground: string;
  headerBorder: string;
  bottomNavBackground: string;
  bottomNavBorder: string;
  listItemActionHover: string;
  destructive: string;
  success: string;
  listItemSeparator: string;
  selectedItemDisplayBg: string;
  filterGroupBg: string;
  tableHeaderBg: string;
  tableRowHoverBg: string;
  scrollTrack: string;
  scrollThumb: string;
  scrollThumbHover: string;
}

export interface AppTheme {
  colors: AppThemeColors;
  // Potentially other theme properties like spacing, typography
  isDark: boolean;
}

export const lightTheme: AppTheme = {
  isDark: false,
  colors: {
    background: '#F0F2F5',
    card: '#FFFFFF',
    text: '#1A202C',
    primary: '#007BFF',
    secondaryText: '#4A5568',
    border: '#DEE2E6',
    inputBackground: '#FFFFFF',
    inputPlaceholder: '#6C757D',
    inputFocusBorder: '#007BFF',
    buttonText: '#FFFFFF',
    altButtonText: '#0D1B2A',
    accent: '#007BFF', // Using primary as accent for light theme for now
    // Chart Colors
    ingresos: '#4CAF50',
    gastos: '#FF3B30',
    inversion: '#FFC107',
    balance: '#007AFF',
    defaultLine: '#8E8E93',
    // Icon colors
    icon: '#6C757D',
    iconActive: '#007BFF',
    // Specifics
    headerBackground: '#F8F9FA',
    headerBorder: '#DEE2E6',
    bottomNavBackground: '#F8F9FA',
    bottomNavBorder: '#DEE2E6',
    listItemActionHover: '#E9ECEF',
    destructive: '#DC3545',
    success: '#28A745',
    listItemSeparator: '#E9ECEF',
    selectedItemDisplayBg: '#E9ECEF',
    filterGroupBg: '#F8F9FA',
    tableHeaderBg: '#F1F3F5',
    tableRowHoverBg: '#F8F9FA',
    scrollTrack: '#E9ECEF',
    scrollThumb: '#ADB5BD',
    scrollThumbHover: '#868E96',
  },
};

export const darkTheme: AppTheme = {
  isDark: true,
  colors: {
    background: '#0D1B2A',
    card: '#1A2736', // Slightly lighter than background
    text: '#E0E6EB',
    primary: '#F7B500', // Gold accent
    secondaryText: '#A0BBD2',
    border: '#2D3748',
    inputBackground: '#0D1B2A',
    inputPlaceholder: '#718096',
    inputFocusBorder: '#F7B500',
    buttonText: '#0D1B2A', // Dark text on gold buttons
    altButtonText: '#E0E6EB',
    accent: '#F7B500',
    // Chart Colors (can remain same or be adjusted for dark bg)
    ingresos: '#4CAF50',
    gastos: '#FF3B30',
    inversion: '#FFC107',
    balance: '#007AFF', // Or a gold-theme friendly blue: '#63B3ED'
    defaultLine: '#4A5568',
    // Icon colors
    icon: '#A0AEC0',
    iconActive: '#F7B500',
    // Specifics
    headerBackground: '#1C2B3A',
    headerBorder: '#2D3748',
    bottomNavBackground: '#1C2B3A',
    bottomNavBorder: '#2D3748',
    listItemActionHover: '#2D3748',
    destructive: '#FC8181', // Lighter red
    success: '#68D391', // Lighter green
    listItemSeparator: '#2D3748',
    selectedItemDisplayBg: '#2D3748',
    filterGroupBg: '#102030',
    tableHeaderBg: '#2D3748',
    tableRowHoverBg: '#102030',
    scrollTrack: '#1C2B3A',
    scrollThumb: '#4A5568',
    scrollThumbHover: '#718096',
  },
};
