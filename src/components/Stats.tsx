
import { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, Clock } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ users: 0, successRate: 0, uptime: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const targetCounts = {
    users: 3300,
    successRate: 94,
    uptime: 99.9
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounts({
        users: Math.floor(targetCounts.users * easeOutQuart),
        successRate: Math.floor(targetCounts.successRate * easeOutQuart),
        uptime: Math.floor(targetCounts.uptime * easeOutQuart * 10) / 10
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      value: counts.users.toLocaleString() + '+',
      label: 'Active Traders',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      value: counts.successRate + '%',
      label: 'Success Rate',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Clock,
      value: counts.uptime + '%',
      label: 'Platform Uptime',
      color: 'from-blue-600 to-indigo-500'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our platform delivers consistent results and maintains the highest standards in the trading industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
