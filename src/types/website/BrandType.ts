interface BrandImage {
    id: number;
    name: string;
    meddiable_type: string;
}

interface Brand {
    id: number;
    brandName: string;
    status: string;
    image: BrandImage | null;
}

export type { Brand };
