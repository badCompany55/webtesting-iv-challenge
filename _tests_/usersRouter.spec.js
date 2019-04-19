const server = require("../server.js");
const request = require("supertest");
const db = require("../data/knexConfig.js");

beforeEach(() => {
  return db("users").truncate();
});
// afterEach(() => {
//   return db("users").truncate();
// });

describe("server", () => {
  it("should set testing env", () => {
    const env = process.env.DB_ENV;
    expect(env).toBe("testing");
  });

  describe("/api/users GET", () => {
    it("return status 200, return json obj", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
    });

    it("returns the err message upon unsuccessful get", async () => {
      const res = await request(server).get("/api/user");
      expect(res.status).toBe(404);
    });
  });

  describe("api/users POST", () => {
    it("returns status 201 on success", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ full_name: "Debbie" });
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
    });

    it("returns status 409 for duplicate username, gives reason in the payload", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ full_name: "Debbie" });
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");

      const dupRes = await request(server)
        .post("/api/users")
        .send({ full_name: "Debbie" });
      expect(dupRes.status).toBe(409);
      expect(res.type).toBe("application/json");
    });
    it("returns status 400 if full_name isn't provided", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ full_name: "" });
      expect(res.status).toBe(400);
      expect(res.type).toBe("application/json");
    });
  });
});
