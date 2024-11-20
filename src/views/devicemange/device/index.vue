<template>
  <PageWrapper :class="prefixCls">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="24">
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <a-select
            :options="productDatas"
            style="width: 240px; margin-top: 20px; line-height: normal"
          />
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>全部设备</div>
          <p><CountTo :startVal="1" :endVal="699890" style="padding-left: 5px" /></p>
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>在线设备</div>
          <p><CountTo :startVal="1" :endVal="24" style="padding-left: 5px" /></p>
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>离线设备</div>
          <p><CountTo :startVal="1" :endVal="33" style="padding-left: 5px" /></p>
        </a-col>
        <a-col :span="4" :class="`${prefixCls}__top-col`">
          <div>未启设备</div>
          <p><CountTo :startVal="1" :endVal="2" style="padding-left: 5px" /></p>
        </a-col>
      </a-row>
    </div>
    <div :class="`${prefixCls}__content`">
      <BasicTable @register="register">
        <template #action="{ record }">
          <a-tooltip title="查看">
            <a-button type="link" @click="handleSee(record)">查看</a-button>
          </a-tooltip>
          <a-tooltip title="编辑">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
          </a-tooltip>
          <a-popconfirm
            title="确定禁用吗？"
            @confirm="handleDisable(record)"
            @cancel="cancel"
            v-if="record.Status === 1"
          >
            <a-tooltip title="禁用">
              <a-button type="link">禁用</a-button>
            </a-tooltip>
          </a-popconfirm>
          <a-popconfirm
            title="确定启用吗？"
            @confirm="handleEnable(record)"
            @cancel="cancel"
            v-if="record.Status === 0"
          >
            <a-tooltip title="启用">
              <a-button type="link">启用</a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
        <template #toolbar>
          <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新增 </a-button>

          <a-dropdown-button>
            <Icon icon="ant-design:menu-outlined" :size="18" />
            其它批量操作
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">
                  <a-button
                    type="default"
                    preIcon="ant-design:download-outlined"
                    @click="showAddModal"
                  >
                    批量导出设备
                  </a-button>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-button
                    type="default"
                    preIcon="ant-design:upload-outlined"
                    @click="showAddModal"
                  >
                    批量导入设备
                  </a-button>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-button
                    type="primary"
                    danger
                    preIcon="ant-design:check-circle-twotone"
                    @click="showAddModal"
                  >
                    激活全部设备
                  </a-button>
                </a-menu-item>
                <a-menu-item key="4">
                  <a-button
                    type="primary"
                    danger
                    preIcon="ant-design:sync-outlined"
                    @click="showAddModal"
                  >
                    同步设备状态
                  </a-button>
                </a-menu-item>
              </a-menu>
            </template>

            <template #icon>
              <DownOutlined />
            </template>
          </a-dropdown-button>

          <div style="width: 100%; text-align: right">
            <a-select value="设备ID">
              <a-select-option value="设备名称">设备名称</a-select-option>
              <a-select-option value="所属机构">所属机构</a-select-option>
              <a-select-option value="设备标签">设备标签</a-select-option>
              <a-select-option value="所属品类">所属品类</a-select-option>
              <a-select-option value="所属品类">所属品类</a-select-option>
            </a-select>
            <a-input-search
              v-model:value="value"
              placeholder="请输入搜索信息"
              style="width: 200px"
              @search="onSearch"
            />
          </div>
        </template>
      </BasicTable>
    </div>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts">
  import { Row, Col, Select, Card } from 'ant-design-vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import Icon from '/@/components/Icon/index';
  import { CountTo } from '/@/components/CountTo/index';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useDeviceStore } from '/@/store/modules/device';
  import { getBasicColumns } from './data';
  import { useProductStore } from '/@/store/modules/product';
  import EditInfo from './components/edit.vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      PageWrapper,
      Select,
      EditInfo,
      CountTo,
      Icon,
      [Row.name]: Row,
      [Col.name]: Col,
      BasicTable,
      Card,
      DownOutlined,
    },
    setup() {
      const deviceStore = useDeviceStore();
      const productStore = useProductStore();
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const total: any = ref(null);
      const JsonData = ref([]);
      const productDatas = ref([]);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      const striped = ref(false);
      const canResize = ref(true);
      const router = useRouter();
      const [registerModal, { openModal }] = useModal();
      const confirm = (e) => {
        console.log(e);
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 3000);
        });
      };

      const cancel = (e) => {
        console.log(e);
      };
      const showAddModal = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      async function GetPage() {
        deviceStore
          .getPageAsync({
            query: {
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            JsonData.value = response.Result.Items;
            total.value = response.Result.Total;
            handle();
          });
      }
      async function GetProducts() {
        var list = await productStore.getproductsApi();
        var options = [];
        if (list)
          for (var i = 0; i < list?.length; i++) {
            productDatas.value.push({
              value: list[i].productCode,
              label: list[i].productName,
            });
          }
      }
      function handleAddCategory(record: Recordable) {
        openModal(true, {
          isUpdate: false,
          parentId: record.CategoryId,
        });
      }
      const [register, { expandAll, collapseAll, setPagination }] = useTable({
        canResize: canResize,
        striped: striped,
        showIndexColumn: false,
        columns: getBasicColumns(),
        dataSource: JsonData,
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          GetPage();
        },
        rowSelection: {
          type: 'checkbox',
          columnWidth: 60,
          getCheckboxProps() {
            // Demo: 第一行（id为0）的选择框禁用
            return { disabled: false };
          },
        },
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        rowKey: 'CategoryId',
      });
      function handle() {
        setPagination(paginationProp.value);
      }
      const handleSee=(record: Recordable) => {
        router.push({
          path: '/device/deviceDetai',
          replace: true,
          query: {
            id: record.Id,
            code: record.Code,
            name: record.Name,
            typeCode: record.ProductCode	
          },

        });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDisable(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        deviceStore
          .changedisableApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      function handleEnable(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        deviceStore
          .changeenableApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }

      async function handleModalSuccess() {
        await GetPage();
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      onMounted(async () => {
        await GetPage();
        await GetProducts();
      });
      return {
        handleSee,
        prefixCls: 'list-basic',
        productDatas,
        handleEdit,
        handleDisable,
        handleEnable,
        handleModalSuccess,
        handleAddCategory,
        handleDelete,
        register,
        showAddModal,
        confirm,
        cancel,
        registerModal,
        expandAll,
        collapseAll,
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

  ::v-deep .ant-table .ant-btn-link {
    color: #1890ff;
  }
</style>
