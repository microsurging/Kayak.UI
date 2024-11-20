<template>
  <BasicModal width="780px"
              :canFullscreen="false"
              v-bind="$attrs"
              @register="registerModal"
              :title="getTitle"
              :showCancelBtn="true"
              cancelText="关闭"
              :showOkBtn="false">
    <template v-if="!loading">
      <a-form ref="formRef">
        <a-row :gutter="20">
          <a-col :span="9" style="text-align: left">
            <a-button :type="btntypes[0]" @click="handleButtonClick(0)">1小时</a-button>
            <a-button :type="btntypes[1]" @click="handleButtonClick(1)">1天</a-button>
            <a-button :type="btntypes[2]" @click="handleButtonClick(2)">7天</a-button>
            <a-button :type="btntypes[3]" @click="handleButtonClick(3)">30天</a-button>
          </a-col>
          <a-col :span="3" style="text-align: left">
            <a-form-item label="记录时间">
              <a-config-provider :locale="locale">
                <DatePicker v-model:value="beginTime" 
                            :show-time="{ format: 'HH:mm' }"
                            style="width: 160px; z-index: 100"
                            @change="handleBeginDateChange"
                            placeholder="开始时间" />
                </a-config-provider>
            </a-form-item>
          </a-col>
          <a-col :span="6" style="text-align: left">
            <a-form-item label="至" style="text-align: center" >
              <a-config-provider :locale="locale">
                <DatePicker v-model:value="overTime"
                            :show-time="{ format: 'HH:mm' }"
                              @change="handleEndDateChange"
                            style="width: 160px; z-index: 100"
                            placeholder="结束时间" />
                </a-config-provider>
          </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-tabs default-active-key="1" @change="handleTabChange">
        <a-tab-pane key="1" tab="列表"/>

      </a-tabs>

      <component :is="components.get(compName)" />
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { DatePicker } from 'ant-design-vue';
  import { defineComponent, ref, markRaw, computed, unref, defineAsyncComponent } from 'vue';
    import { BasicModal, useModalInner } from '/@/components/Modal';
  import { FormInstance, Row, Col, } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import emitter from '/@/utils/eventbus';
  dayjs.locale('zh-cn');
  export default defineComponent({
    components: {
      BasicModal,
      DatePicker,
  'a-row': Row,
  'a-col': Col,
    },
     emits: [ 'register'],
    setup() {
      const btntypes: any = ref(["primary", "default", "default", "default"])
      const formRef = ref<FormInstance>();
      const startTime = ref(null);
      const beginTime = ref(null);
      const overTime = ref(null);
      const propertyId = ref("");
      const loading = ref(false);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const endTime = ref(null); 
      const isUpdate = ref(true);
      const [registerModal, { setModalProps }] = useModalInner(
        async (data) => { 
          setModalProps({ confirmLoading: true });
          startTime.value = null;
          beginTime.value = null;
          endTime.value = null;
          overTime.value = null;
             propertyId.value = data?.record?.propertyId;
             isUpdate.value = !!data?.isUpdate;
             setTimeout(() => handleButtonClick(-1), 300);
       if (unref(isUpdate)) {

       }
     },
   );
       const components = markRaw(new Map<string, any>());
          components.set(
      'datatable',
      defineAsyncComponent(() => import('./propertydetail.vue')),
    );
    const compName = ref('datatable');

      function handleButtonClick(key) {
        btntypes.value = ["default", "default", "default", "default"];
        switch (key) {
          case 0:
            btntypes.value[0] = 'primary';  
            endTime.value = formattedTime("1h");
            break
          case 1:
            btntypes.value[1] = 'primary';
            endTime.value = formattedTime("1d");
            break;
          case 2:
            btntypes.value[2] = 'primary';
            endTime.value = formattedTime("7d");
            break;
          case 3:
            btntypes.value[3] = 'primary';
            endTime.value = formattedTime("30d");
            break;
        } 
        if (endTime.value != null)
        startTime.value = new Date().toLocaleString('zh-CN', options).replace(/\//g, '-');
        setDisplayDate(); 
      }
      function setDisplayDate() {
        if (startTime.value != null)
          beginTime.value = dayjs(startTime.value, "YYYY-MM-DD HH:mm:ss");
        if (endTime.value != null)
          overTime.value = dayjs(endTime.value, "YYYY-MM-DD HH:mm:ss");

        emitter.off('runstateselectChanged', () => { });
        emitter.emit('runstateselectChanged', { beginTime: unref(startTime), overTime: unref(endTime), propertyId: unref(propertyId) }); 
      }
      function handleEndDateChange(_, datastr2) {
        endTime.value = datastr2;

        emitter.off('runstateselectChanged', () => { });
        emitter.emit('runstateselectChanged', { beginTime: unref(startTime), overTime: unref(endTime), propertyId: unref(propertyId) }); 
      }
      function handleBeginDateChange(_, datastr2) {
        startTime.value = datastr2;
        emitter.off('runstateselectChanged', () => { });
        emitter.emit('runstateselectChanged', { beginTime: unref(startTime), overTime: unref(endTime), propertyId: unref(propertyId) });
      }
      function formattedTime(format) {
        var result = "";
        let time = 0; 
        switch (format) {
          case "1h":
              time = 60 * 60 * 1000; // 一天的毫秒数
            result = new Date(new Date().getTime() + time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
          case "1d":
              time =24* 60 * 60 * 1000; // 一天的毫秒数
            result = new Date(new Date().getTime() + time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
          case "7d":
            time = 24 * 60 * 60 * 1000*7; // 一天的毫秒数
            result = new Date(new Date().getTime() + time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
          case "30d":
            time = 24 * 60 * 60 * 1000 * 30; // 一天的毫秒数
            result = new Date(new Date().getTime() + time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
        } 
        return result;
      }
    function handleTabChange(activeKey) {
      switch (activeKey) {
        case '1':
          compName.value = 'datatable';
          break;
      }
    }
    const getTitle = computed(() =>  '详情' );
      return {
        components,
        handleTabChange,
        compName,
        registerModal,
        handleButtonClick, 
        beginTime,
        overTime,
        formRef,  
        handleBeginDateChange,
        handleEndDateChange,
        btntypes, 
        getTitle,
        loading,
        locale,
      };
    },
  });
</script>
