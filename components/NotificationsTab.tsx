import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, CheckCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationsTabProps {
  notifications: Notification[];
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications }) => {
  const { t } = useTranslation();

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_request':
        return <Bell size={20} className="text-blue-600" />;
      case 'request_created':
        return <CheckCircle size={20} className="text-green-600" />;
      default:
        return <AlertCircle size={20} className="text-yellow-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 flex items-center"
      >
        <Bell className="mr-2 text-blue-600" />
        {t('Bildirimler')}
      </motion.h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.li
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 flex items-start"
            >
              <div className="bg-white rounded-full p-2 mr-4 shadow-md">
                {getIcon(notification.type)}
              </div>
              <div>
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-600">
                  {new Date(notification.timestamp).toLocaleString('tr-TR')}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 text-center"
        >
          {t('Henüz bildirim yok')}
        </motion.p>
      )}
    </div>
  );
};

export default NotificationsTab;

