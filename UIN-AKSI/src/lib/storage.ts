import { decode } from 'base64-arraybuffer';
import { readAsStringAsync } from 'expo-file-system/legacy';
import { Platform } from 'react-native';
import { supabase } from './supabase';

export const uploadImage = async (uri: string, userId: string): Promise<string> => {
    try {
        const ext = uri.split('.').pop();
        const fileName = `${userId}/${Date.now()}.${ext}`;

        let fileBody: ArrayBuffer | Blob;

        if (Platform.OS === 'web') {
            const response = await fetch(uri);
            fileBody = await response.blob();
        } else {
            // Read file as Base64 using expo-file-system
            const base64 = await readAsStringAsync(uri, {
                encoding: 'base64',
            });
            // Convert Base64 to ArrayBuffer
            fileBody = decode(base64);
        }

        const { data, error } = await supabase.storage
            .from('term-images')
            .upload(fileName, fileBody, {
                contentType: `image/${ext}`,
                upsert: false,
            });

        if (error) throw error;

        const { data: publicData } = supabase.storage
            .from('term-images')
            .getPublicUrl(fileName);

        return publicData.publicUrl;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};