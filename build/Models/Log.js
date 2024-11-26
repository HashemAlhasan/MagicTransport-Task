"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LogSchema = new mongoose_1.default.Schema({
    MagicMover: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'MagicMover'
    },
    State: {
        type: String,
        required: true,
        enum: {
            values: ['resting', 'loading', 'on-mission'],
        },
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Log', LogSchema);
