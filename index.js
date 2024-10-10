const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");
mongoose.set('strictQuery', false);

//acquiring routes
const userRoute = require("./routes/user.routes");
const cropRoute = require('./routes/crops.routes');

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 8001;

//mongodb connect
mongoose
  .connect("mongodb://127.0.0.1:27017/kisan")
  .then((e) => console.log("MongoDB Connected"));

  //setting up templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

//home route
app.get("/", async (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

//crop route
app.use('/', cropRoute);

//user route
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
