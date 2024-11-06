import {useMutation} from '@tanstack/react-query';
import authService from '../services/auth.service';
import {ILoginPayload} from '@/types/auth.type';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '@/store/reducers/my.reducer';
import {setAccessTokenStorage} from '@/utils/storage';
import {useTranslation} from 'react-i18next';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: ILoginPayload) => authService.login(payload),
  });
};

export const useCheckValidToken = <T, P extends any[]>(
  func: (...args: P) => Promise<T>,
) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const newFunction = async (...args: P) => {
    try {
      const res = await func(...args);
      return res;
    } catch (error: any) {
      const status = error.response.status;
      if (status === 401) {
        dispatch(setAccessToken(''));
        await setAccessTokenStorage('');
        navigation.navigate('my');
        Toast.show({
          type: 'error',
          text1: t('toast.logout'),
        });
      }
    }
  };

  return newFunction;
};
