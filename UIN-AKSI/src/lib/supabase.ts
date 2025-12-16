import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		if (Platform.OS === 'web') {
			if (typeof window === 'undefined') return Promise.resolve(null);
			return AsyncStorage.getItem(key);
		}
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		if (Platform.OS === 'web') {
			if (typeof window === 'undefined') return;
			AsyncStorage.setItem(key, value);
			return;
		}
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		if (Platform.OS === 'web') {
			if (typeof window === 'undefined') return;
			AsyncStorage.removeItem(key);
			return;
		}
		SecureStore.deleteItemAsync(key);
	},
};

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error(
		'Missing Supabase configuration: Ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set in your .env file.'
	);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		storage: ExpoSecureStoreAdapter,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});