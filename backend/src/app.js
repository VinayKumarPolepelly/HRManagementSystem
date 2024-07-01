import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Frontend domain
  credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);
export default app;
