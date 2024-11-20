import { defineStore } from 'pinia';
import {
  sysUnitPageParams,
  sysUnitPageModel,
  sysUnitByIdParams,
  editUnitModel,
  sysUnitList 
} from '/@/api/sys/model/unitModel';
import { getpageasyncApi, deletebyIdApi, modifyApi, addApi, getListApi, validateApi } from '/@/api/sys/unit';
export const useUnitStore = defineStore({
  id: 'app-unit',
  actions: {
    async getPageAsync(params: sysUnitPageParams): Promise<sysUnitPageModel | null> {
      try {
        const { ...sysUnitPageParams } = params;
        const data = await getpageasyncApi(sysUnitPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: sysUnitByIdParams): Promise<editUnitModel | null> {
      try {
        const { ...sysUnitByIdParams } = params;
        const data = await deletebyIdApi(sysUnitByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editUnitModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editUnitModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getListApi(): Promise<sysUnitList | null> {
      try { 
        const data = await getListApi();
        return data.Result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editUnitModel | null> {
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
