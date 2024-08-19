import { defineStore } from 'pinia';
import {
  deviceList,
  devicePageParams,
  devicePageModel,
  deviceByIdParams,
  editDeviceModel,
  editParams,
} from '/@/api/devicemange/model/deviceModel';
import {
  getpageasyncApi,
  modifyApi,
  changeenableApi,
  changedisableApi,
  getdevicebyconditionApi,
  addApi,
  validateApi,
  deletebyIdApi,
} from '/@/api/devicemange/device';
export const useDeviceStore = defineStore({
  id: 'app-device',
  actions: {
    async getPageAsync(params: devicePageParams): Promise<devicePageModel | null> {
      try {
        const { ...devicePageParams } = params;
        const data = await getpageasyncApi(devicePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getdevicebyconditionApi(params: devicePageParams): Promise<deviceList | null> {
      try {
        const { ...devicePageParams } = params;
        const data = await getdevicebyconditionApi(devicePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: deviceByIdParams): Promise<editDeviceModel | null> {
      try {
        const { ...deviceByIdParams } = params;
        const data = await deletebyIdApi(deviceByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editDeviceModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeenableApi(params: editParams): Promise<editDeviceModel | null> {
      try {
        const { ...editParams } = params;
        const data = await changeenableApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changedisableApi(params: editParams): Promise<editDeviceModel | null> {
      try {
        const { ...editParams } = params;
        const data = await changedisableApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editDeviceModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editDeviceModel | null> {
      try {
        const { ...editParams } = params;
        const data = await validateApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
