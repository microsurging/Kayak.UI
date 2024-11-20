import { defHttp } from '/@/utils/http/axios';
import {
  deviceTypeList,
  deviceTypePageParams,
  deviceTypePageModel,
  deviceTypeAggregationPageModel,
   deviceTypeByIdParams,
  editDeviceTypeModel,
  deviceTypeAggregationModel,
  editParams,
} from './model/devicetypeModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getdevicetypebycondition = '/devicetype/getdevicetypebycondition',
  getpageasync = '/devicetype/getpageasync',
  aggregation_getdevicetypes = '/devicetypeagg/getdevicetypes',
  aggregation_getpageasync = '/devicetypeagg/getpageasync',
  deletebyId = '/devicetype/deletebyId',
  validate = '/devicetype/validate',
  modify = '/devicetype/modify', 
  add = '/devicetype/add',
  getdevicetypebyid = '/devicetypeagg/getdevicetypebyid'
}
export function getdevicetypebyconditionApi(
  params: deviceTypePageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<deviceTypeList>(
    {
      url: Api.getdevicetypebycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getdevicetypebyidApi(
  params: { id: number },
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<deviceTypeAggregationModel>(
    {
      url: Api.getdevicetypebyid,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getdevicetypesApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<deviceTypeList>(
    {
      url: Api.aggregation_getdevicetypes,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(
  params: deviceTypePageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<deviceTypeAggregationPageModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(params: deviceTypePageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<deviceTypePageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: deviceTypeByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceTypeModel>(
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
  return defHttp.post<editDeviceTypeModel>(
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
  return defHttp.post<editDeviceTypeModel>(
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
  return defHttp.post<editDeviceTypeModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
