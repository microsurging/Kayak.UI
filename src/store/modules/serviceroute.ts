import { defineStore } from 'pinia';
import {
  serviceRoutePageModel,
  editModel,
  editServiceDescriptorParams,
  modifyAddressParams,
  serviceCommandModel,
  serviceRoutePageParams,
  getParam,
  addressPageModel,
  serviceDescriptorPageModel,
  getStatisticsParam,
  serviceStatisticsModel,
} from '/@/api/servicemanage/model/servicerouteModel';
import {
  getpageasyncApi,
  modifyAddressApi,
  addservicedescriptorApi,
  modifyservicedescriptorApi,
  getcommandApi,
  getstatisticsApi,
  getaddressesApi,
  getservicedescriptorApi,
} from '/@/api/servicemanage/serviceroute';
export const useServiceRouteStore = defineStore({
  id: 'app-serviceroute',
  actions: {
    async getPageAsync(params: serviceRoutePageParams): Promise<serviceRoutePageModel | null> {
      try {
        const { ...serviceRoutePageParams } = params;
        const data = await getpageasyncApi(serviceRoutePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getstatisticsApi(params: getStatisticsParam): Promise<serviceStatisticsModel | null> {
      try {
        const { ...getStatisticsParam } = params;
        const data = await getstatisticsApi(getStatisticsParam);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getaddressesApi(params: serviceRoutePageParams): Promise<addressPageModel | null> {
      try {
        const { ...serviceRoutePageParams } = params;
        const data = await getaddressesApi(serviceRoutePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getservicedescriptorApi(params: getParam): Promise<serviceDescriptorPageModel | null> {
      try {
        const { ...getParam } = params;
        const data = await getservicedescriptorApi(getParam);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyAddressApi(params: modifyAddressParams): Promise<editModel | null> {
      try {
        const { ...modifyAddressParams } = params;
        const data = await modifyAddressApi(modifyAddressParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyservicedescriptorApi(
      params: editServiceDescriptorParams,
    ): Promise<editModel | null> {
      try {
        const { ...editServiceDescriptorParams } = params;
        const data = await modifyservicedescriptorApi(editServiceDescriptorParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addservicedescriptorApi(params: editServiceDescriptorParams): Promise<editModel | null> {
      try {
        const { ...editServiceDescriptorParams } = params;
        const data = await addservicedescriptorApi(editServiceDescriptorParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getcommandApi(params: getParam): Promise<serviceCommandModel | null> {
      try {
        const { ...getParam } = params;
        const data = await getcommandApi(getParam);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
