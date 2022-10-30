import "dotenv/config"; // NOTE: This should be on top, to use .env in all consequent files imported
import cors from "cors";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const port = process.env.PORT;

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

let users = {
  1: {
    id: "1",
    username: "Nehal Bhanushali",
  },
  2: {
    id: "2",
    username: "Rydham Bhanushali",
  },
};

const me = users[1];

console.log("NEHAL ", me);

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const app = express();

app.use(cors());

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  );
});

console.log("Hello ever running Node.js project 1 with Express.");

// console.log(process.env.MY_SECRET);
