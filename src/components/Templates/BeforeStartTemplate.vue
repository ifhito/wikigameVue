<script setup lang="ts">
import { ref, defineProps, PropType, Ref} from 'vue'
import Button from '../Atoms/Button.vue'
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
        <Button button-id="startGame" :on-click="onClickStartGame" button-type="button">
            StartGame
        </Button>
    </div>
</template>

<style scoped>
</style>