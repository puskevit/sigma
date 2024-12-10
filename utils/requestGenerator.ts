import { Request } from '../types';

const categories = ['Araç Gereçler', 'Eğitim', 'Ulaşım', 'Ev İşleri', 'Beceriler', 'Tamir', 'Bahçe', 'Çocuk Bakımı', 'Alışveriş'];
const urgencyLevels = ['Düşük', 'Orta', 'Yüksek'];
const users = ['Ayşe', 'Mehmet', 'Fatma', 'Ali', 'Zeynep', 'Mustafa', 'Emine', 'Ahmet'];

export const generateRandomRequest = (): Request => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const title = `${category} konusunda yardım`;
  const description = `${category} ile ilgili yardıma ihtiyacım var. Kim yardımcı olabilir?`;
  const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
  const user = users[Math.floor(Math.random() * users.length)];

  return {
    id: `istek-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    category,
    description,
    urgency,
    user,
    userRating: +(Math.random() * 4 + 1).toFixed(1),
    timestamp: new Date(),
  };
};

