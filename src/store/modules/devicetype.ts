import { defineStore } from 'pinia';
import {
  deviceTypeList,
  deviceTypePageParams,
  deviceTypePageModel,
  deviceTypeAggregationPageModel,
  deviceTypeByIdParams,
  editDeviceTypeModel,
  deviceTypeAggregationModel,
  editParams,
} from '/@/api/devicemange/model/devicetypeModel';
import {
  getpageasyncApi,
   getdevicetypebyconditionApi,
  getaggregationpageasyncApi,
  modifyApi,
   getdevicetypebyidApi,
  addApi, 
  validateApi,
  deletebyIdApi,
  getdevicetypesApi
} from '/@/api/devicemange/devicetype';
export const useDeviceTypeStore = defineStore({
  id: 'app-deviceType',
  actions: {
    async getPageAsync(params: deviceTypePageParams): Promise<deviceTypePageModel | null> {
      try {
        const { ...deviceTypePageParams } = params;
        const data = await getpageasyncApi(deviceTypePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAggregationPageAsyncApi(
      params: deviceTypePageParams,
    ): Promise<deviceTypeAggregationPageModel | null> {
      try {
        const { ...deviceTypePageParams } = params;
        const data = await getaggregationpageasyncApi(deviceTypePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getdevicetypebyidApi(
      params: { id: number },
    ): Promise<deviceTypeAggregationModel | null> {
      try {
        const data = await getdevicetypebyidApi(params);
        return data.result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getdevicetypebyconditionApi(params: deviceTypePageParams): Promise<deviceTypeList | null> {
      try {
        const { ...deviceTypePageParams } = params;
        const data = await getdevicetypebyconditionApi(deviceTypePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getdevicetypesApi(): Promise<deviceTypeList | null> {
      try {
        const data = await getdevicetypesApi();
        return data.result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: deviceTypeByIdParams): Promise<editDeviceTypeModel | null> {
      try {
        const { ...productByIdParams } = params;
        const data = await deletebyIdApi(productByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editDeviceTypeModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async addApi(params: editParams): Promise<editDeviceTypeModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editDeviceTypeModel | null> {
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
