import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#3B82F6"/>
      <path d="M20 10L28.6603 25H11.3397L20 10Z" fill="white"/>
      <circle cx="20" cy="28" r="3" fill="white"/>
    </svg>
  );
};

export default Logo;

