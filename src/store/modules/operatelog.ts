import { defineStore } from 'pinia';
import {
  operateLogByIdParams,
  editOperateLogModel,
  operateLogPageParams,
  operateLogPageModel,
} from '/@/api/sys/model/operatelogModel';
import { getpageasyncApi, deletebyIdApi } from '/@/api/sys/operatelog';
export const useOperateLogStore = defineStore({
  id: 'app-operatelog',
  actions: {
    async getPageAsync(params: operateLogPageParams): Promise<operateLogPageModel | null> {
      try {
        const { ...operateLogPageParams } = params;
        const data = await getpageasyncApi(operateLogPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: operateLogByIdParams): Promise<editOperateLogModel | null> {
      try {
        const { ...operateLogByIdParams } = params;
        const data = await deletebyIdApi(operateLogByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
