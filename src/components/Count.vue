<template>
    <div>
        <h1>Count</h1>
        <div class="count">
            <h2>{{ count }}</h2>
            <button @click="add">add</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
const add = () => {
    count.value++;
};
</script>

<style lang="scss" scoped></style>