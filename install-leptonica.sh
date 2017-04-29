#!/bin/bash
wget http://www.leptonica.org/source/leptonica-1.74.1.tar.gz
tar -xvf leptonica-1.74.1.tar.gz
cd leptonica-1.74.1
./configure
make
sudo make install
