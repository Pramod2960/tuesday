import { getUser } from "./jwt-service.js";

export const restrictToLoggedinUserOnly = (req, res, next) => {
  const userId = req.cookies.uid;
  if (!userId) return res.redirect("/auth/login");
  const user = getUser(userId);
  if (!user) return res.redirect("/auth/login");
  req.user = user;
  next();
};
