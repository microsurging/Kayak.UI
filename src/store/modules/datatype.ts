import { defineStore } from 'pinia';
import {
  sysDataTypePageParams,
  sysDataTypePageModel,
  sysDataTypeByIdParams,
  editSysDataTypeModel,
  editParams,
} from '/@/api/sys/model/datatypeModel';
import { getpageasyncApi, deletebyIdApi, addApi, modifyApi, validateApi } from '/@/api/sys/datatype';
export const useDataTypeStore = defineStore({
  id: 'app-datatype',
  actions: {
    async getPageAsync(params: sysDataTypePageParams): Promise<sysDataTypePageModel | null> {
      try {
        const { ...sysDataTypePageParams } = params;
        const data = await getpageasyncApi(sysDataTypePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: sysDataTypeByIdParams): Promise<editSysDataTypeModel | null> {
      try {
        const { ...sysDataTypeByIdParams } = params;
        const data = await deletebyIdApi(sysDataTypeByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editSysDataTypeModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editSysDataTypeModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editSysDataTypeModel | null> {
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
