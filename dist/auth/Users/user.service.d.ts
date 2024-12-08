import { User } from './user.entity';
export declare class UserService {
    private readonly saltRounds;
    private readonly jwtSecret;
    registerUser(username: string, password: string, role: 'student' | 'instructor' | 'admin'): Promise<User>;
    validateUser(username: string, password: string): Promise<User | null>;
    generateJwtToken(user: User): string;
}
