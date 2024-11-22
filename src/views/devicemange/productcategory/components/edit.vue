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
  import { usePrdCategoryStore } from '/@/store/modules/productcategory';
  import { Form, Input } from 'ant-design-vue';
  import { productCategoryFormSchema, setId } from '/@/views/devicemange/productcategory/data';
  import type { FormInstance } from 'ant-design-vue';
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
      let Id = ref<number>(0);
      const parentCode = ref('');
      const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
      };
      const prdCategoryStore = usePrdCategoryStore();
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: productCategoryFormSchema,
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
          Id = unref(data?.record?.Id ?? 0);
          parentCode.value = data?.parentCode ?? '';
          setId(data?.parentCode ?? '');
          if (unref(isUpdate)) {
            rowId.value = data.record.CategoryId;
            setFieldsValue({
              ...data.record,
            });
          }
        },
      );

      function modify(model: any, callback: Function) {
        model.Id = unref(Id);
        prdCategoryStore
          .modifyApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      function add(model: any, callback: Function) {
        model.CategoryId = unref(parentCode);
        prdCategoryStore
          .addApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      function addChildren(model: any, callback: Function) {
        model.CategoryId = unref(parentCode);
        prdCategoryStore
          .addchildrenApi({
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
      const getTitle = computed(() => (!unref(isUpdate) ? '新增产品分类' : '编辑产品分类'));
      async function handleSubmit() {
        try {
          await validate().then((p) => {
            const callback = (result) => {
              setModalProps({ confirmLoading: true });
              closeModal();
              emit('success', {
                isUpdate: unref(isUpdate),
                values: { ...p, CategoryId: unref(parentCode) },
              });
            };
            if (unref(isUpdate) == true) {
              modify(p, callback);
            } else {
              if (unref(parentCode).length == 0) add(p, callback);
              else addChildren(p, callback);
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
    ::v-deep .ant-col {
      width: auto;
    }
  }

  ::v-deep .ant-form-item {
    padding-top: 5px;
  }
</style>
