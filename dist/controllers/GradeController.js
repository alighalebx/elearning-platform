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
const Grade_1 = __importDefault(require("../models/Grade"));
const assignGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student, course, grade, feedback } = req.body;
        const newGrade = new Grade_1.default({ student, course, grade, feedback });
        yield newGrade.save();
        res.status(201).json(newGrade);
    }
    catch (error) {
        next(error);
    }
});
const studentViewGrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.studentId;
    const courseId = req.query.courseId;
    try {
        let grades;
        if (courseId) {
            grades = yield Grade_1.default.find({ student: studentId, course: courseId });
        }
        else {
            grades = yield Grade_1.default.find({ student: studentId });
        }
        res.status(200).json(grades);
    }
    catch (error) {
        next(error);
    }
});
const viewAverageCourseGrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    try {
        const averageGrade = yield Grade_1.default.aggregate([
            { $match: { course: courseId } },
            { $group: { _id: null, average: { $avg: '$grade' } } }
        ]);
        if (averageGrade.length === 0) {
            return res.status(404).json({ message: 'No grades found for this course' });
        }
        res.status(200).json({ averageGrade: averageGrade[0].average });
    }
    catch (error) {
        next(error);
    }
});
const GradeController = {
    assignGrade,
    studentViewGrades,
    viewAverageCourseGrades,
};
exports.default = GradeController;
