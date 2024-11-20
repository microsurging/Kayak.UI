import { defineStore } from 'pinia';
import {
  protocolManagePageModel,
  protocolManageParams,
  protocolManageByIdParams,
  editProtocolManageModel,
  protocolManageList,
  editProtocolManageParams,
} from '/@/api/deviceconnect/model/networkPartModel';
import {
  getpageasyncApi,
  cancelpublishApi,
  cancelpublishaggApi,
  republishApi,
  republishaggApi,
  deletebyIdApi,
  getprotocolsApi,
  addApi,
  addAggApi,
  modifyApi,
  modifyAggApi
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
    async getprotocolsApi(): Promise<protocolManageList | null> {
      try {
        const data = await getprotocolsApi();
        return data.result || data.Result;
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

    async republishaggApi(params: protocolManageByIdParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await republishaggApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async cancelpublishaggApi(
      params: protocolManageByIdParams,
    ): Promise<editProtocolManageModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await cancelpublishaggApi(sysDicByIdParams);
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
    async addApi(params: editProtocolManageParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...editProtocolManageParams } = params;
        const data = await addApi(editProtocolManageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addAggApi(params: editProtocolManageParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...editProtocolManageParams } = params;
        const data = await addAggApi(editProtocolManageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editProtocolManageParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...editProtocolManageParams } = params;
        const data = await modifyApi(editProtocolManageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyAggApi(params: editProtocolManageParams): Promise<editProtocolManageModel | null> {
      try {
        const { ...editProtocolManageParams } = params;
        const data = await modifyAggApi(editProtocolManageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
