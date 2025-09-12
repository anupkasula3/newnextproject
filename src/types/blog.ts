
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  coverImage: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

// For generating additional blog posts
export interface BlogTemplate {
  titles: string[];
  excerpts: string[];
  contentBlocks: string[];
  categories: string[];
  tags: string[][];
  authors: {
    name: string;
    title: string;
    avatar: string;
  }[];
  readingTimes: string[];
}
