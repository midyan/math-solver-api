const chai = require('chai')
const fs = require('fs')
const path = require('path')
const appDir = (path.resolve(__dirname) + '/').replace('tests/', '')
const mainFile = require('../index.js')

var expect = chai.expect

describe('First build and test', () => {
  it('should built without error', function(done) {
    console.log('built without error')
    done()
  })
})

describe('Tesseract testing', () => {
  describe('should recognize small text from web', () => {
    it('return image content from base64', function(done){
      this.timeout(20000)
      fs.readFile(
        appDir + '/texts/clean_photo_test.jpg',
        (err, result) => {
          if (err) {
            done(err)
          } else {
            mainFile
              .execTesseract({
                data: new Buffer(result).toString('base64'),
                lang: 'eng'
              })
              .then(result =>{
                expect(result).to.be.an('object')
                console.log(result)
                done()
              })
              .catch(err => {
                if(err) done(err)
              })
          }
        }
      )
    })
  })
})
