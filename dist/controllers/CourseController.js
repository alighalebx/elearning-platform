"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../models/Course"));
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = new Course_1.default(req.body);
        yield course.save();
        res.status(201).json(course);
    }
    catch (error) {
        next(error);
    }
});
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const { title, description, image } = req.body;
    try {
        const course = yield Course_1.default.findByIdAndUpdate(courseId, { title, description, image }, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json({ message: 'Course updated successfully', course });
    }
    catch (error) {
        next(error);
    }
});
const deleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    try {
        const course = yield Course_1.default.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json({ message: 'Course deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
const listAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find();
        res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
});
const viewSpecificCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    try {
        const course = yield Course_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
});
const CourseController = {
    createCourse,
    updateCourse,
    deleteCourse,
    listAllCourses,
    viewSpecificCourse,
};
exports.default = CourseController;
