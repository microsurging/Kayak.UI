import { defineStore } from 'pinia';
import {
  serviceEntryPageModel,
  serviceEntryPageParams,
  serviceEntryModel,
  serviceDescriptorModel,
} from '/@/api/servicemanage/model/intermediateServiceModel';;
import { getpageasyncApi, getbyserviceidApi, getservicedescriptorApi } from '/@/api/servicemanage/intermediateService';
export const useIntermediateServiceStore = defineStore({
  id: 'app-intermediateservice',
  actions: {
    async getPageAsync(params: serviceEntryPageParams): Promise<serviceEntryPageModel | null> {
      try {
        const { ...serviceEntryPageParams } = params;
        const data = await getpageasyncApi(serviceEntryPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getbyserviceidApi(params: { serviceId: string }): Promise<serviceEntryModel | null> {
      try { 
        const data = await getbyserviceidApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getservicedescriptorApi(params: { serviceId: string }): Promise<serviceDescriptorModel | null> {
      try {
        const data = await getservicedescriptorApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
