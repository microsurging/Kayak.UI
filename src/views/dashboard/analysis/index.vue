<template>
  <div class="p-4" style="margin: 0px; padding: 16px 10px">
    <div class="md:flex enter-y">
      <DeviceAnalysis class="md:w-1/4 w-full" :loading="loading" />
      <DeviceMessageAnalysis class="md:w-1/4 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <CPUUtilizationRate class="md:w-1/4 w-full" :loading="loading" />
      <MemoryUtilizationRate class="md:w-1/4 !md:ml-4 w-full" :loading="loading" />
    </div>
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import CPUUtilizationRate from './components/CPUUtilizationRate.vue';
  import MemoryUtilizationRate from './components/MemoryUtilizationRate.vue';
  import DeviceMessageAnalysis from './components/DeviceMessageAnalysis.vue';
  import DeviceAnalysis from './components/DeviceAnalysis.vue';
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
