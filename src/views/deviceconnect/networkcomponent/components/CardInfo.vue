<template>
  <div class="cardInfo">
    <div>
      <p>组件类型</p>
      <p>{{ componentType.name }}</p>
    </div>
    <div>
      <p>端口号</p>
      <p>{{ port }}</p>
    </div>
    <div>
      <p>启动状态</p>
      <p>
        <a-popconfirm :title="confirmTitle" @confirm="confirm(componentId)" @cancel="cancel">
          <a-switch
            slot="actions"
            v-model:checked="state"
            checked-children="开"
            un-checked-children="关"
            size="small"
            @change="handleChange"
            @click="handleClick"
          />
        </a-popconfirm>
      </p>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { useNetworkPartStore } from '/@/store/modules/networkPart';
  export default defineComponent({
    name: 'CardInfo',
    components: { Switch },
    props: {
      componentType: {
        type: [Object],
        default: 0,
      },
      componentId: {
        type: [String, Number],
        default: 0,
      },
      port: {
        type: [String, Number],
        default: 0,
      },
      state: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const networkPartStore = useNetworkPartStore();
      const state = ref(props.state); 
      const confirmTitle = ref('');
      const handleChange = (checked) => { 
      };
      const handleClick = (checked) => {
        state.value = !state.value;
        if (checked == true) {
          confirmTitle.value = '是否开启';
        } else {
          confirmTitle.value = '是否停止';
        }
      };
      const confirm = async (id) => {
        var ids = [];
        ids.push(id);
        if (state.value)
          await networkPartStore.shundownnetworkApi({
            id: id,
          });
        else
          await networkPartStore.createnetworkApi({
            id: id,
          });
        state.value = !state.value;
      };

      const cancel = (e) => { 
      };
      const componentType = props.componentType;
      const port = props.port;
      const componentId = props.componentId;
      return {
        handleChange,
        componentId,
        handleClick,
        componentType, 
        port,
        state,
        confirmTitle,
        confirm,
        cancel,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/utils/utils.less';
  .cardInfo {
    .clearfix();
    margin-top: 16px;
    margin-left: 5px;
    & > div {
      position: relative;
      float: left;
      width: 33%;
      text-align: center;
      p {
        margin: 0;
        font-size: 14px;
        line-height: 32px;
      }

      p:first-child {
        margin-bottom: 4px;
        color: @text-color-secondary;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
