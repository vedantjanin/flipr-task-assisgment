import { Project, Client, ContactSubmission, Subscriber } from '../interfaces';

/**
 * PRODUCTION CONFIGURATION NOTE:
 * 
 * To connect to your MongoDB Atlas instance:
 * MONGO_URI=mongodb+srv://vedantjain:Vedant474@cluster0.pbitmrx.mongodb.net/
 * 
 * In a real-world deployment (Node.js/Express + React):
 * 1. You would create a backend API server.
 * 2. Use Mongoose to connect to the above MONGO_URI.
 * 3. Replace the localStorage logic below with `await fetch('/api/projects')`, etc.
 */

const STORAGE_KEYS = {
  PROJECTS: 'zenith_projects',
  CLIENTS: 'zenith_clients',
  CONTACTS: 'zenith_contacts',
  SUBS: 'zenith_subs'
};

// Initial Seed Data
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Skyline Heights',
    description: 'Luxury apartments with panoramic city views.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    name: 'Eco Villa Series',
    description: 'Sustainable living with modern architectural design.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    name: 'Urban Lofts',
    description: 'Industrial style lofts in the heart of the creative district.',
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '4',
    name: 'Seaside Retreat',
    description: 'Exclusive beachfront properties for the ultimate getaway.',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    designation: 'Tech Entrepreneur',
    description: 'ZenithHomes found me the perfect penthouse workspace. The process was seamless and professional.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    designation: 'Architect',
    description: 'As an architect, I appreciate their eye for detail. They truly understand quality construction.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    designation: 'Investor',
    description: 'The ROI on the properties ZenithHomes suggested has been outstanding. Highly recommended.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];

// Helper to get data
const get = <T>(key: string, initial: T[]): T[] => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

// Helper to set data
const set = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  // Projects
  getProjects: (): Project[] => get(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS),
  addProject: (project: Omit<Project, 'id'>) => {
    const projects = get<Project>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const newProject = { ...project, id: Date.now().toString() };
    set(STORAGE_KEYS.PROJECTS, [newProject, ...projects]);
    return newProject;
  },
  deleteProject: (id: string) => {
    const projects = get<Project>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    set(STORAGE_KEYS.PROJECTS, projects.filter(p => p.id !== id));
  },

  // Clients
  getClients: (): Client[] => get(STORAGE_KEYS.CLIENTS, INITIAL_CLIENTS),
  addClient: (client: Omit<Client, 'id'>) => {
    const clients = get<Client>(STORAGE_KEYS.CLIENTS, INITIAL_CLIENTS);
    const newClient = { ...client, id: Date.now().toString() };
    set(STORAGE_KEYS.CLIENTS, [newClient, ...clients]);
    return newClient;
  },
  deleteClient: (id: string) => {
    const clients = get<Client>(STORAGE_KEYS.CLIENTS, INITIAL_CLIENTS);
    set(STORAGE_KEYS.CLIENTS, clients.filter(c => c.id !== id));
  },

  // Contacts
  getContacts: (): ContactSubmission[] => get(STORAGE_KEYS.CONTACTS, []),
  addContact: (contact: Omit<ContactSubmission, 'id' | 'timestamp'>) => {
    const contacts = get<ContactSubmission>(STORAGE_KEYS.CONTACTS, []);
    const newContact = { 
      ...contact, 
      id: Date.now().toString(), 
      timestamp: new Date().toLocaleString() 
    };
    set(STORAGE_KEYS.CONTACTS, [newContact, ...contacts]);
    return newContact;
  },

  // Subscribers
  getSubscribers: (): Subscriber[] => get(STORAGE_KEYS.SUBS, []),
  addSubscriber: (email: string) => {
    const subs = get<Subscriber>(STORAGE_KEYS.SUBS, []);
    const newSub = { 
      id: Date.now().toString(), 
      email, 
      timestamp: new Date().toLocaleString() 
    };
    set(STORAGE_KEYS.SUBS, [newSub, ...subs]);
    return newSub;
  }
};