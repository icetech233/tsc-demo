"use strict";

import axios,{AxiosRequestConfig} from 'axios'


let j1 = {
    zh_cn : {
        title: "富文本标题",
        content: [[
            {
                tag: "text",
                text: "第一行:"
            },
            {
                "tag": "a",
                "href": "https://www.baidu.cn",
                "text": "百度官网"
            }
        ],[
            {
                tag: "text",
                text: "第二行:"
            },
            {
                "tag": "at",
                "user_id": "all",
            },
            {
                "tag": "img",
                "image_key": "img_v2_b2e8ddd7-a868-4a2c-a4a7-507d94e33bcg"
            }
        ],[
            {
                "tag": "emotion",
                "emoji_type": "SMIRK"
            },
            {
                "tag": "emotion",
                "emoji_type": "LOVE"
            },
            {
                "tag": "at",
                "user_id": "ou_bcb32b20a460960d043ab8edbe274bff",
                "user_name": "hanbindsg"
            }
        ]]
    }
}


const axios_test= ()=> {

}

const axios_test_async= async ()=> {
    let token = await get_tenant_access_token()
    tenant_access_token = token;
    //await get_user_id()

    // ou_bcb32b20a460960d043ab8edbe274bff
    // "user_id": "ou_bcb32b20a460960d043ab8edbe274bff"
    // https://open.feishu.cn/open-apis/contact/v3/users/ou_bcb32b20a460960d043ab8edbe274bff?department_id_type=open_department_id&user_id_type=open_id
    // "union_id": "on_1484f798d38d5c220149996958dc520f",
    // "open_id": "ou_bcb32b20a460960d043ab8edbe274bff",

    // await get_chats()

    await feishu_chat_msg()


    // [
    //     'oc_a301a83a0de4e48f8e54a7f11151f569',
    //     'oc_0e143c03841466c69e22bc8ee6d28cf1'
    //   ]


    //const uuid = `aef61da5-8ccf-40c7-8f3c-8f5f56e6ea42`
    //await api_feishu_post(uuid)
}

enum MsgType {
    Text ="text",
    Post ="post",
    Interactive = "interactive"
}

interface FeiShuHookRequest {
    msg_type: MsgType | String
    content: Object | String
    receive_id ?: String
    uuid ?: String
}

type HookRes = {
    code: Number,
    msg: String,
    data?:  Object,
}

interface IMChatRes {
    code: Number
    msg: String
    data:  IMChatData
}

interface IMChatData {
    has_more : Boolean
    page_token :String
    items : Array<ChatData>
}

interface ChatData {
    chat_id : String
    name : String
    description : String

    external : Boolean
    owner_id:  String
    owner_id_type :String
    tenant_key :String
    avatar : String 
}

// 机器人所在的群
const get_chats= async ()=> {

    const url = "https://open.feishu.cn/open-apis/im/v1/chats?page_size=20&user_id_type=user_id";
    
    const cfg : AxiosRequestConfig = {
        headers : {
            Authorization : `Bearer ${tenant_access_token}`
        }
    }

    let {status,data } = await axios.get<IMChatRes>(url, cfg);

    console.log("\nstatus:",status,"\n")
    if (status != 200) {
        return
    }

    const items1 = data.data.items.map(e=>e.chat_id)
    console.info(items1)

    // let item2 = items1.map(function(e) {
    //     return {
    //       name: e.name,
    //       chat_id: e.chat_id
    //     }}
    // )
    
}

// 飞书 机器人app 消息发送 😍 想
const feishu_chat_msg =async () => {
    const url = "https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id"

    const cfg : AxiosRequestConfig = {
        headers : {
            Authorization : `Bearer ${tenant_access_token}`
        }
    }

    let j2 = {
        type : "template",
        data : {
            template_id:"ctp_AArYJam3p6S0",
            template_variable:{
                "name01": "绑定的数据"
            }
        }
    }

    // msg_type : MsgType.Post, content: JSON.stringify(j1)
    let reqData : FeiShuHookRequest = {
        receive_id : "oc_a301a83a0de4e48f8e54a7f11151f569",
        msg_type : MsgType.Interactive,
        content: JSON.stringify(j2)
    }
    
    // 分割线
    let {status,data } = await axios.post(url, reqData, cfg);

    console.log("\nstatus:",status,"\n",data)

}










interface GetUserIDRes {
    code: Number
    msg: String
    data: UserListData
}

interface UserListData{
    user_list: Array<UserItem>
}

interface UserItem {
    mobile:String
    user_id?:String
}

const appid = "cli_a4a64a078538100d"
const appSecret ="2JyrKp8dPYukRp5pBpp8zdJQq1wexaed"

// t-g10445gVQPKUY36PHIY2BRROHSMVKQFIBFZO2G32
let tenant_access_token : String = "t-g10445gVQPKUY36PHIY2BRROHSMVKQFIBFZO2G32"

interface AuthRes {
	code: Number
	msg: String
	expire: Number //过期时间，单位为秒
	tenant_access_token ? : String
    app_access_token ? : String
}

const get_tenant_access_token = async () => {
    // 
    const url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
    const reqData ={"app_id":appid, "app_secret": appSecret}
    // 
    let { status,data } = await axios.post<AuthRes>(url, reqData)
    
    console.warn(status,data.msg,data.expire,data.tenant_access_token)

    return data.tenant_access_token ?? ""
}


const get_user_id= async ()=> {

    const url = "https://open.feishu.cn/open-apis/contact/v3/users/batch_get_id?user_id_type=open_id";
    
    const reqData = {
        "mobiles": ["15727575309","18668489396"]
    }
    const cfg : AxiosRequestConfig = {
        headers : {
            Authorization : `Bearer ${tenant_access_token}`
        }
    }

    let {status,data } = await axios.post<GetUserIDRes>(url, reqData,cfg);

    console.log("\nstatus:",status,"\n")
    if (status != 200) {
        return
    }

    let users = data.data.user_list.filter(e => e.user_id != null)

    users.forEach(e=>{
        console.log(e.user_id)
    })
    
}

const api_get= async ()=> {
    let {status,data } = await axios.get('http://httpbin.org/get');
    console.log("\nstatus:",status,"\ndata:\n",data,data.data.user_list)
}

export default {axios_test,axios_test_async}
