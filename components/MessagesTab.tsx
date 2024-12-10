import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const MessagesTab: React.FC = () => {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; message: string }[]>([]);

  const users = ['Ayşe Yılmaz', 'Mehmet Kaya', 'Fatma Öztürk', 'Ali Demir'];

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      setChatHistory([...chatHistory, { user: 'Siz', message }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponses = [
          `Merhaba! "${message}" mesajınıza yanıt olarak size nasıl yardımcı olabilirim?`,
          `Anladım, "${message}" konusunda yardıma ihtiyacınız var. Size nasıl destek olabilirim?`,
          `"${message}" talebinizi aldım. Bu konuda size yardımcı olmak için elimden geleni yapacağım.`,
          `"${message}" hakkında daha fazla bilgi verebilir misiniz? Size en iyi şekilde yardımcı olmak istiyorum.`,
        ];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setChatHistory(prev => [...prev, { user: selectedUser, message: randomResponse }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="w-1/3 border-r">
        <h2 className="text-xl font-semibold p-4 border-b">{t('Konuşmalar')}</h2>
        <ul>
          {users.map(user => (
            <motion.li
              key={user}
              whileHover={{ scale: 1.05 }}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedUser === user ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              {user}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedUser ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-4 ${chat.user === 'Siz' ? 'text-right' : 'text-left'}`}
                >
                  <span className={`inline-block rounded-lg px-4 py-2 ${
                    chat.user === 'Siz' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    <strong>{chat.user}:</strong> {chat.message}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('Mesajınızı yazın...')}
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {t('Bir konuşma seçin')}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesTab;

