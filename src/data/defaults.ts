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
  {
    id: 'banner-showcase',
    name: 'Promotional Banner',
    description: 'Includes a prominent clickable graphic banner underneath for webinars, product announcements, or awards.',
    badge: 'Marketing Boost',
    bestFor: 'Product launches, Events & Promos',
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
  { name: 'Executive Blue', primary: '#0f4c81', secondary: '#2563eb' },
  { name: 'Modern Indigo', primary: '#4f46e5', secondary: '#818cf8' },
  { name: 'Emerald Forest', primary: '#059669', secondary: '#10b981' },
  { name: 'Crimson Ruby', primary: '#be123c', secondary: '#e11d48' },
  { name: 'Sleek Slate', primary: '#334155', secondary: '#64748b' },
  { name: 'Violet Royale', primary: '#7c3aed', secondary: '#a855f7' },
  { name: 'Warm Amber', primary: '#d97706', secondary: '#f59e0b' },
  { name: 'Pure Onyx', primary: '#18181b', secondary: '#3f3f46' },
];

export const PRESET_AVATARS = [
  {
    label: 'Professional Female',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Executive Male',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Creative Designer',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Tech Specialist',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  },
];

export const PRESET_LOGOS = [
  {
    label: 'Acme Global Logo',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Tech Innovators Badge',
    url: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=300&auto=format&fit=crop&q=80',
  },
];

export const PRESET_BANNERS = [
  {
    label: 'Book a Strategy Call',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
    link: 'https://calendly.com',
  },
  {
    label: 'New Product Launch',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com/new-product',
  },
];

export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  personal: {
    fullName: 'Alexandra Morgan',
    jobTitle: 'VP of Product Strategy',
    department: 'Enterprise Solutions',
    pronouns: 'she/her',
  },
  company: {
    companyName: 'AcroPulse Technologies',
    tagline: 'Empowering Enterprise Intelligence',
    website: 'https://acropulse.io',
    address: '450 Lexington Ave, Suite 2200, New York, NY 10017',
    office: 'Building B, Floor 4',
  },
  contact: {
    email: 'alexandra.m@acropulse.io',
    phoneWork: '+1 (212) 555-0198',
    phoneMobile: '+1 (917) 555-8423',
  },
  images: {
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    avatarShape: 'circle',
    avatarSize: 85,
    logoUrl: '',
    logoWidth: 120,
    bannerUrl: '',
    bannerLink: 'https://acropulse.io/demo',
    bannerWidth: 380,
  },
  socials: {
    linkedin: 'https://linkedin.com/in/alexandramorgan',
    twitter: 'https://x.com/alexandra_m',
    github: 'https://github.com',
    instagram: '',
    facebook: '',
    youtube: '',
    whatsapp: '+19175558423',
    calendly: 'https://calendly.com/alexandra-acropulse',
  },
  cta: {
    showCta: true,
    buttonText: '📅 Schedule a 15-Min Meeting',
    buttonUrl: 'https://calendly.com/alexandra-acropulse',
    bgColor: '#0f4c81',
    textColor: '#ffffff',
  },
  disclaimer: {
    showDisclaimer: false,
    text: 'CONFIDENTIALITY NOTICE: This e-mail transmission and any documents, files, or previous e-mail messages attached to it may contain confidential information that is legally privileged.',
    showGreenEco: true,
  },
  style: {
    templateId: 'corporate',
    primaryColor: '#0f4c81',
    secondaryColor: '#2563eb',
    textColor: '#1e293b',
    mutedColor: '#64748b',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSizeScale: 'normal',
    iconStyle: 'colored',
  },
};
