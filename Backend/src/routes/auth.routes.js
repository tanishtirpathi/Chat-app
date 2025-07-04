import express from "express"
import {login, logout, signup ,checkAuth , profileUp} from "../controlers/auth.controller.js"
    
import {protectRoute} from "../middlewares/auth.middleware.js"
 const router = express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)
router.put('/update-profile', protectRoute , profileUp)

router.get("/check", protectRoute, checkAuth);
console.log("✅ Auth routes loaded");

 export default router;

 // video 54:41