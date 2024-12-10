import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AuthButtonsProps {
  onLogin: () => void;
  onRegister: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onLogin, onRegister }) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
      >
        {t('Giriş Yap')}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRegister}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
      >
        {t('Kayıt Ol')}
      </motion.button>
    </div>
  );
};

export default AuthButtons;

