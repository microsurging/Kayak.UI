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
      <BasicForm @register="registerForm" />
      <br />
      <a-divider>调试日志</a-divider>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </template>
    <template #insertFooter>
      <a-button type="primary">开始</a-button>

      <a-button type="primary" danger>结束</a-button>
      <a-button>清空</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref } from 'vue';
  import {  Divider } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import TcpDebug from './tcpdebug.vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { useNetworkLogStore } from '/@/store/modules/networklog';
  export const formSchema: FormSchema[] = [
    {
      label: '响应数据',
      field: 'ResponseData',

      component: 'InputTextArea',
      componentProps: {
        rows: 6,
      },
      ifShow: ({ values }) => values.componentTypeId != 0,
    },
    {
      field: 'componentTypeId',
      label: '组件类型',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'TCP服务', value: 1 },
          { label: 'TCP客户端', value: 0 },
          { label: 'UDP服务', value: 8 },
          { label: 'MQTT服务', value: 3 },
          { label: 'DNS服务', value: 4 },
          { label: 'Http服务', value: 5 },
          { label: 'GRPC服务', value: 9 },
          { label: 'RTMP服务', value: 2 },
          { label: 'WEBSOCKET服务', value: 7 },
          { label: 'HTTPFLV服务', value: 6 },
          { label: 'RTSP服务', value: 10 },
        ],
      },
      ifShow: false,
    },
    {
      label: '发送数据',
      field: 'RequestData',

      component: 'InputTextArea',
      componentProps: {
        rows: 6,
      },
      ifShow: ({ values }) => values.componentTypeId == 0,
    },
  ];
  export default defineComponent({
    name: 'DebugModal',
    components: { BasicModal, TcpDebug, BasicForm, Divider },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const loading = ref(false);
      let title = ref("");
      const isUpdate = ref(true);
      const netWorkId = ref(null);
      const lines = ref(10); 
      const page: any = ref(1);
      let logMsg = ref([]);
      const pageSize: any = ref(100);
      const networkLogStore = useNetworkLogStore();
      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
        async (data) => {
          setModalProps({ confirmLoading: false });
          logMsg.value = [];
          isUpdate.value = !!data?.isUpdate;
          netWorkId.value = data?.record?.id;
          title.value ="调试" +data?.record?.componentType.name;
          console.log(netWorkId.value);
          await getPage();
          if (unref(isUpdate)) {
            console.log(data.record);
            setFieldsValue({
              ...data.record,
            });
          }
        },
      );
      const [registerForm, { setFieldsValue }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        },
      );
      async function getPage() {
        networkLogStore
          .getPageAsync({
            query: {
              networkId: unref(netWorkId),
              page: page.value,
              pageSize: pageSize.value,

            },
          })
          .then((response) => {
            console.log(response);
            for (var i = 0; i < response?.Items.length; i++) {
              logMsg.value.push([response?.Items[i].CreateDate, " - ", "[", response?.Items[i].logLevelName, "] ", response?.Items[i].Content].join(""));
            }
          });
      }; 
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, registerForm, netWorkId, loading, getTitle: title, logs: logMsg, handleSubmit };
    },
  });
</script>
