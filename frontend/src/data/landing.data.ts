import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  LayoutDashboard,
  Lock,
  RefreshCw,
  Shield,
  Smartphone,
} from 'lucide-react';

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: string;
  colorClass: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  initials: string;
  accentClass: string;
}

export const features: FeatureItem[] = [
  {
    icon: BookOpen,
    title: 'Book Management',
    description:
      'Catalog, categorize, and maintain your entire library collection in one organized workspace.',
  },
  {
    icon: Lock,
    title: 'User Authentication',
    description:
      'Secure sign-in flows for librarians and administrators.',
  },
  {
    icon: RefreshCw,
    title: 'Borrowing System',
    description:
      'Coming Soon'
  },
  {
    icon: LayoutDashboard,
    title: 'Real-Time Dashboard',
    description:
      'Monitor library activity at a glance with colorful stat cards and actionable insights.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description:
      'Manage operations seamlessly on desktop, tablet, and mobile from anywhere.',
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description:
      'Built with modern security practices to protect your personal accounts, data, and library operations.',
  },
];

export const landingStats: StatItem[] = [
  { label: 'Total Books', value: '0', colorClass: 'bg-stat-blue' },
  { label: 'Registered Users', value: '0', colorClass: 'bg-stat-indigo' },
  { label: 'Active Authors', value: '0', colorClass: 'bg-stat-purple' },
  { label: 'Recent Books', value: '0', colorClass: 'bg-stat-coral' },
];

export const testimonials: TestimonialItem[] = [
  {
    name: 'Ryan Tsele',
    role: 'Head Librarian, FairView Public Library',
    quote:
      'Our team finally has one place to manage books and members. The dashboard is intuitive and our staff adopted it within days.',
    initials: 'RT',
    accentClass: 'bg-brand-600',
  },
  {
    name: 'Allan Chizanga',
    role: 'IT Administrator, Metro University',
    quote:
      'Clean design, fast workflows, and a structure that scales. It feels like a professional SaaS product built specifically for libraries.',
    initials: 'AC',
    accentClass: 'bg-stat-purple',
  },
  {
    name: 'Craig Tsele',
    role: 'Operations Manager, City Archives',
    quote:
      'Digitizing our library operations reduced manual errors and gave leadership real visibility into usage and inventory trends.',
    initials: 'CT',
    accentClass: 'bg-stat-coral',
  },
];
