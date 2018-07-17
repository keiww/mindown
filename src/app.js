// src/app.js

import './app.css'

import mapview from './mapview'
import socket from './socket'

const editor = document.querySelector('#editor')

editor.addEventListener('input', e => {
  const text = editor.innerText.trim()
  socket.update(text)
  mapview.update(text)
})

socket.receiveUpdate(text => {
  editor.innerText = text
  mapview.update(text)
})
