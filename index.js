const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("express").Router();

const dotenv = require("dotenv");
const port = 3000;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/movie', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

  router.post("/register", async (req, res) => {
    const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user);
      } catch (err) {   
        res.status(500).json(err);
      }
    });
  app.use(express.json())


  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/movies", movieRoute);
  app.use("/api/lists", listRoute);


  app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`),
);