
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Target, Shield } from 'lucide-react';
import ContactSection from './ContactSection';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const coreValues = [
    {
      icon: BarChart3,
      title: "Education First",
      description: "We believe in empowering traders through comprehensive education and continuous learning."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Teaching proper risk management is at the core of everything we do for sustainable trading."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in analysis, education, and customer service."
    }
  ];

  if (showContact) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ContactSection />
          <button
            onClick={() => setShowContact(false)}
            className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </section>
    );
  }

  if (showAbout) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide our mission to help you succeed in trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">{value.title}</h4>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowAbout(false)}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-300">Premium Trading Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Master Crypto &
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Binary Options
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of successful traders who trust Elizabeth Trader for 
            <span className="text-blue-300 font-semibold"> professional market analysis</span>, 
            <span className="text-cyan-300 font-semibold"> expert education</span>, and 
            <span className="text-blue-300 font-semibold"> proven strategies</span>.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Real-time Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300">Proven Strategies</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Risk Management</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowContact(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              Learn More
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm mb-4">Trusted by professional traders worldwide</p>
            <div className="flex justify-center space-x-8 text-2xl font-bold text-gray-500">
              <span>3.3K+</span>
              <span>•</span>
              <span>5★</span>
              <span>•</span>
              <span>24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
