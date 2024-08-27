import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'

export default function Chat() {
  const [ws, setWs] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const { user, loading } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && !loading) {
      if (user) {
        const socket = new WebSocket('ws://localhost:3005')
        setWs(socket)
        socket.onopen = (event) => {
          console.log('WebSocket 連線已建立')
          let params = {
            type: 'register',
            userID: user.id,
            username: user.username,
            user_img: user.user_img,
          }
          socket.send(JSON.stringify(params))
        }

        socket.onmessage = async (event) => {
          let result = JSON.parse(event.data)
          if (result.type === 'registered') {
            setMessages((prevMessages) => [...prevMessages, result.message])
          }
          if (result.type === 'message') {
            setMessages((prevMessages) => [...prevMessages, result.message])
          }
          if (result.type === 'disconnected') {
            setMessages((prevMessages) => [...prevMessages, result.message])
          }
        }

        socket.onclose = () => {
          console.log('WebSocket 連線已關閉')
        }

        return () => {
          socket.close()
        }
      }
    }
  }, [router.isReady, user])
  //   useEffect(() => {
  //     // 建立 WebSocket 连接
  //   }, [])

  const sendMessage = () => {
    let params = {
      type: 'message',
      userID: user.id,
      message: message,
    }
    if (ws) {
      ws.send(JSON.stringify(params))
      setMessage('')
    }
  }

  return (
    <div>
      <h1>客服</h1>
      <div className="chatBox">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>送出</button>
    </div>
  )
}
