import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Award, MapPin, Star } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileTabProps {
  profile: UserProfile;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex items-center mb-6">
        <img
          src={profile.avatar || '/placeholder.svg?height=100&width=100'}
          alt={profile.name}
          className="w-24 h-24 rounded-full mr-6 border-4 border-blue-200"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600 flex items-center mt-1">
            <MapPin size={16} className="mr-2" />
            {profile.neighborhood}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center bg-blue-50 p-4 rounded-lg">
          <Calendar size={24} className="text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">{t('Katılım Tarihi')}</p>
            <p className="font-semibold">10 Aralık 2023</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center bg-green-50 p-4 rounded-lg">
          <Award size={24} className="text-green-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">{t('Yardım Sayısı')}</p>
            <p className="font-semibold">12</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center bg-yellow-50 p-4 rounded-lg">
          <Star size={24} className="text-yellow-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">{t('Değerlendirme')}</p>
            <p className="font-semibold">4.8 / 5.0</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center bg-purple-50 p-4 rounded-lg">
          <MapPin size={24} className="text-purple-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">{t('Yardım Yarıçapı')}</p>
            <p className="font-semibold">3 km</p>
          </div>
        </motion.div>
      </div>

      <h3 className="text-xl font-semibold mb-4">{t('Beceriler')}</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {['Ev Tamiratı', 'Bahçe İşleri', 'Çocuk Bakımı', 'Yemek Pişirme', 'Evcil Hayvan Bakımı'].map((skill, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </motion.span>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4">{t('Son Aktiviteler')}</h3>
      <ul className="space-y-4">
        {[
          { title: 'Komşu Ayşe\'ye market alışverişinde yardım edildi', date: '15 Aralık 2023' },
          { title: 'Mahalle temizlik etkinliğine katılım sağlandı', date: '12 Aralık 2023' },
          { title: 'Komşu Mehmet\'in köpeğine 2 gün bakıldı', date: '8 Aralık 2023' },
        ].map((activity, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <p className="font-semibold">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.date}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProfileTab;

