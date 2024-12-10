import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login: React.FC<{ onLogin: (credentials: { name: string; neighborhood: string }) => void }> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ name: '', neighborhood: '' });
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white animate-gradient-x">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 animate-fadeIn">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">{t('login')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-700">{t('name')}</label>
            <input
              type="text"
              id="name"
              value={credentials.name}
              onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
              className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-blue-700">{t('neighborhood')}</label>
            <input
              type="text"
              id="neighborhood"
              value={credentials.neighborhood}
              onChange={(e) => setCredentials({ ...credentials, neighborhood: e.target.value })}
              className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

