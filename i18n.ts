import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          neighborhoodPlatform: 'Neighborhood Help Platform',
          createHelpRequest: 'Create Help Request',
          explainYourRequest: 'Explain your request',
          create: 'Create',
          login: 'Login',
          name: 'Name',
          neighborhood: 'Neighborhood',
          profile: 'Profile',
          noProfileData: 'No profile data available',
          joinDate: 'Join Date',
          helpCount: 'Help Count',
          messages: 'Messages',
          notifications: 'Notifications',
          from: 'From',
          noNotifications: 'No notifications yet',
          home: 'Home',
          nearby: 'Nearby',
          you: 'You',
          urgency: {
            low: 'Low Priority',
            medium: 'Medium Priority',
            high: 'High Priority'
          },
          newRequestNotification: 'New {{category}} request: {{title}}',
          newRequestCreated: 'Your new request created: {{title}}',
          aiResponse: 'Hello {{user}}, how can I help you?',
          typeYourMessage: 'Type your message...'
        }
      },
      tr: {
        translation: {
          neighborhoodPlatform: 'Komşu Yardımlaşma Platformu',
          createHelpRequest: 'Yardım Talebi Oluştur',
          explainYourRequest: 'Talebinizi açıklayın',
          create: 'Oluştur',
          login: 'Giriş',
          name: 'İsim',
          neighborhood: 'Mahalle',
          profile: 'Profil',
          noProfileData: 'Profil bilgisi bulunamadı',
          joinDate: 'Katılım Tarihi',
          helpCount: 'Yardım Sayısı',
          messages: 'Mesajlar',
          notifications: 'Bildirimler',
          from: 'Gönderen',
          noNotifications: 'Henüz bildirim yok',
          home: 'Ana Sayfa',
          nearby: 'Yakınında',
          you: 'Siz',
          urgency: {
            low: 'Düşük Öncelik',
            medium: 'Orta Öncelik',
            high: 'Yüksek Öncelik'
          },
          newRequestNotification: 'Yeni bir {{category}} talebi: {{title}}',
          newRequestCreated: 'Yeni talebiniz oluşturuldu: {{title}}',
          aiResponse: 'Merhaba {{user}}, size nasıl yardımcı olabilirim?',
          typeYourMessage: 'Mesajınızı yazın...'
        }
      }
    },
    lng: 'tr', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

