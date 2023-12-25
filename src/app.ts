import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import authRouter from "./routes/auth";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api", router);
app.use("/auth", authRouter);

// api not found
app.all("*", notFound);

app.use(globalErrorHandler);

export default app;
