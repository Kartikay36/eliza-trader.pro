"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://eliza-trader-pro.netlify.app' // <-- Replace with your actual Netlify domain
    ],
    credentials: true
}));
app.use(body_parser_1.default.json());
// Environment variables
if (!process.env.ADMIN_USERS || !process.env.ADMIN_PASSWORD_HASH) {
    throw new Error('ADMIN_USERS and ADMIN_PASSWORD_HASH environment variables must be set');
}
const ADMIN_USERS = process.env.ADMIN_USERS.split(',');
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET || '3c6b833022ffe6df35bb35c0ccbe80108459eed29e6b0480b089a0cb4cbf5f90';
// API Routes
const apiRouter = express_1.default.Router();
// Login endpoint
apiRouter.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        try {
            const normalizedUserId = userId.toLowerCase();
            const isValidUser = ADMIN_USERS.map(u => u.toLowerCase()).includes(normalizedUserId);
            const isValidPassword = yield bcryptjs_1.default.compare(password, ADMIN_PASSWORD_HASH);
            if (!isValidUser || !isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jsonwebtoken_1.default.sign({ userId: normalizedUserId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
// Logout endpoint
apiRouter.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});
// Protected route example
apiRouter.get('/profile', (req, res) => {
    // Verify token middleware would go here
    res.json({ user: req.user });
});
// Mount API router
app.use('/api', apiRouter);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
// <-- Add your new route here!
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
// For Vercel deployment
module.exports = app;
//# sourceMappingURL=index.js.map