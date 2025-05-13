export type User = {
    id: string;
    username: string;
    password: string;
    email: string;
    gameTag: string;
    isSuperAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
};