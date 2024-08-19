<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="700px"
    :title="getTitle"
    :showCancelBtn="false"
    :showOkBtn="false"
    @ok="handleSubmit"
  >
    <template v-if="!loading">
      <TcpDebug />
    </template>
    <template #insertFooter>
      <a-button type="primary">开始</a-button>

      <a-button type="primary" danger>结束</a-button>
      <a-button>清空</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import TcpDebug from './tcpdebug.vue';
  export default defineComponent({
    name: 'DebugModal',
    components: { BasicModal, TcpDebug },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const loading = ref(false);
      const isUpdate = ref(true);
      const lines = ref(10);
      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
        async (data) => {
          setModalProps({ confirmLoading: false });
          isUpdate.value = !!data?.isUpdate;
          if (unref(isUpdate)) {
          }
        },
      );

      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        },
      );
      const getTitle = computed(() => '调试TCP服务');
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, loading, getTitle, handleSubmit };
    },
  });
</script>
