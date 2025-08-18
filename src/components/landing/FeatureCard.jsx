import React, { useState, useEffect } from 'react';

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`
      bg-white p-5 rounded-lg shadow border border-gray-200
      transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
    `}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;