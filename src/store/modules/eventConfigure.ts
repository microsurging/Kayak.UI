import { defineStore } from 'pinia';
import {
  eventConfigPageParams,
  eventConfigPageModel,
  eventConfigByIdParams,
  editEventConfigModel,
  eventConfigAggregationModel,
  editParams,
} from '/@/api/devicemange/model/eventConfigureModel';
import { getpageasyncApi, deletebyIdApi, modifyApi, addApi, validateApi, getaggregationpageasyncApi } from '/@/api/devicemange/eventConfigure';
export const useEventConfigStore = defineStore({
  id: 'app-eventConfig',
  actions: {
    async getPageAsync(params: eventConfigPageParams): Promise<eventConfigPageModel | null> {
      try {
        const { ...functionConfigPageParams } = params;
        const data = await getpageasyncApi(functionConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: eventConfigByIdParams): Promise<editEventConfigModel | null> {
      try {
        const { ...sysUnitByIdParams } = params;
        const data = await deletebyIdApi(sysUnitByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAggregationPageAsyncApi(
      params: eventConfigPageParams,
    ): Promise<eventConfigAggregationModel | null> {
      try {
        const { ...functionConfigPageParams } = params;
        const data = await getaggregationpageasyncApi(functionConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editEventConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editEventConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editEventConfigModel | null> {
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
