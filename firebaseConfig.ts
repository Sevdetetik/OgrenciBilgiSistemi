import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAYBPg2mosb5t-N3biIumWtYh57ANQSpyM",
    authDomain: "yeniegitimplatformu.firebaseapp.com",
    projectId: "yeniegitimplatformu",
    storageBucket: "yeniegitimplatformu.firebasestorage.app",
    messagingSenderId: "329232547736",
    appId: "1:329232547736:web:a1b3c91624dd3d40cd75ed",
    measurementId: "G-VWE9DR6YGQ"
};

// Eğer Firebase daha önce başlatılmamışsa, başlat.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Servisleri doğrudan firebase'den export et
export const auth = firebase.auth();
export const db = firebase.firestore();

// Oturum kalıcılığını ayarla
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);