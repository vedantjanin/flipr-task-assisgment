import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../components/Layout';
import { Project, Client } from '../types';
import { db } from '../services/dataService';
import { ArrowRight, Home, PenTool, TrendingUp, Quote } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [email, setEmail] = useState('');
  
  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [subStatus, setSubStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    // Fetch data from "Backend" (Service)
    setProjects(db.getProjects());
    setClients(db.getClients());
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API delay
    setTimeout(() => {
      db.addContact(formData);
      setFormStatus('success');
      setFormData({ fullName: '', email: '', mobile: '', city: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    db.addSubscriber(email);
    setSubStatus('success');
    setEmail('');
    setTimeout(() => setSubStatus('idle'), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-brand-light h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern Building" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Consultation,<br />
              <span className="text-brand-blue">Design,</span><br />
              & Marketing
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Expert solutions for your real estate needs. We help you build, design, and sell with confidence.
            </p>
            <div className="bg-brand-blue p-6 rounded-xl shadow-xl max-w-sm text-white">
              <h3 className="text-xl font-bold mb-4">Get a Free Consultation</h3>
              <form className="space-y-3" onSubmit={handleContactSubmit}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:border-brand-orange"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Enter Email Address" 
                  className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:border-brand-orange"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:border-brand-orange"
                  value={formData.mobile}
                  onChange={e => setFormData({...formData, mobile: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Area, City" 
                  className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:border-brand-orange"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  required
                />
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded transition shadow-lg mt-2"
                >
                  {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : 'Get Quick Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-brand-blue font-semibold tracking-wide uppercase mb-2">Not Your Average Realtor</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-16">Why Choose Us?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-brand-blue">
                <Home size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-brand-blue">Potential ROI</h4>
              <p className="text-gray-500 max-w-xs">Maximize your investment with our data-driven market analysis and strategic planning.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-brand-blue">
                <PenTool size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-brand-blue">Design</h4>
              <p className="text-gray-500 max-w-xs">Award-winning architectural designs that blend functionality with modern aesthetics.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-brand-blue">
                <TrendingUp size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-brand-blue">Marketing</h4>
              <p className="text-gray-500 max-w-xs">Comprehensive digital and traditional marketing campaigns to reach the right buyers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US IMAGE GRID */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
           <h3 className="text-3xl font-bold text-brand-blue mb-4">About Us</h3>
           <p className="text-gray-600">Fifteen years of experience in real estate, excellent customer service and a commitment to work hard, listen and follow through.</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
             <div className="relative p-4 bg-white shadow-xl rounded-lg transform -rotate-1">
                 <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team" className="w-[800px] h-[400px] object-cover rounded" />
             </div>
        </div>
      </section>

      {/* OUR PROJECTS */}
      <section className="py-20 bg-white" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900">Our Projects</h3>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 m-2 rounded">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-brand-blue mb-2">{project.name}</h4>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <button className="bg-brand-orange text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-orange-600 transition cursor-not-allowed opacity-80" disabled>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No projects added yet. Visit Admin Panel to add projects.
            </div>
          )}
        </div>
      </section>

      {/* HAPPY CLIENTS */}
      <section className="py-20 bg-blue-50" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-brand-blue">Happy Clients</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div key={client.id} className="bg-white p-8 rounded-xl shadow-lg text-center relative mt-8">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                   <img 
                    src={client.imageUrl} 
                    alt={client.name} 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                   />
                </div>
                <div className="mt-8">
                  <p className="text-gray-500 text-sm italic mb-6">"{client.description}"</p>
                  <h4 className="text-brand-blue font-bold">{client.name}</h4>
                  <p className="text-brand-orange text-xs font-semibold uppercase">{client.designation}</p>
                </div>
              </div>
            ))}
          </div>
          {clients.length === 0 && (
             <div className="text-center text-gray-400 py-10">
               No clients added yet.
             </div>
          )}
        </div>
      </section>

      {/* CONTACT & NEWSLETTER */}
      <section className="py-20 bg-white" id="contact">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="w-full h-96 object-cover brightness-50" alt="Footer bg"/>
               <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                  <h3 className="text-3xl font-bold text-white mb-4">Learn more about our listing process, as well as our<br/>additional staging and design work.</h3>
                  <button className="bg-white text-brand-blue font-bold px-8 py-3 rounded hover:bg-gray-100 transition">Contact Us</button>
               </div>
            </div>
         </div>
      </section>

      {/* Newsletter Bar */}
      <section className="bg-brand-blue py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex space-x-6 text-white text-sm font-medium mb-4 md:mb-0">
               <a href="#">Home</a>
               <a href="#">Services</a>
               <a href="#">Projects</a>
               <a href="#">Testimonials</a>
               <a href="#">Contact</a>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
                <span className="text-white text-sm font-medium mr-2 hidden md:block">Subscribe Us</span>
                <input 
                  type="email" 
                  placeholder="Enter Email Address" 
                  className="px-4 py-2 rounded bg-blue-800 text-white placeholder-blue-300 border border-blue-600 focus:outline-none focus:border-white text-sm w-64"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bg-white text-brand-blue px-4 py-2 rounded text-sm font-bold hover:bg-gray-100 transition">
                  {subStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
                </button>
            </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;