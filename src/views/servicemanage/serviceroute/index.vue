<template>
  <PageWrapper :class="prefixCls">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="24">
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <a-select
            v-model:value="selectDefValue"
            :options="regCenterDatas"
            style="width: 240px; margin-top: 20px; line-height: normal"
          />
        </a-col>
        <a-col :span="3" :class="`${prefixCls}__top-col`">
          <div>全部服务</div>
          <p
            ><CountTo :startVal="1" :endVal="statistics.serviceTotal" style="padding-left: 5px"
          /></p>
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>正常运行</div>
          <p
            ><CountTo :startVal="1" :endVal="statistics.serviceRunCount" style="padding-left: 5px"
          /></p>
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>异常运行</div>
          <p
            ><CountTo
              :startVal="1"
              :endVal="statistics.serviceAbnormalCount"
              style="padding-left: 5px"
          /></p>
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>服务节点</div>
          <p
            ><CountTo :startVal="1" :endVal="statistics.serviceNodeCount" style="padding-left: 5px"
          /></p>
        </a-col>
      </a-row>
    </div>
    <div :class="`${prefixCls}__content`">
      <BasicTable @register="registerTable" style="min-height: 560px">
        <template #action="{ record }">
          <TableAction :actions="[ :actions="[ { label: '查看', tooltip: '查看详情', onClick:
          handleDetail.bind(null, record), }, { label: '编辑', tooltip: '编辑注册中心', onClick:
          handleEdit.bind(null, record), }, { label: '删除', onClick: handleDelete.bind(null,
          record), ifShow: record.isDelete, tooltip: '删除此注册中心', popConfirm: { title:
          '是否删除此注册中心', confirm: handleDelete.bind(null, record), }, }, ]" />
        </template>
        <template #toolbar>
          <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新建 </a-button>
        </template>
      </BasicTable>
    </div>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, unref, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig, getBasicData } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import EditInfo from './components/edit.vue';
  import { useRouter } from 'vue-router';
  import { useRegistryCenterStore } from '/@/store/modules/registrycenter';
  import { CountTo } from '/@/components/CountTo/index';
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
  export default defineComponent({
    components: { BasicTable, CountTo, PageWrapper, TableAction, EditInfo },
    setup() {
      const registryCenterStore = useRegistryCenterStore();
      const serviceRouteStore = useServiceRouteStore();
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const router = useRouter();
      const selectDefValue = ref(null);
      const selectName = ref(null);

      const statistics = ref({});
      const regCenterDatas = ref([]);
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      const [registerModal, { openModal }] = useModal();
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getBasicColumns(),
        canResize: canResize,
        useSearchForm: false,
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;
          handle();
          GetPage();
        },
        formConfig: getFormConfig(),
        striped: striped,
        showIndexColumn: false,
        pagination: pagination,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      function handle() {
        methods.setPagination(paginationProp.value);
      }
      const confirm = (e) => {
        console.log(e);
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 3000);
        });
      };
      async function getList() {
        var list = await registryCenterStore.getlistApi();
        if (list) {
          selectDefValue.value = list[0].Id;
          selectName.value = list[0].Name;
          for (var i = 0; i < list?.length; i++) {
            regCenterDatas.value.push({
              value: list[i].Id,
              label: list[i].Name,
            });
          }
        }
      }

      async function GetStatistics() {
        var model = await serviceRouteStore.getstatisticsApi({
          registryCenterType: unref(selectDefValue),
        });
        statistics.value = model.result;
      }

      async function GetPage() {
        serviceRouteStore
          .getPageAsync({
            query: {
              registryCenterType: unref(selectDefValue),
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            console.log(response.result);
            var list = response.result.items;
            if (list) {
              JsonData.value = [];
              for (var i = 0; i < list.length; i++) {
                var serviceDescriptor = list[i].serviceDescriptor;
                serviceDescriptor.regCenterName = unref(selectName);

                serviceDescriptor.isDelete = list[i].address.length == 0;
                JsonData.value.push(serviceDescriptor);
              }
            }
            total.value = response.result.total;
            handle();
          });
      }
      const cancel = (e) => {
        console.log(e);
      };
      const showAddModal = () => {
        openModal(true, {
          isUpdate: false,
          regCenterT: unref(selectDefValue),
        });
      };
      function handleAddGateway(record: Recordable) {
        openModal(true, {
          isUpdate: false,
          parentId: record.CategoryId,
        });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          regCenterT: unref(selectDefValue),
        });
      }
      const handleDetail = (record: Recordable) => {
        router.push({
          path: '/servicemanage/serviceroute/detail',
          replace: true,
          query: {
            id: record.id,
            regCenterName: record.regCenterName,
            regCenterT: unref(selectDefValue),
          },
        });
      };
      async function handleModalSuccess() {
        await GetStatistics();
        await GetPage();
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      onMounted(async () => {
        await getList();
        await GetStatistics();
        await GetPage();
      });
      return {
        prefixCls: 'list-basic',
        confirm,
        registerModal,
        statistics,
        selectDefValue,
        cancel,
        regCenterDatas,
        showAddModal,
        handleAddGateway,
        handleDetail,
        handleModalSuccess,
        registerTable,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>
<style lang="less" scoped>
  .list-basic {
    &__top {
      padding: 12px;
      text-align: center;
      background-color: @component-background;
      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
        }

        p {
          margin: 0;
          font-size: 24px;
          line-height: 32px;
          color: @text-color;
        }
      }
    }

    &__content {
      padding: 12px;
      margin-top: 12px;
      background-color: @component-background;
      .list {
        position: relative;
      }

      .icon {
        font-size: 40px !important;
      }

      .extra {
        position: absolute;
        top: 20px;
        right: 15px;
        font-weight: normal;
        color: @primary-color;
        cursor: pointer;
      }

      .description {
        display: inline-block;
        width: 40%;
      }

      .info {
        display: inline-block;
        width: 30%;
        text-align: center;
        div {
          display: inline-block;
          padding: 0 20px;
          span {
            display: block;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 15%;
        vertical-align: top;
      }
    }
  }

  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }

  ::v-deep .ant-table-wrapper .vben-basic-table-header__toolbar {
    justify-content: normal;
  }

  ::v-deep .vben-page-wrapper-content .vben-basic-table-form-container {
    padding: 0px;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 4px;
  }

  ::v-deep .ant-table .ant-btn-link {
    color: #1890ff;
  }
</style>
