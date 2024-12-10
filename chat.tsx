import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Chat: React.FC<{ user: string; onClose: () => void }> = ({ user, onClose }) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const { t } = useTranslation();

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: t('aiResponse', { user }), sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-96 flex flex-col relative animate-fadeIn">
      <button onClick={onClose} className="absolute top-2 right-2 text-blue-600 hover:text-blue-800">
        <X size={24} />
      </button>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-lg p-2"
          placeholder={t('typeYourMessage')}
        />
        <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

