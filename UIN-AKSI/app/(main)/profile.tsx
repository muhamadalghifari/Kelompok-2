import { AppButton } from '@/src/components/atoms/AppButton';
import { AppText } from '@/src/components/atoms/AppText';
import { supabase } from '@/src/lib/supabase';
import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useFocusEffect(
        useCallback(() => {
            fetchProfile();
        }, [])
    );

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.replace('/(auth)/login');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Alert.alert('Error', 'Gagal memuat profil');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert('Error', error.message);
        router.replace('/(auth)/login');
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header / Cover */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    {profile?.avatar_url ? (
                        <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Ionicons name="person" size={40} color={COLORS.white} />
                        </View>
                    )}
                </View>
                <AppText style={styles.name}>{profile?.full_name || 'Tanpa Nama'}</AppText>
                <AppText style={styles.email}>{profile?.email}</AppText>
            </View>

            {/* Info Cards */}
            <View style={styles.section}>
                <AppText style={styles.sectionTitle}>INFORMASI AKADEMIK</AppText>
                <View style={styles.card}>
                    <InfoRow icon="school-outline" label="Program Studi" value={profile?.prodi || '-'} />
                    <InfoRow icon="calendar-outline" label="Semester" value={profile?.semester || '-'} />
                </View>
            </View>

            <View style={styles.section}>
                <AppText style={styles.sectionTitle}>AKUN</AppText>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(main)/edit-profile')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="create-outline" size={20} color={COLORS.text} style={{ marginRight: 10 }} />
                            <AppText>Edit Profil</AppText>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(main)/bookmark')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="bookmark-outline" size={20} color={COLORS.text} style={{ marginRight: 10 }} />
                            <AppText>Bookmark Saya</AppText>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ padding: SPACING.lg }}>
                <AppButton title="Keluar (Logout)" onPress={handleLogout} style={{ backgroundColor: COLORS.error }} />
            </View>

        </ScrollView>
    );
}

function InfoRow({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <View style={styles.infoRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconBox}>
                    <Ionicons name={icon} size={18} color={COLORS.white} />
                </View>
                <View>
                    <AppText style={styles.label}>{label}</AppText>
                    <AppText style={styles.value}>{value}</AppText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        paddingVertical: SPACING.xl * 1.5,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: SPACING.lg,
    },
    avatarContainer: {
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        color: COLORS.muted,
        fontSize: 14,
    },
    section: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.muted,
        marginBottom: SPACING.sm,
        letterSpacing: 1,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: COLORS.primarySoft,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    label: {
        fontSize: 12,
        color: COLORS.muted,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 4,
    }
});
