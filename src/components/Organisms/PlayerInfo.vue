<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
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
    <ul>
        <li v-for="user in submitUser" :key="user">
            {{user}}<span v-if="user === myName">あなた</span>
        </li>
    </ul>
</template>

<style scoped>
</style>