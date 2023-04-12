"use strict";
import api from './api'

// 分割线

const isbrowser =typeof window !== 'undefined'
const isNodeJs = !isbrowser

// node
if (isNodeJs) {
    api.axios_test_async()
    
}

// chrome
if (isbrowser) {
    const app = document.getElementById('app')
    const el_hello = document.createElement('h3')
    el_hello.innerText = "hello world"
    app?.append(el_hello)
}

/*
const a = "aaa"
let b = "bbb"
const cc = {aa:1,bb:"bb"}
const {aa,bb} = cc
const mylog = (...data: any[]) => {
    console.log(data)
}
mylog("start",a,b,cc,aa,bb,"end")

*/
