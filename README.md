# **tesseract-wrapper**
  Simple module for executing tesseract command to read a base64 image file.

[![Build Status](https://travis-ci.org/midyan/tesseract-wrapper.svg?branch=master)](https://travis-ci.org/midyan/tesseract-wrapper)
[![npm version](https://badge.fury.io/js/tesseract-wrapper.svg)](https://badge.fury.io/js/tesseract-wrapper)

# PLEASE NOTE
  This module is open for public usage, but I have developed it solely for creating an API endpoint on a private VPS. It has a hard dependency of [tesseract](https://github.com/tesseract-ocr). You need to have it compiled and its CLI working to use this module. Please read [this](https://github.com/tesseract-ocr/tesseract/wiki/Compiling).
  This is why there is no TravisCI for the module for now, I plan creating a complex deployment later on. If you wanna help, I'd be more than glad to work with you.

## Installation and usage:
  ```
  $ npm install tesseract-wrapper
  ```
  then
  ```javascript
  var tesseract_wrapper = require('tesseract-wrapper')
  ```
  or (ES6)
  ```javascript
  import { tesseract-wrapper } from 'tesseract-wrapper'
  ```

# The API structure
  It has a simple method that takes an object with the base64 image data and the langague that tesseract should OCR to

## Methods
  - [execTesseract](#exectesseract): OCRs the base64 image in the language specified in the options parameter

### execTesseract
  Function to execute tesseract command with the right parameters.

  The tasks:
  * 1 - Write image file
  * 2 - Get file path
  * 3 - Exec tesseract
  * 4 - Read outputFile
  * 5 - Delete tempFile
  * 6 - Delete outputFile
  * 7 - Return result object in promise

  ```javascript
  var tesseract_wrapper = require('tesseract-wrapper');

  var options = {
    data: Base64String,
    lang: 'eng'
  }

  tesseract_wrapper
    .execTesseract(options)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  ```

  The log would be:
  ```javascript
    { fileContent: '2x" -7x +3 = 0\n(2x -1) (x -3)= 0\n\n' }
  ```

# How to test it?
  To run all unit testing simply do:
  ```
  npm test
  ```
