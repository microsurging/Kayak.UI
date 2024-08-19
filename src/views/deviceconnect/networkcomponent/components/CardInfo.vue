<template>
  <div class="cardInfo">
    <div>
      <p>组件类型</p>
      <p>{{ activeUser }}</p>
    </div>
    <div>
      <p>端口号</p>
      <p>{{ newUser }}</p>
    </div>
    <div>
      <p>启动状态</p>
      <p>
        <a-popconfirm :title="confirmTitle" @confirm="confirm" @cancel="cancel">
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
  export default defineComponent({
    name: 'CardInfo',
    components: { Switch },
    props: {
      activeUser: {
        type: [String, Number],
        default: 0,
      },
      newUser: {
        type: [String, Number],
        default: 0,
      },
      state: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const state = ref(props.state);
      const confirmTitle = ref('');
      const handleChange = (checked) => {
        console.log(checked);
      };
      const handleClick = (checked) => {
        state.value = !state.value;
        if (checked == true) {
          confirmTitle.value = '是否开启';
        } else {
          confirmTitle.value = '是否停止';
        }
      };
      const confirm = (e) => {
        state.value = !state.value;
        console.log(e);
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 300);
        });
      };

      const cancel = (e) => {
        console.log(e);
      };
      const activeUser = props.activeUser;
      const newUser = props.newUser;

      return {
        handleChange,
        handleClick,
        activeUser,
        newUser,
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
