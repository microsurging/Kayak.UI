import { defineStore } from 'pinia';
import {
  deviceAccessApiModel,
  editDeviceAccessModel,
  editParams,
} from '/@/api/devicemange/model/deviceaccessModel';
import {
  downdocumentfileApi,
  getpropertyconfigApi,
  modifyApi,
  getroutesApi,
  getbyproductcodeApi,
  getaggbyproductcodeApi,
  addApi, 
} from '/@/api/devicemange/deviceaccess';
export const useDeviceAccessStore = defineStore({
  id: 'app-deviceaccess',
  actions: {
    async getpropertyconfigApi(params: { productCode: string }): Promise<any | null> {
      try { 
        const data = await getpropertyconfigApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getroutesApi(params: { productCode: string }): Promise<any | null> {
      try {
        const data = await getroutesApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getbyproductcodeApi(params: { productCode: string }): Promise<deviceAccessApiModel | null> {
      try {
        const data = await getbyproductcodeApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getaggbyproductcodeApi(params: { productCode: string }): Promise<any|null> {
      try {
        const data = await getaggbyproductcodeApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async downdocumentfileApi(params: { productCode: string }): Promise<any | null> {
      try { 
        const data = await downdocumentfileApi(params);
        return data;
      } catch (error) {
       return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editDeviceAccessModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, 
    async addApi(params: editParams): Promise<editDeviceAccessModel | null> {
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
