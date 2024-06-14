import { CardEffect } from '@/components/CardEffect';
import { SignupForm } from '@/components/SignUpForm';
import Link from 'next/link';
import React from 'react';


const cardData = [
  {
    title: "End-to-End Encryption",
    description: "Your messages are encrypted from end-to-end, ensuring only you and the recipient can read them.",
    imageUrl: "/img/End.jpg",
  },
  {
    title: "Rich Media Sharing",
    description: "Share photos, videos, and documents with ease, making your conversations more engaging.",
    imageUrl: "/img/Share.jpg",
  },
  {
    title: "Voice Messaging",
    description: "Send voice messages to your contacts for a more personal touch.",
    imageUrl: "/img/Voice.jpg",
  },
  {
    title: "Group Chats",
    description: "Create group chats to stay connected with multiple friends or colleagues at once.",
    imageUrl: "/img/Group.jpg",
  },
  {
    title: "Advanced Search Functionality",
    description: "Easily find what you're looking for with our powerful search capabilities, making navigation a breeze.",
    imageUrl: "/img/Search.jpg",
  },
  {
    title: "Streamlined User Interface",
    description: "Enjoy a more intuitive and efficient user experience with our redesigned interface, enhancing productivity and ease of use.",
    imageUrl: "/img/Secure.jpg",
  },
];



const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-purple-600 text-white h-screen">
        <div className="py-10 max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Secure Connections, Confident Conversations</h2>
              <p className="text-lg mb-6">Convey ensures your conversations are always private and secure.</p>
             <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg focus:outline-none focus:shadow-outline hover:bg-purple-400 hover:text-white">
        <Link href="/#join">Get Started</Link>
      </button>
            </div>
            <div className="md:w-1/3 relative">
    <img src="/img/Secure.jpg" alt="Secure Connections" className="w-full h-auto" />
</div>

          </div>
        </div>
      </section>


      
      <section>
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-semibold mb-4 text-purple-600">Features</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 justify-center items-center">
    {cardData.map((card, index) => (
      <CardEffect
        key={index}
        title={card.title}
        description={card.description}
        imageUrl={card.imageUrl}
      />
    ))}
  </div>
</section>


  
      {/* CTA Section */}
      <section id='join' className="bg-purple-600 py-16 text-center text-white h-screen">
  <div className="max-w-6xl mx-auto px-4">  
    <div className="lg:flex lg:items-center lg:justify-between">
      <div>
      <h2 className="text-3xl font-semibold mb-4 lg:w-1/2 lg:text-left">Ready to get started?</h2>
      <p className="text-lg mb-8 lg:w-1/2 lg:text-left lg:pl-8">Join Convey today and experience secure and confident conversations!</p>
      </div>
      <div className="lg:w-1/2 lg:flex lg:justify-end">
        <div className="lg:pl-8">
          <SignupForm/>
        </div>
      </div>
    </div>
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
