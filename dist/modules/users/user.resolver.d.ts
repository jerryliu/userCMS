import { User } from './user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
export declare class UserResolver {
    private usersRepository;
    private readonly userService;
    constructor(usersRepository: Repository<User>, userService: UserService);
    users(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(input: UserInput): Promise<User>;
    login(email: string, password: string): Promise<{
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
}
