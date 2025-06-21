"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const password = '$uper#admin@Elizabeth2025!$';
bcryptjs_1.default.hash(password, 10)
    .then((hash) => {
    console.log('Generated Hash:', hash);
    console.log('Add this to your .env file as ADMIN_PASSWORD_HASH=', hash);
})
    .catch((err) => console.error('Error generating hash:', err));
//# sourceMappingURL=generate-hash.js.map