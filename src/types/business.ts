
export interface Business {
  id: string;
  name: string;
  industry: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  location: string;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  logoUrl?: string;
  foundedYear?: number;
  employeeCount?: number;
  annualRevenue?: string;
}

export interface BusinessFormData {
  name: string;
  industry: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  location: string;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  foundedYear?: number;
  employeeCount?: number;
  annualRevenue?: string;
}

export interface BusinessFilter {
  industry?: string;
  size?: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  location?: string;
}
