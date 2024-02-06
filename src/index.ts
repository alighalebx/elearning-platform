import express from 'express';
import dotenv from 'dotenv';
// import connectDB from './utils/db';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import gradeRoutes from './routes/gradeRoutes';

dotenv.config();

const app = express();

// Connect to MongoDB

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/default-database';

mongoose.connect(MONGODB_URL).then((value) => {
    console.log("Database connected successfully");
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));




// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/grades', gradeRoutes);

// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
