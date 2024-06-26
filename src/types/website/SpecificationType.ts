type MediaFirst = {
    id: number;
    name: string;
    meddiable_type: string;
};

interface Product {
    id: number;
    name: string;
    slug: string;
    description?: null | string;
    price: number;
    quantity: number;
    status: string;
    priceCategory: 'low' | 'medium' | 'high';
    categoryId: number;
    created_at: string;
    specification_id: number;
    sale: null | string;
    mediaFirst: MediaFirst | null;
}

interface Specification {
    id: number;
    status: string;
    SpecificationName: string;
    product: Product[];
    selectedProduct?: number;
    price?: number;
    quantity?: number ;
}

export type { Product, Specification };
