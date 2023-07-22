import { User } from './user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';
import { Friend } from './friend.entity';
import { Repository } from 'typeorm';
export declare class UserResolver {
    private usersRepository;
    private friendsRepository;
    private readonly userService;
    constructor(usersRepository: Repository<User>, friendsRepository: Repository<Friend>, userService: UserService);
    users(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(input: UserInput): Promise<User>;
}
