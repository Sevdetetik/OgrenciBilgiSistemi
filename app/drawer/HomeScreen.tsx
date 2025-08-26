import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebaseConfig';

interface UserData { fullName: string; email: string; role: 'teacher' | 'parent'; }

const DashboardCard = ({ title, children }: { title: string, children: React.ReactNode }) => (<View style={styles.card}><Text style={styles.cardTitle}>{title}</Text><View style={styles.cardContent}>{children}</View></View>);

export default function HomeScreen() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) { setUserData(userDoc.data() as UserData); }
                setIsLoading(false);
            } else { router.replace('/'); }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => { await auth.signOut(); };

    if (isLoading) { return <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#fff" /></View>; }

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}><Text style={styles.welcomeText}>Hoş Geldin,</Text><Text style={styles.nameText}>{userData?.fullName}</Text></View>
            <View style={styles.quickActionsContainer}>
                {userData?.role === 'teacher' && (<>
                    <TouchableOpacity style={styles.quickActionButton}><FontAwesome name="bullhorn" size={24} color="#fff" /><Text style={styles.quickActionText}>Duyuru Yap</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton}><FontAwesome name="book" size={24} color="#fff" /><Text style={styles.quickActionText}>Ödev Ekle</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton}><FontAwesome name="envelope" size={24} color="#fff" /><Text style={styles.quickActionText}>Mesajlar</Text></TouchableOpacity>
                </>)}
                {userData?.role === 'parent' && (<>
                    <TouchableOpacity style={styles.quickActionButton}><FontAwesome name="envelope" size={24} color="#fff" /><Text style={styles.quickActionText}>Mesaj Gönder</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton}><FontAwesome name="calendar" size={24} color="#fff" /><Text style={styles.quickActionText}>Takvim</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton}><FontAwesome name="cutlery" size={24} color="#fff" /><Text style={styles.quickActionText}>Yemek Listesi</Text></TouchableOpacity>
                </>)}
            </View>
            <DashboardCard title="Son Duyurular"><Text style={styles.placeholderText}>Duyurular yakında burada görünecek.</Text></DashboardCard>
            <DashboardCard title="Yaklaşan Etkinlikler"><Text style={styles.placeholderText}>Etkinlik takvimi yakında burada.</Text></DashboardCard>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}><Text style={styles.logoutButtonText}>Çıkış Yap</Text></TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({ scrollView: { backgroundColor: '#0f2027' }, container: { padding: 20, paddingBottom: 100 }, loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f2027' }, headerContainer: { marginBottom: 30 }, welcomeText: { fontSize: 24, color: 'rgba(255, 255, 255, 0.8)' }, nameText: { fontSize: 30, color: '#fff', fontWeight: 'bold' }, quickActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }, quickActionButton: { backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 15, borderRadius: 15, alignItems: 'center', width: '30%', }, quickActionText: { color: '#fff', marginTop: 8, fontSize: 12, fontWeight: '600' }, card: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 20, marginBottom: 20 }, cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.2)', paddingBottom: 10 }, cardContent: {}, placeholderText: { color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', paddingVertical: 20 }, logoutButton: { backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, alignSelf: 'center', marginTop: 20 }, logoutButtonText: { color: '#2193b0', fontSize: 16, fontWeight: '600' }, });