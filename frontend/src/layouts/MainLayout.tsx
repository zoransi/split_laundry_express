import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Split Laundry Express</Link>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-primary-200">Home</Link>
            <Link to="/services" className="hover:text-primary-200">Services</Link>
            <Link to="/login" className="hover:text-primary-200">Login</Link>
            <Link to="/register" className="hover:text-primary-200">Register</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Split Laundry Express</h3>
              <p className="mb-4">
                Professional laundry service in Split, Croatia. We offer pickup and delivery services.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-primary-300">Home</Link></li>
                <li><Link to="/services" className="hover:text-primary-300">Services</Link></li>
                <li><Link to="/login" className="hover:text-primary-300">Login</Link></li>
                <li><Link to="/register" className="hover:text-primary-300">Register</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2">Address: Ul. Kralja Zvonimira 14, Split</p>
              <p className="mb-2">Phone: +385 21 123 456</p>
              <p className="mb-2">Email: info@splitlaundry.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Split Laundry Express. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 