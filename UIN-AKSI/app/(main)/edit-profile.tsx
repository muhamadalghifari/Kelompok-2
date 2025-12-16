import { AppButton } from '@/src/components/atoms/AppButton';
import { AppInput } from '@/src/components/atoms/AppInput';
import { AppText } from '@/src/components/atoms/AppText';
import { uploadImage } from '@/src/lib/storage'; // Reusing storage logic
import { supabase } from '@/src/lib/supabase';
import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function EditProfileScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [fullName, setFullName] = useState('');
    const [prodi, setProdi] = useState('');
    const [semester, setSemester] = useState('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            if (data) {
                setFullName(data.full_name || '');
                setProdi(data.prodi || '');
                setSemester(data.semester || '');
                setAvatarUri(data.avatar_url);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            if (Platform.OS === 'web') alert('Butuh izin akses foto');
            else Alert.alert('Izin Ditolak', 'Aplikasi butuh izin akses galeri.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1], // Square aspect ratio for avatar
            quality: 0.5,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user logged in');

            let finalAvatarUrl = avatarUri;

            // Simple check: if URI starts with 'file' or 'blob', it needs upload
            // If it starts with 'http', it's likely already a Supabase URL
            if (avatarUri && (avatarUri.startsWith('file:') || avatarUri.startsWith('blob:'))) {
                finalAvatarUrl = await uploadImage(avatarUri, user.id);
            }

            const updates = {
                id: user.id,
                full_name: fullName,
                prodi,
                semester,
                avatar_url: finalAvatarUrl,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(updates);

            if (error) throw error;

            if (Platform.OS === 'web') alert('Profil berhasil diperbarui!');
            else Alert.alert('Sukses', 'Profil berhasil diperbarui!');

            router.back(); // Go back to Profile Screen

        } catch (error: any) {
            console.error('Update Error:', error);
            if (Platform.OS === 'web') alert(error.message);
            else Alert.alert('Gagal', error.message);
        } finally {
            setSaving(false);
        }
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
            <View style={styles.header}>
                <AppText style={styles.title}>Edit Profil</AppText>
            </View>

            <View style={styles.content}>
                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <Pressable onPress={pickImage} style={styles.avatarWrapper}>
                        {avatarUri ? (
                            <Image source={{ uri: avatarUri }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                <Ionicons name="camera" size={32} color={COLORS.white} />
                            </View>
                        )}
                        <View style={styles.editIcon}>
                            <Ionicons name="pencil" size={12} color={COLORS.white} />
                        </View>
                    </Pressable>
                    <AppText variant="caption" style={{ marginTop: 8 }}>Ketuk untuk ganti foto</AppText>
                </View>

                {/* Form Fields */}
                <View style={styles.formGroup}>
                    <AppText style={styles.label}>Nama Lengkap</AppText>
                    <AppInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Contoh: Budi Santoso"
                    />
                </View>

                <View style={styles.formGroup}>
                    <AppText style={styles.label}>Program Studi</AppText>
                    <AppInput
                        value={prodi}
                        onChangeText={setProdi}
                        placeholder="Contoh: Teknik Informatika"
                    />
                </View>

                <View style={styles.formGroup}>
                    <AppText style={styles.label}>Semester</AppText>
                    <AppInput
                        value={semester}
                        onChangeText={setSemester}
                        placeholder="Contoh: 5"
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ height: SPACING.xl }} />

                <AppButton
                    title={saving ? "Menyimpan..." : "Simpan Perubahan"}
                    onPress={handleSave}
                    disabled={saving}
                />

                <AppButton
                    title="Batal"
                    onPress={() => router.back()}
                    style={{ marginTop: SPACING.sm, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border }}
                    textStyle={{ color: COLORS.text }}
                />
            </View>
        </ScrollView>
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
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: SPACING.lg,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        backgroundColor: COLORS.muted,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    formGroup: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
        marginLeft: 4,
    },
});
