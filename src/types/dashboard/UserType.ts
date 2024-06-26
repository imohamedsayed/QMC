interface User {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
    Email_verified_at: string;
    created_at: string;
}

export type { User };
