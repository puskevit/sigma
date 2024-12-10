import { useState, useEffect } from 'react';

export const useAIHelper = () => {
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const generateAISuggestions = (requests: any[]) => {
    // Simulate AI processing
    const suggestions = requests.map(request => {
      const randomSuggestion = [
        `${request.user} için ${request.category.toLowerCase()} konusunda yardım edebilirsiniz.`,
        `${request.title} talebine cevap verebilecek birini tanıyor musunuz?`,
        `${request.category} alanında deneyimli misiniz? ${request.user}'a yardım edebilirsiniz.`
      ][Math.floor(Math.random() * 3)];
      return randomSuggestion;
    });
    setAiSuggestions(suggestions);
  };

  return { aiSuggestions, generateAISuggestions };
};

export const matchRequestsWithUsers = (requests: any[], users: string[]) => {
  return requests.map(request => {
    const matchedUser = users[Math.floor(Math.random() * users.length)];
    return { ...request, matchedUser };
  });
};

