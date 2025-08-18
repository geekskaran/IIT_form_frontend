import React, { useState, useEffect } from 'react';
import Button from '../common/Button';


const Header = ({ onLoginClick, onSignUpClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                FormBuilder
              </span>
              <div className={`text-xs font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-500' : 'text-gray-300'
              }`}>
                Professional
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
              isScrolled ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Features
            </a>
            <a href="#pricing" className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
              isScrolled ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Pricing
            </a>
            <a href="#enterprise" className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
              isScrolled ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Enterprise
            </a>
            <a href="#support" className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
              isScrolled ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Support
            </a>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onLoginClick}
              className={`transition-all duration-300 ${
                isScrolled 
                  ? 'border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900' 
                  : 'border-gray-400 text-gray-200 hover:border-gray-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={onSignUpClick}
              className="bg-gray-700 hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="mr-1">🚀</span>
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100/10 transition-colors">
            <svg className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-gray-600 to-gray-700 transition-all duration-300"
            style={{
              width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
            }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;