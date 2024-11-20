import { defineStore } from 'pinia';
import {
  functionConfigPageParams,
  functionConfigPageModel,
  functionConfigByIdParams,
  editFunctionConfigModel,
  funConfigAggregationModel,
  editParams,
} from '/@/api/devicemange/model/functionConfigureModel';
import { getpageasyncApi, deletebyIdApi, modifyApi, addApi, validateApi, getaggregationpageasyncApi } from '/@/api/devicemange/functionConfigure';
export const useFunctionConfigStore = defineStore({
  id: 'app-functionConfig',
  actions: {
    async getPageAsync(params: functionConfigPageParams): Promise<functionConfigPageModel | null> {
      try {
        const { ...functionConfigPageParams } = params;
        const data = await getpageasyncApi(functionConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: functionConfigByIdParams): Promise<editFunctionConfigModel | null> {
      try {
        const { ...sysUnitByIdParams } = params;
        const data = await deletebyIdApi(sysUnitByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAggregationPageAsyncApi(
      params: functionConfigPageParams,
    ): Promise<funConfigAggregationModel | null> {
      try {
        const { ...functionConfigPageParams } = params;
        const data = await getaggregationpageasyncApi(functionConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editFunctionConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editFunctionConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editFunctionConfigModel | null> {
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
