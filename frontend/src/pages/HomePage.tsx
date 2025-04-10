import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20 rounded-lg mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Laundry Service in Split
              </h1>
              <p className="text-xl mb-8">
                We offer premium laundry and dry cleaning services with free pickup and delivery.
                Save time and enjoy freshly cleaned clothes with Split Laundry Express.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/services" 
                  className="bg-white text-primary-600 font-bold px-6 py-3 rounded-lg hover:bg-primary-100 transition-colors text-center"
                >
                  Our Services
                </Link>
                <Link 
                  to="/register" 
                  className="bg-transparent border-2 border-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-1 rounded-lg">
                {/* Placeholder for laundry image */}
                <div className="bg-gray-300 h-64 md:h-80 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">Laundry Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Split Laundry Express</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Turnaround</h3>
              <p className="text-gray-600">
                Get your laundry back within 24 hours with our express service. We know time is valuable.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Free Pickup & Delivery</h3>
              <p className="text-gray-600">
                We'll come to your doorstep for both pickup and delivery, saving you trips to the laundromat.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Eco-Friendly Options</h3>
              <p className="text-gray-600">
                Choose our eco-friendly cleaning methods to help protect the environment while getting pristine results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Book Online</h3>
              <p className="text-gray-600">
                Schedule a pickup using our website or mobile app.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Collect</h3>
              <p className="text-gray-600">
                Our driver picks up your laundry at your doorstep.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Clean</h3>
              <p className="text-gray-600">
                Your items are cleaned according to your specifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Deliver</h3>
              <p className="text-gray-600">
                Clean, fresh clothes are delivered back to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <div className="container mx-auto px-4">
          <div className="bg-primary-100 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-primary-800">Ready to try our service?</h3>
              <p className="text-primary-700">
                Sign up today and get 20% off your first order!
              </p>
            </div>
            <Link 
              to="/register"
              className="bg-primary-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 