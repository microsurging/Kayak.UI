import { defHttp } from '/@/utils/http/axios';
import { 
  deviceAccessApiModel,
  editDeviceAccessModel,
  editParams,
} from './model/deviceaccessModel';

import { ErrorMessageMode } from '/#/axios';

enum Api { 
  downdocumentfile = '/deviceaccessagg/downdocumentfile',
  getpropertyconfig = '/deviceaccessagg/getpropertyconfig',
  modify = '/deviceaccess/modify',
  add = '/deviceaccess/add', 
  getbyproductcode = '/deviceaccess/getbyproductcode',
  getaggbyproductcode = '/deviceaccessagg/getbyproductcode',
  getroutes = '/deviceaccessagg/getroutes',
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editDeviceAccessModel>(
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
  return defHttp.post<editDeviceAccessModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getroutesApi(params: { productCode: string }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getroutes,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpropertyconfigApi(params: { productCode: string }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getpropertyconfig,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getbyproductcodeApi(params: { productCode: string }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<deviceAccessApiModel>(
    {
      url: Api.getbyproductcode,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggbyproductcodeApi(params: { productCode: string }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getaggbyproductcode,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function downdocumentfileApi(params: { productCode: string }, mode: ErrorMessageMode = 'none') {
  return defHttp.post<any>(
    {
      url: Api.downdocumentfile,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
