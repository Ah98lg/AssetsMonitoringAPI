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

app.use("/uploads", express.static("./uploads"));

app.use(
  cors({
    origin: "https://assets-monitoring.herokuapp.com/",
    credentials: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@monitoringapicluster.0vcy4nd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.use(express.json());
    app.use(routes);
    app.listen(parseInt(process.env.PORT || "3333"), () => {
      console.log(
        `Server started on port ${parseInt(process.env.PORT || "3333")}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
