import type { User } from "./user";

export type AuthResponse = {
    access_token: string;
    user: User;
}

export type AuthData = {
    email: string;
    password: string;
    remember: boolean;
}