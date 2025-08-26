import { FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../../firebaseConfig';

function CustomDrawerContent(props: any) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#0f2027' }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: top }}>
                <DrawerItem
                    label="Ana Sayfa"
                    onPress={() => router.push('../HomeScreen')}
                    icon={({ color, size }) => <FontAwesome name="home" size={size} color={color} />}
                    labelStyle={{ color: '#fff' }}
                />
                <DrawerItem
                    label="Profil"
                    onPress={() => { /* İleride profil sayfanızı ekleyebilirsiniz */ }}
                    icon={({ color, size }) => <FontAwesome name="user" size={size} color={color} />}
                    labelStyle={{ color: '#fff' }}
                />
            </DrawerContentScrollView>

            <View style={[styles.logoutSection, { paddingBottom: bottom + 10 }]}>
                <DrawerItem
                    label="Çıkış Yap"
                    onPress={handleLogout}
                    icon={({ color, size }) => <FontAwesome name="sign-out" size={size} color={'rgba(255, 255, 255, 0.7)'} />}
                    labelStyle={styles.logoutLabel}
                />
            </View>
        </View>
    );
}

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#2193b0',
                drawerActiveBackgroundColor: 'rgba(255, 255, 255, 0.1)',
                drawerStyle: {
                    backgroundColor: '#0f2027',
                }
            }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: 'Ana Sayfa',
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    logoutSection: {
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        borderTopWidth: 1,
    },
    logoutLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
    }
});