import mongoose from "mongoose";
import routes from "./shared/routes/https/routes";
import cors from "cors";
import express from "express";

require("dotenv").config();

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@monitoringapicluster.0vcy4nd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.use(express.json());
    app.use(routes);
    app.use(cors());
    app.listen(parseInt(process.env.PORT || "3333"), () => {
      console.log(
        `Server started on port ${parseInt(process.env.PORT || "3333")}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
