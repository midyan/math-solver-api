#!/bin/bash
#
#These are the dependencies
#sudo apt-get install g++ # or clang++ (presumably)
#sudo apt-get install autoconf automake libtool
#sudo apt-get install autoconf-archive
#sudo apt-get install pkg-config
#sudo apt-get install libpng12-dev
#sudo apt-get install libjpeg8-dev
#sudo apt-get install libtiff5-dev
#sudo apt-get install zlib1g-dev

git clone --depth 1 https://github.com/tesseract-ocr/tesseract.git
cd tesseract
./autogen.sh
./configure --enable-debug
LDFLAGS="-L/usr/local/lib" CFLAGS="-I/usr/local/include" make
sudo make install
sudo ldconfig
