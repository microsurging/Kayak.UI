<template>
  <div class="p-2">
    <div class="md:flex enter-y">
      <lettree class="md:w-1/4 w-full" :loading="loading" />
      <rightlist class="md:w-3/4 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import rightlist from './components/rightlist.vue';
  import lettree from './components/lettree.vue';
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
