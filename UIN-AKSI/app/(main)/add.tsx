import { AppButton } from '@/src/components/atoms/AppButton';
import { AppInput } from '@/src/components/atoms/AppInput';
import { AppText } from '@/src/components/atoms/AppText';
import { uploadImage } from '@/src/lib/storage';
import { supabase } from '@/src/lib/supabase';
import { COLORS, SPACING } from '@/src/styles/theme';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function AddTermScreen() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Dynamic Categories
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (data) {
            setCategories(data);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            if (Platform.OS === 'web') {
                alert('Aplikasi butuh izin akses galeri untuk upload foto.');
            } else {
                Alert.alert('Izin Ditolak', 'Aplikasi butuh izin akses galeri untuk upload foto.');
            }
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !category) {
            if (Platform.OS === 'web') {
                alert('Mohon lengkapi judul, kategori, dan deskripsi ya.');
            } else {
                Alert.alert('Ups!', 'Mohon lengkapi judul, kategori, dan deskripsi ya.');
            }
            return;
        }

        setLoading(true);
        try {
            // 1. Get User
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                if (Platform.OS === 'web') alert('Sesi habis, silakan login ulang.');
                else Alert.alert('Gagal', 'Sesi habis, silakan login ulang.');
                return;
            }

            let imageUrl = null;

            // 2. Upload Image (if exists)
            if (imageUri) {
                imageUrl = await uploadImage(imageUri, user.id);
            }

            // 3. Insert to Supabase
            const payload = {
                title,
                description,
                category, // Currently storing category name string. ideally update schema to category_id later
                image_url: imageUrl,
                user_id: user.id,
            };

            const { error } = await supabase.from('terms').insert(payload);

            if (error) throw error;

            if (Platform.OS === 'web') {
                alert('Istilah baru berhasil ditambahkan.');
            } else {
                Alert.alert('Berhasil!', 'Istilah baru berhasil ditambahkan.');
            }
            router.replace('/(main)/home');

        } catch (error: any) {
            console.error('Add Error:', error);
            if (Platform.OS === 'web') alert(error.message || 'Gagal menyimpan data.');
            else Alert.alert('Terjadi Kesalahan', error.message || 'Gagal menyimpan data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.headerTitle}>Tambah Istilah</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <AppText style={styles.label}>Istilah</AppText>
                <AppInput
                    placeholder="Contoh: Algoritma"
                    value={title}
                    onChangeText={setTitle}
                />

                <AppText style={styles.label}>Kategori</AppText>
                <View style={styles.categoryContainer}>
                    {categories.length === 0 ? (
                        <AppText style={{ color: COLORS.muted }}>Memuat kategori...</AppText>
                    ) : (
                        categories.map((item) => (
                            <Pressable
                                key={item.id}
                                style={[
                                    styles.categoryChip,
                                    category === item.name && styles.categoryChipActive,
                                ]}
                                onPress={() => setCategory(item.name)}
                            >
                                <AppText
                                    style={[
                                        styles.categoryText,
                                        category === item.name && styles.categoryTextActive,
                                    ]}
                                >
                                    {item.name}
                                </AppText>
                            </Pressable>
                        ))
                    )}
                </View>

                <AppText style={styles.label}>Foto (opsional)</AppText>
                <Pressable style={styles.imagePickerButton} onPress={pickImage}>
                    <AppText style={styles.imagePickerButtonText}>
                        {imageUri ? 'Ganti Foto' : 'Pilih Foto'}
                    </AppText>
                </Pressable>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                )}

                <AppText style={styles.label}>Deskripsi</AppText>
                <AppInput
                    placeholder="Jelaskan istilah tersebut secara singkat dan jelas..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    style={{ height: 120 }}
                    textAlignVertical="top"
                />

                <View style={{ height: SPACING.md }} />

                <AppButton
                    title={loading ? "Menyimpan..." : "Simpan Istilah"}
                    onPress={handleSubmit}
                    disabled={loading}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: SPACING.sm,
    },
    content: {
        padding: SPACING.lg,
        paddingBottom: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: SPACING.xs,
        marginTop: SPACING.sm,
        color: COLORS.text,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    categoryChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    categoryChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: 14,
        color: COLORS.text,
    },
    categoryTextActive: {
        color: COLORS.white,
        fontWeight: '600',
    },
    imagePickerButton: {
        backgroundColor: COLORS.secondary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: SPACING.xs,
        marginBottom: SPACING.md,
    },
    imagePickerButtonText: {
        color: COLORS.white,
        fontWeight: '600',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: SPACING.md,
    },
});
