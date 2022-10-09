<script setup lang="ts">
    import { ref, defineProps, PropType, Ref} from 'vue'
    import Button from '../Atoms/Button.vue';
    interface Props {
        body: (string | null)[];
        myName: string;
        nowName: string;
        aList: string[];
        delA: string[];
        onClickSendText: (e:any) => void;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <template v-for="i in body.length" :key="`num_${i}`">
        <span v-html="body[i]"></span>
        <span v-if="myName=== nowName">
            <Button
              v-if="!(delA.includes(aList[i]) || /[*.]/.test(aList[i]))"
              :button-value="aList[i]"
              :on-click="onClickSendText"
              button-type="button"
            >
                {{aList[i]}}
            </Button>
        </span>
        <span v-else>
           <span v-if="!(delA.includes(aList[i]) || /[*.]/.test(aList[i]))" :value="aList[i]">{{aList[i]}}</span>
        </span>
    </template>
</template>

<style scoped>
</style>