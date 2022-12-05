import { v4 as uuidv4 } from "uuid";
import { combineResolvers } from "graphql-resolvers";

const resolvers = {
  Query: {
    groups: async (parent, args, { models }) => {
      return await models.Group.findAll();
    },
    group: async (parent, { id }, { models }) => {
      return await models.Group.findByPk(id);
    },
  },

  Mutation: {
    createGroup: combineResolvers(
      async (parent, { displayname }, { me, models }) => {
        const group = await models.Group.create({
          displayname,
        });

        return group;
      }
    ),

    deleteGroup: combineResolvers(async (parent, { id }, { models }) => {
      return await models.Group.destroy({ where: { id } });
    }),
  },

  Group: {
    users: (group, args, { models }) => {
      // TODO: sequalize
      return Object.values(models.User.findAll()).filter((user) =>
        group.userIds.includes(user.id)
      );
    },
  },
};

export default resolvers;
