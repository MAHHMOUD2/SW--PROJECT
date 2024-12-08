"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_schema_1 = require("backend/src/models/users.schema");
const courses_schema_1 = require("backend/src/models/courses.schema");
const responses_schema_1 = require("backend/src/models/responses.schema");
const progress_schema_1 = require("backend/src/models/progress.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'your_database_username',
                password: 'your_database_password',
                database: 'your_database_name',
                entities: [users_schema_1.User, courses_schema_1.Course, responses_schema_1.Response, progress_schema_1.Progress],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([users_schema_1.User, courses_schema_1.Course, responses_schema_1.Response, progress_schema_1.Progress]),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map