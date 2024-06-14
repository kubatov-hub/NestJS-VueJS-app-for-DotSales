<script setup lang="ts">
import {onMounted, ref} from "vue";
import Content from "@/components/Content.vue";
import Header from '@/components/Header.vue';
import axios from 'axios';

const items = ref([])

onMounted(async ()=> {
  try {
    const { data } = await axios.get('http://localhost:3000/api/leads')
    console.log(data)
    items.value = data
  } catch (e) {
    console.log(e)
  }
})

</script>

<template>
  <div class="w-4/5 m-auto mt-14 shadow-xl rounded-xl bg-white">
    <Header />
    <p>{{  }}</p>
    <hr>
    <Content />
  </div>
</template>

<style scoped>
</style>
