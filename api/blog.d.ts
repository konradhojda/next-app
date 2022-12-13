export interface Post {
    categories: number[];
    excerpt: string;
    id: number;
    imageUrl: string;
    slug: string;
    title: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}