import { supabase } from '@/src/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
    const [session, setSession] = useState<Session | null>(null);
    const [initialized, setInitialized] = useState(false);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setInitialized(true);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!initialized) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (session && inAuthGroup) {
            router.replace('/(main)/home');
        } else if (!session && !inAuthGroup) {
            router.replace('/(auth)/login');
        }
    }, [session, segments, initialized]);

    if (!initialized) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Slot />;
}