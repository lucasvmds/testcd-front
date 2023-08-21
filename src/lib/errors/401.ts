export class UnauthenticatedError extends Error
{
    public name = 'UnauthenticatedError';
    public toPath = '/login';
    
    constructor()
    {
        super('Você precisa se identificar para acessar esse recurso');
    }
}