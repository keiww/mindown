const fs = require('fs')
const path = require('path')
const http = require('http')
const serve = require('koa-static')
const socket = require('socket.io')
const _ = require('koa-route')
const Koa = require('koa')

const utils = require('./utils')
const dblite = require('./dblite')
const io = require('./io-sqlite')
// require('./db')
// const io = require('./io-mongo')

const app = new Koa()
const server = http.createServer(app.callback())
io(socket(server))

const port = process.env.PORT || 8080
const staticPath = path.resolve(__dirname, '../static')
const indexPath = path.resolve(staticPath, 'index.html')

app.use(_.get('/', (ctx) => {
  const hash = utils.genHash()
  ctx.redirect(`/${hash}`)
}))

app.use(serve(staticPath))

app.use(_.get('/:path', (ctx, path, next) => {  
  // return index.html
  ctx.type = 'html'
  ctx.body = fs.createReadStream(indexPath)
}))


const run = async () => {
  await dblite.init()
  server.listen(port, () => {
    console.log(`=> http://localhost:${port}`)
  })
}

run()
