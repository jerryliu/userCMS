import { UserInput } from './user.input';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<{
        users: import("./user.entity").User[];
    }>;
    getUserById(id: number): Promise<{
        user: import("./user.entity").User;
    }>;
    createUser(data: UserInput): Promise<{
        user: import("./user.entity").User;
    }>;
}
