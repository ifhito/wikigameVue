<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    interface Props {
        winner: string;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <div>{{winner}}が勝者です</div>
</template>

<style scoped>
</style>