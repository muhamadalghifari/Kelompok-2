import { supabase } from '@/src/lib/supabase';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Term } from '../types/term'; // Fix import path if needed

type BookmarkContextType = {
    bookmarks: Term[];
    isLoading: boolean;
    toggleBookmark: (term: Term) => Promise<void>;
};

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Term[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial bookmarks from Supabase
    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('bookmarks')
                .select('term_id, terms(*)')
                .eq('user_id', user.id);

            if (error) throw error;

            // Map standard Supabase response to Term array
            // The structure is [{ term_id: '...', terms: { id:..., title:... } }]
            const formattedTerms = data.map((item: any) => item.terms) as Term[];
            setBookmarks(formattedTerms);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleBookmark = async (term: Term) => {
        // 1. Optimistic Update (Update UI immediately)
        const isAlreadyBookmarked = bookmarks.some((t) => t.id === term.id);

        setBookmarks((prev) => {
            if (isAlreadyBookmarked) {
                return prev.filter((t) => t.id !== term.id);
            }
            return [...prev, term];
        });

        // 2. Sync with Supabase
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                Alert.alert('Eits!', 'Kamu harus login dulu buat nyimpen istilah.');
                // Revert UI if not logged in
                setBookmarks((prev) => isAlreadyBookmarked ? [...prev, term] : prev.filter(t => t.id !== term.id));
                return;
            }

            if (isAlreadyBookmarked) {
                // Remove from Supabase
                const { error } = await supabase
                    .from('bookmarks')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('term_id', term.id);

                if (error) throw error;
            } else {
                // Add to Supabase
                const { error } = await supabase
                    .from('bookmarks')
                    .insert({
                        user_id: user.id,
                        term_id: term.id
                    });

                if (error) throw error;
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            Alert.alert('Gagal', 'Gagal menyimpan bookmark. Coba lagi ya.');
            // Revert UI on error
            setBookmarks((prev) => {
                if (isAlreadyBookmarked) {
                    return [...prev, term];
                }
                return prev.filter((t) => t.id !== term.id);
            });
        }
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, isLoading, toggleBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmark() {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmark harus dipakai di dalam BookmarkProvider');
    }
    return context;
}
