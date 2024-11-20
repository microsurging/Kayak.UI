import { defHttp } from '/@/utils/http/axios';
import {
  editEventParameterModel,
  editEventParameters,
  eventParameterList
} from './model/eventparameterModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  edit = '/eventparameter/edit',
  getbyeventid = '/eventparameter/getbyeventid'
}


export function editApi(params: editEventParameters, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editEventParameterModel>(
    {
      url: Api.edit,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getbyeventidApi(params: { eventId: number | null }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<eventParameterList>(
    {
      url: Api.getbyeventid,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

