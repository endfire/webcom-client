import React from 'react';
import Navbar from './components/Navbar';

const Brand = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

export default Brand;
