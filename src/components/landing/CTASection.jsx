import React from 'react';
import Button from '../common/Button';


const CTASection = ({ onGetStartedClick }) => {
  return (
    <section className="bg-gray-800 text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-100">
          Ready to Streamline Your Applications?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Join organizations using our platform to manage applications efficiently.
        </p>
        
        <Button 
          variant="primary" 
          size="lg"
          onClick={onGetStartedClick}
          className="bg-gray-700 hover:bg-gray-600 min-w-[200px]"
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
};

export default CTASection;