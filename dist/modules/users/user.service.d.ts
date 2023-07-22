import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    createUser(input: UserInput): Promise<User>;
    findByIds(ids: number[]): Promise<User[]>;
}
