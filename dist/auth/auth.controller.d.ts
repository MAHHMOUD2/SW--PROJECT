import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<any>;
}
