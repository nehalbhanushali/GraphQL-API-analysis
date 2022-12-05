const getGroupModel = (sequelize, { DataTypes }) => {
  const Group = sequelize.define("group", {
    displayname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Group.associate = (models) => {
    Group.hasMany(models.User, { onDelete: "CASCADE" });
  };

  return Group;
};

export default getGroupModel;
