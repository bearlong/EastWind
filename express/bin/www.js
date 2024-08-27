/**
 * Module dependencies.
 */

import app from '../app.js'
import debugLib from 'debug'
import http from 'http'
const debug = debugLib('node-express-es6:server')
import { exit } from 'node:process'
import WebSocket, { WebSocketServer } from 'ws'

// 導入dotenv 使用 .env 檔案中的設定值 process.env
import 'dotenv/config.js'

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '6005')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

const wss = new WebSocketServer({
  server,
})

const clients = {}
const userData = {}

wss.on('connection', (connection) => {
  console.log('新的使用者連線')

  connection.on('message', (message) => {
    const parsedMsg = JSON.parse(message)
    console.log(parsedMsg)
    // WebSocket.OPEN
    if (parsedMsg.type === 'register') {
      const { userID, username, user_img } = parsedMsg
      clients[userID] = connection // 儲存 WebSocket 連接對象
      userData[userID] = { username, user_img } // 儲存用戶資料
      connection.userID = userID
      const otherClients = Object.values(clients)
      const isUserIDIncluded = Object.keys(userData).some((id) => id === '62')
      if (userID === 62) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({ type: 'message', message: '客服人員已上線' })
            )
          }
        })
      }

      if (isUserIDIncluded) {
        if (clients[userID] && clients[userID].readyState === WebSocket.OPEN) {
          clients[userID].send(
            JSON.stringify({
              type: 'registered',
              message: '客服人員目前已在線上',
            })
          )
        }
      } else {
        if (clients[userID] && clients[userID].readyState === WebSocket.OPEN) {
          clients[userID].send(
            JSON.stringify({ type: 'registered', message: '客服人員未上線' })
          )
        }
      }
    }

    if (parsedMsg.type === 'message') {
      const { message } = parsedMsg
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', message }))
        }
      })
    }
    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(message)
    //   }
    // })
  })

  connection.on('close', () => {
    console.log('使用者已經斷線')
    Object.keys(clients).forEach((userID) => {
      if (clients[userID] === connection) {
        delete clients[userID]
        delete userData[userID]
      }
    })
    const isUserIDIncluded = Object.keys(userData).some((id) => id === '62')
    if (!isUserIDIncluded) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({ type: 'message', message: '客服人員目前不在線上' })
          )
        }
      })
    }
  })
})

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
