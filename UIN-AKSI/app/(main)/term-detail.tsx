import { TermDetailContent } from '@/src/components/organisms/TermDetailContent';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

type Props = {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUri?: string;
};

export default function TermDetailScreen() {
    const { id, title, description, category, imageUri } =
        useLocalSearchParams<Props>();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <TermDetailContent
                id={id}
                title={title}
                description={description}
                category={category}
                imageUri={imageUri}
            />
        </ScrollView>
    );
}
