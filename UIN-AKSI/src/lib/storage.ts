import { Platform } from 'react-native';
import { supabase } from './supabase';

export const uploadImage = async (uri: string, userId: string): Promise<string> => {
    const ext = uri.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${ext}`; // Upload ke folder user

    if (Platform.OS === 'web') {
        // ... (existing web logic if needed, but fetch/blob works usually)
    }

    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
        .from('term-images')
        .upload(fileName, blob, {
            contentType: `image/${ext}`,
            upsert: false,
        });

    if (error) throw error;

    const { data: publicData } = supabase.storage
        .from('term-images')
        .getPublicUrl(fileName);

    return publicData.publicUrl;
};