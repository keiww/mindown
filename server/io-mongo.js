// server/ioctrl.js
const to = require('await-to-js').default

const url = require('url')
const mongoose = require('mongoose')

const Page = mongoose.model('Page')

module.exports = async (io, path) => {
  io.on('connection', async socket => {
    const slug = socket.handshake.query.slug
    console.log('connection:', slug)

    socket.join(slug)
    socket.emit('msg', `hi, ${slug}`)

    let [err, page] = await to(Page.findOne({ slug }))
    if (page) {
      console.log(`found ${slug} page in db: `, page)
      socket.emit('update', { text: page.text })
    } else {
      console.log(`cannot find ${slug} page in db: `)
    }

    socket.on('update', async (data) => {
      console.log('receive [update]:', data)
      if (page) {
        page.text = data.text
        page.timstamp = data.timestamp
        console.log(`update ${slug} page in db`)
      } else {
        page = new Page({
          slug: slug,
          timestamp: data.timestamp,
          text: data.text
        })
        await db.insert(page)
        console.log(`create ${slug} page in db`)
      }
      page.save(() => {
        socket.broadcast.to(slug).emit('update', data)
      })
    })

    socket.on('disconnect', socket => {
      console.log('disconnect:', slug)
    })
  })
}
