import "dotenv/config"; // NOTE: This should be on top, to use .env in all consequent files imported
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models from "./models";

const port = process.env.PORT;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

const app = express();

app.use(cors());

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
});

// console.log(process.env.MY_SECRET);
