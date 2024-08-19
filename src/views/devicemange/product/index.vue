<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import Icon from '/@/components/Icon/index';
  import {
    Card,
    Form,
    Row,
    Select,
    Tooltip,
    Menu,
    Dropdown,
    List,
    Avatar,
    Button,
  } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import tag from 'ant-design-vue/lib/tag';
  import CardInfo from './components/CardInfo.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import DebugModal from './components/debug.vue';
  import EditInfo from './components/edit.vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '/@/store/modules/product';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      Card,
      Form,
      DownOutlined,
      UpOutlined,
      Row,
      tag,
      Select,
      PageWrapper,
      Tooltip,
      Menu,
      Dropdown,
      List,
      Avatar,
      Icon,
      Button,
      CardInfo,
      EditInfo,
      DebugModal,
    },
    setup() {
      const productStore = useProductStore();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      const expand = ref(false);
      const router = useRouter();
      const cardList = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const formRef = ref<FormInstance>();
      async function GetPage() {
        productStore
          .getAggregationPageAsyncApi({
            query: {
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            console.log('dd', response?.result.items);
            cardList.value = response?.result.items;
            cardList.value.unshift([]);
          });
      }
      const showDrawer = () => {
        openDrawer(true, {
          isUpdate: true,
        });
      };
      function handleDebug() {
        openModal(true, {
          isUpdate: false,
        });
      }
      const handleChange = (checked) => {
        console.log(checked);
      };

      const handleProductDetail = () => {
        router.push({ path: '/DeviceMange/product/productDetail', replace: true });
      };
      const handleAdd = () => {
        router.push('/DeviceMange/product/add');
      };
      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.id);

        productStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }

      const cancel = (e) => {
        console.log(e);
      };
      function handleSuccess() {}
      function handleModalSuccess() {}
      onMounted(async () => {
        await GetPage();
      });
      return {
        formRef,
        handleAdd,
        handleProductDetail,
        expand,
        handleDebug,
        handleChange,
        registerDrawer,
        handleModalSuccess,
        openDrawer,
        showDrawer,
        registerModal,
        handleDeleteById,
        checked1: ref(false),
        checked2: ref(false),
        checked3: ref(false),
        checked4: ref(false),
        checked5: ref(false),
        checked6: ref(false),
        checked7: ref(false),
        checked8: ref(false),
        checked9: ref(false),
        checked10: ref(false),
        prefixCls: 'list-card',
        confirm,
        cancel,
        list: cardList,
        handleSuccess,
      };
    },
  });
</script>
<template>
  <div>
    <PageWrapper class="high-form">
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <a-form class="ant-advanced-search-form" ref="formRef">
          <a-row :gutter="24">
            <a-col v-show="expand || true" :span="8" style="text-align: left">
              <a-form-item label="产品名称" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-input placeholder="请输入产品名称" />
              </a-form-item>
            </a-col>
            <a-col v-show="expand || true" :span="8" style="text-align: left">
              <a-form-item label="所属品类" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-input placeholder="请输入所属品类" />
              </a-form-item>
            </a-col>
            <a-col v-show="expand" :span="8" style="text-align: left">
              <a-form-item label="产品类型" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col v-show="expand" :span="8" style="text-align: left">
              <a-form-item label="消息协议" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col v-show="expand || true" :span="8">
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">重置</a-button>
              <a style="font-size: 12px" @click="expand = !expand">
                <template v-if="expand">
                  收起
                  <UpOutlined />
                </template>
                <template v-else>
                  展开
                  <DownOutlined />
                </template>
              </a>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 20px">
            <a-col :span="24">
              <a-button type="primary" preIcon="ant-design:upload-outlined" html-type="submit"
                >快速导入</a-button
              >
            </a-col>
          </a-row>
        </a-form>
      </a-card>

      <div :class="`${prefixCls}__content`">
        <a-list
          rowKey="id"
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3, xxxl: 2 }"
          :dataSource="list"
          class="card-list"
        >
          <template #renderItem="{ item }">
            <template v-if="!item || item.id === undefined">
              <a-list-item>
                <a-button class="new-btn" type="default" @click="handleAdd">
                  <Icon icon="ion:plus" :size="30" />
                  新增产品
                </a-button>
              </a-list-item>
            </template>
            <template v-else>
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
                  <div :class="`${prefixCls}__card-title`">
                    <a-row :gutter="24">
                      <a-col :span="4">
                        <Icon class="icon" :color="item.color" :size="30" />
                      </a-col>
                      <a-col>
                        <div>
                          {{ item.productName }}
                        </div>
                        <div style="color: rgba(0, 0, 0, 0.45); font-size: 12px; padding: 5px">
                          {{ item.productCode }}
                        </div>
                      </a-col>
                    </a-row>
                  </div>

                  <template #actions>
                    <a-tooltip title="查看">
                      <Icon icon="ant-design:eye-twotone" :size="18" @click="handleProductDetail" />
                    </a-tooltip>
                    <a-tooltip title="编辑">
                      <Icon icon="ant-design:edit-outlined" :size="18" @click="showDrawer" />
                    </a-tooltip>
                    <a-tooltip title="下载">
                      <Icon icon="ant-design:download-outlined" :size="18" @click="handleDebug" />
                    </a-tooltip>
                    <a-popconfirm
                      title="确定删除此组件吗？"
                      @confirm="handleDeleteById(item)"
                      @cancel="cancel"
                    >
                      <a-tooltip title="删除">
                        <Icon icon="ant-design:delete-outlined" :size="18" />
                      </a-tooltip>
                    </a-popconfirm>
                  </template>
                  <div class="">
                    <card-info
                      :deviceType="item.prdDeviceType"
                      new-user="999"
                      :productId="item.id"
                      :state="item.status == 1"
                    />
                  </div>
                </a-card>
              </a-list-item>
            </template>
          </template>
        </a-list>
      </div>
    </PageWrapper>
    <EditInfo @register="registerDrawer" @success="handleSuccess" />
    <DebugModal @register="registerModal" @success="handleModalSuccess" :minHeight="428" />
  </div>
</template>
<style lang="less" scoped>
  .ant-pro-pages-list-projects-cardList {
    margin-top: 24px;
    ::v-deep .ant-card-meta-title {
      margin-bottom: 4px;
    }

    ::v-deep .ant-card-meta-description {
      height: 44px;
      overflow: hidden;
      line-height: 22px;
    }

    .cardItemContent {
      display: flex;
      height: 20px;
      margin-top: 16px;
      margin-bottom: -4px;
      line-height: 20px;
      > span {
        flex: 1 1;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
      }

      ::v-deep .ant-pro-avatar-list {
        flex: 0 1 auto;
      }
    }
  }

  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;
      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__content {
      margin-top: 16px;
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;
      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;
        .icon {
          margin-top: 5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
  }

  .ant-card-actions {
    background: #f7f9fa;
    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;
      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }

  ::v-deep .ant-card-actions .app-iconify svg {
    display: block;
    margin: auto;
  }

  ::v-deep span.iconify {
    min-width: 48px;
    min-height: 48px;
    background: #ccc;
  }

  ::v-deep .ant-col {
    width: auto;
  }

  .new-btn {
    border-radius: 2px;
    width: 100%;
    height: 220px;
    color: rgba(0, 0, 0, 0.45);
  }
</style>
