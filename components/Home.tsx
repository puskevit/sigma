import React from 'react'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t('home')}</h2>
      <p>{t('welcomeMessage')}</p>
    </div>
  )
}

export default Home

