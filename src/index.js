import "dotenv/config"; // NOTE: This should be on top, to use .env in all consequent files imported
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { ApolloServer, gql } from "apollo-server-express";

const port = process.env.PORT;

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    groups: [Group!]!
    group(id: ID!): Group!
  }

  type Mutation {
    createGroup(displayname: String!): Group!
    deleteGroup(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    groups: [Group!]
  }

  type Group {
    id: ID!
    displayname: String!
    users: [User!]
  }
`;

let users = {
  1: {
    id: "1",
    username: "Nehal Bhanushali",
    groupIds: ["1", "3"],
  },
  2: {
    id: "2",
    username: "Rydham Bhanushali",
    groupIds: ["2"],
  },
};

let groups = {
  1: {
    id: "1",
    displayname: "Admins",
    userIds: ["1"],
  },
  2: {
    id: "2",
    displayname: "Special",
    userIds: ["2"],
  },
  3: {
    id: "3",
    displayname: "Ops",
    userIds: ["1"],
  },
};

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    groups: () => {
      return Object.values(groups);
    },
    group: (parent, { id }) => {
      return groups[id];
    },
  },
  Mutation: {
    createGroup: (parent, { displayname }, { me }) => {
      const id = uuidv4();
      const group = {
        id,
        displayname,
      };
      groups[id] = group;
      return group;
    },
    deleteGroup: (parent, { id }) => {
      const { [id]: group, ...otherGroups } = groups;

      if (!group) {
        return false;
      }

      groups = otherGroups;

      return true;
    },
  },

  User: {
    groups: (user) => {
      return Object.values(groups).filter((group) =>
        user.groupIds.includes(group.id)
      );
    },
  },
  Group: {
    users: (group) => {
      return Object.values(users).filter((user) =>
        group.userIds.includes(user.id)
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

const app = express();

app.use(cors());

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  );
});

// console.log(process.env.MY_SECRET);
