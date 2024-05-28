import customFetch from "../utils/axios";
import { logOutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editUserDataThunk = async (url, info, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, info);
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logOutUser());
      return thunkAPI.rejectWithValue("Пользователь не авторизован");
    }
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const saveDataThunk = async (url, info, thunkAPI) => {
  try {
    console.log("Отправка запроса на:", url);
    console.log("Данные запроса:", JSON.stringify(info)); // Логируем данные запроса

    const resp = await customFetch.post(url, info); // предполагается, что это POST запрос

    console.log("Ответ сервера:", resp.data);
    return resp.data;
  } catch (error) {
    if (error.response) {
      console.error("Ответ с ошибкой от сервера:", error.response);
      console.error(
        "Сообщение об ошибке:",
        error.response.data.msg || error.response.data
      );

      if (error.response.status === 401) {
        thunkAPI.dispatch(logOutUser());
        return thunkAPI.rejectWithValue("Пользователь не авторизован");
      }

      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Неизвестная ошибка"
      );
    } else if (error.request) {
      console.error("Ошибка запроса:", error.request);
      return thunkAPI.rejectWithValue("Ошибка запроса");
    } else {
      console.error("Ошибка:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};

// export const getDataThunk = async (url, info, thunkAPI) => {
//   try {
//     const resp = await customFetch.get(url, info);
//     return resp.data;
//   } catch (error) {
//     if (error.response.status === 401) {
//       thunkAPI.dispatch(logOutUser());
//       return thunkAPI.rejectWithValue("Пользователь не авторизован");
//     }
//     console.log(error.response.data.msg);
//     return thunkAPI.rejectWithValue(error.response.data.msg);
//   }
// };
export const getDataThunk = async (url, info, thunkAPI) => {
  try {
    console.log("Отправка запроса на:", url);
    console.log("Данные запроса:", JSON.stringify(info)); // Логируем данные запроса

    const resp = await customFetch.post(url, info); // предполагается, что это POST запрос

    console.log("Ответ сервера:", resp.data);
    return resp.data;
  } catch (error) {
    if (error.response) {
      console.error("Ответ с ошибкой от сервера:", error.response);
      console.error(
        "Сообщение об ошибке:",
        error.response.data.msg || error.response.data
      );

      if (error.response.status === 401) {
        thunkAPI.dispatch(logOutUser());
        return thunkAPI.rejectWithValue("Пользователь не авторизован");
      }

      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Неизвестная ошибка"
      );
    } else if (error.request) {
      console.error("Ошибка запроса:", error.request);
      return thunkAPI.rejectWithValue("Ошибка запроса");
    } else {
      console.error("Ошибка:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};
