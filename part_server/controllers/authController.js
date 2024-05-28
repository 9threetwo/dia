import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import User from "../models/User.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Введите все значения" });
  }
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    return res.status(400).json({ msg: "Email уже используется" });
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).json({
    user,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Введите все значения");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Не корректные данные" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  const token = user.createJWT();
  res.status(201).json({
    user,
    token,
  });
};

export { register, login };
