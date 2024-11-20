import { defineStore } from 'pinia';
import {
  editPropertyThresholdModel,
  editPropertyThresholds,
  propertyThresholdList
} from '/@/api/devicemange/model/propertyThresholdModel';
import {
  editApi,
  getbypropertyidApi

} from '/@/api/devicemange/propertyThreshold';
export const usePropertyThresholdStore = defineStore({
  id: 'app-propertyThreshold',
  actions: {
    async getbypropertyidApi(params: { propertyId: number|null }): Promise<propertyThresholdList | null> {
      try {
        const data = await getbypropertyidApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async editApi(params: editPropertyThresholds): Promise<editPropertyThresholdModel | null> {
      try {
        const { ...editParams } = params;
        const data = await editApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
