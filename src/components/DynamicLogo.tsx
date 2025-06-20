
import { useState, useEffect } from 'react';

const DynamicLogo = ({ className = "w-10 h-10" }) => {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with some random data points
    const initialPoints = Array.from({ length: 20 }, () => Math.random() * 100);
    setDataPoints(initialPoints);

    // Update data points continuously for dynamic effect
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoints = [...prev.slice(1)];
        newPoints.push(Math.random() * 100);
        return newPoints;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Generate SVG path from data points
  const generatePath = (points: number[]) => {
    if (points.length < 2) return '';
    
    const width = 40;
    const height = 40;
    const stepX = width / (points.length - 1);
    
    let path = `M 0 ${height - (points[0] * height / 100)}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = height - (points[i] * height / 100);
      path += ` L ${x} ${y}`;
    }
    
    return path;
  };

  return (
    <div className={`${className} bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center overflow-hidden`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 40 40"
        className="text-white"
      >
        <path
          d={generatePath(dataPoints)}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <path
          d={generatePath(dataPoints.map(p => p * 0.7))}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <path
          d={generatePath(dataPoints.map(p => p * 0.4))}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default DynamicLogo;
