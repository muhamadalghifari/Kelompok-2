import { AppButton } from '@/src/components/atoms/AppButton';
import { AppInput } from '@/src/components/atoms/AppInput';
import { AppText } from '@/src/components/atoms/AppText';
import { uploadImage } from '@/src/lib/storage';
import { supabase } from '@/src/lib/supabase';
import { COLORS, SPACING } from '@/src/styles/theme';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function EditTermScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // id from route /edit-term/[id]
    // Ensure id is a plain string (expo-router may return string | string[])
    const termId = Array.isArray(id) ? id[0] : id;
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); // Stores category ID logic is mixed in original, but existing code used it as ID in updatePayload but name to display? Wait.
    // Original code: setCategory(termData.category); -> termData.category is likely a string (name) or ID depending on schema. 
    // In add.tsx, it stores NAME: `category, // Currently storing category name string`.
    // In edit.tsx original: `onPress: () => setCategory(cat.id)` BUT displays `categories.find(c => c.id === category)?.name`.
    // If the DB stores the name, then saving ID is wrong if the other parts expect name. 
    // In add.tsx: `category` state is the name. `payload = { ... category }`. 
    // In edit.tsx original validation: `const updatePayload: any = { title, description, category };`
    // If I look at the original edit code: `categories.map((cat) => ({ text: cat.name, onPress: () => setCategory(cat.id) }))`. This suggests the original edit code WAS saving ID.
    // BUT `add.tsx` says `// Currently storing category name string`.
    // Let's look at `sections/TermDetailContent.tsx` or `home.tsx` to see what is displayed? 
    // Actually, if `add.tsx` saves name, `edit.tsx` saving ID would be inconsistent. 
    // Let's assume standardization on NAME since `add.tsx` is the newer/reference implementation I was told to copy.
    // Wait, in `edit.tsx` original: `title: termData.title, category: termData.category`. 
    // If `termData.category` is "Algoritma" (name), then `setCategory("Algoritma")`.
    // The previous edit implementation tried to map it to IDs: `categories.find(c => c.id === category)?.name`. This would fail if `category` was already "Algoritma".
    // I will stick to what `add.tsx` does: Store the NAME.

    // Correction: I should check what `categories` table has. `id, name`.
    // If I change `category` state to hold the `name`, then `add.tsx` is consistent.
    // So in `edit.tsx`, I should matching `category === item.name`.

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [newImageUri, setNewImageUri] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

    useEffect(() => {
        const fetchTermAndCategories = async () => {
            try {
                // fetch term data
                const { data: termData, error: termError } = await supabase
                    .from('terms')
                    .select('title, description, category, image_url')
                    .eq('id', termId)
                    .single();
                if (termError) throw termError;
                setTitle(termData.title);
                setDescription(termData.description);
                setCategory(termData.category); // Assuming this is the name string based on add.tsx
                if (termData.image_url) setImageUri(termData.image_url);

                // fetch categories for picker
                const { data: catData, error: catError } = await supabase
                    .from('categories')
                    .select('id, name')
                    .order('name');
                if (catError) throw catError;
                setCategories(catData as any);
            } catch (e) {
                console.error(e);
                Alert.alert('Error', 'Gagal memuat data');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchTermAndCategories();
    }, [id]);

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please grant media library permissions to upload an image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setNewImageUri(result.assets[0].uri);
            setImageUri(result.assets[0].uri); // Update preview immediately
        }
    };

    const handleSave = async () => {
        if (!title || !description || !category) {
            Alert.alert('Peringatan', 'Mohon lengkapi semua field required.');
            return;
        }

        setLoading(true);
        try {
            // Get user for image upload path verification (RLS)
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                Alert.alert('Error', 'Sesi habis, silakan login kembali.');
                return;
            }

            let imageUrl = imageUri;
            if (newImageUri) {
                // upload new image and get URL
                // IMPORTANT: Use user.id as the folder path to match RLS policies likely set on storage
                const uploaded = await uploadImage(newImageUri as string, user.id);
                imageUrl = uploaded;
            }

            const updatePayload: any = { title, description, category };
            if (imageUrl) updatePayload.image_url = imageUrl;

            const { error } = await supabase
                .from('terms')
                .update(updatePayload)
                .eq('id', termId);

            if (error) throw error;

            Alert.alert('Sukses', 'Data berhasil diperbarui', [
                { text: 'OK', onPress: () => router.replace('/(main)/terms') }
            ]);
        } catch (e: any) {
            console.error(e);
            Alert.alert('Error', e.message || 'Gagal menyimpan perubahan');
        } finally {
            setLoading(false);
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <AppText style={styles.label}>Judul</AppText>
                <AppInput value={title} onChangeText={setTitle} placeholder="Judul" />

                <AppText style={styles.label}>Deskripsi</AppText>
                <AppInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Deskripsi"
                    multiline
                    // Adding similar stylingprops as add.tsx for consistency
                    numberOfLines={4}
                    style={{ height: 120 }}
                    textAlignVertical="top"
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

                <AppText style={styles.label}>Foto Istilah</AppText>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                )}
                <TouchableOpacity onPress={handlePickImage} style={styles.pickImageBtn}>
                    <AppText style={styles.pickImageText}>Pilih Foto</AppText>
                </TouchableOpacity>

                <AppButton title={loading ? "Menyimpan..." : "Simpan"} onPress={handleSave} disabled={loading} style={{ marginTop: SPACING.md }} />

                <AppButton
                    title="Batal"
                    onPress={() => router.back()}
                    style={{ marginTop: SPACING.sm, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border }}
                    textStyle={{ color: COLORS.text }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { padding: SPACING.lg, paddingBottom: 100 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    label: { marginTop: SPACING.sm, marginBottom: SPACING.xs, color: COLORS.muted },
    imagePreview: { width: '100%', height: 200, borderRadius: 12, marginTop: SPACING.sm },
    pickImageBtn: { backgroundColor: COLORS.primary, padding: SPACING.sm, borderRadius: 8, alignItems: 'center', marginTop: SPACING.sm },
    pickImageText: { color: COLORS.white, fontWeight: '600' },

    // Category Chips Styles
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
        borderColor: COLORS.border || '#E5E5E5', // Fallback if COLORS.border undefined
        backgroundColor: COLORS.white,
    },
    categoryChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: 14,
        color: COLORS.text || '#000',
    },
    categoryTextActive: {
        color: COLORS.white,
        fontWeight: '600',
    },
});
