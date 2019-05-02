package server

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
	"websocket/impl"
)

var wsupgrader  = websocket.Upgrader{
	ReadBufferSize:   1024,
	WriteBufferSize:  1024,
	HandshakeTimeout: 5 * time.Second,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func wsHandlee(c *gin.Context) {
	wsconn,err := wsupgrader.Upgrade(c.Writer,c.Request,nil)
	if err != nil {
		http.NotFound(c.Writer, c.Request)
		return
	}
	conn , err := impl.InitConnection(wsconn)
	if  err != nil{
		goto ERR
	}

	for {
		data , err := conn.ReadMessage()
		log.Printf("%v",data)
		if err != nil{
			goto ERR
		}
		//data = append(data,[]byte("收到")...)
		if err = conn.WriteMessage(data);err !=nil{
			goto ERR
		}
	}

ERR:
	conn.Close()
}
