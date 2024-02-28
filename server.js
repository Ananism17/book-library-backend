import express from "express";
import dotenv from "dotenv";

//routes
import userRoutes from "./routes/userRoutes.js";

//middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

//configs
import connectDB from "./config/db.js";

//cookie-parser
import cookieParser from "cookie-parser";

//env-config
dotenv.config();

//connect-db
connectDB();

//init-app-port
const app = express();
const port = process.env.PORT || 5555;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.use("/api/users", userRoutes);

//error-middlewares
app.use(notFound);
app.use(errorHandler);

//start-server
app.listen(port, () => {
  console.log("Listening on port", port);
});

export default app;
