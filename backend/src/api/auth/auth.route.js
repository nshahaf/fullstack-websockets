import express from "express"
import { signup, login, logout } from "./auth.controller.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/check-token", (req, res) => res.status(200).send("Token is valid"))

export default router