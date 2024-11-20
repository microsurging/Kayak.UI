import { defineStore } from 'pinia';
import {
  productList,
  productPageParams,
  productPageModel,
  prdAggregationPageModel,
  productByIdParams,
  editProductModel,
  editParams,
  prdAggregationModel
} from '/@/api/devicemange/model/productModel';
import {
  getpageasyncApi,
  getproductsApi,
  getaggregationpageasyncApi,
  modifyApi,
  getproductbyconditionApi,
  addApi,
  openApi,
  stopApi,
  getproductstatisticsApi,
  validateApi,
  deletebyIdApi,
  getproductbyidApi
} from '/@/api/devicemange/product';
export const useProductStore = defineStore({
  id: 'app-product',
  actions: {
    async getPageAsync(params: productPageParams): Promise<productPageModel | null> {
      try {
        const { ...productPageParams } = params;
        const data = await getpageasyncApi(productPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAggregationPageAsyncApi(
      params: productPageParams,
    ): Promise<prdAggregationPageModel | null> {
      try {
        const { ...productPageParams } = params;
        const data = await getaggregationpageasyncApi(productPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getproductbyidApi(
      params: { id: number },
    ): Promise<prdAggregationModel | null> {
      try {
        const data = await getproductbyidApi(params);
        return data.result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getproductstatisticsApi(): Promise<any> {
      try {
        const data = await getproductstatisticsApi();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getproductbyconditionApi(params: productPageParams): Promise<productList | null> {
      try {
        const { ...productCategoryPageParams } = params;
        const data = await getproductbyconditionApi(productCategoryPageParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getproductsApi(): Promise<productList | null> {
      try {
        const data = await getproductsApi();
        return data.result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deletebyIdApi(params: productByIdParams): Promise<editProductModel | null> {
      try {
        const { ...productByIdParams } = params;
        const data = await deletebyIdApi(productByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async openApi(params: productByIdParams): Promise<editProductModel | null> {
      try {
        const { ...productByIdParams } = params;
        const data = await openApi(productByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async stopApi(params: productByIdParams): Promise<editProductModel | null> {
      try {
        const { ...productByIdParams } = params;
        const data = await stopApi(productByIdParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async modifyApi(params: editParams): Promise<editProductModel | null> {
      try {
        const { ...editParams } = params;
        const data = await modifyApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async addApi(params: editParams): Promise<editProductModel | null> {
      try {
        const { ...editParams } = params;
        const data = await addApi(editParams);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async validateApi(params: editParams): Promise<editProductModel | null> {
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
