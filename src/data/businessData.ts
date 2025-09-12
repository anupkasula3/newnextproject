
import { Business } from '@/types/business';

export const businesses: Business[] = [
  {
    id: '1',
    name: 'TechNova Solutions',
    industry: 'Technology',
    size: 'Medium',
    location: 'San Francisco, CA',
    description: 'TechNova Solutions is a leading software development company specializing in AI-driven solutions for enterprise clients. We help businesses transform their operations through innovative technology.',
    contactEmail: 'info@technovasolutions.com',
    website: 'technovasolutions.com',
    foundedYear: 2015,
    employeeCount: 120,
    annualRevenue: '$15M-$25M'
  },
  {
    id: '2',
    name: 'GreenLeaf Innovations',
    industry: 'Agriculture',
    size: 'Small',
    location: 'Portland, OR',
    description: 'GreenLeaf Innovations develops sustainable agricultural technologies that help farmers increase yields while reducing environmental impact. Our smart irrigation systems have been deployed across the country.',
    contactEmail: 'contact@greenleafinnovations.com',
    website: 'greenleafinnovations.com',
    foundedYear: 2018,
    employeeCount: 45,
    annualRevenue: '$5M-$10M'
  },
  {
    id: '3',
    name: 'Alpine Healthcare Partners',
    industry: 'Healthcare',
    size: 'Large',
    location: 'Boston, MA',
    description: "Alpine Healthcare Partners operates a network of specialty clinics focused on preventative care and innovative treatments. We're committed to providing accessible, high-quality healthcare to all communities.",
    contactEmail: 'info@alpinehealthcare.com',
    website: 'alpinehealthcare.com',
    foundedYear: 2010,
    employeeCount: 500,
    annualRevenue: '$50M-$100M'
  },
  {
    id: '4',
    name: 'Momentum Financial Group',
    industry: 'Finance',
    size: 'Medium',
    location: 'Chicago, IL',
    description: 'Momentum Financial Group provides wealth management and investment advisory services to individuals and small businesses. Our personalized approach helps clients achieve their financial goals.',
    contactEmail: 'clientservices@momentumfinancial.com',
    website: 'momentumfinancial.com',
    foundedYear: 2008,
    employeeCount: 85,
    annualRevenue: '$20M-$30M'
  },
  {
    id: '5',
    name: 'Cascade Construction',
    industry: 'Construction',
    size: 'Medium',
    location: 'Seattle, WA',
    description: "Cascade Construction specializes in commercial building projects with a focus on sustainability and innovative design. We've completed award-winning structures throughout the Pacific Northwest.",
    contactEmail: 'projects@cascadeconstruction.com',
    website: 'cascadeconstruction.com',
    foundedYear: 2001,
    employeeCount: 150,
    annualRevenue: '$30M-$50M'
  },
  {
    id: '6',
    name: 'Urban Transit Systems',
    industry: 'Transportation',
    size: 'Large',
    location: 'Denver, CO',
    description: 'Urban Transit Systems develops software and infrastructure solutions for public transportation networks. Our smart transit platform is helping cities reduce congestion and improve mobility.',
    contactEmail: 'info@urbantransitsystems.com',
    website: 'urbantransitsystems.com',
    foundedYear: 2012,
    employeeCount: 220,
    annualRevenue: '$40M-$60M'
  },
  {
    id: '7',
    name: 'Sunrise Solar Energy',
    industry: 'Energy',
    size: 'Small',
    location: 'Austin, TX',
    description: 'Sunrise Solar Energy provides residential and commercial solar installation services. We help customers reduce their carbon footprint while saving on energy costs with custom solar solutions.',
    contactEmail: 'sales@sunrisesolar.com',
    website: 'sunrisesolar.com',
    foundedYear: 2016,
    employeeCount: 35,
    annualRevenue: '$3M-$8M'
  },
  {
    id: '8',
    name: 'Pinnacle Learning Academy',
    industry: 'Education',
    size: 'Medium',
    location: 'Atlanta, GA',
    description: 'Pinnacle Learning Academy operates a network of charter schools focused on STEM education. Our innovative curriculum prepares students for success in the digital economy.',
    contactEmail: 'admissions@pinnaclelearning.org',
    website: 'pinnaclelearning.org',
    foundedYear: 2011,
    employeeCount: 180,
    annualRevenue: '$15M-$25M'
  },
  {
    id: '9',
    name: 'Coastal Retail Partners',
    industry: 'Retail',
    size: 'Large',
    location: 'Miami, FL',
    description: 'Coastal Retail Partners manages a portfolio of retail properties and shopping centers across the southeastern United States. We create vibrant retail environments that serve community needs.',
    contactEmail: 'leasing@coastalretail.com',
    website: 'coastalretail.com',
    foundedYear: 2005,
    employeeCount: 320,
    annualRevenue: '$75M-$100M'
  },
  {
    id: '10',
    name: 'Summit Hospitality Group',
    industry: 'Hospitality',
    size: 'Medium',
    location: 'Las Vegas, NV',
    description: 'Summit Hospitality Group operates boutique hotels and luxury resorts. Our properties are known for exceptional service, unique design, and unforgettable guest experiences.',
    contactEmail: 'reservations@summithospitality.com',
    website: 'summithospitality.com',
    foundedYear: 2007,
    employeeCount: 250,
    annualRevenue: '$45M-$70M'
  },
  {
    id: '11',
    name: 'Quantum Mechanics',
    industry: 'Manufacturing',
    size: 'Small',
    location: 'Detroit, MI',
    description: 'Quantum Mechanics specializes in precision manufacturing of components for the aerospace and automotive industries. Our advanced facilities produce parts with exceptional quality and reliability.',
    contactEmail: 'sales@quantummechanics.com',
    website: 'quantummechanics.com',
    foundedYear: 2014,
    employeeCount: 65,
    annualRevenue: '$10M-$15M'
  },
  {
    id: '12',
    name: 'Evergreen Logistics',
    industry: 'Transportation',
    size: 'Medium',
    location: 'Nashville, TN',
    description: 'Evergreen Logistics provides supply chain solutions and freight services to businesses across North America. Our technology-driven approach optimizes shipping routes and reduces costs.',
    contactEmail: 'support@evergreenlogistics.com',
    website: 'evergreenlogistics.com',
    foundedYear: 2009,
    employeeCount: 130,
    annualRevenue: '$25M-$40M'
  }
];

export const getBusinessById = (id: string): Business | undefined => {
  return businesses.find(business => business.id === id);
};

export const filterBusinesses = (filter: {
  industry?: string;
  size?: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  location?: string;
}): Business[] => {
  return businesses.filter(business => {
    if (filter.industry && business.industry !== filter.industry) {
      return false;
    }
    if (filter.size && business.size !== filter.size) {
      return false;
    }
    if (filter.location && !business.location.toLowerCase().includes(filter.location.toLowerCase())) {
      return false;
    }
    return true;
  });
};
