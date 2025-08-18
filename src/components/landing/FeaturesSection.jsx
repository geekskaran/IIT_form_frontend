import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
        </div>
      ),
      title: "Powerful Application Forms",
      description: "Use advanced form builder with React components. Deploy your production forms with complete customization.",
      link: "Learn more →"
    },
    {
      icon: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <div className="text-red-500 font-bold text-xs border border-red-300 px-2 py-1 rounded">
            MGMT
          </div>
        </div>
      ),
      title: "Simple Management Dashboard",
      description: "Just set your organization's requirements. No complex setup required - start managing applications immediately.",
      link: "Learn more →"
    },
    {
      icon: (
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H21Z"/>
          </svg>
        </div>
      ),
      title: "Email Templates - Easy Communication",
      description: "Copy/paste the templates to send professional emails. Bulk email functionality with customizable templates.",
      link: "Learn more →"
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Build forms your way
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  {feature.link}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;