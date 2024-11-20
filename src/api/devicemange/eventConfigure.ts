import { defHttp } from '/@/utils/http/axios';
import {
  eventConfigPageParams,
  eventConfigPageModel,
  eventConfigByIdParams,
  editEventConfigModel,
  editParams,
  eventConfigAggregationModel,
} from './model/eventConfigureModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  aggregation_getpageasync = '/eventconfigaggregation/getpageasync',
  getpageasync = '/eventconfigure/getpageasync',
  deletebyId = '/eventconfigure/deletebyId',
  validate = '/eventconfigure/validate',
  modify = '/eventconfigure/modify',
  add = '/eventconfigure/add',
}

export function getpageasyncApi(params: eventConfigPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<eventConfigPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(params: eventConfigPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<eventConfigAggregationModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: eventConfigByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editEventConfigModel>(
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
  return defHttp.post<editEventConfigModel>(
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
  return defHttp.post<editEventConfigModel>(
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
  return defHttp.post<editEventConfigModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
