require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./Routes/User.routes");
const { verifyAccessToken } = require("./helpers/jwt_helpers");

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// mongoose connection

mongoose
  .connect(
    "mongodb+srv://ZaheerDBUser:zahir%40216@cluster0.gnt9x.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "ECOMMERCEDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    // to start the server
    app.listen(process.env.PORT || 4000, () => {
      console.log("=============>>> APP STARTED <<<=============");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to DB");
  });

app.get("/", (req, res) => {
  res.send("PONG!");
});
app.use("/user", UserRoutes);
