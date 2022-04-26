import formidable from 'formidable'
import _ from 'lodash'
import fs from 'fs'

const parseData = async (req, res, next) => {
  const form = formidable({ keepExtensions: true, multiples: true })

  if (req?.headers?.['content-type']?.includes('multipart/form-data')) {
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json(err)

      req.body = fields
      req.files = files

      Object.keys(files).forEach((key) => {
        if (files[key].size > 0) {
          _.set(req.body, key, files[key])
        } else {
          fs.unlinkSync(files[key].filepath)
          delete req.files[key]
        }
      })

      return next()
    })
  } else {
    next()
  }
}

export default parseData
