var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller/users.ts
var users_exports = {};
__export(users_exports, {
  usersRoutes: () => usersRoutes
});
module.exports = __toCommonJS(users_exports);
var import_zod = require("zod");

// src/services/users.service.ts
var import_node_crypto = __toESM(require("crypto"));
var UserService = class {
  constructor(driver) {
    this.driver = driver;
  }
  table = "users";
  usersInsertList(list) {
    return async () => {
      for (const user of list) {
        await this.driver(this.table).insert({
          id: import_node_crypto.default.randomUUID(),
          name: user
        });
      }
    };
  }
  async insertUser(name) {
    await this.driver(this.table).insert({
      id: import_node_crypto.default.randomUUID(),
      name
    });
  }
  async listUsers() {
    return await this.driver(this.table).select();
  }
};

// src/controller/users.ts
function usersRoutes(knex) {
  return async (app) => {
    app.post("/", async (request, reply) => {
      try {
        const createUserBodySchema = import_zod.z.object({
          name: import_zod.z.string()
        });
        const { name } = createUserBodySchema.parse(request.body);
        const userService = new UserService(knex);
        await userService.insertUser(name);
        reply.status(200).send();
      } catch {
        reply.status(404).send({ message: "Error" });
      }
    });
    app.post("/list", async (request, reply) => {
      try {
        const createUsersBodySchema = import_zod.z.object({
          usersName: import_zod.z.string().array()
        });
        const { usersName } = createUsersBodySchema.parse(request.body);
        const userService = new UserService(knex);
        await userService.usersInsertList(usersName)();
        reply.status(201);
      } catch (e) {
        console.error("Error in process List user names");
        console.error({ e });
        reply.status(500);
      }
    });
    app.get("/", async (request, reply) => {
      const userService = new UserService(knex);
      const users = await userService.listUsers();
      reply.status(200).send({ users });
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usersRoutes
});
