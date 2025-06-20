
import { BarChart3, Shield, BookOpen, Clock, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import ContactSection from './ContactSection';

const Features = () => {
  const [showPricing, setShowPricing] = useState(false);

  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Market Analysis",
      description: "Get instant access to professional market analysis and trading signals across multiple timeframes.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Education",
      description: "Master trading fundamentals with our structured courses and educational resources.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Risk Management Tools",
      description: "Learn advanced risk management techniques to protect your capital and maximize profits.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Proven Strategies",
      description: "Access battle-tested trading strategies with documented performance records.",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support and market monitoring to keep you informed and confident.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join our exclusive community of successful traders and learn from their experiences.",
      gradient: "from-cyan-500 to-indigo-500"
    }
  ];

  if (showPricing) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ContactSection 
            title="View Pricing Plans"
            showPricing={true}
          />
          <button
            onClick={() => setShowPricing(false)}
            className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            ← Back to Features
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-6">
            <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-300">Platform Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Everything You Need to Succeed
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools, education, and support you need to become a successful trader.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-14 h-14 mb-6 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Trading Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of successful traders who have transformed their financial future with our proven methods and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200">
                Get Started Today
              </button>
              <button 
                onClick={() => setShowPricing(true)}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
