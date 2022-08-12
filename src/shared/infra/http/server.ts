import "reflect-metadata";
import "express-async-errors";
import express from "express";
import "dotenv/config";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandlerMiddleware);

const port = process.env.API_PORT ?? 8082;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}!`);
});
