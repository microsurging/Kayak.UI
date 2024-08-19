import { defineStore } from 'pinia';
import {
  editParams,
  registryCenterList,
  editRegistryCenterModel,
  regcenterAggregationPageModel,
  registryCenterPageParams,
  registryCenterByIdParams,
  registryCenterPageModel,
} from '/@/api/servicemanage/model/registrycenterModel';
import {
  getpageasyncApi,
  getlistApi,
  modifyApi,
  getaggregationpageasyncApi,
  addApi,
  deletebyIdApi,
} from '/@/api/servicemanage/registrycenter';
export const useRegistryCenterStore = defineStore({
  id: 'app-registrycenter',
  actions: {
    async getPageAsyncApi(
      params: registryCenterPageParams,
    ): Promise<registryCenterPageModel | null> {
      try {
        const { ...registryCenterPageParams } = params;
        const data = await getpageasyncApi(registryCenterPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getlistApi(): Promise<registryCenterList | null> {
      try {
        const data = await getlistApi();
        return data.Result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getaggregationpageasyncApi(
      params: registryCenterPageParams,
    ): Promise<regcenterAggregationPageModel | null> {
      try {
        const { ...registryCenterPageParams } = params;
        const data = await getaggregationpageasyncApi(registryCenterPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: registryCenterByIdParams): Promise<editRegistryCenterModel | null> {
      try {
        const { ...registryCenterByIdParams } = params;
        const data = await deletebyIdApi(registryCenterByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editRegistryCenterModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editRegistryCenterModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
