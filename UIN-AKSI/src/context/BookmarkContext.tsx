import { createContext, useContext, useState } from 'react';
import { Term } from '../constants/terms';

type BookmarkContextType = {
    bookmarks: Term[];
    toggleBookmark: (term: Term) => void;
};

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Term[]>([]);

    const toggleBookmark = (term: Term) => {
        setBookmarks((prev) => {
            const exists = prev.find((t) => t.id === term.id);
            if (exists) {
                return prev.filter((t) => t.id !== term.id);
            }
            return [...prev, term];
        });
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
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
