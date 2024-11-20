import { defHttp } from '/@/utils/http/axios';
import {
  reportPropertyByIdParams,
   reportPropertyPageModel,
   reportPropertyPageParams,
  editReportPropertyModel, 
} from './model/reportPropertyModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  aggregation_getpageasync = '/reportpropertyagg/getpageasync', 
  getreportpropertypageasync ='/reportpropertyagg/getreportpropertypageasync',
  deletebyId = '/reportproperty/deletebyId', 
}

 

export function getaggregationpageasyncApi(params: reportPropertyPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<reportPropertyPageModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getreportpropertypageasync(params: reportPropertyPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<reportPropertyPageModel>(
    {
      url: Api.getreportpropertypageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: reportPropertyByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editReportPropertyModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
