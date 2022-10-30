import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    groups: [Group!]!
    group(id: ID!): Group!
  }

  extend type Mutation {
    createGroup(displayname: String!): Group!
    deleteGroup(id: ID!): Boolean!
  }

  type Group {
    id: ID!
    displayname: String!
    users: [User!]
  }
`;

export default schema;
