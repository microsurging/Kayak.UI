import { defineStore } from 'pinia';
import {
  propertyConfigPageParams,
  propertyConfigPageModel,
  propertyConfigByIdParams,
  editPropertyConfigModel,
  propConfigAggregationModel,
  editParams,
} from '/@/api/devicemange/model/propertyConfigureModel';
import { getpageasyncApi, deletebyIdApi, modifyApi, addApi, validateApi, getaggregationpageasyncApi } from '/@/api/devicemange/propertyConfigure';
export const usepropertyConfigStore = defineStore({
  id: 'app-propertyConfig',
  actions: {
    async getPageAsync(params: propertyConfigPageParams): Promise<propertyConfigPageModel | null> {
      try {
        const { ...propertyConfigPageParams } = params;
        const data = await getpageasyncApi(propertyConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: propertyConfigByIdParams): Promise<editPropertyConfigModel | null> {
      try {
        const { ...sysUnitByIdParams } = params;
        const data = await deletebyIdApi(sysUnitByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAggregationPageAsyncApi(
      params: propertyConfigPageParams,
    ): Promise<propConfigAggregationModel | null> {
      try {
        const { ...propertyConfigPageParams } = params;
        const data = await getaggregationpageasyncApi(propertyConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editPropertyConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editPropertyConfigModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editPropertyConfigModel | null> {
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
