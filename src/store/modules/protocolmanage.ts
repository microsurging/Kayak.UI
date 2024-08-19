import { defineStore } from 'pinia';
import {
  protocolManagePageModel,
  protocolManageParams,
  protocolManageByIdParams,
  editProtocolManageModel,
} from '/@/api/deviceconnect/model/networkPartModel';
import {
  getpageasyncApi,
  cancelpublishApi,
  republishApi,
  deletebyIdApi,
} from '/@/api/deviceconnect/protocolmanage';
export const useProtocolManageStore = defineStore({
  id: 'app-protocolmanage',
  actions: {
    async getPageAsync(params: protocolManageParams): Promise<protocolManagePageModel | null> {
      try {
        const { ...protocolManageParams } = params;
        const data = await getpageasyncApi(protocolManageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async republishApi(params: protocolManageByIdParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await republishApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async cancelpublishApi(
      params: protocolManageByIdParams,
    ): Promise<editProtocolManageModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await cancelpublishApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: protocolManageByIdParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await deletebyIdApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
