<template>
  <div class="m-4 desc-wrap">
    <a-descriptions bordered :column="{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }" size="14">
      <template #title>
        元数据信息
        <a-button type="link" size="18" preIcon="ant-design:edit-outlined" @click="handleEdit">
          编辑
        </a-button>
      </template>
      <template v-for="item in achieveList" :key="item.key">
        <a-descriptions-item :label="item.name">{{ item.value }}</a-descriptions-item>
      </template>
    </a-descriptions>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref, onMounted, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { Descriptions } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import EditInfo from '/@/views/servicemanage/serviceroute/components/editmetadata.vue';
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
  export interface TabItem {
    key: string;
    name: string;
    value: object;
  }
  export default defineComponent({
    components: {
      BasicTable,
      Descriptions,
      EditInfo,
    },
    setup() {
      const router = useRouter();
      const serviceRouteStore = useServiceRouteStore();
      const { currentRoute } = router;

      const serviceId = unref(currentRoute).query.id;
      const regCenterT = unref(currentRoute).query.regCenterT;
      const [registerModal, { openModal }] = useModal();
      const achieveList: TabItem[] = ref([]);

      function handleEdit() {
        openModal(true, {
          achieveList,
          isUpdate: true,
          parentId: unref(serviceId),
          regCenterT: unref(regCenterT),
        });
      }
      async function getServiceDescriptor() {
        var response = await serviceRouteStore.getservicedescriptorApi({
          registryCenterType: unref(regCenterT),

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
        handleEdit,
        achieveList,
        registerModal,
      };
    },
  });
</script>
