import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa] w-screen h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;