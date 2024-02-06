import express from 'express';
import GradeController from '../controllers/GradeController';

const router = express.Router();

router.post('/grades/assign', GradeController.assignGrade);
router.get('/student/grades/:studentId', GradeController.studentViewGrades);
router.get('/grades/:courseId/average', GradeController.viewAverageCourseGrades);

export default router;
