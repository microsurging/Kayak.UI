import { defineStore } from 'pinia';
import {
  reportPropertyByIdParams,
  reportPropertyPageModel,
  reportPropertyPageParams,
  editReportPropertyModel,
} from '/@/api/devicemange/model/reportPropertyModel';
import { deletebyIdApi, getaggregationpageasyncApi, getreportpropertypageasync } from '/@/api/devicemange/reportProperty';
export const usereportPropertyStore = defineStore({
  id: 'app-reportProperty',
  actions: { 
    async deletebyIdApi(params: reportPropertyByIdParams): Promise<editReportPropertyModel | null> {
      try {
        const { ...reportPropertyByIdParams } = params;
        const data = await deletebyIdApi(reportPropertyByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAggregationPageAsyncApi(
      params: reportPropertyPageParams,
    ): Promise<reportPropertyPageModel | null> {
      try {
        const { ...propertyConfigPageParams } = params;
        const data = await getaggregationpageasyncApi(propertyConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, 
    async getreportpropertypageasync(
      params: reportPropertyPageParams,
    ): Promise<reportPropertyPageModel | null> {
      try {
        const { ...propertyConfigPageParams } = params;
        const data = await getreportpropertypageasync(propertyConfigPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, 
  },
});
