<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    import Ul from '../Moleculs/Ul.vue';
    interface Props {
        answer: string;
        nowName: string;
        submitUser: string[];
        myName: string;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <div>あなたの答え: {{answer}}</div>
    <div>現在のターン: {{nowName}}</div>
    <Ul :submit-user="submitUser" :my-name="myName"/>
</template>

<style scoped>
</style>