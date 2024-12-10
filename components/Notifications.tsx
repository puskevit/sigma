import React from 'react'
import { useTranslation } from 'react-i18next'

const Notifications: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t('notifications')}</h2>
      <p>{t('noNotifications')}</p>
    </div>
  )
}

export default Notifications

