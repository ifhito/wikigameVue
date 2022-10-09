<script setup lang="ts">
import { ref, defineProps, PropType, Ref} from 'vue'
import SentenceBody from '../Organisms/SentenceBody.vue';
import PlayerInfo from '../Organisms/PlayerInfo.vue';
interface Props {
    title: string;
    body: (string | null)[];
    myName: string;
    nowName: string;
    aList: string[];
    delA: string[];
    onClickSendText: (e:any) => void;
    answer: string;
    submitUser: string[];
};
const props = defineProps<Props>()
</script>
    
<template>
    <h1>{{title}}</h1>
    <SentenceBody :body="body" :my-name="myName" :now-name="nowName" :a-list="aList" :del-a="delA" :onClickSendText="onClickSendText" />
    <PlayerInfo :answer="answer" :now-name="nowName" :submit-user="submitUser" :my-name="myName" />
</template>

<style scoped>
</style>