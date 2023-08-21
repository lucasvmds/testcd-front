export class ClientError extends Error
{
    public name = 'ClientError';
    constructor(status: number)
    {
        super(`Houve um erro na sua requisição <b>[${status}]</b>`);
    }
}