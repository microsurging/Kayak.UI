import { defHttp } from '/@/utils/http/axios';
import {
  operateLogPageParams,
  operateLogPageModel,
  operateLogByIdParams,
  editOperateLogModel,
} from './model/operatelogModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/operatelog/getpageasync',
  deletebyId = '/operatelog/deletebyId',
}

export function getpageasyncApi(params: operateLogPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<operateLogPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: operateLogByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editOperateLogModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
