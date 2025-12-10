export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  imageUrl: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  timestamp: string;
}

export interface Subscriber {
  id: string;
  email: string;
  timestamp: string;
}

export enum TabView {
  PROJECTS = 'PROJECTS',
  CLIENTS = 'CLIENTS',
  CONTACTS = 'CONTACTS',
  SUBSCRIBERS = 'SUBSCRIBERS'
}