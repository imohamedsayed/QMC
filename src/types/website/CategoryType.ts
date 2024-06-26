import type { Product } from '@/types/website/WishlistType';

interface Category {
    id: number;
    name: number;
    slug: number;
    cover: string;
    status: string;
    parentId?: number | null;
    Products?: Product[];
    created_at: string;
}



export type { Category };
