import { defineStore } from 'pinia';
import {
  sysDicPageModel,
  sysDicByParentCodeParams,
  sysDicListModel,
  sysDictionaryQuery,
  sysDicByIdParams,
  editSysDicModel,
  editParams,
  sysDicPageParams,
} from '/@/api/sys/model/dictionarymanageModel';
import {
  getpageasyncApi,
  getsysdicbyparentcodeApi,
  getsysdictionarybyconditionApi,
  stopApi,
  openApi,
  modifyApi,
  addApi,
  validateApi,
  deletebyIdApi,
} from '/@/api/sys/dictionarymanage';
export const useSysDicManageStore = defineStore({
  id: 'app-sysdicmanage',
  actions: {
    async getPageAsync(params: sysDicPageParams): Promise<sysDicPageModel | null> {
      try {
        const { ...sysDicPageParams } = params;
        const data = await getpageasyncApi(sysDicPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getsysdictionarybyconditionApi(
      params: sysDictionaryQuery,
    ): Promise<sysDicListModel | null> {
      try {
        const { ...sysDictionaryQuery } = params;
        const data = await getsysdictionarybyconditionApi(sysDictionaryQuery);
        return data.Result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getsysdicbyparentcodeApi(
      params: sysDicByParentCodeParams,
    ): Promise<sysDicListModel | null> {
      try {
        const { ...sysDicByParentCodeParams } = params;
        const data = await getsysdicbyparentcodeApi(sysDicByParentCodeParams);
        return data.Result ?? data.result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async stopApi(params: sysDicByIdParams): Promise<editSysDicModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await stopApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async openApi(params: sysDicByIdParams): Promise<editSysDicModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await openApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: sysDicByIdParams): Promise<editSysDicModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await deletebyIdApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editSysDicModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editSysDicModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editSysDicModel | null> {
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
