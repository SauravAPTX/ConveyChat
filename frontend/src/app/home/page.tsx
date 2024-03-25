import React from 'react';
import { LampSectionHeader } from '../../components/LampSectionHeader';
import { ContainerScrollAnimation } from '@/components/ContainerScrollAnimation';
import { AnimatedTabs } from '@/components/AnimatedTabs';
import { SignupForm } from '@/components/SignUpForm';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        {/* Header content */}
      </header>

      <LampSectionHeader />
      
      <AnimatedTabs/>

      <ContainerScrollAnimation />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section content */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">What We Do</h3>
              <ul className="text-sm">
                <li>Features</li>
                <li>Blog</li>
                <li>Security</li>
                <li>For Business</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Who We Are</h3>
              <ul className="text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Brand Center</li>
                <li>Privacy</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <ul className="text-sm">
                <li>Contact Us</li>
                <li>Help Center</li>
                <li>Download</li>
                <li>Security Advisories</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-sm text-center">&copy; 2024 Convey. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
