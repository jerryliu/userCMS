export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
    picture?: string;
    company?: string;
    friends: User[];
    createdAt: Date;
    updatedAt: Date;
}
