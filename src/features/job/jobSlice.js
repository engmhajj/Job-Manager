import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";
import {
  getAllJobs,
  hideLoading,
  showLoading,
} from "../allJobSlice/allJobSlice";
import authHeader from "../../utils/authHeader";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state, action) => {
      return {
        ...initialState,
        //we add this code so we can get our location to the add job. this is optional
        jobLocation: getUserFromLocalStorage?.jobLocation || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

//CreateAsyncThunk

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const response = await customFetch.post(
        "/jobs",
        job,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
      //basic setup

      // logout user
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging out");
      }
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
//editJob

// we removed the authentication token as we have included it in the custom fetch
export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const response = await customFetch.patch(`/jobs/${jobId}`, job);
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

//Delete Job

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const response = await customFetch.delete(`/jobs/${jobId}`);
      thunkAPI.dispatch(getAllJobs());
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

//export actions and reducer
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
