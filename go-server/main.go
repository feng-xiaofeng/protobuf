package main

import (
	"fmt"
	"io"
	"net/http"

	pb "go-server/proto/service"

	"github.com/gin-gonic/gin"
	"google.golang.org/protobuf/proto"
)

func main() {
	r := gin.Default()
	r.Use(Cors())
	r.GET("/getData", func(c *gin.Context) {
		data := &pb.User{
			Id:   1,
			Name: "冯小词",
		}

		out, err := proto.Marshal(data)
		if err != nil {
			c.String(http.StatusInternalServerError, "数据编码失败")
			return
		}
		// 返回响应
		c.Data(http.StatusOK, "application/x-protobuf", out)
	})
	r.POST("/postData", func(c *gin.Context) {
		// 读取请求体
		body, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.String(http.StatusInternalServerError, "读取请求正文失败")
			return
		}

		// 创建一个 protobuf 消息结构体
		var data1 pb.User

		// 使用 proto.Unmarshal 反序列化数据
		err = proto.Unmarshal(body, &data1)
		if err != nil {
			c.String(http.StatusBadRequest, "解码protobuf数据失败")
			fmt.Println("数据错误:", err)
			return
		}

		// 打印解码后的数据
		fmt.Println(data1.Id)
		fmt.Println(data1.Name)
		// fmt.Printf("Decoded data: %+v\n", data1)

		// 返回成功状态
		c.String(http.StatusOK, "数据接收和解码成功")
	})

	r.Run(":8180") // 启动服务器
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.JSON(http.StatusOK, "Options Request!")
			return
		}

		c.Next()
	}
}
