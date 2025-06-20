
import { CheckCircle, Star, BookOpen, Shield } from 'lucide-react';

const About = () => {
  const achievements = [
    "5+ years of trading experience",
    "Certified Financial Market Analyst",
    "3,300+ successful students trained",
    "Featured in major financial publications",
    "Risk management specialist",
    "Multi-asset trading expertise"
  ];

  const coreValues = [
    {
      icon: BookOpen,
      title: "Education First",
      description: "We believe in empowering traders through comprehensive education and continuous learning."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Teaching proper risk management is at the core of everything we do for sustainable trading."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We maintain the highest standards in analysis, education, and customer service."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
              <Star className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">About Elizabeth</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Your Trusted Trading Mentor & Market Expert
            </h2>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Elizabeth is a seasoned financial market analyst and educator with over 5 years of experience in crypto and binary options trading. Her passion for teaching and commitment to helping others achieve financial independence has made her one of the most respected names in the trading education industry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">Trading Philosophy</h3>
              <p className="text-gray-300 italic">
                "Success in trading isn't about luck or quick riches. It's about discipline, education, proper risk management, and having a mentor who genuinely cares about your success."
              </p>
              <p className="text-purple-300 font-medium mt-3">- Elizabeth Trader</p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img
                  src="image.png"
                  alt="Elizabeth Trader"
                  className="w-full h-96 object-cover rounded-xl mb-6"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Elizabeth Trader</h3>
                  <p className="text-purple-300 font-medium mb-4">Senior Market Analyst & Educator</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">4.9/5 Average Student Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Our Core Values
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide our mission to help you succeed in trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">{value.title}</h4>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
