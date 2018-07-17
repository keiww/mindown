// src/socket.js

import io from 'socket.io-client'

const socket = io('/', {
  query: 'slug=' + window.location.pathname.replace(/^\//, '')
})

socket.on('connect', () => {
  console.log('connect')
})
socket.on('disconnect', () => {
  console.log('disconnect')
})
socket.on('msg', (msg) => {
  console.log('receive [msg]:', msg)
})

export default {
  update: (text) => {
    socket.emit('update', {
      timestamp: new Date().getTime(),
      text
    })
  },
  receiveUpdate: (cb) => {
    socket.on('update', (data) => {
      console.log('receive [update]:', data)
      cb(data.text)
    })
  }
}
