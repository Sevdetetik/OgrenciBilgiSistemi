
## ✨ Genel Bakış

Bu proje, veliler ve öğretmenler arasındaki iletişimi ve öğrenci takibini kolaylaştırmak amacıyla React Native ile geliştirilmiş mobil bir uygulamadır. Güvenilir ve gerçek zamanlı veri yönetimi için tüm altyapı hizmetleri **Firebase** tarafından sağlanmaktadır.

## 📸 Uygulama Ekran Görüntüleri

Projenin temel kullanıcı arayüzlerini ve ana özelliklerini aşağıda görebilirsiniz:

### 1. Giriş ve Kimlik Doğrulama

Uygulama, hem veliler hem de öğretmenler için ayrı ayrı giriş seçenekleri sunar. Hızlı ve güvenli erişim için Google ile Giriş yapma özelliği mevcuttur.

![WhatsApp Image 2025-11-02 at 13 05 11](https://github.com/user-attachments/assets/8c6cc00f-2411-4d17-932b-87c6ded27bad)


### 2. Veli Paneli (Dashboard)

Kullanıcı giriş yaptıktan sonra ana panele yönlendirilir. Bu panel, velilerin/öğretmenlerin en çok ihtiyaç duyduğu modüllere hızlı erişim sağlar: Ödevler, Cevap Anahtarları, Duyurular, Ders Takibi ve Ayarlar.

![WhatsApp Image 2025-11-02 at 13 04 29](https://github.com/user-attachments/assets/9a726a06-5b42-4370-a201-f5934f690c8f)


### 3. Duyurular Modülü

Yönetici veya öğretmenler tarafından yapılan güncel duyurular, kronolojik sırayla bu ekranda listelenir. Kullanıcılar, önemli bildirimleri anında görüntüleyebilir.

![WhatsApp Image 2025-11-02 at 13 04 29 (1)](https://github.com/user-attachments/assets/52f86cd1-f1e9-43ed-bd4a-87c6ec278d70)

---

## ⚙️ Teknolojik Altyapı

* **Mobil Geliştirme Çatısı:** **React Native** (Tek kod tabanı ile iOS ve Android desteği)
* **Arka Uç (Backend):** **Google Firebase**
    * **Firebase Authentication:** Güvenli kullanıcı yönetimi.
    * **Cloud Firestore/Realtime DB:** Gerçek zamanlı veri depolama ve senkronizasyonu.
* **Programlama Dili:** JavaScript

## 🚀 Yerel Kurulum

Projeyi yerel cihazınızda çalıştırmak için:

1.  Depoyu klonlayın: `git clone [REPO URL'NİZİ BURAYA YAZIN]`
2.  Bağımlılıkları yükleyin: `npm install`
3.  Bir Firebase projesi oluşturun ve yapılandırma dosyalarını (`google-services.json`, vb.) projeye ekleyin.
4.  Uygulamayı başlatın: `npx react-native run-android` veya `npx react-native run-ios`

---
















# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
