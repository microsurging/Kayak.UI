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
      <BasicForm style="margin-top: 10px" @register="registerForm" />
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Form, Input } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { FormSchema } from '/@/components/Table';
  export default defineComponent({
    name: 'DebugModal',
    components: { BasicModal, Form, Input, Textarea: Input.TextArea, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const loading = ref(false);
      const formRef = ref<FormInstance>();
      const isUpdate = ref(true);
      const lines = ref(10);
      const rowId = ref('');
      var list: any;
      const parentId = ref('');
      const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
      };
      const schemas: FormSchema[] = [
        {
          ifShow: false,
          field: 'name',
          label: '',
          component: 'Input',
        },
      ];
      const [registerForm, { setFieldsValue, resetSchema, appendSchemaByField, validate }] =
        useForm({
          labelWidth: 220,
          schemas: schemas,
          showActionButtonGroup: false,
          actionColOptions: {
            span: 23,
          },
        });
      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
        async (data) => {
          resetSchema(schemas), setModalProps({ confirmLoading: false });
          isUpdate.value = !!data?.isUpdate;
          var obj = {};
          for (var i = 0; i < data.achieveList.length; i++) {
            var schema: FormSchema = {
              field: data.achieveList[i].name,
              label: data.achieveList[i].name,
              component: 'Input',
              componentProps: {
                formvalues: data.achieveList[i].name,
              },
            };
            Object.defineProperty(obj, data.achieveList[i].name, {
              value: JSON.stringify(data.achieveList[i].value),
              writable: true,
              enumerable: true,
              configurable: true,
            });
            appendSchemaByField(schema, undefined, true);
          }
          setFieldsValue({
            ...obj,
          });
        },
      );

      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        },
      );
      const getTitle = computed(() => '编辑服务规则');
      async function handleSubmit() {
        try {
          console.log('parentId', parentId);
          const values = await validate();
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success', {
            isUpdate: unref(isUpdate),
            values: { ...values, CategoryId: rowId.value },
          });
        } catch (error) {
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return {
        list,
        registerModal,
        layout,
        loading,
        registerForm,
        formRef,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-row {
    ::v-deep .ant-col {
      width: auto;
    }
  }

  ::v-deep .ant-form-item {
    padding-top: 5px;
  }
</style>
