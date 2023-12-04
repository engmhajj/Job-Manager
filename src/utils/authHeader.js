// we created auth header so we don't copy each time the authentication and bearer
//Method 1 using thunkAPI - method 2 using axios interceptor
const authHeader = (thunkAPI) => {
  return {
    headers: {
      //getState() give access to the entire redux state including the user and job
      Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};
export default authHeader;
