import express from 'express'
const router = express.Router()
import { addMagicItem,addMagicMover,LoadMagicMover, StartMission, EndMission,GetCompleted } from '../Controllers/MagicTransport'
router.route('/add-magic-mover').post(addMagicMover)
router.route('/add-magic-item').post(addMagicItem)
router.route('/load-magic-item').post(LoadMagicMover)
router.route('/start-mission').post(StartMission)
router.route('/end-mission').post(EndMission)
router.route('/list-completed').post(GetCompleted)


export default router