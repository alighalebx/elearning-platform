import mongoose, { Document, Schema, Types } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description?: string;
  image?: string;
  professor: Types.ObjectId;
  students: Types.ObjectId[];
  createdAt: Date;
}

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  professor: { type: Types.ObjectId, ref: 'User', required: true },
  students: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
