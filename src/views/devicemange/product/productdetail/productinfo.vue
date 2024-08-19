<template>
  <div class="m-4 desc-wrap">
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <template #title>
        产品信息
        <a-button type="link" size="18" preIcon="ant-design:edit-outlined" @click="handleEdit">
          编辑
        </a-button>
      </template>
      <a-descriptions-item label="产品ID">yuwell-product</a-descriptions-item>
      <a-descriptions-item label="所属品类">智能生活</a-descriptions-item>
      <a-descriptions-item label="所属机构" />
      <a-descriptions-item label="消息协议" />
      <a-descriptions-item label="链接协议" />
      <a-descriptions-item label="设备类型">直连设备</a-descriptions-item>
      <a-descriptions-item label="说明">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Descriptions } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import EditInfo from '/@/views/devicemange/product/components/editproductinfo.vue';
  export default defineComponent({
    components: {
      Descriptions,
      EditInfo,
    },
    setup() {
      const record: any = {
        ProductId: `yuwell-product`,
        ProductCategory: '0',
        Organization: '1',
        TransportProtocol: '0',
        DeviceType: '0',
        remark: '6666',
      };
      const [registerModal, { openModal }] = useModal();

      function handleEdit() {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      function handleModalSuccess() {}
      return {
        registerModal,
        handleEdit,
        handleModalSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .vben-collapse-container__header {
    border-width: 0px;
    ::v-deep .vben-collapse-container__heade .vben-basic-title-normal {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>
