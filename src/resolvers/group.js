import { v4 as uuidv4 } from "uuid";

const resolvers = {
  Query: {
    groups: (parent, args, { models }) => {
      return Object.values(models.groups);
    },
    group: (parent, { id }, { models }) => {
      return models.groups[id];
    },
  },
  Mutation: {
    createGroup: (parent, { displayname }, { me, models }) => {
      const id = uuidv4();
      const group = {
        id,
        displayname,
      };
      models.groups[id] = group;
      return group;
    },
    deleteGroup: (parent, { id }, { models }) => {
      const { [id]: group, ...otherGroups } = models.groups;

      if (!group) {
        return false;
      }

      models.groups = otherGroups;

      return true;
    },
  },
  Group: {
    users: (group, args, { models }) => {
      return Object.values(models.users).filter((user) =>
        group.userIds.includes(user.id)
      );
    },
  },
};

export default resolvers;
