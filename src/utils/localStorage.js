export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  //The JSON. stringify() method converts JavaScript objects into strings. When sending data to a web server the data has to be a string.
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null; //parse() JSON parsing is the process of converting a JSON object in text format to a Javascript object that can be used inside a program.
  return user;
};
