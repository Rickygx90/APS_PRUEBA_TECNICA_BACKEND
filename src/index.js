const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
import schema from "./graphql/schema";
const { mongoose } = require("./database");

//Settings
app.set("port", process.env.PORT || 5000);

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//Api graphql
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on Port: ${app.get("port")}`);
});
