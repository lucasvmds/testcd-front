type UserRole = 'admin' | 'seller';

export type User = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
}

export type UserData = {
    name: string;
    email: string;
    role: UserRole | '';
    password: string;
    password_confirmation: string;
}