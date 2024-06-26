type media = {
    id: number;
    name: string;
    meddiable_type: string;
};
type Sale = {
    id: string;
    expire_date: string | null;
    until_finish: string;
    discount: number;
    status: string;
};

interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    price: number;
    quantity: number;
    status: string;

    priceCategory: string;
    categoryId: number;
    created_at: string;
    specification_id: number;
    sale: null | Sale;
    mediaFirst: media | null;
    ImagePath: string;
    qty: number;
}

type Cart = Product[];

export type { Product, Cart };
