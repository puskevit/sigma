<QuickEdit file="app/page.tsx">
Update the layout structure:

```tsx
return (
  <div className="flex h-screen bg-gradient-to-br from-blue-100 to-white overflow-hidden">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onCreateRequest={() => setIsCreateRequestModalOpen(true)} />
    <main className="flex-1 overflow-hidden flex flex-col">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('Komşu Yardımlaşma Platformu')}</h1>
        {userProfile ? (
          <button
            onClick={() => setIsCreateRequestModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {t('Yardım İsteği Oluştur')}
          </button>
        ) : (
          <AuthButtons
            onLogin={() => setIsLoginModalOpen(true)}
            onRegister={() => setIsRegisterModalOpen(true)}
          />
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
    {isCreateRequestModalOpen && (
      <CreateRequestModal
        onClose={() => setIsCreateRequestModalOpen(false)}
        onSubmit={handleCreateRequest}
      />
    )}
    {isLoginModalOpen && (
      <LoginForm onLogin={handleLogin} onClose={() => setIsLoginModalOpen(false)} />
    )}
    {isRegisterModalOpen && (
      <LoginForm onLogin={handleRegister} onClose={() => setIsRegisterModalOpen(false)} isRegister />
    )}
  </div>
);
};

export default KomsuApp;

