import { Router } from "express";
import getOneByNumber from "../ControllerForSmartUp/getOneByNumber.controller.js";

const router = Router();

router.post("/smartup/getByPhone", getOneByNumber);

export default router;
