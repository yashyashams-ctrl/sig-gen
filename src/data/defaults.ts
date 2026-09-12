import type { SignatureData, TemplateDefinition } from '../types/signature';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'corporate',
    name: 'Corporate Minimalist',
    description: 'Crisp vertical accent line, balanced photo & structured contact block. The gold standard for business emails.',
    badge: 'Most Popular',
    bestFor: 'Corporate, B2B, Legal & Finance',
  },
  {
    id: 'executive',
    name: 'Executive Editorial',
    description: 'Sophisticated typography with an elegant top accent bar and prominent company credentials.',
    badge: 'Executive',
    bestFor: 'CEOs, Consultants & Directors',
  },
  {
    id: 'modern-split',
    name: 'Dual-Column Grid',
    description: 'Distinct brand badge on the left, clear contact matrix on the right. Perfect for dual branding.',
    badge: 'Clean Grid',
    bestFor: 'Agencies, Sales & Client Services',
  },
  {
    id: 'creative-card',
    name: 'Creative & CTA Pill',
    description: 'Vibrant accents, rounded profile photo, and an eye-catching call-to-action button.',
    badge: 'High Conversion',
    bestFor: 'Marketers, Designers & Founders',
  },
  {
    id: 'compact-line',
    name: 'Compact Minimal',
    description: 'Space-saving horizontal hierarchy designed to never clutter long reply threads or small mobile viewports.',
    badge: 'Mobile Optimized',
    bestFor: 'High-volume senders & Tech Support',
  },
];

export const FONT_OPTIONS = [
  { name: 'Arial (Universal Sans)', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Calibri (Outlook Standard)', value: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif' },
  { name: 'Trebuchet MS (Modern)', value: '\'Trebuchet MS\', \'Lucida Grande\', \'Lucida Sans Unicode\', sans-serif' },
  { name: 'Verdana (High Readability)', value: 'Verdana, Geneva, sans-serif' },
  { name: 'Georgia (Executive Serif)', value: 'Georgia, Times, \'Times New Roman\', serif' },
  { name: 'Tahoma (Crisp & Compact)', value: 'Tahoma, Verdana, Segoe, sans-serif' },
  { name: 'Lucida Sans (Clean)', value: '\'Lucida Sans\', \'Lucida Grande\', sans-serif' },
  { name: 'Times New Roman (Classic)', value: '\'Times New Roman\', Times, Baskerville, Georgia, serif' },
];

export const COLOR_PRESETS = [
  { name: 'Sky Blue (Default)', primary: '#0061A4', secondary: '#535F70' },
  { name: 'Executive Blue', primary: '#0f4c81', secondary: '#2563eb' },
  { name: 'Modern Indigo', primary: '#4f46e5', secondary: '#818cf8' },
  { name: 'Emerald Forest', primary: '#059669', secondary: '#10b981' },
  { name: 'Crimson Ruby', primary: '#be123c', secondary: '#e11d48' },
  { name: 'Sleek Slate', primary: '#334155', secondary: '#64748b' },
  { name: 'Violet Royale', primary: '#7c3aed', secondary: '#a855f7' },
  { name: 'Pure Onyx', primary: '#18181b', secondary: '#3f3f46' },
];

export const PRESET_AVATARS = [
  {
    label: 'Default Profile Avatar',
    url: '/avatar.svg',
  },
  {
    label: 'Professional Female',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Executive Male',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
  },
];

export const PRESET_LOGOS = [
  {
    label: 'FAXOLIF Industries',
    url: '/logo.svg',
  },
];

export const PRESET_BANNERS: { label: string; url: string; link: string }[] = [];

export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  personal: {
    fullName: 'John Doe',
    jobTitle: 'Product Manager',
    department: 'Operations',
    pronouns: 'he/him',
  },
  company: {
    companyName: 'FAXOLIF Industries',
    tagline: 'Leading Industrial Solutions',
    website: 'https://faxolif.com',
    address: '100 Industrial Parkway, Suite 400',
    office: 'Building A',
  },
  contact: {
    email: 'john.doe@faxolif.com',
    phoneWork: '+1 (555) 123-4567',
    phoneMobile: '+1 (555) 987-6543',
  },
  images: {
    avatarUrl: '/avatar.svg',
    avatarShape: 'circle',
    avatarSize: 85,
    logoUrl: '/logo.svg',
    logoWidth: 140,
    bannerUrl: '',
    bannerLink: '',
    bannerWidth: 380,
  },
  socials: {
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://x.com/johndoe',
    github: 'https://github.com/johndoe',
    instagram: '',
    facebook: '',
    youtube: '',
    whatsapp: '+15559876543',
    calendly: 'https://calendly.com/johndoe',
  },
  cta: {
    showCta: true,
    buttonText: '📅 Schedule a Meeting',
    buttonUrl: 'https://calendly.com/johndoe',
    bgColor: '#0061A4',
    textColor: '#ffffff',
  },
  disclaimer: {
    showDisclaimer: false,
    text: 'CONFIDENTIALITY NOTICE: This e-mail transmission and any documents attached to it may contain confidential information that is legally privileged.',
    showGreenEco: false, // Default green eco message disabled per user request
  },
  style: {
    templateId: 'corporate',
    primaryColor: '#0061A4',
    secondaryColor: '#535F70',
    textColor: '#191C1E',
    mutedColor: '#73777F',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSizeScale: 'normal',
    iconStyle: 'colored',
  },
};
