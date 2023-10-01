export interface ILogin {
  data: ILoginData;
  meta: IMeta;
}

export interface ILoginData {
  access_token: string;
  user_id: string;
}

export interface IMeta {
  message: string;
  statusCode: number;
}

export interface IUserInfo {
  data: UserData;
}

export interface UserData {
  email: string;
  full_name: string;
  id: string;
}
