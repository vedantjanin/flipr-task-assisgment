import { Project, Client, ContactSubmission, Subscriber } from '../types';

/**
 * NOTE: In a real production environment with the provided MongoDB URI,
 * this file would be replaced by API calls (axios/fetch) to your Node.js/Express backend.
 * 
 * Since this is a frontend-only environment, we are using LocalStorage to simulate
 * the MongoDB Atlas behavior so you can test the "Admin" -> "Landing Page" data flow instantly.
 */

const STORAGE_KEYS = {
  PROJECTS: 'pixel_projects',
  CLIENTS: 'pixel_clients',
  CONTACTS: 'pixel_contacts',
  SUBS: 'pixel_subs'
};

// Initial Seed Data (Simulating existing DB data)
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Consultation',
    description: 'Expert real estate consultation for modern homes.',
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    name: 'Modern Design',
    description: 'Architecture planning and interior design services.',
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    name: 'Marketing & Sales',
    description: 'Strategic marketing to sell your property faster.',
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    name: 'Estate Planning',
    description: 'Comprehensive estate planning and management.',
    imageUrl: 'https://picsum.photos/400/300?random=4'
  }
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Rowhan Smith',
    designation: 'CEO, Foreclosure',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    imageUrl: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '2',
    name: 'Shipra Kayak',
    designation: 'Brand Designer',
    description: 'Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    imageUrl: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: '3',
    name: 'John Lepore',
    designation: 'CEO, Foreclosure',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://picsum.photos/100/100?random=12'
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