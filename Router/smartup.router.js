import { Router } from "express";
import getOneByNumber from "../ControllerForSmartUp/getOneByNumber.controller.js";
import createOrder from "../ControllerForSmartUp/createOrder.controller.js";
import createUser from "../ControllerForSmartUp/createUSer.controller.js";

const router = Router();

router.post("/smartup/getByPhone", getOneByNumber);
router.post("smartup/createUser", createUser);
router.post("/smartup/createOrder", createOrder);

export default router;
