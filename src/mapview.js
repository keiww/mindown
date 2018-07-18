// src/mapview.js

import parse from 'markmap/parse.markdown.js'
import transform from 'markmap/transform.headings.js'
import Markmap from 'markmap/view.mindmap.js'

const mapview = document.querySelector('#mapview')

let markmap = null
const mindmapOpt = {
  preset: 'colorful', // [default, colorful]
  linkShape: 'diagonal' // [diagonal, bracket]
}

export default {
  update: (text) => {
    text = (text || '')
    if (!text) {
      markmap = null
      mapview.innerHTML = ''
      return false
    }

    const headings = parse(text)
    const data = transform(headings)

    if (markmap === null) {
      markmap = new Markmap('#mapview', data, mindmapOpt)
    } else {
      markmap
        .setData(data)
        .set({duration: 0})
        .update()    
    }
  }
}
