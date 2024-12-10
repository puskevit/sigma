import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, MessageCircle, User, Bell, PlusCircle } from 'lucide-react';
import i18n from '../i18n/i18n';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateRequest: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onCreateRequest }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', icon: Home, label: 'Ana Sayfa' },
    { id: 'messages', icon: MessageCircle, label: 'Mesajlar' },
    { id: 'profile', icon: User, label: 'Profil' },
    { id: 'notifications', icon: Bell, label: 'Bildirimler' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Force a re-render
    setActiveTab(activeTab);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg h-full flex flex-col justify-between p-6 w-72"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-blue-600 mb-10"
        >
          Komşu
        </motion.h1>
        <nav className="space-y-3">
          {tabs.map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full p-3 flex items-center space-x-3 rounded-lg transition-all duration-200 ${
                activeTab === id 
                  ? 'bg-blue-100 text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
              }`}
            >
              <Icon size={20} />
              <span>{t(label)}</span>
            </motion.button>
          ))}
        </nav>
      </div>
      <div className="space-y-4">
        <motion.button
          onClick={onCreateRequest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <PlusCircle size={20} />
          <span>{t('Yardım İsteği Oluştur')}</span>
        </motion.button>
        <div className="flex justify-around">
          {['tr', 'en'].map((lang) => (
            <motion.button
              key={lang}
              onClick={() => {
                i18n.changeLanguage(lang);
                setActiveTab(activeTab); // Force re-render
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                i18n.language === lang 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {t(lang === 'tr' ? 'Türkçe' : 'English')}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

