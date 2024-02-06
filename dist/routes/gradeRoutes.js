"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GradeController_1 = __importDefault(require("../controllers/GradeController"));
const router = express_1.default.Router();
router.post('/grades/assign', GradeController_1.default.assignGrade);
router.get('/student/grades/:studentId', GradeController_1.default.studentViewGrades);
router.get('/grades/:courseId/average', GradeController_1.default.viewAverageCourseGrades);
exports.default = router;
