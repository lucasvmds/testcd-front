import { errors } from "$lib/form/errors";
import { Messages } from "$lib/messages";
import { ServerError, ValidationError, UnauthenticatedError, ClientError, AuthorizationError } from "$lib/errors";
import { goto } from "$app/navigation";
import type { PaginatedResponse } from "$lib/pagination";
import { ENV } from "$lib/env";

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

type Constructor = {
    uri: string;
    method: Method;
    options?: Options;
}

type ResponseType = 'json' | 'blob' | 'text' | 'none' | 'paginate';

type ResourceResponse<ResponseData> = {
    data: ResponseData;
}

type Options = {
    preserveErrors?: boolean;
}

export class Ajax
{
    private url: string;
    private method: Method;
    private headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    };
    private options: Options;

    constructor({ uri, method, options }: Constructor)
    {
        this.url = `${ENV.API_BASE_RUL}${uri}`;
        this.method = method;
        this.options = options ? options : {};
        let token = this.getToken();
        this.setAuthorizationHeader(token, 'Bearer');
        this.initLoadIcon();
    }

    private static createInstance(uri: string, method: Method, options?: Options): Ajax
    {
        return new Ajax({
            uri,
            method,
            options,
        });
    }

    public static get(uri: string, options?: Options): Ajax
    {
        return Ajax.createInstance(uri, 'GET', options);
    }

    public static post(uri: string, options?: Options): Ajax
    {
        return Ajax.createInstance(uri, 'POST', options);
    }

    public static put(uri: string, options?: Options): Ajax
    {
        return Ajax.createInstance(uri, 'PUT', options);
    }

    public static patch(uri: string, options?: Options): Ajax
    {
        return Ajax.createInstance(uri, 'PATCH', options);
    }

    public static delete(uri: string, options?: Options): Ajax
    {
        return Ajax.createInstance(uri, 'DELETE', options);
    }

    public static head(uri: string, options?: Options): Ajax
    {
        return Ajax.createInstance(uri, 'HEAD', options);
    }

    public setHeader(key: string, value: string): Ajax
    {
        this.headers[key] = value;
        return this;
    }

    public setAuthorizationHeader(value: string | undefined | null, type: 'Bearer' = 'Bearer'): Ajax
    {
        return this.setHeader('Authorization', `${type} ${value}`);
    }

    public setOption(key: 'preserveErrors', value: boolean): Ajax
    public setOption(key: keyof Options, value: any): Ajax
    {
        this.options[key] = value;
        return this;
    }

    private getToken(): string | null
    {
        return window.localStorage.getItem('access_token') ?? window.sessionStorage.getItem('access_token');
    }

    public async sendJson(responseType: 'text', data: Record<string, any>): Promise<string | void>;
    public async sendJson(responseType: 'none', data: Record<string, any>): Promise<Response | void>;
    public async sendJson<ResponseData>(responseType: 'json', data: Record<string, any>): Promise<ResourceResponse<ResponseData> | void>;
    public async sendJson<ResponseData>(responseType: 'paginate', data: Record<string, any>): Promise<PaginatedResponse<ResponseData> | void>;
    public async sendJson(responseType: 'blob', data: Record<string, any>): Promise<Blob | void>;
    public async sendJson<ResponseData = null>(responseType: ResponseType, data: Record<string, any>): Promise<any | void>
    {
        this.setHeader('Content-Type', 'application/json');
        return await this.sendRequest<ResponseData>(responseType, JSON.stringify(data));
        
    }

    public async send(responseType: 'text'): Promise<string | void>;
    public async send(responseType: 'none'): Promise<Response | void>;
    public async send<ResponseData>(responseType: 'json'): Promise<ResourceResponse<ResponseData> | void>;
    public async send<ResponseData>(responseType: 'paginate'): Promise<PaginatedResponse<ResponseData> | void>;
    public async send(responseType: 'blob'): Promise<Blob | void>;
    public async send<ResponseData = null>(responseType: ResponseType): Promise<any | void>
    {
        return await this.sendRequest<ResponseData>(responseType);
        
    }

    public async sendFormData(responseType: 'text', data: Record<string, any>): Promise<string | void>;
    public async sendFormData(responseType: 'none', data: Record<string, any>): Promise<Response | void>;
    public async sendFormData<ResponseData>(responseType: 'json', data: Record<string, any>): Promise<ResourceResponse<ResponseData> | void>;
    public async sendFormData<ResponseData>(responseType: 'paginate', data: Record<string, any>): Promise<PaginatedResponse<ResponseData> | void>;
    public async sendFormData(responseType: 'blob', data: Record<string, any>): Promise<Blob | void>;
    public async sendFormData<ResponseData = null>(responseType: ResponseType, data: Record<string, any>): Promise<any | void>
    {
        const form = new FormData;
        for (const key in data) {
            if (data[key] instanceof FileList) {
                for (const value of data[key]) {
                    form.append(`${key}[]`, value);
                }
            } else {
                form.append(key, data[key] ?? '');
            }
        }
        return await this.sendRequest<ResponseData>(responseType, form);
    }

    private async sendRequest<ResponseData = null>(responseType: ResponseType, data?: string | FormData): Promise<ResponseData | void>
    {
        return fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: data,
        })
            .then<ResponseData | void>(async (response) => {
                if (response.status >= 500) return Promise.reject(new ServerError(response.status));
                if (!this.options.preserveErrors) errors.set({});
                if (response.status === 403) return Promise.reject(new AuthorizationError(response.headers.get('X-User-Group')));
                if (response.status === 422) return Promise.reject(new ValidationError(await response.json()));
                if (response.status === 401) return Promise.reject(new UnauthenticatedError);
                if (response.status >= 400 && response.status < 500) return Promise.reject(new ClientError(response.status));
                if (responseType === 'paginate') return response.json();
                if (responseType === 'none') return response;
                return response[responseType]();
            })
            .catch((error: Error) => {
                if (error instanceof ValidationError) {
                    Messages.error('Você tem um ou mais campos para serem verificados')
                    errors.set(error.fieldErrors);
                } else if (error instanceof UnauthenticatedError) {
                    Messages.error(error.message);
                    window.localStorage.removeItem('access_token');
                    window.sessionStorage.removeItem('access_token');
                    goto(error.toPath);
                } else if (error instanceof AuthorizationError) {
                    Messages.error('Você não tem permissão para acessar o recurso selecionado');
                    goto('/admin/vendas');
                } else if (error instanceof ServerError || error instanceof ClientError) {
                    Messages.error(error.message);
                } else {
                    throw error;
                }
            })
            .finally(() => this.stopLoadingIcon());
    }

    private initLoadIcon(): void
    {
        const div = document.createElement('div');
        div.setAttribute('aria-hidden', 'true');
        div.id = 'loading-icon';
        document
            .body
            .appendChild(div);
    }

    private stopLoadingIcon(): void
    {
        document
            .querySelector('#loading-icon')
            ?.remove();
    }
}