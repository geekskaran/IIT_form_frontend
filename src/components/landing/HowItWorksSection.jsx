import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: (
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C14.8,12.4 14.4,13.2 13.7,13.7C13.6,13.9 13.4,14.1 13.1,14.2L12.9,14.8C12.9,15.1 12.6,15.3 12.3,15.3H11.7C11.4,15.3 11.1,15.1 11.1,14.8L10.9,14.2C10.6,14.1 10.4,13.9 10.3,13.7C9.6,13.2 9.2,12.4 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7Z"/>
          </svg>
        </div>
      ),
      title: "Spam blocked, data validated",
      description: "We validate your data server-side and use machine learning to protect you from spam"
    },
    {
      icon: (
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
          </svg>
        </div>
      ),
      title: "Email notifications and auto-responses are sent",
      description: "Our email templates are fully customizable"
    },
    {
      icon: (
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5.04,7.5L12,10.85L18.96,7.5L12,4.15Z"/>
          </svg>
        </div>
      ),
      title: "Submissions are saved to the FormBuilder Inbox",
      description: "View submissions, see daily analytics reports, and export to CSV or JSON"
    },
    {
      icon: (
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
          </svg>
        </div>
      ),
      title: "3rd party integrations are triggered",
      description: "With our direct integrations, we'll get your data where it needs to be - no Zapier required"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form Preview */}
          <div className="order-2 lg:order-1">
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Message..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button className="px-6 py-3 bg-transparent border border-slate-500 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Process Steps */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  How it works
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Here's what happens after your form is submitted using application forms, 
                  management dashboard or{' '}
                  <span className="inline-flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-sm mr-1"></span>
                    <span className="font-semibold">FormBuilder</span>
                  </span>.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {/* Step Indicator */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-6 left-1/2 w-0.5 h-16 bg-gray-200 transform -translate-x-1/2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center space-x-3 mb-3">
                        {step.icon}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;