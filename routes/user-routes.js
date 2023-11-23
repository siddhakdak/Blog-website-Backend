import express from "express";
import { SignUp, deleteUser, getAllUser, login } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", SignUp);
router.post("/login", login);
router.delete("/:id",deleteUser);

export default router;
