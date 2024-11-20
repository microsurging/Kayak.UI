<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
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
  import tag from 'ant-design-vue/lib/tag';
  import CardInfo from './components/CardInfo.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import DebugModal from './components/debug.vue';
  import {  isNull } from '/@/utils/is';
  import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
  import { useNetworkPartStore } from '/@/store/modules/networkPart';
  import EditInfo from './components/edit.vue';
  export default defineComponent({
    name: 'Networkcomponent',
    components: {
      Card,
      Form,
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
      const sysDicManageStore = useSysDicManageStore();
      const networkPartStore = useNetworkPartStore();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      const componenttypeList = ref([]);
      const selComponentType = ref(null);
      const selComponentName = ref(null); 
      const cardList = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const showDrawer = () => {
        openDrawer(true, {
          isUpdate: false,
        });
      };
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      function getSysDicByCode() {
        sysDicManageStore
          .getaggsysdicbyparcodeApi({
            parentCode: 'componenttype',
          })
          .then((response) => {
            componenttypeList.value = response;
          });
      }
      async function GetPage() {
         cardList.value =[];
        networkPartStore
          .getaggregationpageasyncApi({
            query: {
              componentTypeCode: unref(selComponentType),
              name: unref(selComponentName),
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            cardList.value = response?.result.items;
            cardList.value.unshift([]);
          });
      }
      function handleDebug(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.id);

        networkPartStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      const handleChange = async (record: Recordable) => {
        if (record == null) {
          selComponentType.value = null;
        }
        else {
          selComponentType.value = record.code;
        }
        await GetPage();
      };
      const confirm = (e) => { 
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 3000);
        });
      };
      onMounted(async () => {
        await getSysDicByCode();
        await GetPage();
      });
      const cancel = (e) => { 
      };
      async function handleSuccess() {
        await GetPage();
   
      }
      function handleModalSuccess() {}
      return {
        handleDebug,
        handleChange,
        GetPage,
        selComponentType,
        selComponentName,
        registerDrawer,
        handleEdit,
        handleDeleteById,
        componenttypeList,
        handleModalSuccess,
        openDrawer,
        isNull, 
        showDrawer,
        registerModal,
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
         cardList,
        handleSuccess,
      };
    },
  });
</script>
<template>
  <div>
    <PageWrapper class="high-form">
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <a-form layout="inline">
          <a-row
            block
            style="
              padding-bottom: 11px;
              margin-bottom: 16px;
              width: 100%;
              border-bottom: 1px dashed #e8e8e8;
            "
          >
            <a-form-item>
              <span :style="{ marginRight: '30px' }">组件类型:</span>
              <template v-if="isNull(selComponentType)">
                <a-checkable-tag checked="true" @change="handleChange(null)" value="Category1">全部</a-checkable-tag>
              </template>
              <template v-else>
                <a-checkable-tag @change="handleChange(null)" value="Category1">全部</a-checkable-tag>
              </template>
              <template v-for="componenttypeItem in componenttypeList">
                <template v-if="componenttypeItem.code===selComponentType">
                  <a-checkable-tag checked="true" @change="handleChange(componenttypeItem)" :value="componenttypeItem.code">{{componenttypeItem.name}}</a-checkable-tag>
                </template>
                <template v-else>
                  <a-checkable-tag @change="handleChange(componenttypeItem)" :value="componenttypeItem.value">{{componenttypeItem.name}}</a-checkable-tag>
                </template>
              </template>
            </a-form-item>
          </a-row>
          <span :style="{ marginRight: '30px', marginTop: '5px' }">其它选项:</span>
          <a-row block>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="组件名称">
                <a-input placeholder="组件名称" @change="GetPage" v-model:value="selComponentName" style="width: 200px" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>

      <div :class="`${prefixCls}__content`">
        <a-list
          rowKey="id"
          :grid="{ gutter: 10, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3, xxxl: 2 }"
          :dataSource="cardList"
          class="card-list"
        >
          <template #renderItem="{ item }">
            <template v-if="!item || item.id === undefined">
              <a-list-item>
                <a-button class="new-btn" type="dashed" @click="showDrawer">
                  <Icon icon="ion:plus" :size="30" />
                  新增组件
                </a-button>
              </a-list-item>
            </template>
            <template v-else>
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
                  <div :class="`${prefixCls}__card-title`">
                    <Icon class="icon"     color="#1890ff" />
                    {{ item.name }}
                  </div>

                  <template #actions>
                    <a-tooltip title="编辑">
                      <Icon icon="ion:edit" :size="18" @click="handleEdit(item)" />
                    </a-tooltip>
                    <a-tooltip title="测试">
                      <Icon icon="ant-design:bug-outlined" :size="18" @click="handleDebug(item)" />
                    </a-tooltip>
                    <a-popconfirm title="确定删除此组件吗？" @confirm="handleDeleteById(item)" @cancel="cancel">
                      <a-tooltip title="删除">
                        <Icon icon="ant-design:delete-outlined" :size="18" />
                      </a-tooltip>
                    </a-popconfirm>
                  </template>
                  <div class="" v-if="item.status==1">
                    <card-info :componentType="item.componentType" :componentId="item.id" :port="item.port" :state="true" />
                  </div>
                  <div class="" v-else>
                    <card-info :componentType="item.componentType" :componentId="item.id" :port="item.port" :state="false" />
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
  .ant-row {
    ::v-deep .ant-row .ant-tag {
      margin-right: 30px;
      padding: 0 8px;
      font-size: 14px;
    }
    ::v-deep .ant-row .ant-tag-checkable-checked {
      background-color: #1890ff;
    }
  }

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
        display:flex;
        align-items:initial;
        .icon {
          margin-top: -5px;
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
    min-width: 36px;
    min-height: 36px;
    background: #ccc;
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 198px;
    margin-bottom: -10px;
    color: rgba(0, 0, 0, 0.45);
  }
</style>
