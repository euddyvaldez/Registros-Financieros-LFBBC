
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from '../constants/icons'; // Assuming you have these in your icons file
import Constants from 'expo-constants'; // For status bar height

const LOGO_URL = require('../../assets/images/los-forasteros-03.png');

interface GlobalHeaderProps {
  title: string;
}

// This component is more conceptual for RN if using react-navigation's built-in header.
// The actual header is configured in AppNavigator.tsx using `screenOptions`.
// However, the theme toggle part can be extracted into a component used in the header.

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
      {theme.isDark ? <SunIcon color={theme.colors.icon} size={22} /> : <MoonIcon color={theme.colors.icon} size={22} />}
    </TouchableOpacity>
  );
};

// If you need a fully custom header component (e.g. if react-navigation header is not enough)
const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.colors.headerBackground, borderBottomColor: theme.colors.headerBorder, paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0 }]}>
      <Image source={LOGO_URL} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <ThemeToggleButton />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: (Platform.OS === 'android' ? 56 : 44) + (Platform.OS === 'android' ? Constants.statusBarHeight: 0) , // Standard header height + status bar for android
    borderBottomWidth: 1,
  },
  logo: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginLeft: -30, // Adjust to center with toggle button
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
  },
});

export default GlobalHeader; // Export if used as a standalone full header
