<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    interface Props {
        inputId: string;
        vModel: Ref<string>;
        type:string;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <input :id="inputId" :type="type" v-model="vModel" />
</template>

<style scoped>
</style>