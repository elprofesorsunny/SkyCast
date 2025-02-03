import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 bg-[#f8f9fa]">
      <h1 className="text-4xl font-bold mb-4">About SkyCast</h1>
      <p className="text-lg text-center mb-8">
        SkyCast is your go-to weather application, providing accurate and up-to-date weather information for cities around the world. Whether you're planning your next trip or just want to know if you need an umbrella today, SkyCast has got you covered.
      </p>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-center">
          Our mission is to provide reliable weather forecasts with a user-friendly interface. Stay informed about the weather conditions and make your plans accordingly with SkyCast.
        </p>
      </div>
    </div>
  );
};

export default About;