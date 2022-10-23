<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// TODO: 通信が切れたらクローズする
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'
import WithInput from '../Moleculs/WithInput.vue';
import Button from '../Atoms/Button.vue';
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
        <WithInput label-for="name">
          <template v-slot:label>名前</template>
          <template v-slot:formContents>
            <input
              id="name"
              v-model="name"
              type="text"
            />
          </template>
        </WithInput>
        <WithInput v-if="roomNameBool" label-for="roomName">
          <template v-slot:label>部屋のID</template>
          <template v-slot:formContents>
            <input
              id="roomName"
              v-model="roomName"
              type="text"
            />
          </template>
        </WithInput>
      </div>
      <Button button-id="send" button-value="" button-type="button" :on-click="onClick">
        送信
      </Button>
      <Button button-id="inTheRoom" v-if="!roomNameBool" button-value="" button-type="button" :on-click="() => roomNameBool = true">
        すでにある部屋に入る
      </Button>
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