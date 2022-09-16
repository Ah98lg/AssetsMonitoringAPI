import mongoose from "mongoose";
import routes from "./shared/routes/https/routes";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

// app.use("/uploads", express.static("./uploads"));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@monitoringapicluster.0vcy4nd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(parseInt(process.env.PORT || "3333"), () => {
      console.log(
        `Server started on port ${parseInt(process.env.PORT || "3333")}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
