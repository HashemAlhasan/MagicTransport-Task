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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./Services/db"));
const MagicTransport_1 = __importDefault(require("./Routes/MagicTransport"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/magic-app', MagicTransport_1.default);
const Start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MONGO_URI)
            yield (0, db_1.default)(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is  listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
Start();
