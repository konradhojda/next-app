export interface Posts {
    categories: number[];
    excerpt: string;
    id: number;
    imageUrl: string;
    slug: string;
    title: string;
}

export interface Categories {
    id: number;
    name: string;
    slug: "books";
}