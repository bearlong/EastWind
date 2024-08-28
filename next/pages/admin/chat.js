import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import AdminCenterLayout from '@/components/layout/admin-layout'
import styles from '@/styles/bearlong/chat.module.scss'
import Image from 'next/image'

export default function Chat() {
  const [ws, setWs] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [userInfo, setUserInfo] = useState([])
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
            if (result.userInfo) {
              setUserInfo(result.userInfo)
            }
          }
          if (result.type === 'message') {
            const newMessage = result.fromID + ': ' + result.message
            if (result.userInfo) {
              setUserInfo([...userInfo, result.userInfo])
              console.log(result.userInfo)
            }
            setMessages((prevMessages) => [...prevMessages, newMessage])
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
      message: message,
      userID: user.id,
      targetUserID: 1,
    }
    if (ws) {
      ws.send(JSON.stringify(params))
      setMessage('')
    }
  }

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['menber-info-box-bo']}>
          <div className={`${styles['chatArea-bl']} p`}>
            <div className={`${styles['chatBox']} mb-3`}>
              {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
            <div className={`${styles['chatInput-bl']} d-flex`}>
              <input
                type="text"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>送出</button>
            </div>
          </div>
          <div className={`${styles['memberInfo-bl']}`}>
            <h5 className="text-center mb-3">客服列表</h5>
            <div
              className={`${styles['infoCard-bl']} ${styles['active']} mb-3`}
            >
              <div className="d-flex align-items-center me-3">
                <Image
                  src={`/images/boyu/users/user1.jpg`}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-circle me-3"
                />
                <h6>Bearlong</h6>
              </div>
              <p className={`${styles['message']} p`}>
                臣亮言：先帝創業未半而中道崩殂，今天下三分，益州疲弊
              </p>
            </div>
            <div className={`${styles['infoCard-bl']} mb-3`}>
              <div className="d-flex align-items-center me-3">
                <Image
                  src={`/images/boyu/users/user1.jpg`}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-circle me-3"
                />
                <h6>Bearlong</h6>
              </div>
              <p className={`${styles['message']} p`}>
                臣亮言：先帝創業未半而中道崩殂，今天下三分，益州疲弊
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Chat.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
