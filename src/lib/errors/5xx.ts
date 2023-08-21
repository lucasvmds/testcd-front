export class ServerError extends Error
{
    public name = 'ServerError';
    constructor(status: number)
    {
        super(`Houve um erro interno do sistema <b>[${status}]</b>`);
    }
}