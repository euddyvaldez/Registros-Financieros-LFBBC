
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './store/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Required for some navigators

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider children={
          <>
            <AppNavigator />
            <StatusBar style="auto" />
          </>
        } />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
