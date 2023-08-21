type UnprocessableContentError = {
    message: string;
    errors: {
        [key: string]: string[];
    };
}

export class ValidationError extends Error
{
    public name = 'ValidationError';
    public fieldErrors: Record<string, string[]>;

    constructor(error: UnprocessableContentError)
    {
        super(error.message);
        this.fieldErrors = error.errors;
    }
}