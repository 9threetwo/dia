import User from "../models/User.js";
import Data from "../models/Data.js";

const editUserData = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      gender,
      date,
      weight,
      type,
      experience,
      medicine,
      complication,
      userId,
      min,
      max,
    } = req.body;

    const formattedDate = new Date(date).toISOString().split("T")[0];
    const minNumber = parseFloat(min);
    const maxNumber = parseFloat(max);

    if (isNaN(minNumber) || isNaN(maxNumber)) {
      return res
        .status(400)
        .json({ message: "Некорректные значения для min или max" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        gender,
        date: formattedDate,
        weight,
        type,
        experience,
        medicine,
        min: minNumber,
        max: maxNumber,
        complication,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const saveData = async (req, res) => {
  try {
    const { date, time, ck, xe, insulin, comment, userId } = req.body;

    if (!date || !time || !ck) {
      return res.status(400).json({ error: "Отсутствуют необходимые поля" });
    }

    const newData = new Data({
      date,
      time,
      ck,
      xe,
      insulin,
      comment,
      userId,
    });

    const data = await newData.save();

    return res.status(201).json({ msg: "Данные успешно сохранены", data });
  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

const getData = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "userId не указан" });
    }

    const data = await Data.find({ userId });

    console.log(data);

    return res.status(200).json({ message: "Данные успешно получены", data });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export { editUserData, saveData, getData };
