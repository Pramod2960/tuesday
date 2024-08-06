import express from "express";
import env from "dotenv/config";
import cookieParser from "cookie-parser";
import connect_db from "./model/db.js";

import auth from "./routes/auth.js";
import board from "./routes/board.js";

import { restrictToLoggedinUserOnly } from "./middleware.js";

const app = express();

//db
connect_db();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/auth", auth);
app.use("/board", restrictToLoggedinUserOnly, board);

//listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
