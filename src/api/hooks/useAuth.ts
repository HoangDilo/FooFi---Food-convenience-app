import {useMutation} from '@tanstack/react-query';
import authService from '../services/auth.service';
import {ILoginPayload} from '@/types/auth.type';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: ILoginPayload) => authService.login(payload),
  });
};
