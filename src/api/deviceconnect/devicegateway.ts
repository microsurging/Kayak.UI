import { defHttp } from '/@/utils/http/axios';
import { 
  deviceGatewayPageParams,
  deviceGatewayPageModel,
  deviceGatewayByIdParams,
  editDeviceGatewayModel,
  editParams,
} from './model/devicegatewayModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getaggregationpageasync = '/devicegatewayagg/getpageasync',
  deletebyId = '/devicegateway/deletebyId',
  validate = '/devicegateway/validate',
  modify = '/devicegateway/modify',
  add = '/devicegateway/add',
  stop = '/devicegateway/stop',
  open = '/devicegateway/open',
  stop_agg = '/devicegatewayagg/stop',
  open_agg = '/devicegatewayagg/open',
}


export function getpageasyncApi(params: deviceGatewayPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<deviceGatewayPageModel>(
    {
      url: Api.getaggregationpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function stopApi(params: deviceGatewayByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceGatewayModel>(
    {
      url: Api.stop,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function openApi(params: deviceGatewayByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceGatewayModel>(
    {
      url: Api.open,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function stop_aggApi(params: deviceGatewayByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceGatewayModel>(
    {
      url: Api.stop_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function open_aggApi(params: deviceGatewayByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceGatewayModel>(
    {
      url: Api.open_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: deviceGatewayByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceGatewayModel>(
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
  return defHttp.post<editDeviceGatewayModel>(
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
  return defHttp.post<editDeviceGatewayModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

