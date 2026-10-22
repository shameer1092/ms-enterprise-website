export type UserRole = 'owner' | 'editor';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  accentColor: string; // e.g. '#0284C7', '#1D4ED8', '#0D9488', '#334155'
  glassIntensity: 'subtle' | 'default' | 'strong';
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  logoText: string;
  logoUrl?: string;
  faviconUrl?: string;
  floatingWhatsappEnabled: boolean;
  themeConfig?: ThemeConfig;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    github?: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    ogImage: string;
  };
  smtpConfig?: {
    enabled: boolean;
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    fromEmail: string;
  };
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'web' | 'meta' | 'ecommerce' | 'other';
  badge: string;
  summary: string;
  description: string;
  iconName: string;
  highlights: string[];
  features: {
    title: string;
    description: string;
  }[];
  order: number;
  published: boolean;
  showInNav: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  serviceCategory: string;
  client?: string;
  summary: string;
  description: string;
  liveUrl?: string;
  techStack: string[];
  keyOutcomes: string[];
  imageUrl?: string;
  order: number;
  published: boolean;
  showInNav: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlanItem {
  id: string;
  serviceCategory: 'web' | 'meta' | 'ecommerce' | 'all';
  serviceTitle: string;
  name: string;
  price: string;
  billingPeriod: string; // e.g. "one-time", "per month", "custom quote"
  description: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomPageItem {
  id: string;
  slug: string;
  title: string;
  navLabel: string;
  parentNavId?: string; // empty if top-level, or id of service/project
  summary: string;
  content: string; // markdown or rich content
  sections?: {
    heading: string;
    body: string;
  }[];
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  showInNav: boolean;
  navOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  adminNotes?: string;
  createdAt: string;
  ip?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'web' | 'meta' | 'ecommerce' | 'pricing' | 'support';
  order: number;
  published: boolean;
}

export interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
  isCustom?: boolean;
  children?: {
    id: string;
    label: string;
    href: string;
    order: number;
    visible: boolean;
  }[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface SiteContent {
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    trustPills: string[];
  };
  whyChooseUs: {
    heading: string;
    subheading: string;
    pillars: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  aboutSection: {
    heading: string;
    subheading: string;
    mission: string;
    approach: string;
    honestPromise: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  footer: {
    aboutText: string;
    copyrightText: string;
  };
}

export interface DatabaseSchema {
  settings: SiteSettings;
  content: SiteContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  plans: PlanItem[];
  pages: CustomPageItem[];
  inquiries: InquiryItem[];
  faqs: FaqItem[];
  navigation: NavItemConfig[];
  users: User[];
  auditLogs: AuditLogItem[];
  media: MediaItem[];
}
