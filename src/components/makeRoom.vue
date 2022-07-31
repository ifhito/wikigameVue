<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// TODO: 通信が切れたらクローズする
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'
const name = ref<string>('')
const roomNameBool = ref<boolean>(false)
const roomName = ref<string>('')
const router = useRouter()
const onClick = () => {
  
  router.push({ path: '/game', query: { name: `${name.value}_${Math.random().toString(32).substring(2)}`, roomName:  roomName.value === ''?Math.random().toString(32).substring(2):roomName.value} } )
}
</script>

<template>
    <form
      novalidate
      class="ui form"
    >
      <div class="field">
        <label for="name">名前</label>
        <input
          id="name"
          v-model="name"
          type="text"
        />
        <template v-if="roomNameBool">
            <label for="roomName">部屋のID</label>
            <input
            id="roomName"
            v-model="roomName"
            type="text"
            />
        </template>
      </div>
      <button
        type="button"
        class="ui button"
        @click="onClick"
      >
        Submit
      </button>
      <button
        v-if="!roomNameBool"
        type="button"
        @click="()=>roomNameBool = true"
      >すでにある部屋に入る</button>
    </form>
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