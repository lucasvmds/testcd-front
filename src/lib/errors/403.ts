import type { User } from "$lib/types/user";

export class AuthorizationError extends Error
{
    public name: string = 'AuthorizationError';
    
    constructor(public group: string | null)
    {
        super(`The token does not have the required permissions`);
    }
}