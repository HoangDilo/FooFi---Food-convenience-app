import {ILoginPayload, ILoginResponse, IUserInfo} from '@/types/auth.type';
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
};
