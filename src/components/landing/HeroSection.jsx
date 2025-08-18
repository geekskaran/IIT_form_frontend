import React from 'react';
import Button from '../common/Button';


const HeroSection = ({ onGetStartedClick, onLearnMoreClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden min-h-screen flex items-center">
      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Geometric Shapes for Professional Look */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl rotate-12 opacity-20"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl rotate-45 opacity-15"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg rotate-6 opacity-10"></div>
      
      {/* Subtle Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-gray-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-gray-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full">
                <span className="text-sm text-gray-300 font-medium">Enterprise Application Management</span>
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-gray-100">Professional</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400">
                  Application
                </span>
                <br />
                <span className="text-gray-200">Management</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                Streamline your recruitment process with enterprise-grade application management. 
                Create custom forms, manage submissions, and automate communications seamlessly.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={onGetStartedClick}
                  className="bg-gray-700 hover:bg-gray-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="mr-2">🚀</span>
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={onLearnMoreClick}
                  className="border-gray-500 text-gray-300 hover:bg-gray-800/50 hover:border-gray-400 backdrop-blur-sm"
                >
                  <span className="mr-2">📊</span>
                  View Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  No Setup Required
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Enterprise Security
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <div className="relative">
              {/* Main Dashboard Preview */}
              <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-400">Dashboard Preview</div>
                </div>
                
                {/* Mini Chart */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Applications</span>
                    <span className="text-lg font-bold text-white">1,247</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-3/4"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-xs text-gray-400">Pending</div>
                      <div className="text-lg font-bold text-yellow-400">42</div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-xs text-gray-400">Approved</div>
                      <div className="text-lg font-bold text-green-400">128</div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-xs text-gray-400">Total</div>
                      <div className="text-lg font-bold text-blue-400">170</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-green-500/10 backdrop-blur border border-green-500/20 rounded-lg p-3 shadow-lg">
                <div className="text-xs text-green-400">✓ Form Created</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-blue-500/10 backdrop-blur border border-blue-500/20 rounded-lg p-3 shadow-lg">
                <div className="text-xs text-blue-400">📧 Email Sent</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-sm text-gray-400">Applications Processed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm text-gray-400">Organizations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;