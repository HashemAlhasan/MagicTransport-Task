"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MagicMoverSchema = new mongoose_1.default.Schema({
    WeightLimit: {
        type: Number,
        required: true
    },
    QuestState: {
        type: String,
        required: true,
        enum: {
            values: ['resting', 'loading', 'on-mission'],
        },
        default: 'resting'
    }
});
exports.default = mongoose_1.default.model('MagicMover', MagicMoverSchema);
