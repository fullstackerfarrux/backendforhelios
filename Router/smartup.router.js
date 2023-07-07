import { Router } from "express";
import getOneByNumber from "../ControllerForSmartUp/getOneByNumber.controller.js";
import createOrder from "../ControllerForSmartUp/createOrder.controller.js";
import createUser from "../ControllerForSmartUp/createUSer.controller.js";
import getOrdersController from "../ControllerForSmartUp/getOrders.controller.js";
import updateUser from "../ControllerForSmartUp/updateUser.controller.js";
import updateOrder from "../ControllerForSmartUp/updateOrder.controller.js";
import { getProducts } from "../ControllerForSmartUp/getProducts.controller.js";
import { pageOffset } from "../ControllerForSmartUp/pageOffset.controller.js";
import { filter } from "../ControllerForSmartUp/filter.controller.js";

const router = Router();

router.post("/smartup/getByPhone", getOneByNumber);
router.post("/smartup/createUser", createUser);
router.post("/smartup/updateUser", updateUser);
router.post("/smartup/updateOrder", updateOrder);
router.post("/smartup/createOrder", createOrder);
router.post("/smartup/getOrder", getOrdersController);
router.get("/smartup/getProducts", getProducts);
router.post("/smartup/pageOffset", pageOffset);
router.post(
  "/smartup/product-filter/model=:model&tip=:tip&min_price=:min_price&max_price=:max_price",
  filter
);

export default router;
