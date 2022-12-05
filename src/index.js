import "dotenv/config"; // NOTE: This should be on top, to use .env in all consequent files imported
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import { createApolloProfilerPlugin } from "@econify/graphql-request-profiler"; // Request profiling
import depthLimit from "graphql-depth-limit"; // Making GraphQL secure

import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";

const port = process.env.PORT;

const server = new ApolloServer({
  typeDefs: schema,
  validationRules: [depthLimit(3)],
  resolvers,
  context: {
    models,
    // me: models.users[1], // TODO: get me from jwt
  },
  plugins: [createApolloProfilerPlugin()],
});

const app = express();

app.use(cors());

// To re-initialize your database on every server start
const eraseDatabaseOnSync = false;

server.start().then((res) => {
  server.applyMiddleware({ app });
  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      createUsersWithGroups();
    }
    app.listen({ port: port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    );
  });
});

const createUsersWithGroups = async () => {
  await models.User.create(
    {
      username: "nehal",
      groups: [
        {
          displayname: "Admins",
        },
      ],
    },
    {
      include: [models.Group],
    }
  );

  await models.User.create(
    {
      username: "rydham",
      groups: [
        {
          displayname: "moderators",
        },
        {
          displayname: "Ops",
        },
      ],
    },
    {
      include: [models.Group],
    }
  );

  await models.User.create(
    {
      username: "vishal",
      groups: [
        {
          displayname: "auditors",
        },
      ],
    },
    {
      include: [models.Group],
    }
  );
};

// console.log(process.env.MY_SECRET);
