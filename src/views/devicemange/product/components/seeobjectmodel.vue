<template>
  <BasicModal
    @register="registerModal"
    width="520" 
    title="查看物模型"
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
            物模型是对设备在云端的功能描述，包括设备的属性、服务和事件。物联网平台通过定义一种物的描述语言来描述物模型，称之为
            TSL（即 Thing Specification Language），采用 JSON 格式，您可以根据 TSL
            组装上报设备的数据。您可以导出完整物模型，用于云端应用开发。
          </div>
        </template>
      </a-alert>
      <a-tabs type="card" :style="{ marginTop: '20px' }">
        <a-tab-pane key="1" tab="物模型TSL">
          <BasicForm @register="registerForm">
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
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Alert } from 'ant-design-vue';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';

  export const formSchema: FormSchema[] = [
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
    components: { BasicModal, Alert, BasicForm, AlertOutlined, CodeEditor },
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
      const [registerModal, { setModalProps }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });
      async function handleSubmit() {
        try {
        } catch (error) {
        } finally {
        }
      }
      return { handleSubmit, modeValue, registerForm, registerModal, loading };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .vben-basic-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>
