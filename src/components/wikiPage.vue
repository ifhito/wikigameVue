<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// DONE: ユーザ名とルーム名を設定して、通信できるようにする
// DONE: コネクション削除時の通信処理

//TODO: refをreactiveでまとめる
import { ref,computed} from 'vue';
import {useRoute} from 'vue-router';


const webSocket = ref<WebSocket>();
const aList = ref<string[]>([]);
const gameStatus = ref<boolean>(false)
const title = ref<string|null|undefined>('')
const answer = ref<string|null|undefined>('')
const winner = ref<string|null|undefined>('')
const defineWinner = ref<boolean>(false)
const connect = ref<boolean>(false);
const connectNum = ref<number>(0);
const errorMessage = ref<string>('');
const errorStatus = ref<boolean>(false);
const myNumber = ref<number>(0)
const nowNumber = ref<number>(0)
const nowName = ref<string>("")
const route =useRoute()
const roomName = ref<string>('');
const name = ref<string>('');
const jsonBody = ref<string>('');
const submitUser = ref<string[]>([])


// ルームログインページからのルーム名と名前を保存する
roomName.value = route.query.roomName
name.value = route.query.name

const identifier = JSON.stringify({
        channel: 'WikiGameChannel',
        room: roomName.value,
        name: name.value
    })

// タイトル名を取得する
const getHeader = (parseBody:Document) => {
title.value = parseBody?.getElementById('firstHeading')?.textContent
console.log(title.value, answer.value, title.value === answer.value)
if(title.value === answer.value){
    const msg = {
    command: 'message',
    identifier: identifier,
    data: JSON.stringify({action: "decied_winner", name:name}),
    };
    webSocket.value?.send(JSON.stringify(msg));
}
}

// references要素を削除する
const deleteRef = (main:HTMLElement|null) => {
const refElement = main?.querySelectorAll('.references');
console.log(refElement)
    const refLen = refElement?.length;
    if(refLen === 0) return
    for(let key in [...Array(refLen).keys()]){
    refElement[key]?.remove();
    }
}

// 
const createAList = (main:HTMLElement|null) => {
const linkList= main?.querySelectorAll('a');
linkList?.forEach(link => {
    aList.value.push(link.textContent as string);
});
}

const createBodyList = (main:HTMLElement, parser: DOMParser) => {
const BodyList = main.innerHTML.split(/<a(?: .+?)?>.*?<\/a>/g)
const newBodyList = BodyList.map((b) => {
    const dom = parser.parseFromString(b, "text/html");
    return dom.documentElement.textContent;
})
return newBodyList;
}

const onClickSendText = (e) => {
    const msg = {
        command: 'message',
        identifier: identifier,
        data: JSON.stringify({action: "send_url", title: e.target.value, myNumber: myNumber.value, nextNumber: nowNumber.value}),
        };
    webSocket.value?.send(JSON.stringify(msg));
}

// websocketの初期化
webSocket.value = new WebSocket("ws://localhost:3030/cable");

// websocketの通信開始
webSocket.value.onopen = () => {
    const msg = {
        command: 'subscribe',
        identifier: identifier
    }
    webSocket.value?.send(JSON.stringify(msg));
    console.log('connect')
}

// websocketの通信を閉じる
webSocket.value.close = () => {
    const msg = {
        command: 'message',
        identifier: identifier,
        data: JSON.stringify({action: "delete_user", myNumber: myNumber.value, nextNumber: nowNumber.value, nowName: nowName.value, myName: name.value})
    }
    webSocket.value?.send(JSON.stringify(msg));
}

// ブラウザが閉じる前にwebSocketをCloseする
window.onbeforeunload = () =>  {
    webSocket.value?.close();
};

// ゲームをスタートする
const onClickStartGame = (e) => {
gameStatus.value = true;
const msg = {
    command: 'message',
    identifier: identifier,
    data: JSON.stringify({action: 'start_game'})
    };
webSocket.value?.send(JSON.stringify(msg));
}

//websocket通信時のメッセージ受け取りを行う関数
//TODO: websocketをイベントで分けられないのか
webSocket.value.onmessage = async (e) => {
    const incoming_msg = JSON.parse(e.data);
    console.log("incoming_msg: ",incoming_msg)
    if (incoming_msg.type === "ping") { console.log('ping'); return; }
    if (incoming_msg.type === "welcome"){
    return
    }
    if (incoming_msg.type === "confirm_subscription"){
    return
    }
    const data = await JSON.parse(e.data)
    // エラー時
    if(data.message.error){
        errorStatus.value = true
        errorMessage.value = data.message.message
    }

    if(data.message.message.answerTitle){
        if(!answer.value) answer.value = data.message.message.answerTitle.split(' - ')[0];
        connect.value = true
    }
    if(data.message.message.nameList){
        submitUser.value = data.message.message.nameList
        myNumber.value = submitUser.value.indexOf(name.value)
        console.log(submitUser.value, myNumber.value)
    }
    if(data.message.message.connectNumber){
        connectNum.value = data.message.message.connectNumber
        return
    }
    if(data.message.message.data?.winner){
        console.log(data.message.message.data.winner)
        winner.value = data.message.message.data.winner
        defineWinner.value = true
        return
    }
    console.log(data.message.message.nextNumber)
    if(data.message.message.nextNumber !== undefined || data.message.message.nextNumber !== null){
        nowNumber.value = data.message.message.nextNumber
        console.log(nowNumber.value)
    }
    if(data.message.message.nextName){
        nowName.value = data.message.message.nextName
        console.log(nowName.value)
    }
    if(data.message.message.data){
        jsonBody.value = data.message.message.data
        gameStatus.value = true;
    }
    
};
// websocketからメッセージが来て変更があった場合にbodyを書き換える
const body = computed(()=>{
    gameStatus.value = true;
    aList.value = [];
    title.value = '';
    const parser = new DOMParser();
    const parseBody = parser.parseFromString(jsonBody.value, "text/html")
    const main = parseBody?.getElementById('mw-content-text');
    getHeader(parseBody);
    deleteRef(main);
    createAList(main);
    const bodyList = createBodyList(main as HTMLElement, parser)
    return bodyList
})

</script>

<template>
<!-- エラー -->
  <div v-if="errorStatus">
  {{errorMessage}}
  </div>
  <!-- 通信中 -->
  <div v-else-if="!connect">
  通信中
  </div>
  <!-- ゲームスタート前 -->
  <div v-else-if="!gameStatus">
    <div>{{connectNum}}</div>
    <div>ルームID: {{roomName}}</div>
    <button @click="onClickStartGame">StartGame</button>
  </div>
  <div v-else-if="!defineWinner">
      <h1>{{title}}</h1>
      <template v-for="i in body.length" :key="`num_${i}`">
        <span v-html="body[i]"></span>
        <span v-if="name=== nowName">
        <button v-if="!(delA.includes(aList[i]) || /[*.]/.test(aList[i]))" :value="aList[i]" @click="onClickSendText">{{aList[i]}}</button>
        </span>
        <span v-else>
           <span v-if="!(delA.includes(aList[i]) || /[*.]/.test(aList[i]))" :value="aList[i]">{{aList[i]}}</span>
        </span>
      </template>
      <div>あなたの答え: {{answer}}</div>
      <div>現在のターン: {{nowName}}</div>
      <ul>
        <li v-for="user in submitUser" :key="user">
            {{user}}<span v-if="user === name">あなた</span>
        </li>
      </ul>
  </div>
  <div v-else>
    勝者は{{winner}}さんです
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
