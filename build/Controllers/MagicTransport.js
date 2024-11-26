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
exports.GetCompleted = exports.EndMission = exports.StartMission = exports.LoadMagicMover = exports.addMagicItem = exports.addMagicMover = void 0;
const MagicMover_1 = __importDefault(require("../Models/MagicMover"));
const MagicItem_1 = __importDefault(require("../Models/MagicItem"));
const Log_1 = __importDefault(require("../Models/Log"));
const addMagicMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const WeightLimit = req.body.WeightLimit;
        if (!WeightLimit) {
            return res.status(400).json({ msg: 'Pleas Provide The Wieght Limit' });
        }
        const result = yield MagicMover_1.default.create({ WeightLimit: WeightLimit });
        return res.status(200).json({ msg: 'Done Sucessfuly', magicmover: result });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.addMagicMover = addMagicMover;
const addMagicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Weight = req.body.Weight;
        const Name = req.body.Name;
        if (!Weight || !Name) {
            return res.status(400).json({ msg: 'Pleas Provide The Wieght And Name' });
        }
        const result = yield MagicItem_1.default.create({ Weight: Weight, Name: Name });
        return res.status(200).json({ msg: 'Done Sucessfuly', magicItem: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.addMagicItem = addMagicItem;
const LoadMagicMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MagicMoverId = req.body.MagicMoverId;
        const Items = req.body.Items;
        if (!MagicMoverId) {
            return res.status(400).json({ msg: 'Please Provide Full Information' });
        }
        const WeightLimit = yield MagicMover_1.default.findOne({ _id: MagicMoverId });
        if (!WeightLimit) {
            return res.status(400).json({ msg: 'Could not find Magic Mover' });
        }
        if (WeightLimit.QuestState === 'on-mission') {
            return res.status(400).json({ msg: "You can't Load More Items" });
        }
        const ItemsWieght = yield MagicItem_1.default.find({ Name: { $in: Items } }).select('Weight -_id');
        const SumOfWieghts = ItemsWieght.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.Weight;
        }, 0);
        console.log(SumOfWieghts);
        if (SumOfWieghts > WeightLimit.WeightLimit) {
            return res.status(400).json({ msg: "You Have Passed The Wieght Limit" });
        }
        WeightLimit.QuestState = 'loading';
        WeightLimit.save();
        const log = yield Log_1.default.create({
            MagicMover: WeightLimit._id,
            State: 'loading'
        });
        return res.status(200).json({ msg: 'Done Sucessfuly' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.LoadMagicMover = LoadMagicMover;
const StartMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MagicMoverId = req.body.MagicMoverId;
        if (!MagicMoverId) {
            return res.status(400).json({ msg: 'Please Provide Full Information' });
        }
        const Magicmover = yield MagicMover_1.default.findOne({ _id: MagicMoverId });
        if (!Magicmover) {
            return res.status(400).json({ msg: 'Could not find Magic Mover' });
        }
        Magicmover.QuestState = 'on-mission';
        Magicmover.save();
        const log = yield Log_1.default.create({
            MagicMover: Magicmover._id,
            State: "on-mission"
        });
        return res.status(200).json({ msg: "Done Sucessfuly" });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.StartMission = StartMission;
const EndMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MagicMoverId = req.body.MagicMoverId;
        if (!MagicMoverId) {
            return res.status(400).json({ msg: 'Please Provide Full Information' });
        }
        const Magicmover = yield MagicMover_1.default.findOne({ _id: MagicMoverId });
        if (!Magicmover) {
            return res.status(400).json({ msg: 'Could not find Magic Mover' });
        }
        Magicmover.QuestState = 'resting';
        Magicmover.save();
        const log = yield Log_1.default.create({
            MagicMover: Magicmover._id,
            State: 'resting'
        });
        return res.status(200).json({ msg: "Done Sucessfuly" });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.EndMission = EndMission;
const GetCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Log_1.default.aggregate([{
                $group: {
                    _id: '$MagicMover',
                    total: {
                        $sum: {
                            $cond: [{ $eq: ['$State', 'resting'] }, 1, 0]
                        }
                    },
                    d: { $push: '$$ROOT' }
                }
            }, {
                $project: {
                    _id: 1,
                    total: 1
                }
            }, {
                $sort: {
                    total: -1
                }
            }]);
        return res.status(200).json({ msg: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.GetCompleted = GetCompleted;
