import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project, Client, ContactSubmission, Subscriber, TabView } from '../interfaces';
import { db } from '../services/data-store';
import { LayoutDashboard, Users, MessageSquare, Mail, Plus, Trash2, ArrowLeft } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.PROJECTS);
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // Form States
  const [newProject, setNewProject] = useState({ name: '', description: '', imageUrl: '' });
  const [newClient, setNewClient] = useState({ name: '', description: '', designation: '', imageUrl: '' });

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const refreshData = () => {
    setProjects(db.getProjects());
    setClients(db.getClients());
    setContacts(db.getContacts());
    setSubscribers(db.getSubscribers());
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    let projectToAdd = { ...newProject };
    if(!projectToAdd.imageUrl) {
        projectToAdd.imageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
    }
    db.addProject(projectToAdd);
    setNewProject({ name: '', description: '', imageUrl: '' });
    refreshData();
  };

  const handleDeleteProject = (id: string) => {
    if(window.confirm("Delete this project?")) {
      db.deleteProject(id);
      refreshData();
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    let clientToAdd = { ...newClient };
    if(!clientToAdd.imageUrl) {
        clientToAdd.imageUrl = `https://picsum.photos/100/100?random=${Date.now()}`;
    }
    db.addClient(clientToAdd);
    setNewClient({ name: '', description: '', designation: '', imageUrl: '' });
    refreshData();
  };

  const handleDeleteClient = (id: string) => {
    if(window.confirm("Delete this client testimonial?")) {
      db.deleteClient(id);
      refreshData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-blue text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-gray-800">
           <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center font-bold text-white">Z</div>
           <span className="text-xl font-bold">ZenithAdmin</span>
        </div>
        <nav className="mt-6 px-4 space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab(TabView.PROJECTS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TabView.PROJECTS ? 'bg-gray-800 text-brand-orange font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab(TabView.CLIENTS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TabView.CLIENTS ? 'bg-gray-800 text-brand-orange font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Users size={20} /> Clients
          </button>
          <button 
            onClick={() => setActiveTab(TabView.CONTACTS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TabView.CONTACTS ? 'bg-gray-800 text-brand-orange font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <MessageSquare size={20} /> Inquiries
          </button>
          <button 
            onClick={() => setActiveTab(TabView.SUBSCRIBERS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TabView.SUBSCRIBERS ? 'bg-gray-800 text-brand-orange font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Mail size={20} /> Newsletter
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <ArrowLeft size={16} /> Back to Website
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-brand-blue text-white p-4 flex justify-between items-center sticky top-0 z-20">
            <h1 className="font-bold flex items-center gap-2">
                <span className="text-brand-orange">Z</span> ZenithAdmin
            </h1>
            <div className="flex gap-4 text-sm overflow-x-auto">
                <button onClick={() => setActiveTab(TabView.PROJECTS)} className={activeTab === TabView.PROJECTS ? 'text-brand-orange underline' : ''}>Projects</button>
                <button onClick={() => setActiveTab(TabView.CONTACTS)} className={activeTab === TabView.CONTACTS ? 'text-brand-orange underline' : ''}>Inquiries</button>
            </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          <header className="mb-8 flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 capitalize">{activeTab.toLowerCase().replace('_', ' ')} Management</h2>
                <p className="text-gray-500 mt-1">Manage your website content and view user interactions.</p>
            </div>
            <div className="text-sm text-gray-400 hidden md:block">
                DB Mode: <span className="text-brand-orange font-mono">Local/Simulated</span>
            </div>
          </header>

          {/* PROJECT TAB */}
          {activeTab === TabView.PROJECTS && (
            <div className="space-y-8">
              {/* Add Project Form */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-brand-blue">
                    <Plus size={20} /> Add New Project
                </h3>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <input required type="text" className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none transition" 
                            value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input type="text" placeholder="https://..." className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none transition" 
                            value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} />
                        <p className="text-xs text-gray-400 mt-1">Leave empty for random placeholder</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea required className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none transition" rows={3}
                            value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition">
                            Add Project
                        </button>
                    </div>
                </form>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-lg transition">
                        <div className="h-48 overflow-hidden relative group">
                             <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                 <button onClick={() => handleDeleteProject(p.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1">
                                    <Trash2 size={16} /> Delete
                                 </button>
                             </div>
                        </div>
                        <div className="p-4 flex-1">
                            <h4 className="font-bold text-gray-800 text-lg">{p.name}</h4>
                            <p className="text-sm text-gray-500 mt-2">{p.description}</p>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* CLIENTS TAB */}
          {activeTab === TabView.CLIENTS && (
            <div className="space-y-8">
                {/* Add Client Form */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-brand-blue">
                    <Plus size={20} /> Add Happy Client
                </h3>
                <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input required type="text" className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none" 
                            value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <input required type="text" placeholder="e.g. CEO, Designer" className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none" 
                            value={newClient.designation} onChange={e => setNewClient({...newClient, designation: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Image URL</label>
                        <input type="text" className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none" 
                             value={newClient.imageUrl} onChange={e => setNewClient({...newClient, imageUrl: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
                        <textarea required className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:outline-none" rows={2}
                            value={newClient.description} onChange={e => setNewClient({...newClient, description: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition">
                            Add Client
                        </button>
                    </div>
                </form>
              </div>

               {/* Clients List */}
               <div className="bg-white rounded-lg shadow overflow-hidden">
                   <table className="min-w-full divide-y divide-gray-200">
                       <thead className="bg-gray-50">
                           <tr>
                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testimonial</th>
                               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                           </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-gray-200">
                           {clients.map(client => (
                               <tr key={client.id}>
                                   <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="flex items-center">
                                           <div className="flex-shrink-0 h-10 w-10">
                                               <img className="h-10 w-10 rounded-full object-cover" src={client.imageUrl} alt="" />
                                           </div>
                                           <div className="ml-4">
                                               <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                               <div className="text-sm text-gray-500">{client.designation}</div>
                                           </div>
                                       </div>
                                   </td>
                                   <td className="px-6 py-4">
                                       <div className="text-sm text-gray-500 max-w-md truncate">"{client.description}"</div>
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                       <button onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-900 font-bold">Delete</button>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
            </div>
          )}

          {/* CONTACTS TAB */}
          {activeTab === TabView.CONTACTS && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contacts.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No inquiries yet.</td></tr>
                        ) : contacts.map(c => (
                            <tr key={c.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.mobile}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
          )}

          {/* SUBSCRIBERS TAB */}
          {activeTab === TabView.SUBSCRIBERS && (
             <div className="bg-white rounded-lg shadow overflow-hidden max-w-2xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subscribers.length === 0 ? (
                            <tr><td colSpan={2} className="px-6 py-4 text-center text-gray-500">No subscribers yet.</td></tr>
                        ) : subscribers.map(s => (
                            <tr key={s.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Admin;