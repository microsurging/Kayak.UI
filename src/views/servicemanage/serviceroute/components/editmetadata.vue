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
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
  export default defineComponent({
    name: 'DebugModal',
    components: { BasicModal, Form, Input, Textarea: Input.TextArea, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const serviceRouteStore = useServiceRouteStore();
      const loading = ref(false);
      const formRef = ref<FormInstance>();
      const isUpdate = ref(true);
      const lines = ref(10);
      const rowId = ref('');
      const regCenterT = ref(null);
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
          labelWidth: 100,
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
          parentId.value = data?.parentId ?? '';
          regCenterT.value = data?.regCenterT ?? 0;
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

      function modify(model: any, callback: Function) {
        var param = {};
        param.id = unref(parentId);
        param.registryCenterType = unref(regCenterT);
        param.metadatas = model;
        serviceRouteStore
          .modifyservicedescriptorApi({
            model: param,
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
      const getTitle = computed(() => '编辑元数据');
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
            }
          });
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
