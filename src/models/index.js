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

export default {
  users,
  groups,
};
