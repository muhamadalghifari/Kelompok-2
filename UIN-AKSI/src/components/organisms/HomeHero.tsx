import { supabase } from '@/src/lib/supabase'; // Import supabase
import { COLORS, SPACING, TYPO } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons'; // Import Icon
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppButton } from '../atoms/AppButton';
import { AppText } from '../atoms/AppText';

type Props = {
    onExplore: () => void;
};

export function HomeHero({ onExplore }: Props) {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    };

    const handleLogout = async () => {
        addLog('Logout Clicked');
        try {
            addLog('Calling supabase.auth.signOut()...');
            const { error } = await supabase.auth.signOut();

            if (error) {
                addLog(`Logout Error: ${error.message}`);
            } else {
                addLog('Logout Success! Session cleared.');
                addLog('Waiting for RootLayout to redirect...');
            }
        } catch (err: any) {
            addLog(`Exception: ${err.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View>
                    <AppText style={[TYPO.h1, styles.title]}>
                        UIN-AKSI
                    </AppText>
                    <AppText style={styles.subtitle}>
                        Aplikasi Kampus Sistem Informasi
                    </AppText>
                </View>

                {/* Logout Button */}
                <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* DEBUG LOGS */}
            {logs.length > 0 && (
                <View style={{ marginTop: 10, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8 }}>
                    {logs.map((log, i) => (
                        <AppText key={i} style={{ color: '#fff', fontSize: 10 }}>{log}</AppText>
                    ))}
                </View>
            )}

            <View style={{ height: SPACING.lg }} />

            <AppButton
                title="Jelajahi Istilah"
                onPress={onExplore}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
        backgroundColor: COLORS.primarySoft,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        color: COLORS.white,
    },
    subtitle: {
        color: '#E5E7EB',
        marginTop: SPACING.sm,
    },
    logoutBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
    },
});
