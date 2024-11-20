import { defineStore } from 'pinia';
import {
  deviceConfigApiModel,
  editDeviceConfigModel,
  editParams, 
} from '/@/api/devicemange/model/deviceConfigModel';
import { 
  modifyApi,
  getbydevicecodeApi,
  addApi,
} from '/@/api/devicemange/deviceConfig';
export const useDeviceConfigStore = defineStore({
  id: 'app-deviceconfig',
  actions: {
    async getbydevicecodeApi(params: { deviceCode: string }): Promise<deviceConfigApiModel | null> {
      try {
        const data = await getbydevicecodeApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, 
    async modifyApi(params: editParams): Promise<editDeviceConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editDeviceConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
