import { defHttp } from '/@/utils/http/axios';
import {
  deviceEventByIdParams,
  deviceEventPageModel,
  deviceEventPageParams,
  editDeviceEventModel,
} from './model/deviceEventModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/deviceevent/getpageasync', 
  deletebyId = '/deviceevent/deletebyId',
}



export function getpageasyncApi(params: deviceEventPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<deviceEventPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: deviceEventByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceEventModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
