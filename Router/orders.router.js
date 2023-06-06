import { Router } from "express";
import postUser from "../Controller/users.controller.js";
import postOrder from "../Controller/orders.controller.js";
import getOrder from "../Controller/getorders.controller.js";
import getuser from "../Controller/getuser.controller.js";
import postOrderByWebSite from "../Controller/postorderwebsite.controller.js";

const router = Router();

router.post("/postuser", postUser);
router.post("/postorder", postOrder);
router.get("/get", getOrder);
router.get("/getuser", getuser);
router.post("/postorderbywebsite", postOrderByWebSite);

// router.post("/postroom", postroom);

// router.get("/getroom", getroom);

// router.delete("/rooms/:room_id", deleteRoom);

// router.post("/updateroom", updateroom);

export default router;
