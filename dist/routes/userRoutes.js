"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
router.post('/create', UserController_1.default.createUser);
router.put('/:userId', UserController_1.default.updateUser);
router.delete('/:userId', UserController_1.default.deleteUser);
exports.default = router;
