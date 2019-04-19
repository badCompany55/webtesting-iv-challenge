const users = require("../data/models/usersModel.js");
const db = require("../data/knexConfig.js");
const faker = require("faker");

let testUsers = [];
for (let i = 0; i < 49; i++) {
  testUsers.push({
    full_name: faker.name.findName()
  });
}
describe("Users Model", () => {
  beforeEach(() => {
    return db("users").truncate();
  });
  describe("add User method", () => {
    it("should insert a single user", async () => {
      await users.addNewUser({ full_name: "Zachery Irvin" });
      await users.addNewUser(testUsers);

      const insertObjectCheck = await db("users").first();
      const insertArrayCheck = await db("users");
      expect(insertArrayCheck.length).toBe(50);
      expect(insertObjectCheck).toHaveProperty("full_name", "Zachery Irvin");
    });
  });

  describe("delete User method", () => {
    afterEach(() => {
      return db("users").truncate();
    });
    it("should deleted the selected user, Selection occurs by id", async () => {
      await db("users").insert({ full_name: "Zachery Irvin" });
      await db("users").insert(testUsers);
      const theUsers = await db("users");
      expect(theUsers.length).toBe(50);
      await users.deleteUser(1);
      const newUsers = await db("users");
      const deletedUserById = await db("users")
        .where("id", 1)
        .first();
      const deletedUserByName = await db("users")
        .where("full_name", "Zachery Irvin")
        .first();
      expect(newUsers.length).toBe(49);
      expect(deletedUserById).toBe(undefined);
      expect(deletedUserByName).toBe(undefined);
    });
  });
});
