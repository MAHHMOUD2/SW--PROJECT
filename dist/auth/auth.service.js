"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor() {
        this.users = [
            {
                username: 'testuser',
                password: '$2b$10$examplehashedpassword',
                role: 'student',
            },
        ];
    }
    async validateUser(username, password) {
        const user = this.users.find((user) => user.username === username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return { username: user.username, role: user.role };
        }
        return null;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.username, role: user.role };
        return {
            access_token: jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map