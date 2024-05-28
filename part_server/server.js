process.on("uncaughtException", (err) => {
  console.error("Неперехваченное исключение:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Неперехваченный отклонённый промис:",
    promise,
    "причина:",
    reason
  );
});
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "express-async-errors";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";
import authUser from "./middleware/authUser.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

app.use("/api/user", authUser, userRouter); //маршруты через мидлвае, они защищены, шифруются
app.use("/api/auth", authRouter); //для защищенности польльзователя были разделены маршруты, маршрут для авторизации (регистрация и авторизация)

mongoose.set("strictQuery", false);
//подключение к бд
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/chart`
  )
  .then(() => {
    app.listen(1000);
    console.log("Server has been started, DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
