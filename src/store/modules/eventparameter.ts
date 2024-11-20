import { defineStore } from 'pinia';
import {
  editEventParameterModel,
  editEventParameters,
  eventParameterList
} from '/@/api/devicemange/model/eventparameterModel';
import {
  editApi,
  getbyeventidApi

} from '/@/api/devicemange/eventparameter';
export const useEventParameterStore = defineStore({
  id: 'app-eventParameter',
  actions: {
    async getbyeventidApi(params: { eventId: number | null}): Promise<eventParameterList | null> {
      try {
        const data = await getbyeventidApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async editApi(params: editEventParameters): Promise<editEventParameterModel | null> {
      try {
        const { ...editEventParameters } = params;
        const data = await editApi(editEventParameters);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
