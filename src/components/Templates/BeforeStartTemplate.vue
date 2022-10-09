<script setup lang="ts">
import { ref, defineProps, PropType, Ref} from 'vue'
interface Props {
    connectNum: number;
    roomName: string;
    onClickStartGame: (e:any) => void;
};
const props = defineProps<Props>()
</script>
    
<template>
    <div>
        <div>{{connectNum}}</div>
        <div>ルームID: {{roomName}}</div>
        <button @click="onClickStartGame">StartGame</button>
    </div>
</template>

<style scoped>
</style>