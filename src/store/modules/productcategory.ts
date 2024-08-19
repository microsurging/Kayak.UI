import { defineStore } from 'pinia';
import {
  sysPrdCategoryList,
  productCategoryPageParams,
  sysPrdCategoryPageModel,
  productCategoryByIdParams,
  editPrdCategoryModel,
  editParams,
} from '/@/api/devicemange/model/productCategoryModel';
import {
  getpageasyncApi,
  getproductcategorybyconditionApi,
  modifyApi,
  addchildrenApi,
  addApi,
  validateApi,
  deletebyIdApi,
} from '/@/api/devicemange/productcategory';
export const usePrdCategoryStore = defineStore({
  id: 'app-prdcategory',
  actions: {
    async getPageAsync(params: productCategoryPageParams): Promise<sysPrdCategoryPageModel | null> {
      try {
        const { ...productCategoryPageParams } = params;
        const data = await getpageasyncApi(productCategoryPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getproductcategorybyconditionApi(
      params: productCategoryPageParams,
    ): Promise<sysPrdCategoryList | null> {
      try {
        const { ...productCategoryPageParams } = params;
        const data = await getproductcategorybyconditionApi(productCategoryPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: productCategoryByIdParams): Promise<editPrdCategoryModel | null> {
      try {
        const { ...sysDicByIdParams } = params;
        const data = await deletebyIdApi(sysDicByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editPrdCategoryModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addApi(params: editParams): Promise<editPrdCategoryModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addchildrenApi(params: editParams): Promise<editPrdCategoryModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addchildrenApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editPrdCategoryModel | null> {
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
