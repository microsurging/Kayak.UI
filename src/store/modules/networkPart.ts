import { defineStore } from 'pinia';
import {
  networkPartParams,
  networkPartPageModel,
  networkPartAggregationModel,
  editNetworkPartModel,
  networkPartByIdParams,
  editNetworkPartParams,
  networkPartList
} from '/@/api/deviceconnect/model/networkPartModel';
import {
  getpageasyncApi,
  deletebyIdApi,
  modifyApi,
  openApi,
  stopApi,
  addApi,
  validateApi,
  createnetworkApi,
  shundownnetworkApi,
  getnetworkpartbyconditionApi,
  getaggregationpageasyncApi,
  aggregationModifyApi
} from '/@/api/deviceconnect/networkPart';
export const useNetworkPartStore = defineStore({
  id: 'app-networkpart',
  actions: {
    async getPageAsync(params: networkPartParams): Promise<networkPartPageModel | null> {
      try {
        const { ...networkPartParams } = params;
        const data = await getpageasyncApi(networkPartParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getnetworkpartbyconditionApi(params: networkPartParams): Promise<networkPartList | null> {
      try {
        const { ...networkPartParams } = params;
        const data = await getnetworkpartbyconditionApi(networkPartParams);
        return data.result || data.Result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getaggregationpageasyncApi(params: networkPartParams): Promise<networkPartAggregationModel | null> {
      try {
        const { ...networkPartParams } = params;
        const data = await getaggregationpageasyncApi(networkPartParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: networkPartByIdParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...networkPartByIdParams } = params;
        const data = await deletebyIdApi(networkPartByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async openApi(params: networkPartByIdParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...networkPartByIdParams } = params;
        const data = await openApi(networkPartByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async createnetworkApi(params: { id: number|null }): Promise<editNetworkPartModel | null> {
      try { 
        const data = await createnetworkApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async shundownnetworkApi(params: { id: number | null }): Promise<editNetworkPartModel | null> {
      try {
        const data = await shundownnetworkApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async stopApi(params: networkPartByIdParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...networkPartByIdParams } = params;
        const data = await stopApi(networkPartByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editNetworkPartParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...editNetworkPartParams } = params;
        const data = await modifyApi(editNetworkPartParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async aggregationModifyApi(params: editNetworkPartParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...editNetworkPartParams } = params;
        const data = await aggregationModifyApi(editNetworkPartParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editNetworkPartParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...editNetworkPartParams } = params;
        const data = await addApi(editNetworkPartParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editNetworkPartParams): Promise<editNetworkPartModel | null> {
      try {
        const { ...editNetworkPartParams } = params;
        const data = await validateApi(editNetworkPartParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
