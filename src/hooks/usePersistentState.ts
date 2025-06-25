
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function usePersistentState<T>(key: string, initialValue: T): [T, SetValue<T>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadState() {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        } else {
          setStoredValue(initialValue); // Ensure initialValue is set if nothing in storage
        }
      } catch (error) {
        console.error(`Error loading state for key "${key}" from AsyncStorage:`, error);
        setStoredValue(initialValue); // Fallback to initial value on error
      } finally {
        setIsLoading(false);
      }
    }
    loadState();
  }, [key, initialValue]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving state for key "${key}" to AsyncStorage:`, error);
    }
  };

  return [storedValue, setValue, isLoading];
}

export default usePersistentState;
