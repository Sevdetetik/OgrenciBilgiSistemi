import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// YENİ: React Navigation'dan tipleri import ediyoruz
import { StackScreenProps } from '@react-navigation/stack';

// YENİ: Navigasyon yığınımızdaki ekranların listesini tanımlıyoruz.
// Bu, App.tsx'teki Stack.Screen isimleriyle eşleşmelidir.
type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    // Gelecekte eklenecek diğer ekranlar buraya gelebilir, örneğin:
    // Home: { userId: string }; 
};

// YENİ: Bu ekranın alacağı props'ların tipini belirliyoruz.
type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const gradientSets = [
    ['#0f2027', '#2c5364'],
    ['#2c5364', '#2980b9'],
    ['#2980b9', '#0f2027'],
] as const;

// DEĞİŞTİ: Component artık 'navigation' prop'unu alıyor.
export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [currentGradientIndex, setCurrentGradientIndex] = useState(0);
    const [selectedRole, setSelectedRole] = useState<'teacher' | 'parent'>('parent');

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const nextGradientIndex = (currentGradientIndex + 1) % gradientSets.length;

    // Animasyon useEffect'i aynı kalıyor, dokunmuyoruz.
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => {
                setCurrentGradientIndex(i => (i + 1) % gradientSets.length);
                fadeAnim.setValue(0);
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            {/* Arka plan gradientleri aynı kalıyor */}
            <LinearGradient
                colors={gradientSets[currentGradientIndex]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
                <LinearGradient
                    colors={gradientSets[nextGradientIndex]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </Animated.View>

            {/* İçerik aynı kalıyor */}
            <View style={styles.content}>

                <Text style={styles.title}>Hesabınıza giriş yapın</Text>
                <View style={styles.selectContainer}>
                    <TouchableOpacity
                        style={[
                            styles.selectBtn,
                            selectedRole === 'teacher' && styles.selectedBtn,
                        ]}
                        onPress={() => setSelectedRole('teacher')}
                    >
                        <Text style={[styles.selectText, selectedRole === 'teacher' && styles.selectedText]}>Öğretmen Girişi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.selectBtn,
                            selectedRole === 'parent' && styles.selectedBtn,
                        ]}
                        onPress={() => setSelectedRole('parent')}
                    >
                        <Text style={[styles.selectText, selectedRole === 'parent' && styles.selectedText]}>Veli Girişi</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Telefon, e-posta veya kullanıcı adı"
                    placeholderTextColor="#b3e0f2"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    placeholderTextColor="#b3e0f2"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleBtn}>
                    <FontAwesome name="google" size={22} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.googleText}>Google ile Giriş Yap</Text>
                </TouchableOpacity>

                {/* DEĞİŞTİ: Bu butona onPress olayı eklendi */}
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.createAccount}>Yeni hesap oluştur</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Stiller aynı kalıyor.
const styles = StyleSheet.create({
    // ... stilleriniz burada ...
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    iconContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
    },
    selectContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 12,
    },
    selectBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    selectedBtn: {
        backgroundColor: '#fff',
    },
    selectText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    selectedText: {
        color: '#2193b0',
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#fff',
        marginBottom: 16,
    },
    loginBtn: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#2193b0',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    loginText: {
        color: '#2193b0',
        fontSize: 17,
        fontWeight: '600',
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#4285F4',
        borderRadius: 24,
        paddingVertical: 14,
        justifyContent: 'center',
        marginBottom: 18,
        shadowColor: '#4285F4',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    googleText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    createAccount: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});