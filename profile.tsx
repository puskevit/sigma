import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserProfile {
  name: string;
  neighborhood: string;
  joinDate: string;
  helpCount: number;
}

const Profile: React.FC<{ userProfile: UserProfile | null }> = ({ userProfile }) => {
  const { t } = useTranslation();

  if (!userProfile) {
    return <div>{t('noProfileData')}</div>;
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">{t('profile')}</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">{t('name')}:</span> {userProfile.name}
        </div>
        <div>
          <span className="font-semibold">{t('neighborhood')}:</span> {userProfile.neighborhood}
        </div>
        <div>
          <span className="font-semibold">{t('joinDate')}:</span> {userProfile.joinDate}
        </div>
        <div>
          <span className="font-semibold">{t('helpCount')}:</span> {userProfile.helpCount}
        </div>
      </div>
    </div>
  );
};

export default Profile;

