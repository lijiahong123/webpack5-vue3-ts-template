<template>
    <div>
        Hello webpack5-vue3-ts
    </div>

    <Count />

    <ul>
        <li v-for="item in langue" :keu="item">{{ item }}</li>
    </ul>

</template>

<script setup lang="ts">
import Count from "@/components/Count.vue";
const langue = ['Javascript', 'CSS', 'HTML', 'Vue3', 'Typescript'].map(item => item.toUpperCase())
console.log(langue);


const c = [1, 2, 3, 4, 5].reduce((pre, cur) => pre += cur, 0)
console.log(c)
</script>
