interface UserRegister {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    gender: number;
}

interface LoginCredentials {
    email: string;
    password: string;
}

export type { UserRegister, LoginCredentials };
