<template>
    <div>
        <h1>Count</h1>
        <div class="count">
            <h2>{{ count }}</h2>
            <button class="btn" @click="add">add</button>
        </div>
    </div>

    <ul>
        <li v-for="item in langue" :class="appModule.list" :keu="item">{{ item }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import appModule from '@/assets/styles/app.module.css'
const langue = ['Javascript', 'CSS', 'HTML', 'Vue3', 'Typescript'].map(item => item.toUpperCase())
console.log(appModule);


const count = ref(0);


const add = () => {
    count.value++;
};
</script>

<style lang="scss" scoped>
.btn {
    background-color: #007bff;
    border: none;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
        color: #fff
    }
}
</style>