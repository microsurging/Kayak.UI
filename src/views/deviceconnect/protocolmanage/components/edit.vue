<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="720px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Script="{ model, field }">
        <CodeEditor
          v-model:value="model[field]"
          style="height: 260px; width: 380px"
          :mode="modeValue"
        />
      </template>
      <template #FileAddr="{ model, field }">
        <a-input style="width: 140px" />
        <a-button type="primary" preIcon="ant-design:upload-outlined" @click="showAddModal">
          上传模块
        </a-button>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  export const formSchema: FormSchema[] = [
    {
      field: 'ProtocolID',
      label: '协议ID',
      required: true,
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'ProtocolName',
      label: '协议名称',
      required: true,
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'ProtocolType',
      label: '组件类型',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'Script', value: '0' },
          { label: 'ModulePackage', value: '1' },
          { label: 'LocalPackage', value: '2' },
        ],
        style: 'width: 90%;',
      },
      colProps: {
        span: 13,
      },
    },
    {
      field: 'ClassName',
      label: '类名',
      required: true,
      component: 'Input',

      colProps: {
        span: 12,
      },
    },
    {
      field: 'ConnectProtocol',
      label: '连接协议',
      required: true,
      component: 'Input',
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => values.ProtocolType == 0,
    },
    {
      field: 'FileAddr',
      label: '文件地址',
      required: true,
      component: 'Input',

      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => values.ProtocolType == 2,
    },

    {
      field: 'FileAddr',
      label: '文件地址',
      slot: 'FileAddr',
      required: true,
      component: 'Input',

      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => values.ProtocolType == null || values.ProtocolType == 1,
    },
    {
      field: 'Script',
      label: '解析脚本',
      slot: 'Script',
      required: true,
      component: 'Input',

      colProps: {
        span: 24,
      },
      ifShow: ({ values }) => values.ProtocolType == 0,
    },
    {
      label: '描述',
      field: 'remark',
      component: 'InputTextArea',

      colProps: {
        span: 24,
      },
      componentProps: {
        rows: 6,
      },
    },
  ];
  export default defineComponent({
    name: 'EditInfo',
    components: { BasicDrawer, BasicForm, CodeEditor },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const modeValue = ref<MODE>(MODE.JS);
      const isUpdate = ref(true);
      const [registerForm] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告

        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('routes.deviceconnect.addcomponent')
          : t('routes.deviceconnect.editcomponent'),
      );
      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      return {
        modeValue,
        registerForm,
        registerDrawer,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
