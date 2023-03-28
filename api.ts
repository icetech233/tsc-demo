"use strict";

import axios from 'axios'

const axios_test= ()=> {
    api_get()
}

const axios_test_async= async ()=> {
    await api_get()
}

const api_get= async ()=> {
    let {status,data } = await axios.get('http://httpbin.org/get');
    console.log("\nstatus:",status,"\ndata:\n",data)
}

export default {axios_test,axios_test_async}
