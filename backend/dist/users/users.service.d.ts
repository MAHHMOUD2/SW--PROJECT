import { Repository } from 'typeorm';
import { User } from '../models/users.schema';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, updateData: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
}
