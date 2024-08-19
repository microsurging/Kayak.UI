/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  param: {
    userName: string;
    password: string;
  };
}

export interface sysUserQuery {
  query: {
    phone: string | null;
    Email: string | null;
    sex: string | null;
    userName: string | null;
    page: number;
    pageSize: number;
  };
}

export interface editParams {
  model: sysUserModel;
}

export interface sysUserByIdParams {
  ids: [];
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  entity: object;
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  entity: {
    Result: {
      // 用户id
      UserId: string | number;
      // 用户名
      UserName: string;
      // 真实名字
      RealName: string;
      // 头像
      Avatar: string;
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editSysUserModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysUserModel {
  UserId: string | number;
  // 用户名
  UserName: string;
  // 真实名字
  RealName: string;
  // 头像
  Avatar: string;
  Sex: string;
  PhoneNumber: string;
  Phone: string;
  Email: string;
}

export interface sysUserPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: sysUserModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}
