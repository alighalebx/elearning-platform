import express from 'express';
import CourseController from '../controllers/CourseController';

const router = express.Router();


router.post('/courses/create', CourseController.createCourse);
router.put('/courses/:courseId', CourseController.updateCourse);
router.delete('/courses/:courseId', CourseController.deleteCourse);
router.get('/courses', CourseController.listAllCourses);
router.get('/courses/:courseId', CourseController.viewSpecificCourse);

export default router;
