import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Request } from '../types';

interface HomeTabProps {
  requests: Request[];
  onHelp: (requestId: string, message: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ requests, onHelp }) => {
  const { t } = useTranslation();
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [helpMessage, setHelpMessage] = useState('');

  const handleOfferHelp = (request: Request) => {
    setSelectedRequest(request);
    setHelpModalOpen(true);
  };

  const sendHelpOffer = () => {
    if (selectedRequest && helpMessage.trim()) {
      onHelp(selectedRequest.id, helpMessage);
      setHelpModalOpen(false);
      setHelpMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        {t('Yardım İstekleri')}
      </motion.h2>
      {requests.map((request, index) => (
        <motion.div
          key={request.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{request.title}</h3>
              <p className="text-sm text-gray-600">{request.user}</p>
            </div>
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="text-sm text-gray-700">{request.userRating}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{request.description}</p>
          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${
              request.urgency === 'Yüksek' ? 'bg-red-100 text-red-600' :
              request.urgency === 'Orta' ? 'bg-yellow-100 text-yellow-600' :
              'bg-green-100 text-green-600'
            }`}>
              {t(request.urgency)}
            </span>
            <span className="text-sm text-gray-600 flex items-center">
              <MapPin size={16} className="mr-1" />
              {t('Yakında')}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOfferHelp(request)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            {t('Yardım Teklif Et')}
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </motion.div>
      ))}
      {helpModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Yardım Teklifi Gönder')}</h2>
            <p className="mb-4">{t('Yardım teklifi gönderiyorsunuz')}: {selectedRequest.user}</p>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows={4}
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              placeholder={t('Mesajınızı yazın...')}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setHelpModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                {t('İptal')}
              </button>
              <button
                onClick={sendHelpOffer}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {t('Gönder')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTab;

