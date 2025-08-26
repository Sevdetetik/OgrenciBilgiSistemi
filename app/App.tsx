import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Ekranlarımızı import ediyoruz
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

// YENİ: Navigasyon tip listemizi App.tsx'e de ekliyoruz.
// Bu, projedeki tüm navigasyonla ilgili dosyalarda tutarlı olmalıdır.
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

// DEĞİŞTİ: createStackNavigator'a hangi ekran listesini kullanacağını
// <RootStackParamList> ile belirtiyoruz.
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login"
      >
        {/* Artık Stack.Screen, LoginScreen'in doğru propları aldığını biliyor */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}