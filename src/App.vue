<template>
    <div>
        Hello webpack5-vue3-ts!

        {{ count }}

        <button @click="add">add</button>
    </div>

    <ul>
        <li v-for="item in langue" :keu="item">{{ item }}</li>
    </ul>

</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const add = () => {
    count.value++
}

const langue = ['Javascript', 'CSS', 'HTML', 'Vue3', 'Typescript'].map(item=>item.toUpperCase())
console.log(langue);


const c = [1,2,3,4].reduce((pre, cur)=>pre+=cur, 0)
console.log(c)
</script>
