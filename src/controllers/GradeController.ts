import express from 'express';
import Grade from '../models/Grade';

const assignGrade = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { student, course, grade, feedback } = req.body;
        const newGrade = new Grade({ student, course, grade, feedback });
        await newGrade.save();
        res.status(201).json(newGrade);
      } catch (error) {
        next(error);
      }
};

const studentViewGrades = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const studentId = req.params.studentId;
    const courseId = req.query.courseId;
  
    try {
      let grades;
  
      if (courseId) {
        grades = await Grade.find({ student: studentId, course: courseId });
      } else {
        grades = await Grade.find({ student: studentId });
      }
  
      res.status(200).json(grades);
    } catch (error) {
      next(error);
    }
};

const viewAverageCourseGrades = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const courseId = req.params.courseId;

    try {
      const averageGrade = await Grade.aggregate([
        { $match: { course: courseId } },
        { $group: { _id: null, average: { $avg: '$grade' } } }
      ]);
  
      if (averageGrade.length === 0) {
        return res.status(404).json({ message: 'No grades found for this course' });
      }
  
      res.status(200).json({ averageGrade: averageGrade[0].average });
    } catch (error) {
      next(error);
    }
};

const GradeController = {
  assignGrade,
  studentViewGrades,
  viewAverageCourseGrades,
};

export default GradeController;
