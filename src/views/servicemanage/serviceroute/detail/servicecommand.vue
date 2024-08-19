<template>
  <div class="m-4 desc-wrap">
    <a-descriptions bordered :column="{ xxl: 2, xl: 2, lg: 3, md: 3, sm: 2, xs: 1 }" size="14">
      <template #title>
        服务规则
        <a-button type="link" size="18" preIcon="ant-design:edit-outlined" @click="handleEdit">
          编辑
        </a-button>
      </template>
      <template v-for="item in achieveList" :key="item.name">
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
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
  import EditInfo from '/@/views/servicemanage/serviceroute/components/editservicecommand.vue';
  export interface TabItem {
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
      async function getServiceCommand() {
        var response = await serviceRouteStore.getcommandApi({
          registryCenterType: unref(regCenterT),

          serviceId: unref(serviceId),
        });
        const serviceCommand = response.result;
        Object.keys(serviceCommand).map((key) => {
          achieveList.value.push({
            key: key,
            name: key,
            value: ref(serviceCommand[key]),
          });
        });
        console.log(achieveList);
      }
      function handleEdit() {
        openModal(true, {
          achieveList,
          isUpdate: true,
        });
      }
      onMounted(async () => {
        await getServiceCommand();
      });
      return {
        handleEdit,
        achieveList,
        registerModal,
      };
    },
  });
</script>
