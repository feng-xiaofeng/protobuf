"use strict";
const common_vendor = require("../../common/vendor.js");
const proto_message_pb = require("../../proto/message_pb.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    postdata() {
      let user = proto_message_pb.User.create();
      user.id = 1;
      user.name = "John Doe";
      let bytes = proto_message_pb.User.encode(user).finish();
      console.log("Serialized bytes:", bytes);
      let buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/receive",
        method: "POST",
        data: buffer,
        // 发送 ArrayBuffer 数据
        header: {
          "Content-Type": "application/x-protobuf"
        },
        responseType: "arraybuffer",
        // 确保接收二进制数据
        success: (res) => {
          console.log("Data sent successfully", res);
        },
        fail: (err) => {
          console.error("Error sending data:", err);
        }
      });
    },
    getdata() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/compiled",
        // 替换为您的后端 API 地址
        method: "GET",
        responseType: "arraybuffer",
        // 确保接收二进制数据
        success: (res) => {
          try {
            let arrayBuffer = res.data;
            let bytes = new Uint8Array(arrayBuffer);
            console.log(bytes);
            let message = proto_message_pb.User.decode(bytes);
            let object = proto_message_pb.User.toObject(message, {
              longs: String,
              enums: String,
              bytes: String
            });
            console.log(object);
          } catch (error) {
            console.error("Failed to decode data:", error);
          }
        },
        fail: (err) => {
          console.error("Failed to fetch data", err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getdata && $options.getdata(...args)),
    b: common_vendor.o((...args) => $options.postdata && $options.postdata(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "H:/桌面/go-grpc/uni-app/mode8/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
