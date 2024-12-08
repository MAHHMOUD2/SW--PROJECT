"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quizzes_controller_1 = require("./quizzes.controller");
const quizzes_service_1 = require("./quizzes.service");
const quizzes_schema_1 = require("../../models/quizzes.schema");
const responses_schema_1 = require("../../models/responses.schema");
let QuizzesModule = class QuizzesModule {
};
exports.QuizzesModule = QuizzesModule;
exports.QuizzesModule = QuizzesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([quizzes_schema_1.Quiz, responses_schema_1.Response])],
        controllers: [quizzes_controller_1.QuizzesController],
        providers: [quizzes_service_1.QuizzesService],
    })
], QuizzesModule);
//# sourceMappingURL=quizzes.module.js.map