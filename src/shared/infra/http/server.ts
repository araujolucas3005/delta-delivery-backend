import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import "../../container";
import express from "express";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { routes } from "./routes";
import { fileStorageFolder } from "./config/multerConfig";

const app = express();

app.use(express.json());
app.use(express.static(fileStorageFolder));
app.use(routes);
app.use(errorHandlerMiddleware);

const port = process.env.PORT ?? process.env.API_PORT ?? 8082;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}!`);
});
