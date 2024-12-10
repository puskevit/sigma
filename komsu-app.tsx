import React, { useState, useEffect, useCallback } from 'react';
import { Home, MessageCircle, Users, PlusCircle, Star, MapPin, Bell, X } from 'lucide-react';
import Chat from './chat';
import Login from './login';
import Profile from './profile';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

// Fully Turkish and English Names and Interactions
const aiNames = {
  tr: ["Komşu Asistanı", "Mahalle Robotu", "Yardım Çözüm Merkezi"],
  en: ["Neighbor Assistant", "Neighborhood Bot", "Help Solution Center"]
};

const neighborNames = {
  tr: ["Ayşe Yılmaz", "Mehmet Kaya", "Zeynep Şahin", "Ali Demir", "Fatma Türk", "Emre Yılmaz", "Beste Aydın", "Murat Çelik", "Ceren Öztürk"],
  en: ["Jane Smith", "John Doe", "Emily Brown", "Michael Johnson", "Sarah Davis", "David Wilson", "Emma Taylor", "Daniel Anderson", "Olivia Martinez"]
};

// Detailed Turkish and English Request Categories and Titles
const requestCategories = {
  tr: ["Araçlar", "Eğitim", "Ulaşım", "Ev İşleri", "Beceriler", "Tamir", "Bahçe", "Çocuk Bakımı", "Alışveriş"],
  en: ["Tools", "Education", "Transportation", "Housework", "Skills", "Repair", "Garden", "Childcare", "Shopping"]
};

const generateRandomRequests = (lang) => {
  const categories = {
    tr: {
      "Araçlar": ["Çekiç ödünç alabilir miyim?", "Matkap kullanabilen var mı?", "Bahçe makası paylaşılabilir mi?"],
      "Eğitim": ["Lise matematiği özel ders verebilecek biri?", "İngilizce konuşma pratiği yapabiliriz", "Kod yazma dersi almak istiyorum"],
      "Ulaşım": ["Yakındaki markete birlikte gidebilir miyiz?", "Hastaneye arkadaşımı götürebilecek biri var mı?", "Ortak arabayla yolculuk"],
      "Ev İşleri": ["Ev temizliğine yardım edebilecek biri?", "Küçük tadilat işi için ustaya ihtiyaç var", "Mobilya taşıma konusunda yardım"],
      "Beceriler": ["Bilgisayar kurulumu yapabilirim", "Müzik dersi verebilirim", "Çocuk bakımı konusunda destek olabilirim"],
      "Tamir": ["Çatı onarımı için usta lazım", "Musluk tamiri yapabilecek biri?", "Elektrik tesisatı kontrolü"],
      "Bahçe": ["Bahçe düzenlemesi için yardım", "Fide dikimi konusunda destek", "Çim biçme işi"],
      "Çocuk Bakımı": ["Çocuğuma saat 15:00'te bakabilir misiniz?", "Okul sonrası yardımcı olunabilir mi?", "Çocuk aktiviteleri için destek"],
      "Alışveriş": ["Market alışverişine birlikte gidebilir miyiz?", "Pazardan alışveriş yapılabilir mi?", "Toplu alışveriş için ortak çözüm"]
    },
    en: {
      "Tools": ["Can I borrow a hammer?", "Is there anyone who can use a drill?", "Can a garden shear be shared?"],
      "Education": ["Anyone available for high school math tutoring?", "We can practice English conversation", "I want to take a coding lesson"],
      "Transportation": ["Can we go to the nearby market together?", "Is there anyone who can take my friend to the hospital?", "Carpooling"],
      "Housework": ["Anyone who can help with house cleaning?", "Need a handyman for small repairs", "Help with moving furniture"],
      "Skills": ["I can do computer setup", "I can give music lessons", "I can provide support for childcare"],
      "Repair": ["Need a roofer for repairs", "Anyone who can fix a faucet?", "Electrical wiring check"],
      "Garden": ["Help with garden landscaping", "Support for planting seedlings", "Lawn mowing job"],
      "Childcare": ["Can you look after my child at 3:00 PM?", "Can someone help after school?", "Support for children's activities"],
      "Shopping": ["Can we go grocery shopping together?", "Can someone shop at the bazaar?", "Joint solution for bulk shopping"]
    }
  };

  const categoryList = requestCategories[lang] || requestCategories['en'];
  const category = categoryList[Math.floor(Math.random() * categoryList.length)];
  const titleList = categories[lang]?.[category] || categories['en'][category] || [];
  const title = titleList[Math.floor(Math.random() * titleList.length)] || 'Default Title';
  const nameList = neighborNames[lang] || neighborNames['en'];
  const user = Math.random() < 0.5 
    ? nameList[Math.floor(Math.random() * nameList.length)]
    : (aiNames[lang] || aiNames['en'])[Math.floor(Math.random() * (aiNames[lang] || aiNames['en']).length)];

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    user,
    title,
    category,
    urgency: lang === 'tr' ? ["Düşük", "Orta", "Yüksek"][Math.floor(Math.random() * 3)] : ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    userRating: +(Math.random() * 5).toFixed(1)
  };
};

const KomsuApp = () => {
  const [activeScreen, setActiveScreen] = useState('login');
  const [requests, setRequests] = useState([]);
  const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    category: "",
    urgency: ""
  });
  const [notifications, setNotifications] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { t } = useTranslation();

  const generateRequests = useCallback(() => {
    const newRequest = generateRandomRequests(i18n.language);
    setRequests(prevRequests => [
      newRequest,
      ...prevRequests
    ].slice(0, 20));

    setNotifications(prev => [
      {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: t('newRequestNotification', { category: newRequest.category, title: newRequest.title }),
        from: newRequest.user
      },
      ...prev
    ].slice(0, 5));
  }, [t]);

  useEffect(() => {
    generateRequests();
    const intervalId = setInterval(generateRequests, 10000);
    return () => clearInterval(intervalId);
  }, [generateRequests]);

  useEffect(() => {
    const currentCategories = requestCategories[i18n.language] || requestCategories['en'];
    setNewRequest(prevRequest => ({
      ...prevRequest,
      category: currentCategories[0] || '',
      urgency: i18n.language === 'tr' ? "Orta" : "Medium"
    }));
  }, [i18n.language]);

  const handleCreateRequest = () => {
    if (newRequest.title.trim()) {
      const createdRequest = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user: t('you'),
        title: newRequest.title,
        category: newRequest.category,
        urgency: newRequest.urgency,
        userRating: 5.0
      };

      setRequests(prevRequests => [createdRequest, ...prevRequests]);
      setIsCreateRequestModalOpen(false);
      setNewRequest(prevRequest => ({
        ...prevRequest,
        title: "",
        category: (requestCategories[i18n.language] || requestCategories['en'])[0] || '',
      }));

      setNotifications(prev => [
        {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          message: t('newRequestCreated', { title: createdRequest.title }),
          from: t('you')
        },
        ...prev
      ].slice(0, 5));
    }
  };

  const handleLogin = (credentials) => {
    setUserProfile({
      name: credentials.name,
      neighborhood: credentials.neighborhood,
      joinDate: new Date().toLocaleDateString(),
      helpCount: Math.floor(Math.random() * 50)
    });
    setActiveScreen('home');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'home':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div 
                key={request.id} 
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 duration-300 animate-fadeIn"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-blue-900">{request.title}</h3>
                    <p className="text-sm text-blue-700">{request.user}</p>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span className="text-sm text-blue-800">{request.userRating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`
                    px-2 py-1 rounded-full text-xs 
                    ${request.urgency === (i18n.language === 'tr' ? 'Yüksek' : 'High') ? 'bg-red-100 text-red-600' : 
                      request.urgency === (i18n.language === 'tr' ? 'Orta' : 'Medium') ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-green-100 text-green-600'}
                  `}>
                    {t(`urgency.${request.urgency.toLowerCase()}`)}
                  </span>
                  <span className="text-sm text-blue-700">
                    <MapPin size={16} className="inline-block mr-1" />
                    {t('nearby')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'messages':
        return (
          <div className="bg-blue-50 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">{t('messages')}</h2>
            {selectedUser ? (
              <Chat user={selectedUser} onClose={() => setSelectedUser(null)} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(neighborNames[i18n.language] || neighborNames['en']).map((name) => (
                  <button
                    key={name}
                    onClick={() => setSelectedUser(name)}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      case 'profile':
        return <Profile userProfile={userProfile} />;
      case 'notifications':
        return (
          <div className="bg-blue-50 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">{t('notifications')}</h2>
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="bg-blue-100 p-4 rounded-lg mb-2 animate-fadeIn"
              >
                <p className="text-sm text-blue-900">{notification.message}</p>
                <span className="text-xs text-blue-700">{t('from')}: {notification.from}</span>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-blue-700">{t('noNotifications')}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex animate-gradient-x">
      {/* Sidebar Navigation */}
      <div className="w-20 bg-white shadow-lg flex flex-col items-center py-8 space-y-6 border-r border-blue-100">
        <div className="text-2xl font-bold text-blue-600 mb-4 animate-pulse">
          K
        </div>
        <nav className="space-y-4">
          {[
            { icon: Home, label: t('home'), screen: 'home' },
            { icon: MessageCircle, label: t('messages'), screen: 'messages' },
            { icon: Users, label: t('profile'), screen: 'profile' },
            { icon: Bell, label: t('notifications'), screen: 'notifications' }
          ].map(({ icon: Icon, label, screen }) => (
            <div 
              key={screen}
              onClick={() => setActiveScreen(screen)}
              className={`
                text-blue-600 hover:text-blue-800 cursor-pointer 
                flex flex-col items-center
                ${activeScreen === screen ? 'text-blue-900 animate-bounce' : ''}
                transition transform hover:scale-105
              `}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </div>
          ))}
        </nav>
        
        {/* Language Selector */}
        <div className="mt-auto space-y-2">
          <div className="mt-auto space-y-2">
          <button 
            onClick={() => changeLanguage('tr')}
            className={`
              ${i18n.language === 'tr' ? 'bg-blue-200 text-blue-900' : 'text-blue-600'}
              p-2 rounded-full hover:scale-110 transition transform
            `}
          >
            TR
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className={`
              ${i18n.language === 'en' ? 'bg-blue-200 text-blue-900' : 'text-blue-600'}
              p-2 rounded-full hover:scale-110 transition transform
            `}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header with Create Request Button */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            {t('neighborhoodPlatform')}
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCreateRequestModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition transform hover:scale-105 animate-pulse"
            >
              <PlusCircle className="mr-2" size={20} />
              {t('createHelpRequest')}
            </button>
          </div>
        </header>

        {/* Dynamic Content Rendering */}
        {renderScreen()}

        {/* Create Request Modal */}
        {isCreateRequestModalOpen && (
          <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-96 animate-scaleIn shadow-2xl border border-blue-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-900">{t('createHelpRequest')}</h2>
                <button 
                  onClick={() => setIsCreateRequestModalOpen(false)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder={t('explainYourRequest')}
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  className="w-full border border-blue-200 rounded-md p-2 focus:ring-2 focus:ring-blue-300"
                />
                <select 
                  value={newRequest.category}
                  onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                  className="w-full border border-blue-200 rounded-md p-2 focus:ring-2 focus:ring-blue-300"
                >
                  {(requestCategories[i18n.language] || requestCategories['en']).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleCreateRequest} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">{t('create')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KomsuApp;

