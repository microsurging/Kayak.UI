import { defineStore } from 'pinia';
import {
  deviceEventByIdParams,
  deviceEventPageModel,
  deviceEventPageParams,
  editDeviceEventModel,
} from '/@/api/devicemange/model/deviceEventModel';
import { deletebyIdApi, getpageasyncApi,  } from '/@/api/devicemange/deviceEvent';
export const useDeviceEventStore = defineStore({
  id: 'app-deviceEvent',
  actions: {
    async deletebyIdApi(params: deviceEventByIdParams): Promise<editDeviceEventModel | null> {
      try {
        const { ...deviceEventByIdParams } = params;
        const data = await deletebyIdApi(deviceEventByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, 
    async getpageasyncApi(
      params: deviceEventPageParams,
    ): Promise<deviceEventPageModel | null> {
      try {
        const { ...deviceEventPageParams } = params;
        const data = await getpageasyncApi(deviceEventPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
