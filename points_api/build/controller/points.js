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

// src/controller/points.ts
var points_exports = {};
__export(points_exports, {
  pointsRoutes: () => pointsRoutes
});
module.exports = __toCommonJS(points_exports);
var import_zod = require("zod");

// src/utils/date.ts
var DateUtils = class {
  getMonthAndYear() {
    const dateNow = /* @__PURE__ */ new Date();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    return `${month.toString().padStart(2, "0")}/${year.toString()}`;
  }
};
var dateUtils = new DateUtils();

// src/services/points.service.ts
var import_node_crypto = __toESM(require("crypto"));
var PointsService = class {
  constructor(driver) {
    this.driver = driver;
  }
  table = "points";
  async insert({ description, month, userId, value }) {
    return await this.driver(this.table).insert({
      id: import_node_crypto.default.randomUUID(),
      message: description,
      month,
      user_id: userId,
      value
    });
  }
  async listPointsOnUser(userId, month) {
    return await this.driver(this.table).where({
      user_id: userId,
      month
    }).select("*");
  }
  async resumeAll(users, month) {
    return async () => {
      const values = [];
      for (const user of users) {
        const points = await this.driver(this.table).where({
          user_id: user.id,
          month
        }).select("*");
        values.push({
          userName: user.name,
          points,
          userId: user.id
        });
      }
      return values;
    };
  }
};

// src/services/users.service.ts
var import_node_crypto2 = __toESM(require("crypto"));
var UserService = class {
  constructor(driver) {
    this.driver = driver;
  }
  table = "users";
  usersInsertList(list) {
    return async () => {
      for (const user of list) {
        await this.driver(this.table).insert({
          id: import_node_crypto2.default.randomUUID(),
          name: user
        });
      }
    };
  }
  async insertUser(name) {
    await this.driver(this.table).insert({
      id: import_node_crypto2.default.randomUUID(),
      name
    });
  }
  async listUsers() {
    return await this.driver(this.table).select();
  }
};

// src/controller/points.ts
function pointsRoutes(knex) {
  return async (app) => {
    app.get(
      "/:idUser",
      async (request, reply) => {
        try {
          const paramsSchemaValidate = import_zod.z.object({
            idUser: import_zod.z.string()
          });
          const { idUser } = paramsSchemaValidate.parse(request.params);
          const pointsService = new PointsService(knex);
          const monthCurrent = dateUtils.getMonthAndYear();
          const pointsUser = await pointsService.listPointsOnUser(
            idUser,
            monthCurrent
          );
          const totalPointsInCurrentMonth = pointsUser.reduce((acc, point) => {
            acc += point.value;
            return acc;
          }, 0);
          reply.status(200).send({
            points: pointsUser,
            total: totalPointsInCurrentMonth,
            month: monthCurrent
          });
        } catch (e) {
          reply.status(500).send({ error: e });
        }
      }
    );
    app.post("/", async (request, reply) => {
      const insertPointsBodySchema = import_zod.z.object({
        description: import_zod.z.string(),
        userId: import_zod.z.string(),
        value: import_zod.z.coerce.number()
      });
      const { description, userId, value } = insertPointsBodySchema.parse(
        request.body
      );
      const pointsService = new PointsService(knex);
      const point = await pointsService.insert({
        description,
        userId,
        value,
        month: dateUtils.getMonthAndYear()
      });
      reply.status(200).send(point);
    });
    app.get("/resume", async (request, reply) => {
      const pointsService = new PointsService(knex);
      const userService = new UserService(knex);
      const monthCurrent = dateUtils.getMonthAndYear();
      const allUsers = await userService.listUsers();
      const resumeFactory = await pointsService.resumeAll(
        allUsers,
        monthCurrent
      );
      const resume = await await resumeFactory();
      const resumeFormatted = resume.map((user) => {
        const total = user.points.reduce((acc, points) => {
          acc = acc + points.value;
          return acc;
        }, 0);
        return {
          total,
          userName: user.userName,
          userId: user.userId
        };
      });
      reply.status(200).send({
        resumeFormatted
      });
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pointsRoutes
});
