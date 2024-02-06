import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'student' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
