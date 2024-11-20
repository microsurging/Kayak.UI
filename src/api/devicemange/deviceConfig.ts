import { defHttp } from '/@/utils/http/axios';
import {
  deviceConfigApiModel,
  editDeviceConfigModel,
  editParams,
} from './model/deviceConfigModel';

import { ErrorMessageMode } from '/#/axios';

enum Api { 
  modify = '/deviceconfig/modify',
  add = '/deviceconfig/add',
  getbydevicecode = '/deviceconfig/getbydevicecode'
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceConfigModel>(
    {
      url: Api.modify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceConfigModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getbydevicecodeApi(params: { deviceCode: string }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<deviceConfigApiModel>(
    {
      url: Api.getbydevicecode,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
 
