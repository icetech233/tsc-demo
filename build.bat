@echo off

REM  编译直接 tsc  或者 npm run build 或者 yarn build

echo remove dictionary dist 

rm -rf dist 

echo compile start

tsc && node ./dist/main.js
