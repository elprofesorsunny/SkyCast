import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const About: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 bg-[#f8f9fa]">
      {loading ? (
        <>
          <Skeleton height={40} width={300} className="mb-4" />
          <Skeleton count={3} width={600} className="mb-8" />
          <Skeleton count={2} width={600} />
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">About SkyCast</h1>
          <p className="text-lg text-center mb-8">
            SkyCast is your go-to weather application, providing accurate and up-to-date weather information for cities around the world. Whether you're planning your next trip or just want to know if you need an umbrella today, SkyCast has got you covered.
          </p>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-center">
              Our mission is to provide reliable weather forecasts with a user-friendly interface. Stay informed about the weather conditions and make your plans accordingly with SkyCast.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default About;