import type { User } from './UserType';

type OrderStatus = 'NEW ORDER' | 'PROCESSING' | 'SHIPPING' | 'CANCELED' | 'FINISHED' | 'REFUND' | 'EXPIRED_DATE_SHIPPING';
type PaymentType = 'PAYMENT' | 'SHIPPING STATION' | 'CASH';

type Gov = {
    id: Number;
    gov_en: String;
    gov_ar: String;
};
type City = {
    id: Number;
    city_en: String;
    city_ar: String;
};
type Location = {
    StreetAddress: string;
    extraInfoAddress?: string;
    governorate: Gov;
    city: City;
};

interface Media {
    id: number;
    name: string;
    meddiable_type: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    status: 'Enable' | 'Disable';
    priceCategory: 'low' | 'medium' | 'high';
    categoryId: number;
    created_at: string;
    specification_id: number;
    mediaFirst: Media;
    ImagePath: string;
}
interface Bundle {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: 'Enable' | 'Disable';
    color: string;
    Operating_system: string;
    Weight_in_gram: number;
    uses_for: 'Gaming' | 'Business';
    created_at: string;
}

interface OrderProduct {
    id: number;
    quantity: number;
    total: number;
    product: Product;
}

interface Payment {
    id: number;
    payment_id: string;
    status: string;
}

interface Transaction {
    OrderId: number;
    status: OrderStatus;
    created_at: string;
}
interface Order {
    orderId: number;
    phoneNumber: string;
    total: number;
    address: string;
    type: PaymentType;
    Status: OrderStatus;
    created_at: string;
    user: User;
    products: OrderProduct[];
    Bundle: Bundle | null;
    Location: Location | null;
    Payment: Payment | null;
    Transactions: Transaction[];
}

export type { Order };
