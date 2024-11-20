import { defHttp } from '/@/utils/http/axios';
import {
  serviceEntryPageModel,
  serviceEntryPageParams,
  serviceEntryModel,
  serviceDescriptorModel,
} from './model/intermediateServiceModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/intermediateservice/getpageasync/query',
  getbyserviceid = '/intermediateservice/getbyserviceid',
  getservicedescriptor = '/intermediateservice/getservicedescriptor',
}

export function getpageasyncApi(params: serviceEntryPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceEntryPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getbyserviceidApi(params: {serviceId:string}, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceEntryModel>(
    {
      url: Api.getbyserviceid,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getservicedescriptorApi(params: { serviceId: string }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<serviceDescriptorModel>(
    {
      url: Api.getservicedescriptor,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
