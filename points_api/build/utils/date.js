var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/date.ts
var date_exports = {};
__export(date_exports, {
  dateUtils: () => dateUtils
});
module.exports = __toCommonJS(date_exports);
var DateUtils = class {
  getMonthAndYear() {
    const dateNow = /* @__PURE__ */ new Date();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    return `${month.toString().padStart(2, "0")}/${year.toString()}`;
  }
};
var dateUtils = new DateUtils();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dateUtils
});
