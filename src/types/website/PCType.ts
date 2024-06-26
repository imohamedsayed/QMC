interface Media {
    id: number;
    name: string;
    meddiable_type: string;
}

interface PC {
    id: number;
    name: string;
    status: string;
    type?: string;
}

interface PCModel {
    id: number;
    name: string;
    description?: string | null;
    price: number;
    quantity: number;
    status: string;
    color: string;
    Operating_system: string;
    Weight_in_gram: number;
    uses_for: string;
    media: Media[];
}





export type { PC, PCModel };
