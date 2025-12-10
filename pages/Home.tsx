import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../components/PageLayout';
import { db } from '../services/data-store';
import { Project, Client } from '../interfaces';
import { Home as HomeIcon, PenTool, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
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
            src="https://images.unsplash.com/photo-1600596542815-2a4d9fddace7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern Building" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Elevate Your<br />
              <span className="text-brand-orange">Lifestyle</span><br />
              With Zenith.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We connect you with the most exclusive properties and architectural masterpieces. Your dream home awaits.
            </p>
            <div className="bg-brand-blue p-6 rounded-xl shadow-xl max-w-sm text-white border-l-4 border-brand-orange">
              <h3 className="text-xl font-bold mb-4">Get a Free Consultation</h3>
              <form className="space-y-3" onSubmit={handleContactSubmit}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange transition"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Enter Email Address" 
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange transition"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange transition"
                  value={formData.mobile}
                  onChange={e => setFormData({...formData, mobile: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Area, City" 
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange transition"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  required
                />
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-orange hover:bg-fuchsia-600 text-white font-bold py-3 rounded transition shadow-lg mt-2"
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
          <h2 className="text-brand-orange font-semibold tracking-wide uppercase mb-2">Service Excellence</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-16">The Zenith Advantage</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-fuchsia-50 rounded-full flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition duration-300">
                <HomeIcon size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-brand-blue">Premium Properties</h4>
              <p className="text-gray-500 max-w-xs">Access to an exclusive portfolio of high-end properties before they hit the market.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-fuchsia-50 rounded-full flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition duration-300">
                <PenTool size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-brand-blue">Visionary Design</h4>
              <p className="text-gray-500 max-w-xs">Collaborations with top architects to transform your property into a masterpiece.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-fuchsia-50 rounded-full flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition duration-300">
                <TrendingUp size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-brand-blue">Market Insight</h4>
              <p className="text-gray-500 max-w-xs">Deep data analytics to ensure your real estate investments grow over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US IMAGE GRID */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
           <h3 className="text-3xl font-bold text-brand-blue mb-4">About ZenithHomes</h3>
           <p className="text-gray-600">With over two decades of defining luxury living, we pride ourselves on integrity, transparency, and results. We don't just sell houses; we curate lifestyles.</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
             <div className="relative p-2 bg-white shadow-2xl rounded-xl transform rotate-1 hover:rotate-0 transition duration-500">
                 <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Team" className="w-[800px] h-[450px] object-cover rounded-lg" />
             </div>
        </div>
      </section>

      {/* OUR PROJECTS */}
      <section className="py-20 bg-white" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900">Featured Collections</h3>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Explore our handpicked selection of premium properties tailored for the discerning buyer.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 m-3 rounded-full">
                    EXCLUSIVE
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h4>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <button className="text-brand-orange text-xs font-bold uppercase tracking-wider hover:text-brand-blue transition flex items-center gap-1">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No projects available. Please visit the Admin Panel.
            </div>
          )}
        </div>
      </section>

      {/* HAPPY CLIENTS */}
      <section className="py-20 bg-brand-light" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-brand-blue">Client Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div key={client.id} className="bg-white p-8 rounded-xl shadow-lg text-center relative mt-8 hover:-translate-y-2 transition duration-300">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                   <img 
                    src={client.imageUrl} 
                    alt={client.name} 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                   />
                </div>
                <div className="mt-8">
                  <div className="flex justify-center mb-4 text-brand-orange">
                     ★★★★★
                  </div>
                  <p className="text-gray-600 text-sm italic mb-6">"{client.description}"</p>
                  <h4 className="text-gray-900 font-bold">{client.name}</h4>
                  <p className="text-brand-orange text-xs font-semibold uppercase">{client.designation}</p>
                </div>
              </div>
            ))}
          </div>
          {clients.length === 0 && (
             <div className="text-center text-gray-400 py-10">
               No testimonials yet.
             </div>
          )}
        </div>
      </section>

      {/* CONTACT & NEWSLETTER */}
      <section className="py-20 bg-white" id="contact">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="w-full h-96 object-cover brightness-50" alt="Footer bg"/>
               <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-brand-blue/40">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to find your sanctuary?</h3>
                  <button className="bg-brand-orange text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-brand-orange transition duration-300 shadow-lg border-2 border-transparent hover:border-brand-orange">
                    Contact Us Today
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Newsletter Bar */}
      <section className="bg-brand-blue py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex space-x-6 text-gray-300 text-sm font-medium">
               <a href="#" className="hover:text-white transition">Home</a>
               <a href="#services" className="hover:text-white transition">Services</a>
               <a href="#projects" className="hover:text-white transition">Projects</a>
               <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
                <input 
                  type="email" 
                  placeholder="Join our newsletter" 
                  className="px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm w-48 md:w-64"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bg-brand-orange text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-fuchsia-600 transition">
                  {subStatus === 'success' ? '✓' : 'Subscribe'}
                </button>
            </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;