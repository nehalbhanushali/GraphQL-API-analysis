import { gql } from "apollo-server-express";

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

export default schema;
