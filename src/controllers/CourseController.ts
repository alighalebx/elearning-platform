import express from 'express';
import Course from '../models/Course';

const createCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const courseId = req.params.courseId;
    const { title, description, image } = req.body;

    try {
        const course = await Course.findByIdAndUpdate(courseId, { title, description, image }, { new: true });

        if (!course) {
        return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const courseId = req.params.courseId;

    try {
      const course = await Course.findByIdAndDelete(courseId);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      return res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      next(error);
    }
};

const listAllCourses = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
      } catch (error) {
        next(error);
      }
};

const viewSpecificCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const courseId = req.params.courseId;

    try {
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
};

const CourseController = {
  createCourse,
  updateCourse,
  deleteCourse,
  listAllCourses,
  viewSpecificCourse,
};

export default CourseController;
