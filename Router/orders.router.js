import { Router } from "express";
import postUser from "../controller/users.controller.js";
import postOrder from "../controller/orders.controller.js";
import getOrder from "../controller/getorders.controller.js";
import getuser from "../controller/getuser.controller.js";
import postOrderByWebSite from "../controller/postorderwebsite.controller.js";
import checkNumber from "../controller/checkPhonenumber.controller.js";
import createUser from "../controller/createUser.controller.js";
import getOrderByPhoneNumber from "../controller/getOrdersByPhoneNumber.controller.js";
import updateStatus from "../controller/udateStatus.controller.js";

const router = Router();

router.post("/postuser", postUser);
router.post("/postorder", postOrder);
router.get("/get", getOrder);
router.get("/getuser", getuser);
router.post("/postorderbywebsite", postOrderByWebSite);
router.post("/checknumber", checkNumber);
router.post("/createuser", createUser);
router.post("/getorder", getOrderByPhoneNumber);
router.post("/updatestatus", updateStatus);

export default router;
