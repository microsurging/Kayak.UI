import { defHttp } from '/@/utils/http/axios';
import {
  networkLogPageParams,
  networkLogPageModel,
  networkLogByIdParams,
  editNetworkLogModel
} from './model/networklogModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/networklog/getpageasync',
  deletebyId = '/networklog/deletebyId',
}

export function getpageasyncApi(params: networkLogPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<networkLogPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: networkLogByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkLogModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
