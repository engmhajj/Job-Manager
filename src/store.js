//Redux is a state management libraries

//Redux is used to maintain and update data across your applications for multiple components to share, all while remaining independent of the components.
// Redux is used as an alternative of context API for state management

//Store is the entire state of the application
// here we collect all our reducer or feature or state so we can access them in the application
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobSlice from "./features/allJobSlice/allJobSlice";

export const store = configureStore({
  reducer: {
    user: userSlice, // here we connect the application to the user state
    job: jobSlice,
    allJobs: allJobSlice,
  },
});
