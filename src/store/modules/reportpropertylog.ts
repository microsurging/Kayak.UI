import { defineStore } from 'pinia';
import {
  reportPropertyLogPageParams,
  reportPropertyLogPageModel,
  reportPropertyLogByIdParams,
  editReportPropertyLogModel
} from '/@/api/sys/model/reportpropertylogModel';
import { getpageasyncApi,deletebyIdApi  } from '/@/api/sys/reportpropertylog';
export const useReportPropertyLogStore = defineStore({
  id: 'app-reportpropertylog',
  actions: {
    async getPageAsync(params: reportPropertyLogPageParams): Promise<reportPropertyLogPageModel | null> {
      try {
        const { ...reportPropertyLogPageParams } = params;
        const data = await getpageasyncApi(reportPropertyLogPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: reportPropertyLogByIdParams): Promise<editReportPropertyLogModel | null> {
      try {
        const { ...reportPropertyLogByIdParams } = params;
        const data = await deletebyIdApi(reportPropertyLogByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
