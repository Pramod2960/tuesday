import jwt from "jsonwebtoken";

const setUser = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET
  );
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log("error in finding the token", error);
  }
};
export { setUser, getUser };
