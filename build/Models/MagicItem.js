"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MagicItemSchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
        required: true
    },
    Weight: {
        type: Number,
        required: true
    },
});
exports.default = mongoose_1.default.model('MagicItem', MagicItemSchema);
