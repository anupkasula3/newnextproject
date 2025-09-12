
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  rating: number;
  downloads: string | number;
  badge: 'Popular' | 'New' | 'Premium' | 'Bestseller';
  fileUrl?: string;
  imageUrl?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  author?: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  resourceCount: number;
  icon: 'book' | 'file' | 'video' | 'audio';
  featured?: boolean;
}

export interface ResourceFormData {
  id?: string;
  title: string;
  description: string;
  type: string;
  category: string;
  badge: 'Popular' | 'New' | 'Premium' | 'Bestseller';
  file?: File | null;
  previewImage?: File | null;
}
