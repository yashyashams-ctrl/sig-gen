export type TemplateId = 
  | 'corporate'
  | 'executive'
  | 'modern-split'
  | 'creative-card'
  | 'compact-line'
  | 'banner-showcase';

export type AvatarShape = 'circle' | 'rounded' | 'square';
export type FontSizeScale = 'compact' | 'normal' | 'large';
export type IconStyle = 'colored' | 'brand' | 'dark';

export interface SignatureData {
  personal: {
    fullName: string;
    jobTitle: string;
    department: string;
    pronouns: string;
  };
  company: {
    companyName: string;
    tagline: string;
    website: string;
    address: string;
    office: string;
  };
  contact: {
    email: string;
    phoneWork: string;
    phoneMobile: string;
  };
  images: {
    avatarUrl: string;
    avatarShape: AvatarShape;
    avatarSize: number; // e.g. 70 - 110 px
    logoUrl: string;
    logoWidth: number; // e.g. 100 - 180 px
    bannerUrl: string;
    bannerLink: string;
    bannerWidth: number; // e.g. 300 - 450 px
  };
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
    calendly: string;
  };
  cta: {
    showCta: boolean;
    buttonText: string;
    buttonUrl: string;
    bgColor: string;
    textColor: string;
  };
  disclaimer: {
    showDisclaimer: boolean;
    text: string;
    showGreenEco: boolean;
  };
  style: {
    templateId: TemplateId;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    mutedColor: string;
    fontFamily: string;
    fontSizeScale: FontSizeScale;
    iconStyle: IconStyle;
  };
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  badge: string;
  bestFor: string;
}
