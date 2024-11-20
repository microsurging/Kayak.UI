import { defHttp } from '/@/utils/http/axios';
import {
  editFunctionParameterModel,
  editFunctionParameters,
  functionParameterList
} from './model/functionparameterModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  edit = '/functionparameter/edit',
  getbyfunctionid = '/functionparameter/getbyfunctionid'
}


export function editApi(params: editFunctionParameters, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editFunctionParameterModel>(
    {
      url: Api.edit,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getbyfunctionidApi(params: { functionId: number | null, parameterType: string | null }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<functionParameterList>(
    {
      url: Api.getbyfunctionid,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

