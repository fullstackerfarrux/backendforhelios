import { Router } from "express";
import getOneByNumber from "../controllerForSmartUp/getOneByNumber.controller.js";
// import createUSer from "../ControllerForSmartUp/createUser.controller.js";
import createOrder from "../controllerForSmartUp/createOrder.controller.js";

const router = Router();

router.post("/smartup/getByPhone", getOneByNumber);
// router.post("/smartup/createUser", res.status(300).send({ msg: "Changed" }));
router.post("/smartup/createOrder", createOrder);

export default router;
