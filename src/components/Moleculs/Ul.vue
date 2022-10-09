<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    interface Props {
        submitUser: string[];
        myName: string;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <ul>
        <li v-for="user in submitUser" :key="user">
            {{user}}<span v-if="user === myName">あなた</span>
        </li>
    </ul>
</template>

<style scoped>
</style>