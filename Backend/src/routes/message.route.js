import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserslider , sendMessage ,getmessages} from "../controlers/message.controller.js";

 const router = express.Router()
router.get('/users', protectRoute, getUserslider)
router.get('/:id', protectRoute, getmessages )
router.post ('/send/:id', protectRoute, sendMessage )

 export default router;


















