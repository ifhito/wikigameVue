<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// DONE: ユーザ名とルーム名を設定して、通信できるようにする
// DONE: コネクション削除時の通信処理

//DONE: refをreactiveでまとめる
import { ref,computed, watch} from 'vue';
import {useRoute} from 'vue-router';
import { useDecideAction, useFixHTML } from '../../customHooks';
import ErrorTemplate from '../Templates/ErrorTemplate.vue';
import ConnectTemplate from '../Templates/ConnectTemplate.vue';
import BeforeStartTemplate from '../Templates/BeforeStartTemplate.vue';
import MainGameTemplate from '../Templates/MainGameTemplate.vue';
import DefineWinnerTemplate from '../Templates/DefineWinnerTemplate.vue';

const route =useRoute()

const roomName = ref<string>('');
const myName = ref<string>('');
// ルームログインページからのルーム名と名前を保存する
roomName.value = route.query.roomName?.toString() ?? 'notRoomName'
myName.value = route.query.name?.toString() ?? 'notName'

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
    gameStatus,
    isNotFound,
    notFoundText
    } = useDecideAction()


const {body, title, aList} = useFixHTML(jsonBody);

watch(title, () => {
    if (title.value === answer.value) {
        const msg = {
            command: "message",
            identifier: identifier,
            data: JSON.stringify({ action: "decied_winner", name: myName.value }),
        };
        webSocket.value?.send(JSON.stringify(msg));
    }
})
    
const delA = ['編集','英語版', '']
const identifier = JSON.stringify({
    channel: "WikiGameChannel",
    room: roomName.value,
    name: myName.value,
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
        data: JSON.stringify({action: "delete_user", nextNumber: nowNumber.value, nowName: nowName.value, myName: myName.value})
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
  <ErrorTemplate v-if="errorStatus" :error-message="errorMessage" />
  <!-- 通信中 -->
  <ConnectTemplate v-else-if="!connect" />
  <!-- ゲームスタート前 -->
  <BeforeStartTemplate
    v-else-if="!gameStatus"
    :connect-num="connectNum"
    :room-name="roomName"
    :on-click-start-game="onClickStartGame"
  />
  <!-- ゲーム中画面 -->
  <MainGameTemplate
    v-else-if="!defineWinner && gameStatus"
    :title="title"
    :body="body"
    :my-name="myName"
    :now-name="nowName"
    :a-list="aList"
    :del-a="delA"
    :answer="answer"
    :submit-user="submitUser"
    :on-click-send-text="onClickSendText"
    :not-found-text="notFoundText"
    :is-not-found="isNotFound"
  />
  <!-- 勝者決定後 -->
  <DefineWinnerTemplate v-else :winner="winner"/>
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
