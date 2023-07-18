const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJWT = require("./auth/authJWT");
const errorHandler = require("./auth/errorHandler");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJWT());
app.use(errorHandler);


const usersRoutes = require("./routes/users");
const nicRoutes = require("./routes/nic");

app.use(`/api/users`, usersRoutes);
app.use(`/api/nic`, nicRoutes);


//Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "user-database",
    })
    .then(() => {
        console.log("Database Connection is ready...");
    })
    .catch((err) => {
        console.log(err);
    });

//Server
app.listen(8000, () => {
    console.log("server is running http://localhost:8000");
});
