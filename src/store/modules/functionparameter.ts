import { defineStore } from 'pinia';
import {
  editFunctionParameterModel,
  editFunctionParameters,
  functionParameterList
} from '/@/api/devicemange/model/functionparameterModel';
import {
  editApi,
  getbyfunctionidApi

} from '/@/api/devicemange/functionparameter';
export const useFunctionParameterStore = defineStore({
  id: 'app-functionParameter',
  actions: {
    async getbyfunctionidApi(params: { functionId: number | null, parameterType:string|null }): Promise<functionParameterList | null> {
      try {
        const data = await getbyfunctionidApi(params);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async editApi(params: editFunctionParameters): Promise<editFunctionParameterModel | null> {
      try {
        const { ...editFunctionParameters } = params;
        const data = await editApi(editFunctionParameters);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
