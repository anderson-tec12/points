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

// src/services/users.service.ts
var users_service_exports = {};
__export(users_service_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(users_service_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
