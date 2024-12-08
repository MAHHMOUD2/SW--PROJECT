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
const courses_module_1 = require("./courses/courses.module");
const users_schema_1 = require("./models/users.schema");
const courses_schema_1 = require("./models/courses.schema");
const modules_schema_1 = require("./models/modules.schema");
const quizzes_schema_1 = require("./models/quizzes.schema");
const responses_schema_1 = require("./models/responses.schema");
const progress_schema_1 = require("./models/progress.schema");
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
                username: 'your_username',
                password: 'your_password',
                database: 'your_database',
                entities: [
                    users_schema_1.User,
                    courses_schema_1.Course,
                    modules_schema_1.Module,
                    quizzes_schema_1.Quiz,
                    responses_schema_1.Response,
                    progress_schema_1.Progress,
                ],
                synchronize: true,
            }),
            courses_module_1.CoursesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map