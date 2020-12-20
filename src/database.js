const mongoose = require("mongoose");
const path = require("path");

//Importar variables de entorno locales
require("dotenv").config({ path: path.join(__dirname,"../variables.env") });

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
