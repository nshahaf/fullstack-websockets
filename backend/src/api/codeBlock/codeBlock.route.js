import express from "express"
import { createCodeBlock, deleteCodeBlockById, getCodeBlocks, getCodeBlockById, compareCode, updateCodeBlockById } from "./codeBlock.controller.js"

const router = express.Router()

router.get("/ping", (req, res) => res.send("pong")) // test connection

router.post("/", createCodeBlock) // creating a codeBlock
router.get("/", getCodeBlocks) // fetching all codeBlocks
router.get("/:id", getCodeBlockById) // fetching a single codeBlock by id
router.put("/:id", updateCodeBlockById) // updating a codeBlock by id
router.delete("/:id", deleteCodeBlockById) // deleting a codeBlock by id
router.post("/check", compareCode) // comparing code

export default router