import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import HowItWorksSection from '../components/landing/HowItWorksSection';


const LandingPage = ({ onLoginClick, onSignUpClick }) => {
  // Navigation handlers
  const handleLogin = () => {
    console.log('Navigate to login');
    if (onLoginClick) onLoginClick();
  };
  
  const handleSignUp = () => {
    console.log('Navigate to signup');
    if (onSignUpClick) onSignUpClick();
  };
  
  const handleGetStarted = () => {
    console.log('Navigate to registration');
    if (onSignUpClick) onSignUpClick();
  };
  
  const handleLearnMore = () => {
    // Smooth scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="min-h-screen">
        <Header 
          onLoginClick={handleLogin}
          onSignUpClick={handleSignUp}
        />
        
        <HeroSection 
          onGetStartedClick={handleGetStarted}
          onLearnMoreClick={handleLearnMore}
        />
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <HowItWorksSection />
        
        <CTASection onGetStartedClick={handleGetStarted} />
      </div>
    </>
  );
};

export default LandingPage;