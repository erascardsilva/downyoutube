#!/bin/bash
mkdir -p src/renderer/assets/icons/hicolor/{16x16,32x32,64x64,128x128,256x256}/apps

convert src/renderer/assets/icon.png -resize 16x16 src/renderer/assets/icons/hicolor/16x16/apps/downyoutube.png
convert src/renderer/assets/icon.png -resize 32x32 src/renderer/assets/icons/hicolor/32x32/apps/downyoutube.png 
convert src/renderer/assets/icon.png -resize 64x64 src/renderer/assets/icons/hicolor/64x64/apps/downyoutube.png
convert src/renderer/assets/icon.png -resize 128x128 src/renderer/assets/icons/hicolor/128x128/apps/downyoutube.png
convert src/renderer/assets/icon.png -resize 256x256 src/renderer/assets/icons/hicolor/256x256/apps/downyoutube.png