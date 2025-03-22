#!/bin/bash
export NODE_OPTIONS="--max-old-space-size=4096"
electron . --no-sandbox --disable-gpu --enable-logging