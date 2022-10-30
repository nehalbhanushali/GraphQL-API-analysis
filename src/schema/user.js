import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
    groups: [Group!]
  }
`;

export default schema;
