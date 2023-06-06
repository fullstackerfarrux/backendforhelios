import { Router } from "express";
import postUser from "../Controller/users.controller.js";
import postOrder from "../Controller/orders.controller.js";
import getOrder from "../Controller/getorders.controller.js";
import getuser from "../Controller/getuser.controller.js";
import postOrderByWebSite from "../Controller/postorderwebsite.controller.js";
import checkNumber from "../Controller/checkPhonenumber.controller.js";
import createUser from "../Controller/createUser.controller.js";
import getOrderByPhoneNumber from "../Controller/getOrdersByPhoneNumber.controller.js";

const router = Router();

router.post("/postuser", postUser);
router.post("/postorder", postOrder);
router.get("/get", getOrder);
router.get("/getuser", getuser);
router.post("/postorderbywebsite", postOrderByWebSite);
router.post("/checknumber", checkNumber);
router.post("/createuser", createUser);
router.post("/postfororder", getOrderByPhoneNumber);

export default router;
