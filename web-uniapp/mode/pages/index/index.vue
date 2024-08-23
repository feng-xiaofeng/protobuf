<template>
	<view class="content">
		<button @click="getdata">Get Data</button>
		<button @click="postdata">Post Data</button>
	</view>
</template>

<script>
	import {
		User
	} from '../../proto/message_pb.js';
	import {
		decode as base64Decode,
		encode as base64Encode
	} from 'base64-arraybuffer';
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			postdata() {
			        let user = User.create();
			        user.id = 1;
			        user.name = "冯炬常";
			
			        // 序列化为二进制数据
			        let bytes = User.encode(user).finish();
			
			        // 创建 ArrayBuffer
			        let buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
			
			        uni.request({
			            url: 'http://127.0.0.1:8180/postData',
			            method: 'POST',
			            data: buffer, // 发送 ArrayBuffer 数据
			            header: {
			                'Content-Type': 'application/x-protobuf'
			            },
			            responseType: 'arraybuffer', // 确保接收二进制数据
			            success: (res) => {
			                console.log('发送成功', res);
			            },
			            fail: (err) => {
			                console.error('发送数据错误:', err);
			            }
			        });
			    },
			getdata() {
				uni.request({
					url: 'http://127.0.0.1:8180/getData', // 替换为您的后端 API 地址
					method: 'GET',
					responseType: 'arraybuffer', // 确保接收二进制数据
					success: (res) => {

						try {
							let arrayBuffer = res.data;
							let bytes = new Uint8Array(arrayBuffer); // 直接从 ArrayBuffer 创建 Uint8Array
							// 解码二进制数据
							let message = User.decode(bytes);

							// 转换为 JavaScript 对象
							let object = User.toObject(message, {
								longs: String,
								enums: String,
								bytes: String
							});

							console.log(object); // 输出反序列化后的对象
						} catch (error) {
							console.error('解码数据失败:', error);
						}
					},
					fail: (err) => {
						console.error('获取数据失败', err);
					}
				});
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>