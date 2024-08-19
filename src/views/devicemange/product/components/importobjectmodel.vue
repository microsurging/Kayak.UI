<template>
  <BasicModal
    @register="registerModal"
    width="520"
    height="453"
    title="快速导入模型"
    :canFullscreen="false"
    v-bind="$attrs"
    @ok="handleSubmit"
  >
    <template v-if="!loading">
      <a-alert
        :style="{ backgroundColor: '#fcf8e3', borderColor: '#faebcc', color: '#8a6d3b' }"
        type="success"
      >
        <template #description>
          <div>
            <alert-outlined :style="{ color: '#f8ac59', fontSize: '18px' }" />
            物模型导入会覆盖原来的属性、服务、事件、请谨慎操作。 物模型格式请参照:
            <a-button type="link">产品管理</a-button>
          </div>
        </template>
      </a-alert>
      <a-tabs type="card" :style="{ marginTop: '20px' }">
        <a-tab-pane key="1" tab="复制产品">
          <BasicForm @register="registerForm" />
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span> 导入物模型 </span>
            <a-tooltip placement="topLeft">
              <template #title>
                <a-space>
                  物模型格式请参照:
                  <a-button type="link">产品管理</a-button>
                </a-space>
              </template>
              <question-circle-outlined style="margin-left: 5px" />
            </a-tooltip>
          </template>
          <BasicForm @register="registerForm1">
            <template #Script="{ model, field }">
              <CodeEditor v-model:value="model[field]" style="height: 240px" :mode="modeValue" />
            </template>
          </BasicForm>
        </a-tab-pane>
      </a-tabs>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { AlertOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import { FormSchema } from '/@/components/Table';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Alert, Row, Tooltip, Button, Space } from 'ant-design-vue';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  export const formSchema: FormSchema[] = [
    {
      field: 'ProtocolType',
      label: '选择产品',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: 'surging测试', value: '0' },
          { label: 'Tcp测试', value: '1' },
          { label: 'MQTT测试', value: '2' },
          { label: 'Websocket测试', value: '3' },
          { label: 'GRPC测试', value: '4' },
          { label: 'UDP测试', value: '5' },
        ],
        style: 'width: 90%;',
        showSearch: true,
        getPopupContainer: () => document.body,
      },
      colProps: {
        span: 24,
      },
    },
  ];
  export const formSchema1: FormSchema[] = [
    {
      field: 'ProtocolType',
      label: '',
      required: true,
      component: 'Upload',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'Script',
      label: '',
      slot: 'Script',
      required: true,
      component: 'Input',
      componentProps: {
        style: 'height: 260px;',
      },
      colProps: {
        span: 24,
      },
    },
  ];
  export default defineComponent({
    name: 'ImportObjectModel',
    components: {
      BasicModal,
      Alert,
      BasicForm,
      Row,
      AlertOutlined,
      CodeEditor,
      Tooltip,
      Button,
      Space,
      QuestionCircleOutlined,
    },
    emits: ['success', 'register'],
    setup() {
      const loading = ref(false);
      const modeValue = ref<MODE>(MODE.JSON);
      const [registerForm] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerForm1] = useForm({
        labelWidth: 90,
        schemas: formSchema1,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerModal, { setModalProps }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });
      async function handleSubmit() {
        try {
        } catch (error) {
        } finally {
        }
      }
      return { handleSubmit, modeValue, registerForm1, registerModal, registerForm, loading };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .vben-basic-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>
