<template>
  <BasicModal @register="registerModal"
              width="520px"
              :title="getTitle"
              :canFullscreen="false"
              v-bind="$attrs"
              @ok="handleSubmit">
    <template v-if="!loading">
      <BasicForm style="margin-top: 10px" @register="registerForm" />
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useUnitStore } from '/@/store/modules/unit';
  import { Form, Input } from 'ant-design-vue';
  import { sysUnitFormSchema, setId } from '../data';
  import type { FormInstance } from 'ant-design-vue';
  export default defineComponent({
    name: 'EditInfo',
    components: { BasicModal, Form, Input, Textarea: Input.TextArea, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const loading = ref(false);
      const formRef = ref<FormInstance>();
      const isUpdate = ref(true);
      const lines = ref(10);
      const rowId = ref('');
      let Id: number = 0; 
      const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
      };
      const unitStore = useUnitStore();
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: sysUnitFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
        async (data) => {
          resetFields();
          setModalProps({ confirmLoading: false });
          isUpdate.value = !!data?.isUpdate;
          Id = data?.record?.Id ?? 0;
          setId(Id);
          if (unref(isUpdate)) {
            rowId.value = data.record.CategoryId;
            setFieldsValue({
              ...data.record,
            });
          }
        },
      );

      function modify(model: any, callback: Function) {
        model.Id = Id;
        unitStore
          .modifyApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      function add(model: any, callback: Function) {
        unitStore
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
      const getTitle = computed(() => (!unref(isUpdate) ? '新增单位' : '编辑单位'));
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
        } catch (error) {
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, layout, loading, registerForm, formRef, getTitle, handleSubmit };
    },
  });
</script>
<style lang="less" scoped>
  .ant-row {
    ::v-deep .ant-col{
    width: auto;
  }

  }

  ::v-deep .ant-form-item {
    padding-top: 5px;
  }
</style>
