<template>
  <BasicModal
    @register="registerModal"
    width="520px"
    height="480"
    :title="getTitle"
    :canFullscreen="false"
    v-bind="$attrs"
    @ok="handleSubmit"
  >
    <template v-if="!loading">
      <BasicForm @register="registerForm" />
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  export const formSchema: FormSchema[] = [
    {
      field: 'ProductId',
      label: '产品ID',
      required: true,
      component: 'Input',
    },
    {
      field: 'ProductCategory',
      label: '所属品类',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'TCP服务', value: '0' },
          { label: 'UDP服务', value: '1' },
          { label: 'MQTT服务', value: '2' },
          { label: 'DNS服务', value: '3' },
          { label: 'GRPC服务', value: '4' },
          { label: 'RTMP服务', value: '5' },
          { label: 'WEBSOCKET服务', value: '6' },
          { label: 'HTTPFLV服务', value: '7' },
          { label: 'RTSP服务', value: '8' },
        ],
      },
    },
    {
      field: 'Organization',
      label: '所属机构',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'TCP服务', value: '0' },
          { label: 'UDP服务', value: '1' },
          { label: 'MQTT服务', value: '2' },
          { label: 'DNS服务', value: '3' },
          { label: 'GRPC服务', value: '4' },
          { label: 'RTMP服务', value: '5' },
          { label: 'WEBSOCKET服务', value: '6' },
          { label: 'HTTPFLV服务', value: '7' },
          { label: 'RTSP服务', value: '8' },
        ],
      },
    },

    {
      field: 'TransportProtocol',
      label: '传输协议',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'TCP服务', value: '0' },
          { label: 'UDP服务', value: '1' },
          { label: 'MQTT服务', value: '2' },
          { label: 'DNS服务', value: '3' },
          { label: 'GRPC服务', value: '4' },
          { label: 'RTMP服务', value: '5' },
          { label: 'WEBSOCKET服务', value: '6' },
          { label: 'HTTPFLV服务', value: '7' },
          { label: 'RTSP服务', value: '8' },
        ],
      },
    },
    {
      field: 'DeviceType',
      label: '设备类型',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: '直连设备', value: '0' },
          { label: '网关子设备', value: '1' },
          { label: '网关设备', value: '2' },
        ],
      },
    },
    {
      label: '描述',
      field: 'remark',
      component: 'InputTextArea',
      componentProps: {
        rows: 6,
      },
    },
  ];
  export default defineComponent({
    name: 'EditInfo',
    components: { BasicModal, BasicForm, CodeEditor },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const modeValue = ref<MODE>(MODE.JS);
      const rowId = ref('');
      const isUpdate = ref(true);
      const loading = ref(false);
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告

        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          console.log(data.record);
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => '编辑产品信息');
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          const values = await validate();
          closeModal();
          emit('success', {
            isUpdate: unref(isUpdate),
            values: { ...values, CategoryId: rowId.value },
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return {
        loading,
        modeValue,
        registerModal,
        registerForm,
        setModalProps,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
