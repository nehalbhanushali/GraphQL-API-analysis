const resolvers = {
  Query: {
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    user: (parent, { id }, { models }) => {
      return models.users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
  },
  User: {
    groups: (user, args, { models }) => {
      return Object.values(models.groups).filter((group) =>
        user.groupIds.includes(group.id)
      );
    },
  },
};

export default resolvers;
