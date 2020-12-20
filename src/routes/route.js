const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { user, password } = req.body;

  try {
    jwt.sign({ user, password }, "secretkey", (err, token) => {
      console.log(token);
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/verify", verifyToken, (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          mensaje: "Post fue creado",
          authData,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
