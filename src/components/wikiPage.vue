<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// DONE: ユーザ名とルーム名を設定して、通信できるようにする
// DONE: コネクション削除時の通信処理

//DONE: refをreactiveでまとめる
import { ref,computed, watch} from 'vue';
import {useRoute} from 'vue-router';
import { useDecideAction, useFixHTML } from '../customHooks';

const route =useRoute()

const roomName = ref<string>('');
const name = ref<string>('');
// ルームログインページからのルーム名と名前を保存する
roomName.value = route.query.roomName?.toString() ?? 'notRoomName'
name.value = route.query.name?.toString() ?? 'notName'

const {
    answer,
    connectNum,
    submitUser,
    connect,
    switchAction,
    errorMessage,
    errorStatus,
    winner,
    defineWinner,
    jsonBody,
    nowNumber,
    nowName,
    gameStatus
    } = useDecideAction()


const {body, title, aList} = useFixHTML(jsonBody);

watch(title, () => {
    if (title.value === answer.value) {
        const msg = {
            command: "message",
            identifier: identifier,
            data: JSON.stringify({ action: "decied_winner", name: name.value }),
        };
        webSocket.value?.send(JSON.stringify(msg));
    }
})
    
const delA = ['編集','英語版', '']
const identifier = JSON.stringify({
    channel: "WikiGameChannel",
    room: roomName.value,
    name: name.value,
});

// ボタンを押したときにその押された要素をバックエンドに伝える
const onClickSendText = (e:any) => {
    const msg = {
        command: 'message',
        identifier: identifier,
        data: JSON.stringify({action: "send_url", title: e.target.value, nextNumber: nowNumber.value}),
    };
    webSocket.value?.send(JSON.stringify(msg));
}

// ゲームをスタートする
const onClickStartGame = (e:any) => {
    const msg = {
        command: 'message',
        identifier: identifier,
        data: JSON.stringify({action: 'start_game'})
    };
    webSocket.value?.send(JSON.stringify(msg));
}

const webSocket = ref<WebSocket>();
// websocketの初期化
webSocket.value = new WebSocket("ws://localhost:3030/cable");

// websocketの通信開始
webSocket.value.onopen = () => {
    const msg = {
        command: 'subscribe',
        identifier: identifier
    }
    webSocket.value?.send(JSON.stringify(msg));
}

//websocket通信時のメッセージ受け取りを行う関数
webSocket.value.onmessage = async (e) => {
    // console.log(e.data)
    const data = await JSON.parse(e.data)
    switchAction(data.message)
};

// websocketの通信を閉じる
webSocket.value.close = () => {
    const msg = {
        command: 'message',
        identifier: identifier,
        data: JSON.stringify({action: "delete_user", nextNumber: nowNumber.value, nowName: nowName.value, myName: name.value})
    }
    webSocket.value?.send(JSON.stringify(msg));
}

// ブラウザが閉じる前にwebSocketをCloseする
window.onbeforeunload = () =>  {
    webSocket.value?.close();
};
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
  <!-- ゲーム中画面 -->
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
  <!-- 勝者決定後 -->
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
