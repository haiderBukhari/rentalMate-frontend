export const registerUser = (userData) => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const isUserExist = existingUsers.some(
    (user) => user.email === userData.email
  );

  if (!isUserExist) {
    existingUsers.push(userData);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    return true;
  }

  return false;
};

export const loginUser = (userData) => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = existingUsers.find(
    (u) => u.email === userData.email && u.password === userData.password
  );

  return user;
};

export const isUserRegistered = (email) => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  return existingUsers.some((user) => user.email === email);
};
