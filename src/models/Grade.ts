import mongoose, { Document, Schema, Types } from 'mongoose';

interface IGrade extends Document {
  student: Types.ObjectId;
  course: Types.ObjectId;
  grade: number;
  feedback?: string;
  createdAt: Date;
}

const gradeSchema = new Schema({
  student: { type: Types.ObjectId, ref: 'User', required: true },
  course: { type: Types.ObjectId, ref: 'Course', required: true },
  grade: { type: Number, required: true, min: 0, max: 100 },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Grade = mongoose.model<IGrade>('Grade', gradeSchema);

export default Grade;
