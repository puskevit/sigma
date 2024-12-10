import React from 'react'
import { useTranslation } from 'react-i18next'

const Messages: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t('messages')}</h2>
      <p>{t('noMessages')}</p>
    </div>
  )
}

export default Messages

