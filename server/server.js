const express = require("express");
const cors = require("cors");
const sequelize = require("./util/db");
const router = require("./routes/index");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/urlmap", router.urlmap);

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.error(err.message);
  }
})();
