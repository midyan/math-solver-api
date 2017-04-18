const Tesseract = require('tesseract.js')
const q = require('q')
const fs = require('fs')
const math = require('mathjs')
const exec = require('child_process').exec
const _ = require('lodash')
const path = require('path')
const async = require('async')
const appDir = path.resolve(__dirname) + '/'

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
      var timestamp = +new Date()
      var tempFilePath = appDir + 'temp/' + timestamp + '.jpg'
      var outPutFilePath = appDir + 'temp/' + timestamp + '_output'
      fs.writeFile(tempFilePath, options.data, 'base64', (err) => {
        // console.log(err)
        if (err) return callback(err)
        callback(null, tempFilePath, outPutFilePath, options)
      })
    },
    (tempFilePath, outPutFilePath, options, callback) => { // 3
      var command = 'tesseract ' + tempFilePath + ' -l ' + options.lang + ' ' + outPutFilePath
      exec(
        command,
        (err, stderr, stdout) => {
          if (err) return callback(err)
          // console.log(err)
          callback(null, tempFilePath, outPutFilePath, options)
        }
      )
    },
    (tempFilePath, outPutFilePath, options, callback) => { // 4
      outPutFilePath = outPutFilePath + '.txt'
      fs.readFile(outPutFilePath, (err, fileContent) => {
        if (err) return callback(err)
        // console.log(err)
        callback(null, tempFilePath, outPutFilePath, options, fileContent)
      })
    },
    (tempFilePath, outPutFilePath, options, fileContent, callback) => { // 5
      fs.unlink(tempFilePath, (err) => {
        if (err) return callback(err)
        // console.log(err)
        callback(null, options, outPutFilePath, fileContent)
      })
    },
    (options, outPutFilePath, fileContent, callback) => { // 6
      fs.unlink(outPutFilePath, (err) => {
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
