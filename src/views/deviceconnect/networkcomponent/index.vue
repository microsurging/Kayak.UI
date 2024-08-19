<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import Icon from '/@/components/Icon/index';
  import { cardList } from './data';
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
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
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
      const confirm = (e) => {
        console.log(e);
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 3000);
        });
      };

      const cancel = (e) => {
        console.log(e);
      };
      function handleSuccess() {}
      function handleModalSuccess() {}
      return {
        handleDebug,
        handleChange,
        registerDrawer,
        handleModalSuccess,
        openDrawer,
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
              <a-checkable-tag v-model:checked="checked1" @change="handleChange" value="Category1"
                >全部</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked2" @change="handleChange" value="Category2"
                >UDP</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked3" @change="handleChange" value="Category3"
                >HTTP服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked4" @change="handleChange" value="Category4"
                >MQTT服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked5" @change="handleChange" value="Category5"
                >WEBSOCKET服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked6" @change="handleChange" value="Category6"
                >TCP服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked7" @change="handleChange" value="Category7"
                >RTMP服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked8" @change="handleChange" value="Category8"
                >RTSP服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked9" @change="handleChange" value="Category9"
                >HTTPFLV服务</a-checkable-tag
              >
              <a-checkable-tag v-model:checked="checked10" @change="handleChange" value="Category10"
                >DNS服务</a-checkable-tag
              >
            </a-form-item>
          </a-row>
          <span :style="{ marginRight: '30px', marginTop: '5px' }">其它选项:</span>
          <a-row block>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="配置名称">
                <a-input placeholder="配置名称" style="width: 200px" />
              </a-form-item>
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
                <a-button class="new-btn" type="dashed">
                  <Icon icon="ion:plus" :size="30" />
                  新增组件
                </a-button>
              </a-list-item>
            </template>
            <template v-else>
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
                  <div :class="`${prefixCls}__card-title`">
                    <Icon class="icon" :color="item.color" />
                    {{ item.title }}
                  </div>

                  <template #actions>
                    <a-tooltip title="编辑">
                      <Icon icon="ion:edit" :size="18" @click="showDrawer" />
                    </a-tooltip>
                    <a-tooltip title="测试">
                      <Icon icon="ant-design:bug-outlined" :size="18" @click="handleDebug" />
                    </a-tooltip>
                    <a-popconfirm title="确定删除此组件吗？" @confirm="confirm" @cancel="cancel">
                      <a-tooltip title="删除">
                        <Icon icon="ant-design:delete-outlined" :size="18" />
                      </a-tooltip>
                    </a-popconfirm>
                  </template>
                  <div class="">
                    <card-info :active-user="item.componenttype" new-user="999" />
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
    min-width: 24px;
    min-height: 24px;
    background: #ccc;
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 190px;
    color: rgba(0, 0, 0, 0.45);
  }
</style>
