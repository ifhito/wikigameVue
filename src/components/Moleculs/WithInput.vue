<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    interface Props {
        labelFor: string;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <label :for="labelFor"><slot name="label"></slot></label>
    <slot name="formContents"></slot>
</template>

<style scoped>
</style>