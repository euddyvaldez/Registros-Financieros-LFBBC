
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';

import DashboardScreen from '../screens/DashboardScreen';
import FinancialPanelScreen from '../screens/FinancialPanelScreen';
import RecordsScreen from '../screens/RecordsScreen';
import IntegrantesScreen from '../screens/IntegrantesScreen';
import RazonesScreen from '../screens/RazonesScreen';

import { HomeIcon, ChartIcon, ListIcon, PeopleIcon } from '../constants/icons'; // Assuming ListIcon for Razones too
import { Platform } from 'react-native';

export type RootTabParamList = {
  Dashboard: undefined;
  FinancialPanel: undefined;
  Records: undefined;
  Integrantes: undefined;
  Razones: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={{
      dark: theme.isDark,
      colors: {
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.card,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.primary, // Or another appropriate color
      },
    }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            const iconColor = focused ? theme.colors.iconActive : theme.colors.icon;

            if (route.name === 'Dashboard') {
              IconComponent = HomeIcon;
            } else if (route.name === 'FinancialPanel') {
              IconComponent = ChartIcon;
            } else if (route.name === 'Records') {
              IconComponent = ListIcon; // Using ListIcon
            } else if (route.name === 'Integrantes') {
              IconComponent = PeopleIcon;
            } else if (route.name === 'Razones') {
              IconComponent = ListIcon; // Using ListIcon
            }

            return IconComponent ? <IconComponent color={iconColor} size={size} /> : null;
          },
          tabBarActiveTintColor: theme.colors.iconActive,
          tabBarInactiveTintColor: theme.colors.icon,
          tabBarStyle: {
            backgroundColor: theme.colors.bottomNavBackground,
            borderTopColor: theme.colors.bottomNavBorder,
            height: Platform.OS === 'ios' ? 90 : 65, // Adjust height for iOS safe area
            paddingBottom: Platform.OS === 'ios' ? 30 : 5,
          },
          headerStyle: {
            backgroundColor: theme.colors.headerBackground,
            borderBottomColor: theme.colors.headerBorder,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: '600',
          },
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Inicio' }} />
        <Tab.Screen name="FinancialPanel" component={FinancialPanelScreen} options={{ title: 'Panel Fin.' }} />
        <Tab.Screen name="Records" component={RecordsScreen} options={{ title: 'Registros' }} />
        <Tab.Screen name="Integrantes" component={IntegrantesScreen} options={{ title: 'Integrantes' }} />
        <Tab.Screen name="Razones" component={RazonesScreen} options={{ title: 'Razones' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
