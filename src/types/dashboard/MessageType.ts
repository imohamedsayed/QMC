import type { User } from './UserType';

interface Reply {
    id: number;
    reply: string;
    replyAt: string;
}



interface UserMessage {
    id: number;
    message: string;
    sendAt: string;
    user: User;
    replies: Reply[];
    isReplied: string;
}

export type { Reply, UserMessage };
