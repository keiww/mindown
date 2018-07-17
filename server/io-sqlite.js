// server/io-sqlite.js

const url = require('url')
const db = require('./dblite')

module.exports = async (io, path) => {
  io.on('connection', async socket => {
    const slug = socket.handshake.query.slug
    console.log('connection:', slug)

    socket.join(slug)
    socket.emit('msg', `hi, ${slug}`)

    let [err, page] = await db.query({ slug }) 
    if (page) {
      console.log(`found ${slug} page in db: `, page)
      socket.emit('update', { text: page.text })
    } else {
      console.log(`cannot find ${slug} page in db: `)
    }

    socket.on('update', async (data) => {
      console.log('receive [update]:', data)
      if (page) {
        await db.update({ slug }, data)
        console.log(`update ${slug} page in db`)
      } else {
        page = {
          slug: slug,
          timestamp: data.timestamp,
          text: data.text
        }
        await db.insert(page)
        console.log(`create ${slug} page in db`)
      }
      socket.broadcast.to(slug).emit('update', data)
    })

    socket.on('disconnect', socket => {
      console.log('disconnect:', slug)
    })
  })
}
