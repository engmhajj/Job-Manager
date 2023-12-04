import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { clearAllJobsState } from "../allJobSlice/allJobSlice";
import { clearValues } from "../job/jobSlice";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

//createAsyncThunk: Redux-thunk is used for asychronous logic (tasks).
//CreateAsyncThunk is where we perform asychronous tasks in our slice. It receives two parameters

//name of the action, the standard convention is "[slice name]/[action name]" such as "posts/fetchPosts"
//The callback function that performs the API call and returns the result when it is finished. Our API call returns a promise (which is an object that represents the status of an asynchronous operation, in our case an API call).
//For each action that is created using createAsyncThunk, there are three probable state for the promise returned. pending, fulfilled, rejected.
export const registerUser = createAsyncThunk(
  "user/registerUser", //action type (what is the action)
  async (user, thunkAPI) => {
    //what the action will do
    //callback function for what the action will do
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data;
    } catch (error) {
      if (error.message === "Network Error") {
        return thunkAPI.rejectWithValue("Connection error");
      }
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser", //action name that we want to perform (what is the action)
  async (user, thunkAPI) => {
    //callback function for what the action will do
    //the user parameter come from the login dispatch in the onSubmit function from the login page
    try {
      const response = await customFetch.post("/auth/login", user);

      return response.data;
    } catch (error) {
      if (error.message === "Network Error") {
        return thunkAPI.rejectWithValue("Connection error");
      }
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser", //action type (what is the action)
  async (user, thunkAPI) => {
    //this user come from the
    try {
      const response = await customFetch.patch("/auth/updateUser", user);
      return response.data; // if successful the data is sent to the extra reducer so we can do something with them, like update our states
    } catch (error) {
      //in case we have error 401(invalid token for some reason, it is safer to logout the user not to just say invalid authentication)

      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (message, thunkAPI) => {
    try {
      //logout
      thunkAPI.dispatch(logoutUser(message));
      thunkAPI.dispatch(clearAllJobsState());
      thunkAPI.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  // in reducer we write the functions that we need to use in the code to modify the state accordingly
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },

  //extraReducers:
  //--------------
  //You use extraReducers to handle actions that are created by createAsyncThunk. Based on the status of the promise, we will update our state.
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        //here we destructure payload from action
        // this user come from the server, the payload is the return.data that come from the server

        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        // this user come from the return.data if the promise is fulfilled
        //in the loginUser the data come from the server
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        //here we update our state from the data that is received from the server
        // this user come from the return.data if the promise is fulfilled
        //in the updateUser the data come from the server
        const { user } = payload;

        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`user updated ${user.name}`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an Error");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions; // export the actions that modify the state
export default userSlice.reducer;
