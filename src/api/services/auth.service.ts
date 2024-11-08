import {
  ILoginPayload,
  ILoginResponse,
  IUserInfo,
  IUserLanguage,
} from '@/types/auth.type';
import {apiClient, apiClientToken} from '..';

export default {
  login(payload: ILoginPayload): Promise<ILoginResponse> {
    return apiClient.post('/login', {
      mail: payload.mail,
      password: payload.password,
    });
  },
  getUserInfo(): Promise<IUserInfo> {
    return apiClientToken.get('/user/info');
  },
  updateUserInfo(payload: IUserInfo): Promise<IUserInfo> {
    return apiClientToken.post('/user/info', payload);
  },
  updateUserLanguage(payload: IUserLanguage): Promise<IUserInfo> {
    return apiClientToken.post('/user/info/language', payload);
  },
};
