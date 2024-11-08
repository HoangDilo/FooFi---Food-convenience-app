import {ELanguage} from '@/enums/user.enum';

export interface ILoginResponse {
  token: string;
}

export interface ILoginPayload {
  mail: string;
  password: string;
}

export interface IUserInfo {
  id: number;
  mail: string;
  name: string;
  avatar_url: string;
  language: ELanguage;
}

export interface IUserLanguage {
  language: ELanguage;
}
