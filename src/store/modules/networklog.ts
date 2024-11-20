import { defineStore } from 'pinia';
import {
  networkLogPageParams,
  networkLogPageModel,
  networkLogByIdParams,
  editNetworkLogModel
} from '/@/api/sys/model/networklogModel';
import { getpageasyncApi, deletebyIdApi } from '/@/api/sys/networklog';
export const useNetworkLogStore = defineStore({
  id: 'app-networklog',
  actions: {
    async getPageAsync(params: networkLogPageParams): Promise<networkLogPageModel | null> {
      try {
        const { ...networkLogPageParams } = params;
        const data = await getpageasyncApi(networkLogPageParams);
        return data?.Result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: networkLogByIdParams): Promise<editNetworkLogModel | null> {
      try {
        const { ...networkLogByIdParams } = params;
        const data = await deletebyIdApi(networkLogByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
