"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor() {
        this.saltRounds = 10;
        this.jwtSecret = 'your-secret-key';
    }
    async registerUser(username, password, role) {
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        const user = new user_entity_1.User();
        user.username = username;
        user.password = hashedPassword;
        user.role = role;
        return user;
    }
    async validateUser(username, password) {
        const user = new user_entity_1.User();
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    generateJwtToken(user) {
        return jwt.sign({ username: user.username, role: user.role }, this.jwtSecret, { expiresIn: '1h' });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map