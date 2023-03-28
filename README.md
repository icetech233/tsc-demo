# tsc-demo
tsc 编译typescript ,发送请求


### 说明

### cmd 管理员权限

1. 全局安装

cnpm i -g tsc
cnpm i -g typescript


cnpm i -D axios

``` bash

@echo off

REM  编译直接 tsc  或者 npm run build 或者 yarn build

echo remove dictionary dist 

rm -rf dist 

echo compile start

tsc && node ./dist/main.js


```