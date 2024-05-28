import express from "express";
const router = express.Router();
import {
  editUserData,
  saveData,
  getData,
} from "../controllers/userControllers.js";

router.route("/edit-userdata").post(editUserData); //редактировать данные
router.route("/save-data").post(saveData); //получить данные
router.route("/get-data/:userId").post(getData); //сохранить данные

export default router;
