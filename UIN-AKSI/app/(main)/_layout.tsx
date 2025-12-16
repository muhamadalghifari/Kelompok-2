import { BookmarkProvider } from '@/src/context/BookmarkContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function MainLayout() {
    return (
        <BookmarkProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* TAB UTAMA */}
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="terms"
                    options={{
                        title: 'Istilah',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="add"
                    options={{
                        title: 'Tambah',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'Bookmark',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="bookmark-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profil',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" size={size} color={color} />
                        ),
                    }}
                />

                {/* ⛔ SEMBUNYIKAN DETAIL ISTILAH */}
                <Tabs.Screen
                    name="term-detail"
                    options={{
                        href: null,
                    }}
                />

                {/* ⛔ SEMBUNYIKAN EDIT PROFILE DARI PASS NYA TAB */}
                <Tabs.Screen
                    name="edit-profile"
                    options={{
                        href: null,
                    }}
                />

                {/* ⛔ SEMBUNYIKAN EDIT TERM DARI PASS NYA TAB */}
                <Tabs.Screen
                    name="edit-term/[id]"
                    options={{
                        href: null,
                    }}
                />

                <Tabs.Screen
                    name="about"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </BookmarkProvider>
    );
}
