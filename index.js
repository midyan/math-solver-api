const q = require('q')
const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const async = require('async')
const appDir = process.env.PWD + '/'

/**
 * Function to execute tesseract command with the right
 * parameters
 * 1 - Write image file
 * 2 - Get file path
 * 3 - Exec tesseract
 * 4 - Read outputFile
 * 5 - Delete tempFile
 * 6 - Delete outputFile
 * 7 - Return result object in promise
 * @param  {object} options Object with the base64 string of the image, output
 *                          file name and langague to OCR
 * @return {promise}
 */
const execTesseract = (options) => {
  var dfd = q.defer()

  var funcArray = [
    (callback) => { // 1 && 2

      const timestamp = +new Date()
      const tempFilePath = appDir + 'temp/' + timestamp + '.jpg'
      const outPutFilePath = appDir + 'temp/' + timestamp + '_output'
      const outPutFile = outPutFilePath + '.txt'

      fs.writeFile(tempFilePath, options.data, 'base64', (err) => {
        // console.log(err)
        if (err) return callback(err)
        callback(null, tempFilePath, outPutFilePath, outPutFile, options)
      })
    },
    (tempFilePath, outPutFilePath, outPutFile, options, callback) => { // 3
      var command = 'tesseract ' + tempFilePath + ' -l ' + options.lang + ' ' + outPutFilePath
      exec(
        command,
        (err, stderr, stdout) => {
          if (err) return callback(err)
          // console.log(err)
          callback(null, tempFilePath, outPutFile, options)
        }
      )
    },
    (tempFilePath, outPutFile, options, callback) => { // 4
      fs.readFile(outPutFile, (err, fileContent) => {
        if (err) return callback(err)
        // console.log(err)
        callback(null, tempFilePath, outPutFile, options, fileContent)
      })
    },
    (tempFilePath, outPutFile, options, fileContent, callback) => { // 5
      conosole.log(5)
      fs.unlink(tempFilePath, (err) => {
        if (err) return callback(err)
        // console.log(err)
        callback(null, options, outPutFile, fileContent)
      })
    },
    (options, outPutFile, fileContent, callback) => { // 6
      fs.unlink(outPutFile, (err) => {
        if (err) return callback(err)
        // console.log(err)
        callback(null, options, fileContent)
      })
    },
    (options, fileContent, callback) => { // 7
      var finalObj = {
        fileContent: fileContent.toString()
      }
      callback(null, finalObj)
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  execTesseract: execTesseract
}
