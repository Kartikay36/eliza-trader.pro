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
const axios_1 = __importDefault(require("axios"));
const supabase_js_1 = require("@supabase/supabase-js");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const ELIZA_API_URL = process.env.ELIZA_API_URL || 'https://eliza-api-41mt.onrender.com';
// Initialize Supabase
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
// Middleware
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://eliza-trader-pro.netlify.app'
    ],
    credentials: true
}));
app.use(body_parser_1.default.json());
// Proxy to ELIZA API (keep login functionality)
app.post('/api/auth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${ELIZA_API_URL}/api/auth/login`, req.body);
        res.json(response.data);
    }
    catch (error) {
        res.status(error.response.status || 500).json(error.response.data || { error: 'Login failed' });
    }
}));
// Supabase Posts Routes (add all the CRUD operations we implemented earlier)
app.get('/api/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Add other routes (POST, PUT, DELETE) as implemented in the previous Supabase version
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        services: {
            supabase: 'connected'
        }
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
