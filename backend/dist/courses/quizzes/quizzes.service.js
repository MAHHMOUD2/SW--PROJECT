"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quizzes_schema_1 = require("../models/quizzes.schema");
const responses_schema_1 = require("../models/responses.schema");
let QuizzesService = class QuizzesService {
    constructor(quizRepository, responseRepository) {
        this.quizRepository = quizRepository;
        this.responseRepository = responseRepository;
    }
    async createQuiz(quizData) {
        const quiz = this.quizRepository.create(quizData);
        return this.quizRepository.save(quiz);
    }
    async getQuizById(quizId) {
        const quiz = await this.quizRepository.findOne({
            where: { id: quizId },
            relations: ['module', 'responses'],
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${quizId} not found`);
        }
        return quiz;
    }
    async submitResponse(responseData) {
        const { quizId, userId, answers } = responseData;
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${quizId} not found`);
        }
        let score = 0;
        const feedback = quiz.questions.map((question) => {
            const userAnswer = answers.find((ans) => ans.questionId === question.id)?.answer;
            const correct = userAnswer === question.correctAnswer;
            if (correct)
                score += 10;
            return {
                questionId: question.id,
                questionText: question.questionText,
                userAnswer,
                correct,
            };
        });
        const response = this.responseRepository.create({
            quiz: { id: quizId },
            user: { id: userId },
            answers,
            score,
        });
        await this.responseRepository.save(response);
        return { score, feedback };
    }
    async getResults(quizId, userId) {
        const result = await this.responseRepository.findOne({
            where: { quiz: { id: quizId }, user: { id: userId } },
            relations: ['quiz', 'user'],
        });
        if (!result) {
            throw new common_1.NotFoundException(`Results not found for quiz ID ${quizId} and user ID ${userId}`);
        }
        return result;
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quizzes_schema_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(responses_schema_1.Response)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map