const sqlite = require('sqlite')
const to = require('await-to-js').default

const table = 'pages'

const stringify = (obj) => {
  return Object.keys(obj).map(key => {
    return `${key}="${obj[key]}"`
  }).join(',')
}

let db = null

const orm = {
  init: async () => {
    if (this.db) return true
    const [err, _db] = await to(sqlite.open('./data.db', { Promise }))
    db = _db
    const query = `CREATE TABLE IF NOT EXISTS ${table} (
      slug text PRIMARY KEY,
      text text,
      timestamp text NOT NULL
    )`
    console.log(query)
    return await to(db.run(query))
  },
  update: async (condition, data) => {
    console.log(condition, data)
    const query = `UPDATE ${table} set ${stringify(data)} WHERE ${stringify(condition)}`
    console.log(query)
    return await to(db.run(query))
  },
  insert: async (data) => {
    const keys = Object.keys(data).join(',')
    const values = Object.values(data).map(v => `"${v}"`).join(',')
    const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`
    console.log(query)
    return db.run(query)
  },
  query: async (condition) => {
    const query = `SELECT * FROM ${table} WHERE ${stringify(condition)}`
    console.log(query)
    return await to(db.get(query))
  }
}


module.exports = orm
