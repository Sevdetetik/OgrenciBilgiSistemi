import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
    return (
        <Stack>
            {/* --- BU SATIR İSTEDİĞİNİZİ YAPIYOR --- */}
            {/* "index" (yani StartPage) ekranının başlığını gizle */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* Diğer ekranların başlıkları da gizli kalmalı */}
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
    );
}