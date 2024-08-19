export interface sysOrgByIdParams {
  ids: [];
}

export interface editParams {
  model: sysOrganizationModel;
}

export interface sysOrganizationQuery {
  query: {
    name: string | null;
    sysOrgType: number | null;
    level: number | null;
    levelCode: string | null;
    page: number;
    pageSize: number;
  };
}

export interface sysOrganizationModel {
  id: number;
  name: string;
  levelCode: string;
  city: number | null;
  address: string;
  phone: string;
  email: string;
  contactUserId: number;
  sysOrgType: number;
  createDate: Date;
  updateDate: Date;
  remark: string;
}

export interface sysDicListModel {
  entity: {
    Result: sysOrganizationModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysOrgListModel {
  entity: {
    Result: sysOrganizationModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editSysOrgModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysOrgPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: sysOrganizationModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}
