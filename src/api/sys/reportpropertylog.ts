import { defHttp } from '/@/utils/http/axios';
import {
  editReportPropertyLogModel,
  reportPropertyLogByIdParams,
  reportPropertyLogPageParams,
  reportPropertyLogPageModel
} from './model/reportpropertylogModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/reportpropertylogagg/getpageasync',
  deletebyId = '/reportpropertylog/deletebyId',
}

export function deletebyIdApi(params: reportPropertyLogByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editReportPropertyLogModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}


export function getpageasyncApi(params: reportPropertyLogPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<reportPropertyLogPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
