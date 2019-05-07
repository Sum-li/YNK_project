package websocket

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

var wsupgrader  = websocket.Upgrader{
	ReadBufferSize:   1024,
	WriteBufferSize:  1024,
	HandshakeTimeout: 5 * time.Second,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	SendID uint	`json:"send_id"`
	ReceiveID uint	`json:"receive_id"`
	Context string	`json:"context"`
}

func WsHandlee(c *gin.Context) {
	conn,err := wsupgrader.Upgrade(c.Writer,c.Request,nil)
	if err != nil {
		http.NotFound(c.Writer, c.Request)
		return
	}

	defer conn.Close()

	for {
		var Msg Message
		mt,data , err := conn.ReadMessage()
		if err != nil{
			return
		}
		//data = append(data,[]byte("收到")...)

		if err = conn.WriteMessage(mt,data);err !=nil{
			return
		}

		err = json.Unmarshal(data,&Msg)

		if err != nil {
			log.Printf("%#v",Msg)
		}
		log.Printf("%#v,%v",Msg,Msg.SendID)
	}

}
