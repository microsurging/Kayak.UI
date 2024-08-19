import { defHttp } from '/@/utils/http/axios';
import {
  serviceRoutePageModel,
  editServiceDescriptorParams,
  serviceCommandModel,
  modifyAddressParams,
  editModel,
  serviceRoutePageParams,
  addressPageModel,
  getParam,
  serviceDescriptorPageModel,
  getStatisticsParam,
  serviceStatisticsModel,
} from './model/servicerouteModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/serviceroute/getpageasync/query',
  getstatistics = '/serviceroute/getstatistics',
  getservicedescriptor = '/serviceroute/getservicedescriptor',
  getaddresses = '/serviceroute/getaddresses',
  getservicecommand = '/serviceroute/getservicecommand',
  modifyAddress = '/serviceroute/modifyaddress',
  modifyservicedescriptor = '/serviceroute/modifyservicedescriptor',
  addservicedescriptor = '/serviceroute/addservicedescriptor',
}

export function getpageasyncApi(params: serviceRoutePageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceRoutePageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaddressesApi(params: serviceRoutePageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<addressPageModel>(
    {
      url: Api.getaddresses,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addservicedescriptorApi(
  params: editServiceDescriptorParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<editModel>(
    {
      url: Api.addservicedescriptor,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyservicedescriptorApi(
  params: editServiceDescriptorParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<editModel>(
    {
      url: Api.modifyservicedescriptor,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyAddressApi(params: modifyAddressParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editModel>(
    {
      url: Api.modifyAddress,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getservicedescriptorApi(params: getParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceDescriptorPageModel>(
    {
      url: Api.getservicedescriptor,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getcommandApi(params: getParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceCommandModel>(
    {
      url: Api.getservicecommand,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getstatisticsApi(params: getStatisticsParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceStatisticsModel>(
    {
      url: Api.getstatistics,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
