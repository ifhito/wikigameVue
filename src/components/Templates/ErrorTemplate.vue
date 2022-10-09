<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    interface Props {
        errorMessage: string;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <div>{{errorMessage}}</div>
</template>

<style scoped>
</style>