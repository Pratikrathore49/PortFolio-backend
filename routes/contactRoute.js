import express from 'express'
import { contactDetails } from "../controller/contact.js";

const router = express.Router()
router.post("/contact",contactDetails );

export default router