<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
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
  const isFixedLength = (resolveMode: string) => resolveMode === '3';
  const isDelimited = (resolveMode: string) => resolveMode === '1';
  const isScript = (resolveMode: string) => resolveMode === '2';
  export const formSchema: FormSchema[] = [
    {
      field: 'roleName',
      label: '组件名称',
      required: true,
      component: 'Input',
    },
    {
      field: 'ComponentType',
      label: '组件类型',
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
      field: 'status',
      label: '集群',
      component: 'RadioButtonGroup',
      defaultValue: '0',
      componentProps: {
        options: [
          { label: '共享配置', value: '0' },
          { label: '独立配置', value: '1' },
        ],
      },
    },
    {
      field: 'isSSL',
      label: '开启SSL',
      component: 'RadioGroup',
      defaultValue: '0',
      componentProps: {
        options: [
          { label: '是', value: '0' },
          { label: '否', value: '1' },
        ],
      },
      ifShow: ({ values }) => values.ComponentType != 2,
    },
    {
      field: 'HOST',
      label: 'HOST',
      required: true,
      component: 'Input',
    },
    {
      field: 'PORT',
      label: 'PORT',
      required: true,
      component: 'Input',
    },
    {
      field: 'TLS',
      label: 'TLS',
      component: 'RadioGroup',
      defaultValue: '0',
      componentProps: {
        options: [
          { label: '是', value: '0' },
          { label: '否', value: '1' },
        ],
      },
      ifShow: ({ values }) => values.ComponentType == 2,
    },

    {
      field: 'resolveMode',
      label: '解析方式',
      required: true,
      helpMessage: '处理TCP粘拆包的方式',
      component: 'Select',
      componentProps: {
        options: [
          { label: '不处理', value: '0' },
          { label: '分隔符', value: '1' },
          { label: '自定义脚本', value: '2' },
          { label: '固定长度', value: '3' },
        ],
      },
      ifShow: ({ values }) => values.ComponentType == 0,
    },
    {
      field: 'FixedLength',
      label: '固定长度',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isFixedLength(values.resolveMode) && values.ComponentType == 0,
    },
    {
      field: 'Delimited',
      label: '分隔符',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isDelimited(values.resolveMode) && values.ComponentType == 0,
    },
    {
      field: 'Script',
      label: '解析脚本',
      slot: 'Script',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isScript(values.resolveMode) && values.ComponentType == 0,
    },
    {
      field: 'MaxMessageLength',
      label: '最大长度',
      required: true,
      helpMessage: '最大消息长度',
      component: 'Input',
      ifShow: ({ values }) => values.ComponentType == 2,
    },
    {
      label: '描述',
      field: 'remark',
      component: 'InputTextArea',
      componentProps: {
        rows: 6,
      },
    },
    {
      label: ' ',
      field: 'menu',
      slot: 'menu',
      component: 'Input',
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
