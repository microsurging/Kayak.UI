<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form>
        <a-row :gutter="8">
          <a-col :span="8" style="text-align: left">
            <a-form-item label="注册中心" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-select v-model:value="selectDefValue"
                        :options="regCenterDatas"
                        style="width: 220px; line-height: normal" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <BasicTable @register="registerTable">
    </BasicTable>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, unref, onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getServiceNodeColumns,
  } from '/@/views/servicemanage/serviceroute/data';
  import { PageWrapper } from '/@/components/Page';
  import { FormProps } from '/@/components/Table';
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
  import { useRegistryCenterStore } from '/@/store/modules/registrycenter';
  import { useModal } from '/@/components/Modal';
  import EditInfo from '/@/views/servicemanage/serviceroute/components/editservicenode.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
      const serviceRouteStore = useServiceRouteStore();
      const registryCenterStore = useRegistryCenterStore();
      const JsonData = ref([]);
      const page: any = ref(1);
      const inputText = ref('');
      const selectDefValue = ref(null);
      const pageSize: any = ref(10);
      const regCenterDatas = ref([]);
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      async function handleReset(e?: Event): Promise<void> {
        inputText.value = '';
        page.value = 1;

        GetPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        GetPage();
      }
      function getFormConfig(): Partial<FormProps> {
        return {
          labelWidth: 100,
          submitFunc: handleSubmit,
          resetFunc: handleReset,
          schemas: [],
        };
      }
      async function getList() {
        var list = await registryCenterStore.getlistApi();
        if (list) {
          selectDefValue.value = list[0].Id; 
          for (var i = 0; i < list?.length; i++) {
            regCenterDatas.value.push({
              value: list[i].Id,
              label: list[i].Name,
            });
          }
        }
      }
      async function GetPage() {
        serviceRouteStore
          .getaddressesApi({
            query: {
              registryCenterType: unref(selectDefValue), 
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            console.log(response.result);
            for (var i = 0; i < response.result.items.length; i++) {
              var model = response.result.items[i].address;
              model.isHealth = response.result.items[i].isHealth;
              JsonData.value.push(model);
            }
            total.value = response.result.total;
            handle();
          });
      }
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const [registerModal, { openModal }] = useModal();
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getServiceNodeColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;
          handle();
          GetPage();
        },
        canResize: canResize,
        resizeHeightOffset: 20,
        useSearchForm: true,
        striped: striped,
        formConfig: getFormConfig(),
        showIndexColumn: false,
        pagination: pagination,
      });

      function handle() {
        methods.setPagination(paginationProp.value);
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          parentId: unref(serviceId),
          regCenterT: unref(regCenterT),
        });
      }
      async function handleModalSuccess() {
        await GetPage();
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      onMounted(async () => {
        await getList();
        await GetPage();
      });
      return {
        confirm,
        registerModal,
        regCenterDatas,
        handleModalSuccess,
        registerTable,
        selectDefValue,
        inputText, 
        handleEdit,
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }

  ::v-deep .ant-card .ant-card-body {
    padding: 12px 12px 0px 0px;
    float: left;
  }

  ::v-deep .ant-table-wrapper .vben-basic-table-header__toolbar {
    justify-content: normal;
  }

  ::v-deep .vben-page-wrapper-content .vben-basic-table-form-container {
    padding: 0px;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 16px;
  }

  ::v-deep .ant-table .ant-btn-link {
    color: #1890ff;
  }
</style>
