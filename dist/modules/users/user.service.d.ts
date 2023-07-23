import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export interface UserWithToken extends User {
    token: string;
}
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        token: string;
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
    }>;
    findById(id: number): Promise<User>;
    findByIds(ids: number[]): Promise<User[]>;
}
