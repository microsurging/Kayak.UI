import { defineStore } from 'pinia';
import {
  getdevicemsgtotalApi,
  getgroupstatisticsApi
} from '/@/api/devicemange/devicemessage';
export const useDeviceMsgTotalStore = defineStore({
  id: 'app-devicemsgtotal',
  actions: {
    async getdevicemsgtotalApi(): Promise<any> {
      try {
        const data = await getdevicemsgtotalApi();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getgroupstatisticsApi(params: { startDate: Date, endDate: Date }): Promise<any> {
      try {
        const data = await getgroupstatisticsApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
