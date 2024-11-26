"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const MagicTransport_1 = require("../Controllers/MagicTransport");
router.route('/add-magic-mover').post(MagicTransport_1.addMagicMover);
router.route('/add-magic-item').post(MagicTransport_1.addMagicItem);
router.route('/load-magic-item').post(MagicTransport_1.LoadMagicMover);
router.route('/start-mission').post(MagicTransport_1.StartMission);
router.route('/end-mission').post(MagicTransport_1.EndMission);
router.route('/list-completed').post(MagicTransport_1.GetCompleted);
exports.default = router;
