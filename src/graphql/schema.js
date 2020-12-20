import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
  type Query {
    users: [user]
  }

  type userValidate {
    mensaje: String
    login: Boolean
    token: String
  }

  type user {
    _id: ID
    username: String!
    email: String!
    password: String!
    edad: Int
    image: String
  }

  input userInput {
    username: String!
    email: String!
    password: String!
    edad: Int
    image: String
  }

  type Mutation {
    createUser(input: userInput): user
    loginUser(username: String, password: String): userValidate
    validateToken(token: String): user
  }

`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
