import { defineStore } from 'pinia';
import {
  blackwhitelistParams,
  blackWhiteListPageModel,
  blackwhitelistByIdParams,
  editBlackWhiteListModel,
  editBlackWhiteListParams,
} from '/@/api/servicemanage/model/blackwhitelistModel';
import {
  getpageasyncApi,
  deletebyIdApi,
  addApi,
  addAggApi,
  modifyAggApi,
  disableAggApi,
  enableAggApi,
  modifyApi,
} from '/@/api/servicemanage/blackwhitelist';
export const useBlackWhiteListStore = defineStore({
  id: 'app-blackwhitelist',
  actions: {
    async getPageAsync(params: blackwhitelistParams): Promise<blackWhiteListPageModel | null> {
      try {
        const { ...blackwhitelistParams } = params;
        const data = await getpageasyncApi(blackwhitelistParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: blackwhitelistByIdParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...blackwhitelistByIdParams } = params;
        const data = await deletebyIdApi(blackwhitelistByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async disableAggApi(params: blackwhitelistByIdParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...blackwhitelistByIdParams } = params;
        const data = await disableAggApi(blackwhitelistByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async enableAggApi(params: blackwhitelistByIdParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...blackwhitelistByIdParams } = params;
        const data = await enableAggApi(blackwhitelistByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editBlackWhiteListParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...blackwhitelistParams } = params;
        const data = await addApi(blackwhitelistParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async addAggApi(params: editBlackWhiteListParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...blackwhitelistParams } = params;
        const data = await addAggApi(blackwhitelistParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyAggApi(params: editBlackWhiteListParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...editModuleParams } = params;
        const data = await modifyAggApi(editModuleParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editBlackWhiteListParams): Promise<editBlackWhiteListModel | null> {
      try {
        const { ...editModuleParams } = params;
        const data = await modifyApi(editModuleParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
