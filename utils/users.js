const users = [];

const userJoin = (id, username, room) => {
  const user = { is, username, room };
  users.push(user);
  return user;
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = { userJoin, getCurrentUser };
