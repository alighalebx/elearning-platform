"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CourseController_1 = __importDefault(require("../controllers/CourseController"));
const router = express_1.default.Router();
router.post('/courses/create', CourseController_1.default.createCourse);
router.put('/courses/:courseId', CourseController_1.default.updateCourse);
router.delete('/courses/:courseId', CourseController_1.default.deleteCourse);
router.get('/courses', CourseController_1.default.listAllCourses);
router.get('/courses/:courseId', CourseController_1.default.viewSpecificCourse);
exports.default = router;
