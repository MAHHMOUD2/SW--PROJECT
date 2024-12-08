import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: {
        username: string;
        password: string;
        role: 'student' | 'instructor' | 'admin';
    }): Promise<{
        message: string;
        user: import("./user.entity").User;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
}
