import { connectDB } from './config/db.js';
import mongoose from 'mongoose';
import Template from './models/Template.js';

export const templates = [
  {
    name: 'Pulse Analytics',
    category: 'Dashboard',
    description: 'Analytics dashboard with KPI cards, charts and activity summaries.',
    thumbnail_url: '/templates/pulse/index.html',
  },
  {
    name: 'AdminPro Dashboard',
    category: 'Dashboard',
    description: 'Admin dashboard layout with navigation, statistics and data tables.',
    thumbnail_url: '/templates/adminpro/index.html',
  },
  {
    name: 'Freelancer Portfolio',
    category: 'Portfolio',
    description: 'Personal portfolio with projects, skills and contact sections.',
    thumbnail_url: '/templates/freelancer/index.html',
  },
  {
    name: 'Creative Folio',
    category: 'Portfolio',
    description: 'Creative portfolio with project galleries and an about section.',
    thumbnail_url: '/templates/creative-folio/index.html',
  },
  {
    name: 'Agency',
    category: 'Business',
    description: 'Business website with services, team and contact sections.',
    thumbnail_url: '/templates/agency/index.html',
  },
  {
    name: 'Startup Launch',
    category: 'Business',
    description: 'Startup landing website with product features and calls to action.',
    thumbnail_url: '/templates/startup-launch/index.html',
  },
  {
    name: 'ShopEase',
    category: 'Ecommerce',
    description: 'Online store layout with product listings and category navigation.',
    thumbnail_url: '/templates/shopease/index.html',
  },
  {
    name: 'Minimal Store',
    category: 'Ecommerce',
    description: 'Minimal ecommerce storefront with product cards and shopping sections.',
    thumbnail_url: '/templates/minimal-store/index.html',
  },
  {
    name: 'SaaS Nova',
    category: 'Landing Page',
    description: 'SaaS landing page with features, pricing and testimonials.',
    thumbnail_url: '/templates/saas-nova/index.html',
  },
  {
    name: 'Product Launch',
    category: 'Landing Page',
    description: 'Product launch page with a hero section and feature highlights.',
    thumbnail_url: '/templates/product-launch/index.html',
  },
];

export async function seedTemplates() {
  await Template.deleteMany({});
  await Template.insertMany(templates);
  console.log(`Seeded ${templates.length} templates`);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replaceAll('\\\\', '/')}`).href) {
  connectDB()
    .then(seedTemplates)
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}