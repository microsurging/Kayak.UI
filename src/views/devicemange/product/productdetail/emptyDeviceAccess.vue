<template>
  <div class="page-child-wrapper">
    <a-empty>
      <template #description>
        <span>
          请先
          <a-button type="link" size="small" @click="showAddModal">选择</a-button>设备网关接入
        </span>
      </template>
    </a-empty>
  </div>
  <DeviceGateway  @register="registerModal" @success="handleModalSuccess" :minHeight="380" /> 
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useModal } from '/@/components/Modal';
  import DeviceGateway from '../components/selDeviceGateway.vue';
  import emitter from '/@/utils/eventbus';
  export default defineComponent({
    components: {
      DeviceGateway
    },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const showAddModal = () => {
        openModal(true, { 
          isUpdate: false,
        });
      };
      async function handleModalSuccess() { 
        emitter.emit('editChange','deviceaccess');
      }
      return {
        showAddModal,
        handleModalSuccess,
        registerModal
      }
    },
  });
  </script>
<style lang="less" scoped>
  .page-child-wrapper {
    height: 632px;
  }
  .vben-page-wrapper .ant-empty {
    top: 40%;
    position: relative; 
  }
</style>
