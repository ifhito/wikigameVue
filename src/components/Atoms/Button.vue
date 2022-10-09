<script setup lang="ts">
    import { ref, defineProps, PropType} from 'vue'
    interface Props {
        onClick: (disabled:boolean | null) => void;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <button  class="tool tooltip">
    <slot></slot>
    </button>
</template>

<style scoped>
</style>