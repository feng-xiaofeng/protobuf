"use strict";
const common_vendor = require("../common/vendor.js");
const $Reader = common_vendor.minimal.Reader, $Writer = common_vendor.minimal.Writer, $util = common_vendor.minimal.util;
const $root = common_vendor.minimal.roots["default"] || (common_vendor.minimal.roots["default"] = {});
const User = $root.User = (() => {
  function User2(properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null)
          this[keys[i]] = properties[keys[i]];
    }
  }
  User2.prototype.id = 0;
  User2.prototype.name = "";
  User2.create = function create(properties) {
    return new User2(properties);
  };
  User2.encode = function encode(message, writer) {
    if (!writer)
      writer = $Writer.create();
    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
      writer.uint32(
        /* id 1, wireType 0 =*/
        8
      ).int32(message.id);
    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
      writer.uint32(
        /* id 2, wireType 2 =*/
        18
      ).string(message.name);
    return writer;
  };
  User2.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };
  User2.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader))
      reader = $Reader.create(reader);
    let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.User();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.id = reader.int32();
          break;
        }
        case 2: {
          message.name = reader.string();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };
  User2.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader))
      reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };
  User2.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.id != null && message.hasOwnProperty("id")) {
      if (!$util.isInteger(message.id))
        return "id: integer expected";
    }
    if (message.name != null && message.hasOwnProperty("name")) {
      if (!$util.isString(message.name))
        return "name: string expected";
    }
    return null;
  };
  User2.fromObject = function fromObject(object) {
    if (object instanceof $root.User)
      return object;
    let message = new $root.User();
    if (object.id != null)
      message.id = object.id | 0;
    if (object.name != null)
      message.name = String(object.name);
    return message;
  };
  User2.toObject = function toObject(message, options) {
    if (!options)
      options = {};
    let object = {};
    if (options.defaults) {
      object.id = 0;
      object.name = "";
    }
    if (message.id != null && message.hasOwnProperty("id"))
      object.id = message.id;
    if (message.name != null && message.hasOwnProperty("name"))
      object.name = message.name;
    return object;
  };
  User2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, common_vendor.minimal.util.toJSONOptions);
  };
  User2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === void 0) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/User";
  };
  return User2;
})();
exports.User = User;
