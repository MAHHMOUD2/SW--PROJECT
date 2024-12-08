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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const courses_schema_1 = require("../models/courses.schema");
let CoursesService = class CoursesService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async createCourse(courseData) {
        const course = this.courseRepository.create(courseData);
        return this.courseRepository.save(course);
    }
    async getAllCourses() {
        return this.courseRepository.find({ relations: ['modules'] });
    }
    async getCourseById(courseId) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['modules'],
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        return course;
    }
    async updateCourse(courseId, courseData) {
        const course = await this.getCourseById(courseId);
        Object.assign(course, courseData);
        return this.courseRepository.save(course);
    }
    async deleteCourse(courseId) {
        const result = await this.courseRepository.delete(courseId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(courses_schema_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map