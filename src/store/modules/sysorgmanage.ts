import { defineStore } from 'pinia';
import {
  sysOrgPageModel,
  sysOrgListModel,
  sysOrganizationQuery,
  sysOrgByIdParams,
  editSysOrgModel,
  editParams,
} from '/@/api/sys/model/orgmanageModel';
import {
  getpageasyncApi,
  getsysorganizationbyconditionApi,
  modifyApi,
  addApi,
  validateApi,
  deletebyIdApi,
  getorgcompanyApi,
} from '/@/api/sys/orgmanage';
export const useSysOrgManageStore = defineStore({
  id: 'app-sysorgmanage',
  actions: {
    async getPageAsync(params: sysOrganizationQuery): Promise<sysOrgPageModel | null> {
      try {
        const { ...sysOrganizationQuery } = params;
        const data = await getpageasyncApi(sysOrganizationQuery);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getsysorganizationbyconditionApi(
      params: sysOrganizationQuery,
    ): Promise<sysOrgListModel | null> {
      try {
        const { ...sysOrganizationQuery } = params;
        const data = await getsysorganizationbyconditionApi(sysOrganizationQuery);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getorgcompanyApi( 
    ): Promise<sysOrgListModel | null> {
      try { 
        const data = await getorgcompanyApi();
        return data?.result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: sysOrgByIdParams): Promise<editSysOrgModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await deletebyIdApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editSysOrgModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editSysOrgModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editSysOrgModel | null> {
      try {
        const { ...editParams } = params;
        const data = await validateApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
