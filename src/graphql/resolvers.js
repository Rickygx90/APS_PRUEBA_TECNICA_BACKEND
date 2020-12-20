import User from "../models/User";
const jwt = require("jsonwebtoken");

export const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    },
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (user && user.username) {
        if (user.password === password) {
          const token = jwt.sign(
            { username: user.username, password: user.password },
            "secretkey"
          );
          return {
            mensaje: "Login Correcto",
            login: true,
            token,
          };
        } else {
          return {
            mensaje: "Contraseña incorrecta",
            login: false,
            token: null,
          };
        }
      } else {
        return {
          mensaje: "Usuario no registrado",
          login: false,
          token: null,
        };
      }
    },
    validateToken: async (_, { token }) => {
      const decode = jwt.verify(token, "secretkey", function (err, decoded) {
        if (err) return err;
        return decoded;
      });
      const user = await User.findOne({ username: decode.username });
      return user;
    },
  },
};
