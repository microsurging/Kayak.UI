import { defHttp } from '/@/utils/http/axios';
import {
  deviceList,
  devicePageParams,
  devicePageModel,
  deviceByIdParams,
  editDeviceModel,
  editParams,
} from './model/deviceModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getdevicebycondition = '/device/getdevicebycondition',
  getpageasync = '/device/getpageasync',
  deletebyId = '/device/deletebyId',
  validate = '/device/validate',
  modify = '/device/modify',
  add = '/device/add',
  changeenable = '/device/changeenable',
  changedisable = '/device/changedisable',
}
export function getdevicebyconditionApi(
  params: devicePageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<deviceList>(
    {
      url: Api.getdevicebycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(params: devicePageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<devicePageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function changeenableApi(params: deviceByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceModel>(
    {
      url: Api.changeenable,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function changedisableApi(params: deviceByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceModel>(
    {
      url: Api.changedisable,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: deviceByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceModel>(
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
  return defHttp.post<editDeviceModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function validateApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
