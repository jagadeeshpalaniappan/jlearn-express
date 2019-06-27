// ------------------------------------------------ DB:
let id = 1;
let DB_MAX_LIMIT = 100;

const db = {
  users: [{ id: 101, name: "Jagadeesh" }]
};
const getUsers = async () => db["users"];
const getUser = async id => {
  const idx = db["users"].findIndex(user => user.id === id);
  if (idx === -1) {
    throw { code: "ERROR", msg: "GetFailed: invalid userId" };
  }
  return db["users"][idx];
};
const createUser = async user => {
  if (db["users"].length >= DB_MAX_LIMIT) {
    throw { code: "ERROR", msg: "UpdateFailed: invalid userId" };
  }
  db["users"].push({ id: id++, ...user });
  // throw { msg: 'Create Failed' };
  return { code: "SUCCESS" };
};
const updateUser = async (id, user) => {
  const idx = db["users"].findIndex(user => user.id === id);
  if (idx === -1) {
    throw { code: "ERROR", msg: "UpdateFailed: invalid userId" };
  }
  const existingUser = db["users"][idx];
  db["users"][idx] = { id: existingUser.id, ...user };
  return { code: "SUCCESS" };
};
const deleteUser = async id => {
  const idx = db["users"].findIndex(user => user.id === id);
  if (idx === -1) {
    throw { code: "ERROR", msg: "DeleteFailed: invalid userId" };
  }
  db["users"].splice(idx, 1);
  return { code: "SUCCESS" };
};
// ------------------------------------------------ /DB:

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
