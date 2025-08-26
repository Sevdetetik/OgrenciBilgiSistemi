import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

const gradientSets = [['#0f2027', '#2c5364'], ['#2c5364', '#2980b9'], ['#2980b9', '#0f2027']] as const;

export default function RegisterScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<'teacher' | 'parent'>('parent');
    const [isLoading, setIsLoading] = useState(false);
    const [currentGradientIndex, setCurrentGradientIndex] = useState(0);
    const veilOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const runAnimationCycle = () => { Animated.sequence([Animated.delay(4000), Animated.timing(veilOpacity, { toValue: 1, duration: 1500, useNativeDriver: true }), Animated.delay(200),]).start(() => { setCurrentGradientIndex(prevIndex => (prevIndex + 1) % gradientSets.length); Animated.timing(veilOpacity, { toValue: 0, duration: 1500, useNativeDriver: true }).start(() => { runAnimationCycle(); }); }); };
        runAnimationCycle();
    }, []);

    const handleRegister = async () => {
        if (isLoading) return;
        if (!fullName || !email || !password || !confirmPassword || !selectedRole) { Alert.alert('Hata', 'Lütfen tüm alanları doldurun.'); return; }
        if (password !== confirmPassword) { Alert.alert('Hata', 'Şifreler eşleşmiyor.'); return; }
        setIsLoading(true);
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email.trim(), password);
            const user = userCredential.user;
            if (user) {
                await db.collection("users").doc(user.uid).set({ uid: user.uid, fullName: fullName, email: email.trim(), role: selectedRole, });
            }
            Alert.alert('Başarılı', 'Hesabınız oluşturuldu!', [{ text: 'Tamam', onPress: () => router.replace('/') }]);
        } catch (error: any) {
            console.error("Kayıt sırasında detaylı hata:", error);
            Alert.alert('Kayıt Hatası', error.message || "Bilinmeyen bir hata oluştu.");
        } finally { setIsLoading(false); }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <LinearGradient colors={gradientSets[currentGradientIndex]} style={StyleSheet.absoluteFill} />
            <Animated.View style={[styles.veil, { opacity: veilOpacity }]} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}><Image source={require('../assets/images/logo.png')} style={styles.logo} /></View>
                <Text style={styles.title}>Yeni Hesap Oluştur</Text>
                <View style={styles.selectContainer}>
                    <TouchableOpacity style={[styles.selectBtn, selectedRole === 'teacher' && styles.selectedBtn]} onPress={() => setSelectedRole('teacher')}><Text style={[styles.selectText, selectedRole === 'teacher' && styles.selectedText]}>Öğretmenim</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.selectBtn, selectedRole === 'parent' && styles.selectedBtn]} onPress={() => setSelectedRole('parent')}><Text style={[styles.selectText, selectedRole === 'parent' && styles.selectedText]}>Veliyim</Text></TouchableOpacity>
                </View>
                <TextInput style={styles.input} placeholder="Ad Soyad" placeholderTextColor="#b3e0f2" value={fullName} onChangeText={setFullName} />
                <TextInput style={styles.input} placeholder="E-posta Adresi" placeholderTextColor="#b3e0f2" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#b3e0f2" secureTextEntry value={password} onChangeText={setPassword} />
                <TextInput style={styles.input} placeholder="Şifreyi Onayla" placeholderTextColor="#b3e0f2" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} disabled={isLoading}>{isLoading ? <ActivityIndicator color="#2193b0" /> : <Text style={styles.loginText}>Kayıt Ol</Text>}</TouchableOpacity>
                <TouchableOpacity style={styles.googleBtn}><FontAwesome name="google" size={22} color="#fff" style={{ marginRight: 8 }} /><Text style={styles.googleText}>Google ile Giriş Yap</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/')}><Text style={styles.createAccount}>Zaten bir hesabın var mı? Giriş Yap</Text></TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({ container: { flex: 1 }, veil: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0f2027' }, content: { flexGrow: 1, paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }, iconContainer: { marginBottom: 32, alignItems: 'center' }, logo: { width: 180, height: 180, resizeMode: 'contain' }, title: { fontSize: 20, color: '#fff', fontWeight: '600', marginBottom: 24, textAlign: 'center' }, selectContainer: { flexDirection: 'row', marginBottom: 24, gap: 12 }, selectBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 18 }, selectedBtn: { backgroundColor: '#fff' }, selectText: { color: '#fff', fontWeight: '600', fontSize: 15 }, selectedText: { color: '#2193b0' }, input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 24, paddingVertical: 14, paddingHorizontal: 20, fontSize: 16, color: '#fff', marginBottom: 16 }, loginBtn: { width: '100%', backgroundColor: '#fff', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 12, shadowColor: '#2193b0', shadowOpacity: 0.2, shadowRadius: 8, elevation: 2, minHeight: 50 }, loginText: { color: '#2193b0', fontSize: 17, fontWeight: '600' }, googleBtn: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#4285F4', borderRadius: 24, paddingVertical: 14, justifyContent: 'center', marginBottom: 18, shadowColor: '#4285F4', shadowOpacity: 0.2, shadowRadius: 8, elevation: 2 }, googleText: { color: '#fff', fontSize: 16, fontWeight: '600' }, createAccount: { color: '#fff', fontSize: 15, textAlign: 'center', textDecorationLine: 'underline' }, });