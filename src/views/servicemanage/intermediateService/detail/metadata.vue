<template>
  <div class="m-4 desc-wrap">
    <a-descriptions bordered :column="{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }" size="14">
      <template #title>
        元数据信息
      </template>
      <template v-for="item in achieveList" :key="item.key">
        <a-descriptions-item :label="item.name">{{ item.value }}</a-descriptions-item>
      </template>
    </a-descriptions>
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref, onMounted, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { Descriptions } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { useIntermediateServiceStore } from '/@/store/modules/intermediateService';
  export interface TabItem {
    key: string;
    name: string;
    value: object;
  }
  export default defineComponent({
    components: {
      BasicTable,
      Descriptions,
    },
    setup() {
      const router = useRouter();
      const intermediateServiceStore = useIntermediateServiceStore();
      const { currentRoute } = router;

      const serviceId = unref(currentRoute).query.id?.valueOf(); 
      const achieveList: TabItem[] = ref([]);

    
      async function getServiceDescriptor() {
        var response = await intermediateServiceStore.getservicedescriptorApi({
          serviceId: unref(serviceId),
        });
        const metadatas = response.result.metadatas;
        Object.keys(metadatas).map((key) => {
          achieveList.value.push({
            key: key,
            name: key,
            value: ref(metadatas[key]),
          });
        });
        console.log(achieveList);
      }

      onMounted(async () => {
        await getServiceDescriptor();
      });
      return {
        achieveList,
      };
    },
  });
</script>
