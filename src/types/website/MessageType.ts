interface Reply {
    id: number;
    reply: string;
    replyAt: string;
}
interface Ticket {
    id: number;
    message: string;
    isReplied: string;
    sendAt: string;
}
interface UserMessage {
    id: number;
    message: string;
    sendAt: string;
    replies: Reply[];
    isReplied: string;
}

export type { Reply, UserMessage, Ticket };
