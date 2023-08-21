import { messages } from "./store";
import { get } from "svelte/store";

export { default as MessagesComponent } from "./Messages.svelte";
export type MessageLevel = 'success' | 'warning' | 'error';
export type Message = {
    id: number;
    content: string;
    level: MessageLevel;
}

export class Messages
{
    private appendMessage(level: MessageLevel, content: string): void
    {
        const storedMessages = get(messages);
        storedMessages.push({
            id: Math.random(),
            content,
            level,
        });
        messages.set(storedMessages);
    }

    public static error(content: string): Messages
    {
        return (new this).error(content);
    }

    public error(content: string): Messages
    {
        this.appendMessage('error', content);
        return this;
    }

    public static warning(content: string): Messages
    {
        return (new this).warning(content);
    }

    public warning(content: string): Messages
    {
        this.appendMessage('warning', content);
        return this;
    }

    public static success(content: string): Messages
    {
        return (new this).success(content);
    }

    public success(content: string): Messages
    {
        this.appendMessage('success', content);
        return this;
    }

    public static remove(id: number): void
    {
        messages.set(get(messages).filter(message => message.id !== id));
    }
}