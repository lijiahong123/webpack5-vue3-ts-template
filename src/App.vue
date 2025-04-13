<template>
    <div>
        Hello webpack5-vue3-ts
    </div>

    <Count />

    

</template>

<script setup lang="ts">
import Count from "@/components/Count.vue";



const c = [1, 2, 3, 4, 5].reduce((pre, cur) => pre += cur, 0)
console.log(c)
</script>
