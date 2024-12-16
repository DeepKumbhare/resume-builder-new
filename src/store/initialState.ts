import { ResumeData } from '../types/resume';

export const DEFAULT_SECTIONS = {
  contact: {
    id: 'contact',
    title: 'Contact',
    type: 'contact',
    enabled: true,
    visible: true,
    order: 0,
    content: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
    },
  },
  summary: {
    id: 'summary',
    title: 'Professional Summary',
    type: 'summary',
    enabled: true,
    visible: true,
    order: 1,
    content: '',
  },
  experience: {
    id: 'experience',
    title: 'Work Experience',
    type: 'experience',
    enabled: true,
    visible: true,
    order: 2,
    content: [],
  },
  education: {
    id: 'education',
    title: 'Education',
    type: 'education',
    enabled: true,
    visible: true,
    order: 3,
    content: [],
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    type: 'skills',
    enabled: true,
    visible: true,
    order: 4,
    content: [],
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications',
    type: 'certifications',
    enabled: false,
    visible: false,
    order: 5,
    content: [],
  },
  languages: {
    id: 'languages',
    title: 'Languages',
    type: 'languages',
    enabled: false,
    visible: false,
    order: 6,
    content: [],
  },
};

export const initialResumeData: ResumeData = {
  sections: DEFAULT_SECTIONS,
  customSections: [],
  layout: 'classic',
  theme: 'modern',
  style: {
    font: 'inter',
    spacing: 1.15,
  },
};