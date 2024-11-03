import {ILoginPayload, ILoginResponse} from '@/types/auth.type';
import {apiClient} from '..';

export default {
  login(payload: ILoginPayload): Promise<ILoginResponse> {
    return apiClient.post('/login', {
      mail: payload.mail,
      password: payload.password,
    });
  },
};
