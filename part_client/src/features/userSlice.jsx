import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  editUserDataThunk,
  saveDataThunk,
  getDataThunk,
} from "./userThunk.jsx";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage.jsx";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
  chartData: [],
  message: "",
  message2: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk(`/auth/login`, user, thunkAPI);
  }
);

export const editUserData = createAsyncThunk(
  "user/edit-userdata",
  async (info, thunkAPI) => {
    return editUserDataThunk(`/user/edit-userdata`, info, thunkAPI);
  }
);

export const saveData = createAsyncThunk(
  "user/save-data",
  async (info, thunkAPI) => {
    return saveDataThunk(`/user/save-data`, info, thunkAPI);
  }
);

export const getData = createAsyncThunk(
  "user/get-data",
  async (info, thunkAPI) => {
    return getDataThunk(`/user/get-data/${info.userId}`, info, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      state.token = "";
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
      state.message = "";
    },
    messageHandler: (state, { payload }) => {
      state.message = payload;
    },
    messageHandler2: (state, { payload }) => {
      state.message2 = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user, token } = payload;
      state.isLoading = false;
      state.user = user;
      state.token = token;
      addUserToLocalStorage(user);
      addTokenToLocalStorage(token);
      toast.success(`Привет, ${user.name} !`);
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user, token } = payload;
      state.isLoading = false;
      state.user = user;
      state.token = token;
      addUserToLocalStorage(user);
      addTokenToLocalStorage(token);
      toast.success(`Добро пожаловать,  ${user.name} !`);
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });

    builder.addCase(editUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUserData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Данные сохранены!`);
    });
    builder.addCase(editUserData.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });

    builder.addCase(saveData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      toast.success(`Данные сохранены!`);
      state.chartData.push(payload.data);
    });
    builder.addCase(saveData.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });

    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // toast.success(`Данные сохранены!`);
      state.chartData = payload.data;
    });
    builder.addCase(getData.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});

export const { logOutUser, messageHandler, messageHandler2 } =
  userSlice.actions;
export default userSlice.reducer;
