import { defineStore } from 'pinia';
import {
  deviceGatewayPageParams,
  deviceGatewayPageModel,
  deviceGatewayByIdParams,
  editDeviceGatewayModel, 
  editParams,
} from '/@/api/deviceconnect/model/devicegatewayModel';
import {
  getpageasyncApi,
  modifyApi,
  stopApi,
  openApi, 
  addApi,
  open_aggApi,
  stop_aggApi,
  deletebyIdApi,
} from '/@/api/deviceconnect/devicegateway';
export const useDeviceGatewayStore = defineStore({
  id: 'app-devicegateway',
  actions: {
    async getPageAsync(params: deviceGatewayPageParams): Promise<deviceGatewayPageModel | null> {
      try {
        const { ...devicePageParams } = params;
        const data = await getpageasyncApi(devicePageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, 
    async deletebyIdApi(params: deviceGatewayByIdParams): Promise<editDeviceGatewayModel | null> {
      try {
        const { ...deviceByIdParams } = params;
        const data = await deletebyIdApi(deviceByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editDeviceGatewayModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async openApi(params: deviceGatewayByIdParams): Promise<editDeviceGatewayModel | null> {
      try {
        const { ...editParams } = params;
        const data = await openApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async stopApi(params: deviceGatewayByIdParams): Promise<editDeviceGatewayModel | null> {
      try {
        const { ...deviceGatewayByIdParams } = params;
        const data = await stopApi(deviceGatewayByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async open_aggApi(params: deviceGatewayByIdParams): Promise<editDeviceGatewayModel | null> {
      try {
        const { ...editParams } = params;
        const data = await open_aggApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async stop_aggApi(params: deviceGatewayByIdParams): Promise<editDeviceGatewayModel | null> {
      try {
        const { ...deviceGatewayByIdParams } = params;
        const data = await stop_aggApi(deviceGatewayByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editDeviceGatewayModel | null> {
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
