<template>
  <BasicModal
    @register="registerModal"
    width="520px" 
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
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { usePrdCategoryStore } from '/@/store/modules/productcategory';
  import { useSysOrgManageStore } from '/@/store/modules/sysorgmanage';
  import { useProtocolManageStore } from '/@/store/modules/protocolmanage';
  import { useDeviceTypeStore } from '/@/store/modules/devicetype';
  const sysOrgManageStore = useSysOrgManageStore();
  const prdCategoryStore = usePrdCategoryStore();
  const protocolManageStore = useProtocolManageStore();
  const deviceTypeStore = useDeviceTypeStore();
  export const formSchema: FormSchema[] = [
    {
      field: 'code',
      label: '型号标识',
      required: true,
      component: 'Input',
    },
    {
      field: 'deviceTypeName',
      label: '型号名称',
      required: true,
      component: 'Input',
    },
    {
      field: 'productCategoryId',
      label: '所属品类',
      required: true,
      component: 'ApiSelect',
      componentProps: {
        api: prdCategoryStore.getlastchildApi,
        params: {},
        fieldNames: {
          label: 'CategoryName',
          value: 'Id',
        },
      },
    },
    {
      field: 'organizationId',
      label: '所属机构',
      required: true,
      component: 'ApiSelect',
      componentProps: {
        api: sysOrgManageStore.getorgcompanyApi,
        params: {},
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      },
    },

    {
      field: 'connProtocolCode',
      label: '连接协议',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'TCP服务', value: 'tcp' },
          { label: 'UDP服务', value: 'udp' },
          { label: 'MQTT服务', value: 'mqtt' },
          { label: 'DNS服务', value: 'dnc' },
          { label: 'GRPC服务', value: 'grpc' },
          { label: 'RTMP服务', value: 'rtmp' },
          { label: 'WEBSOCKET服务', value: 'websocket' },
          { label: 'HTTPFLV服务', value: 'httpflv' },
          { label: 'RTSP服务', value: 'rtsp' },
        ],
      },
    },
    {
      field: 'protocolCode',
      label: '消息协议',
      required: true,
      component: 'ApiSelect',
      componentProps: {
        api: protocolManageStore.getprotocolsApi,
        params: {},
        fieldNames: {
          label: 'protocolName',
          value: 'protocolCode',
        },
      },
    },
    {
      field: 'deviceTypeCode',
      label: '设备类型',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: '设备', value: 'device' },
          { label: '网关', value: 'gateway' },
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
      const lines = ref(10); 
      const rowId = ref('');
      const isUpdate = ref(true);
      const loading = ref(false);
      let Id: number = 0;
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告

        isUpdate.value = !!data?.isUpdate;
        Id = data?.record?.id ?? 0;
        if (unref(isUpdate)) { 
          setFieldsValue({
            ...data.record,
          });
        }
      });
      function modify(model: any, callback: Function) {
        model.Id = Id;
        deviceTypeStore
          .modifyApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      function add(model: any, callback: Function) {
        deviceTypeStore
          .addApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        },
      );
      const getTitle = computed(() => (!unref(isUpdate) ? '新增设备型号' : '编辑设备型号'));;
      async function handleSubmit() {
        try { 
           await validate().then((p) => {
            const callback = (result) => {
              setModalProps({ confirmLoading: true });
              closeModal();
              emit('success', {
                isUpdate: unref(isUpdate),
                values: { ...p, CategoryId: rowId.value },
              });
            };
            if (unref(isUpdate) == true) {
              modify(p, callback);
            } else {
              add(p, callback);
            }
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return {
        loading, 
        registerModal,
        registerForm,
        setModalProps,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
