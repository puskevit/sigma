import React from 'react'
import { useTranslation } from 'react-i18next'

interface ProfileProps {
  userProfile: UserProfile | null
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
  const { t } = useTranslation()

  if (!userProfile) {
    return <div>{t('noProfileData')}</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t('profile')}</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <p><strong>{t('name')}:</strong> {userProfile.name}</p>
        <p><strong>{t('neighborhood')}:</strong> {userProfile.neighborhood}</p>
        <p><strong>{t('joinDate')}:</strong> {userProfile.joinDate}</p>
        <p><strong>{t('helpCount')}:</strong> {userProfile.helpCount}</p>
      </div>
    </div>
  )
}

export default Profile

