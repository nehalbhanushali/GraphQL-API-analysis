import { combineResolvers } from "graphql-resolvers";

const resolvers = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    me: (parent, args, { me }) => {
      return me;
    },
  },

  Mutation: {
    updateUser: combineResolvers(
      async (parent, { id, username }, { models }) => {
        const user = await models.User.findByPk(id);
        return await user.update({ username });
      }
    ),

    deleteUser: combineResolvers(async (parent, { id }, { models }) => {
      return await models.User.destroy({
        where: { id },
      });
    }),
  },

  User: {
    groups: (user, args, { models }) => {
      // TODO: sequalize
      return Object.values(models.Group.findAll()).filter((group) =>
        user.groupIds.includes(group.id)
      );
    },
  },
};

export default resolvers;
