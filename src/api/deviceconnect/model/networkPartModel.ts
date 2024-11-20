export interface protocolManageParams {
  query: {
    protocolName: string | null;
    page: number;
    pageSize: number;
  };
}

export interface editNetworkPartParams {
  model: networkPartModel;
}

export interface editProtocolManageParams {
  model: protocolManageModel;
}

export interface protocolManageByIdParams {
  ids: [];
}

export interface networkPartByIdParams {
  ids: [];
}


export interface networkPartParams {
  query: {
    name: string;
    componentTypeId: string;
    status: number | null;
    page: number;
    pageSize: number;
  };
}

export interface networkPartPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: networkPartModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface protocolManageModel {
  protocolCode: string;
  protocolName: string;
  componentType: string;
  fileId: string | null;
  script: string | null;
  status: number;
  connProtocol: string | null;
  className: string|null;
  fileAddress: string|null;
  createDate: Date;
  updateDate: Date;
}

export interface networkPartList
{
  entity: {
    Result: networkPartModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface protocolManageList {
  entity: {
    Result: protocolManageModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface netPartDictionaryModel {
  name: string;
  code: string;
  value: number | null;
}

export interface editProtocolManageModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editNetworkPartModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface protocolManagePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: protocolManageModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface networkPartAggregationModel {
  id: number;
  name: string;
  componentTypeId: number;
  clusterModeId: number;
  isMulticast: boolean | null;
  status: string;
  enableSSL: boolean;
  enableSwagger: boolean | null;
  enableWebService: boolean | null;
  enableTLS: boolean | null;
  resolveMode: number | null;
  fixedLength: number | null;
  delimited: string;
  maxMessageLength: number | null;
  ruleScript: string;
  host: string;
  port: number;
  createDate: Date;
  updateDate: Date;
  remark: string;
  ComponentType: netPartDictionaryModel;
  ClusterMode: netPartDictionaryModel;
}
export interface networkPartModel {
  id: number|null
  name: string;
  componentTypeId: number;
  clusterModeId: number;
  status: string;
  isMulticast: boolean | null;
  enableSwagger: boolean | null;
  enableWebService: boolean | null;
  enableSSL: boolean;
  enableTLS: boolean | null;
  resolveMode: number | null;
  fixedLength: number | null;
  delimited: string;
  maxMessageLength: number | null;
  ruleScript: string;
  host: string;
  port: number;
  createDate: Date;
  updateDate: Date;
  remark: string;
}
