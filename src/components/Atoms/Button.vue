<script setup lang="ts">
    import { ref, defineProps, PropType} from 'vue'
    interface Props {
        buttonType: "button" | "submit" | "reset" | undefined;
        buttonValue: string;
        onClick: (e:any) => void;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <button class="tool tooltip" :value="buttonValue" @click="onClick" :type="buttonType">
    <slot></slot>
    </button>
</template>

<style scoped>
</style>