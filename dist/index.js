"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import connectDB from './utils/db';
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const gradeRoutes_1 = __importDefault(require("./routes/gradeRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/default-database';
mongoose_1.default.connect(MONGODB_URL).then((value) => {
    console.log("Database connected successfully");
});
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/users', userRoutes_1.default);
app.use('/courses', courseRoutes_1.default);
app.use('/grades', gradeRoutes_1.default);
// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
