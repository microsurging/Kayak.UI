import { defineStore } from 'pinia';
import {
  moduleParams,
  modulePageModel,
  moduleByIdParams,
  editModuleModel,
  editModuleParams,
} from '/@/api/servicemanage/model/moduleModel';
import {
  getpageasyncApi,
  deletebyIdApi,
  addApi,
  addAggApi,
  modifyAggApi,
  modifyApi,
} from '/@/api/servicemanage/module';
export const useModuleStore = defineStore({
  id: 'app-module',
  actions: {
    async getPageAsync(params: moduleParams): Promise<modulePageModel | null> {
      try {
        const { ...moduleParams } = params;
        const data = await getpageasyncApi(moduleParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: moduleByIdParams): Promise<editModuleModel | null> {
      try {
        const { ...moduleByIdParams } = params;
        const data = await deletebyIdApi(moduleByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editModuleParams): Promise<editModuleModel | null> {
      try {
        const { ...editModuleParams } = params;
        const data = await addApi(editModuleParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async addAggApi(params: editModuleParams): Promise<editModuleModel | null> {
      try {
        const { ...editModuleParams } = params;
        const data = await addAggApi(editModuleParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyAggApi(params: editModuleParams): Promise<editModuleModel | null> {
      try {
        const { ...editModuleParams } = params;
        const data = await modifyAggApi(editModuleParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editModuleParams): Promise<editModuleModel | null> {
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
